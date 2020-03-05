<template>
  <div>
    <settings-default></settings-default>
    <settings-noise></settings-noise>
    <settings-speed></settings-speed>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
require('../components/settings')
export default {
  name: 'Settings',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({noise: 'getNoise', dark: 'isDarkMode', defaultFontSize: 'getDefaultFontSize'})
  },
  methods: {
    ...mapActions(['setNoiseAttr'])
  }
}
</script>

<style scoped>

</style>
