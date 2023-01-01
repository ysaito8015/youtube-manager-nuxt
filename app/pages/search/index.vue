<template>
  <section class="section">
    <div class="container">

      <div class="block">
        <div class="block video-block" v-for = "item in items" :key = "item.id">
          <AppVideo
            :item = "item"
            :video-id = "item.id.videoId"
          />
        </div> <!-- end of block video-block -->
      </div> <!-- end of block -->

      <div class="block">
        <nav class="pagination">
          <a
            href.prevent = "#"
            class = "pagination-next"
            @click = "loadMore"
          >
            More
          </a>
        </nav> <!-- end of pagination -->
      </div> <!-- end of block -->

    </div> <!-- end of container -->
  </section>
</template>

<script>
  import ROUTES from '~/routes/api'
  import AppVideo from '~/components/AppVideo'

  export default {
    components: {
      AppVideo
    },

    computed: {
      items() {
        return this.$store.getters.getSearchVideos
      },
      nextPageToken() {
        return this.$store.getters.getSearchMeta.nextPageToken
      },
    },

    methods: {
      loadMore() {
        const q = encodeURIComponent(this.$route.query.q) || ""
        const payload = {
          uri: ROUTES.GET.SEARCH,
          params: {
            pageToken: this.nextPageToken,
            q
          }
        }

        this.$store.dispatch('searchVideos', payload)
      }
    },

    async fetch({store, query}) {
      const q = encodeURIComponent(query.q) || ""
      const payload = {
        uri: ROUTES.GET.SEARCH,
        params: {
          q
        }
      }

      if (store.getters.getSearchVideos && store.getters.getSearchVideos.length > 0) {
        return
      }

      await store.dispatch('searchVideos', payload)
    }
  }
</script>

<style scoped>
  .video-block {
    max-width: 900px;
  }
</style>
