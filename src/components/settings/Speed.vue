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
          <span class="subheading">Geschwindigkeitsmessungen</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-subheader class="pl-0">Zeitraum (in s)</v-subheader>
        <v-slider
          max="180"
          min="1"
          :value="speed.time"
          @end="(e) => setSpeedAttr({key: 'time', value: e})"
          thumb-label="always"
        ></v-slider>
        <v-subheader class="pl-0">Schriftgrößen Multiplikator</v-subheader>
        <v-slider
          max="20"
          min="0"
          :value="speed.multiplicator"
          @end="(e) => setSpeedAttr({key: 'multiplicator', value: e})"
          thumb-label="always"
        ></v-slider>
      </v-card-text>
      <context-text :constrains="{noise: false, speed: true}" info></context-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ContextText from '../ContextText'
export default {
  name: 'Speed',
  computed: {
    ...mapGetters({speed: 'getSpeed'})
  },
  methods: {
    ...mapActions(['setSpeedAttr'])
  },
  components: {
    ContextText
  }
}
</script>

<style scoped>

</style>
