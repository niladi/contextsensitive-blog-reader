<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in getPosts">
        <v-list-item
          :key="item.title.rendered"
          :to="{name: 'Post', params: {id: item.id}}"
        >
          <v-list-item-avatar>
            <v-img v-if="item.images.medium || item.images.large" :src="item.images.medium || item.images.large"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title.rendered"></v-list-item-title>
            <v-list-item-subtitle v-html="item['author_name']"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          :key="index"
          inset
        ></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'List',
  computed: {
    ...mapGetters(['getPosts'])
  }
}
</script>

<style scoped>

</style>
