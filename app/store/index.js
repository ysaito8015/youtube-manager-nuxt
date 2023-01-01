import {createRequestClient} from '~/store/request-client';

export const state =() => ({
  items: [],
  relatedItems: [], // 関連道のためのステート
  item: {}, // 個別の動画のステート
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

  // 個別の動画取得に使用するアクション
  async findVideo({commit}, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    commit('mutateVideo', params)
  },

  // 関連動画取得に使用するアクション
  async fetchRelatedVideos({commit}, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
  },
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    // ステートに API のレスポンスをセットする
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },

  // 個別の動画取得に使用するミューテーション
  mutateVideo(state, payload) {
    const params = (payload.items && payload.items.length > 0) ? payload.items[0] : {}
    state.item = params
  },

  // 関連動画取得に使用するミューテーション
  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || []
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

  // 個別の動画取得に使用するゲッター
  getVideo(state) {
    return state.item
  },

  // 関連動画を取得するゲッター
  getRelatedVideos(state) {
    return state.relatedItems
  },
}

