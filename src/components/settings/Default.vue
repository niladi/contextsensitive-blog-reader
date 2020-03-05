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
          <span class="subheading">Default Einstellungen</span>
        </v-toolbar-title>

      </v-toolbar>
      <v-subheader class="pl-0">Dark Mode</v-subheader>
        <v-btn small class="mx-auto mt-1" color="primary" @click="toggleDarkMode()">
          {{  dark ? 'Aus' : 'An' }}</v-btn>

      <v-subheader class="pl-0">Ruheschriftgröße (in %)</v-subheader>
        <v-slider
          max="125"
          min="75"
          :value="defaultFontSize"
          @end="(e) => {
            setDefaultFontSize(e)
          }"
          thumb-label="always"
        ></v-slider>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Default',
  computed: {
    ...mapGetters({dark: 'isDarkMode', defaultFontSize: 'getDefaultFontSize'})
  },
  methods: {
    ...mapActions(['setDefaultFontSize', 'toggleDarkMode'])
  }
}
</script>

<style scoped>

</style>
