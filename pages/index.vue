<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div class="block video-block" v-for="item in items" :key="item.id">
          <AppVideo
              :item="item"
              :video-id="item.id"
          />
        </div> <!-- end of block video-block -->
      </div> <!-- end of block -->

      <div id="block">
        <nav id="pagination">
          <a
            href.prevent="#"
            class="pagination-next"
            @click="loadMore"
            >
            More
          </a>
        </nav>
      </div> <!-- end of block -->
    </div> <!-- end of container -->
  </section>
</template>

<script>
  import ROUTES from '~/routes/api'
  import AppVideo from '~/components/AppVideo';

  export default {
    components: {AppVideo},

    computed: {
      items() {
        return this.$store.getters.getPopularVideos
      },
      nextPageToken() {
        return this.$store.getters.getMeta.nextPageToken
      }
    },

    methods: {
      loadMore() {
        const payload = {
          uri: ROUTES.GET.POPULARS,
          params: {
            pageToken: this.nextPageToken
          }
        }

        this.$store.dispatch('fetchPopularVideos', payload)
      }
    },

    // ページレンダリング時にストアにデータをセットする
    async fetch({store}) {
      const payload = {
        uri: ROUTES.GET.POPULARS
      }

      if (store.getters.getPopularVideos && store.getters.getPopularVideos.length > 0) {
        return
      }

    // store のアクションに送る
    await store.dispatch('fetchPopularVideos', payload)
    }
  }
</script>

<style scoped>
  .video-block {
    max-width: 900px;
  }
</style>
