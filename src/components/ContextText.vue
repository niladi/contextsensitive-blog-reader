<template>
  <div>
      <div class="custom-text"
           v-html="text || '<p>Dies ist ein Beispiel</p>'"
           :style="{ 'font-size': fontSize + '%' }">
      </div>
      <div v-if="info">
        <p v-if="constrains.noise">Durchschnitsslautstärke: {{ averageVolume }}</p>
        <p v-if="constrains.speed">Durchschnittsgeschwindigkeit: {{ averageSpeed }}</p>
        <v-banner :color="error? 'error' : 'success'">
          Status: {{ message }}
        </v-banner>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    interval: null,
    media: null,
    averageSpeed: 0,
    geoId: null,
    averageVolume: 0,
    fontSize: 100,
    error: false,
    connecting: true,
    message: ''
  }),
  computed: {
    ...mapGetters({noise: 'getNoise', defaultFontSize: 'getDefaultFontSize', speed: 'getSpeed'})
  },
  props: {
    text: null,
    constrains: {
      default: () => ({noise: true, speed: true}),
      type: Object
    },
    info: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    this.start()
  },
  watch: {
    interval (val, old) {
      clearInterval(old)
    },
    media (val, old) {
      if (old !== null) {
        old.getAudioTracks()[0].stop()
      }
    },
    noise () {
      if (this.constrains.noise) {
        this.stopNoise()
        this.startNoise()
      }
    },
    speed () {
      if (this.constrains.speed) {
        this.stopSpeed()
        this.startSpeed()
      }
    },
    averageVolume () {
      this.updateFontSize()
    },
    averageSpeed () {
      this.updateFontSize()
    }
  },
  beforeDestroy () {
    this.stop()
  },
  methods: {
    start () {
      this.error = false
      this.message = 'Connecting'
      if (this.constrains.noise) {
        this.startNoise()
      }
      if (this.constrains.speed) {
        this.startSpeed()
      }
    },
    stop () {
      this.stopNoise()
      this.stopSpeed()
    },
    startSpeed () {
      let stack = []
      let startTime = null
      let sum = 0
      this.geoId = navigator.geolocation.watchPosition(pos => {
        if (pos.coords.speed === null) {
          this.stopSpeed()
          this.message = 'Keinen Zugriff auf den auf Speed'
          this.error = true
          return
        }
        this.message = 'Funktioniert'
        stack.push(pos.coords.speed)
        sum += pos.coords.speed
        if (startTime === null) {
          startTime = pos.timestamp
        } else if (startTime + this.speed.time * 1000 < pos.timestamp) {
          sum -= stack.shift()
          this.averageSpeed = (sum / stack.length)
        }
      }, () => {
        this.message = 'Keinen Zugriff auf den Standort'
        this.error = true
      }, {
        enableHighAccuracy: true
      })
    },
    startNoise () {
      const constraints = {
        audio: true,
        video: false
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(media => {
          this.message = 'Funktioniert'
          this.media = media
          const audioCtx = new AudioContext()
          const analyser = audioCtx.createAnalyser()
          const mic = audioCtx.createMediaStreamSource(media)

          analyser.smoothingTimeConstant = 0.8
          analyser.fftSize = 1024

          mic.connect(analyser)
          let stack = []
          let array = null
          let values = 0
          let length = 0
          let sum = 0
          let temp = 0
          this.interval = setInterval(() => {
            array = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(array)
            values = 0
            length = array.length
            for (let i = 0; i < length; i++) {
              values += array[i]
            }
            temp = values / length
            stack.push(temp)
            sum += temp
            if (analyser.context.currentTime > this.noise.time) {
              sum -= stack.shift()
              this.averageVolume = (sum / stack.length)
            }
          }, this.noise.period)
        }).catch((e) => {
          this.message = 'Kein Zugriff auf das Microphone'
          this.error = true
        })
    },
    stopNoise () {
      this.averageVolume = 0
      clearInterval(this.interval)
      this.media.getAudioTracks()[0].stop()
    },
    stopSpeed () {
      this.averageSpeed = 0
      navigator.geolocation.clearWatch(this.geoId)
    },
    updateFontSize () {
      this.fontSize = this.defaultFontSize
      this.fontSize += this.constrains.noise ? this.averageVolume * this.noise.multiplicator : 0
      this.fontSize += this.constrains.speed ? this.averageSpeed * this.speed.multiplicator : 0
    }
  }
}
</script>

<style lang="css">
  img {
    max-width: 100% !important
  }

  .custom-text {
    -webkit-transition:  font-size 5s;
    -moz-transition:  font-size 5s;
    -o-transition:  font-size 5s;
    transition:  font-size 5s;
  }

  h6 {
    font-size: 1em;
  }
</style>
