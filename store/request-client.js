// axios は HTTP クライアント
// axios をラップしたリクエストクライアントクラス
export class RequestClient {
  constructor(axios) {
    this.axios = axios
  }

  // GET リクエストで使用するメソッドの定義
  async get(uri, params = {}) {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri

    return await this.axios.$get(query)
  }
}

// RequestClient のインスタンス生成時に使用
export function createRequestClient(axios) {
  return new RequestClient(axios)
}

