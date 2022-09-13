<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
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
        </div> <!-- end of box -->
      </div> <!-- end of column is 4 -->
    </div> <!-- columns -->
  </div> <!-- section -->
</template>

<script>
  import ROUTES from '~/routes/api'

  export default {
    computed: {
      item() {
        return this.$store.getters.getVideo
      },
    },

      async fetch({store, route}) {
        await store.dispatch('findVideo', {
          uri: ROUTES.GET.VIDEO.replace(':id', route.params.id),
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
