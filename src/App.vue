<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app v-model="drawer"
                         :mobile-break-point="$mobileBreakPoint">
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item v-for="(item, index) in navItems" :key="index" :to="{name: item.link}">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon v-show="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="ctm-title">MC IoT Project</v-toolbar-title>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<style scoped>
  .ctm-title {
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    drawer: true,
    navItems: [
      {
        title: 'Einstellungen',
        link: 'Settings',
        icon: 'mdi-cogs'
      }, {
        title: 'Beiträge',
        link: 'List',
        icon: 'mdi-book-open-page-variant'
      }
    ]
  }),

  computed: {
    ...mapGetters([
      'isDarkMode',
      'isMobile'
    ])
  },

  methods: {
    ...mapActions(['enableDarkMode', 'disableDarkMode', 'toggleResize', 'updatePosts'])
  },

  watch: {
    isDarkMode (val) {
      this.$vuetify.theme.dark = val
    }
  },

  created () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.enableDarkMode()
    } else {
      this.disableDarkMode()
    }
    this.updatePosts()
  },
  mounted () {
    window.addEventListener('resize', this.toggleResize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.toggleResize)
  }
}
</script>
