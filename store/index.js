import {createRequestClient} from '~/store/request-client';

export const state =() => ({
  items: [],
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
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    // ステートに API のレスポンスをセットする
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
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
}

