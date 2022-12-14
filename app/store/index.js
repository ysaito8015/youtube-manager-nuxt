import {createRequestClient} from '~/store/request-client';

export const state =() => ({
  items: [],
  relatedItems: [], // 関連動画のためのステート
  item: {}, // 個別の動画のステート
  meta: {},
  searchItems: [], // 検索結果のための state
  searchMeta: {},
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

  // 動画の検索に使用するアクション
  async searchVideos({commit}, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutateSearchVideos', res)
  }
}

// ステートに API のレスポンスをセットする
export const mutations = {
  mutatePopularVideos(state, payload) {
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

  // 検索結果に対するミューテーション
  mutateSearchVideos(state, payload) {
    state.searchItems = payload.items ? state.searchItems.concat(payload.items) : []
    state.searchMeta = payload
  },
}

// Vue コンポネントからステートを取得するゲッター
export const getters = {
  // popular 動画取得に使用するゲッター
  getPopularVideos(state) {
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

  // 検索結果を取得するゲッター
  getSearchVideos(state) {
    return state.searchItems
  },

  // 検索結果のメタ情報を取得するゲッター
  getSearchMeta(state) {
    return state.searchMeta
  },
}

