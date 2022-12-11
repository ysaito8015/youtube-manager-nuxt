<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
          <!-- youtube プラグインの使用 -->
          <!-- $route オブジェクトからビデオ ID を取得 -->
          <youtube
            :video-id="this.$route.params.id"
            ref="youtube"
          ></youtube>
        </div> <!-- end of block video-player -->

        <div class="box">
          <p>
            <span class="title is-4">{{ item.snippet.title }}</span>
          </p>
          <div class="level">
            <div class="level-left">
              {{ item.snippet.channelTitle }}
              <br />
              {{ item.snippet.publishedAt }}
            </div> <!-- end of level-left -->
          </div> <!-- end of level -->

          <hr>
          <p>{{ item.snippet.description }}</p>
        </div> <!-- end of box -->
      </div> <!-- end of column is-6 -->

      <div class="column is-4">
        <div class="box">
          <p>
            <span>関連動画</span>
          </p>
          <div v-for="relatedItem in relatedItems" :key="relatedItem.id">
            <hr>
            <nuxt-link
                :to="`/video/${relatedItem.id.videoId}`"
              >
              <article class="media">
                <div class="media-left">
                  <figure class="image">
                    <img :src="relatedItem.snippet.thumbnails.default.url" alt="thumbnail">
                  </figure>
                </div> <!-- end of media-left -->
                <div class="media-content">
                  <div class="content">
                    <p>{{ relatedItem.snippet.title }}</p>
                  </div> <!-- end of content -->
                  <small>{{ relatedItem.snippet.channelTitle }}</small>
                </div> <!-- end of media-content -->
              </article>
            </nuxt-link>
          </div> <!-- end of v-for -->
        </div> <!-- end of box -->
      </div> <!-- end of column is-4 -->
    </div> <!-- columns -->
  </div> <!-- section -->
</template>

<script>
  import ROUTES from '~/routes/api'

  export default {
    computed: {
      item() {
        // $store オブジェクトから再生する動画を取り出す
        return this.$store.getters.getVideo
      },
      relatedItems() {
        // $store オブジェクトから関連動画を取り出す
        return this.$store.getters.getRelatedVideos
      },
    },

      // 画面アクセス時に fetch() が発火する
      async fetch({store, route}) {
        // dispatch() を、YouTube API に対して実行
        await store.dispatch('findVideo', {
          // VIDEO に対応するルーティングを追加する必要がある
          uri: ROUTES.GET.VIDEO.replace(':id', route.params.id),
        }),

        await store.dispatch('fetchRelatedVideos', {
          // RELATED に対応するルーティングを追加する必要がある
          url: ROUTES.GET.RELATED.replace(':id', route.params.id),
        })
      }
  }
</script>

<style>
  iframe {
    width: 100%;
    height: 500px;
  }

  .video-player {
    max-width: 880px;
  }
</style>
