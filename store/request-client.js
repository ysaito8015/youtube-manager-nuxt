export class RequestClient {
  constructor(axios) {
    this.axios = axios
  }

  // GET リクエストで使用するメソッドの定義
  async get(uri, params = {}) { 
    // 引数で渡される params からクエリを生成
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const query = queryString.length > 0 ? '${uri}?${queryString}' : uri
    return await this.axios.$get(query)
  }
}

// RequestClient のインスタンス生成時に使用
export function createRequestClient(axios) {
  return new RequestClient(axios)
}
