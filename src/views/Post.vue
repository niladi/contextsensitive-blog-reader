<template>
  <div>
    <context-text
      v-if="post"
      :text="post.content.rendered"
    ></context-text>
    <div v-else>
      Kein Post Gefunden!
    </div>
  </div>
</template>

<script>
import ContextText from '../components/ContextText'
export default {
  name: 'Post',
  data () {
    return {
      post: null
    }
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  components: {
    ContextText
  },
  mounted () {
    this.post = this.$store.getters.getPost(this.id)
  }
}
</script>

<style scoped lang="sass">
.font-active
  font-size: 200%
</style>
