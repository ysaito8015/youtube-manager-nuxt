import {createRequestClient} from '~/store/request-client';

export const state =() => ({
  items: [],
  item: {},
  meta: {},
})

export const actions = {
  async fetchPopularVideos({commit}, payload) {
    // API をリクエストするためのクライアントを生成
    const client = createRequestClient(this.$axios)
    // GET リクエストを送信
    const res = await client.get(payload.uri, payload.params)
    // API のレスポンスを commit に渡す
    commit('mutatePopularVideos', res)
  },

  async findVideo({commit}, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    commit('mutateVideo', params)
  },
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    // ステートに API のレスポンスをセットする
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },

  mutateVideo(state, payload) {
    const params = (payload.items && payload.items.length > 0) ? payload.items[0] : {}
    state.item = params
  },
}

export const getters = {
  getPopularVideos(state) {
    // Vue コンポネントからステートを取得するゲッター
    return state.items
  },

  getMeta(state) {
    return state.meta
  },

  getVideo(state) {
    return state.item
  },
}

