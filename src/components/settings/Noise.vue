<template>
  <v-row >
    <v-card
      class="mx-auto col-12 col-md-9"
    >
      <v-toolbar
        flat
        dense
      >
        <v-toolbar-title>
          <span class="subheading">Lärm Messungen</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-subheader class="pl-0">Refresh Period (in ms)</v-subheader>
        <v-slider
          max="500"
          min="10"
          :value="noise.period"
          @end="(e) => setNoiseAttr({key: 'period', value: e})"
          thumb-label="always"
        ></v-slider>
        <v-subheader class="pl-0">Zeitraum (in s)</v-subheader>
        <v-slider
          max="180"
          min="1"
          :value="noise.time"
          @end="(e) => setNoiseAttr({key: 'time', value: e})"
          thumb-label="always"
        ></v-slider>
        <v-subheader class="pl-0">Schriftgrößen Multiplikator</v-subheader>
        <v-slider
          max="20"
          min="0"
          :value="noise.multiplicator"
          @end="(e) => setNoiseAttr({key: 'multiplicator', value: e})"
          thumb-label="always"
        ></v-slider>
      </v-card-text>
      <context-text :constrains="{noise: true, speed: false}" info></context-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ContextText from '../ContextText'
export default {
  name: 'Noise',
  computed: {
    ...mapGetters({noise: 'getNoise'})
  },
  methods: {
    ...mapActions(['setNoiseAttr'])
  },
  components: {
    ContextText
  }
}
</script>

<style scoped>

</style>
