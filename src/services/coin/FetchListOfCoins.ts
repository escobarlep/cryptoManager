import axios from 'axios'

export default class FetchListOfCoins {
  _baseUrl: String = `${process.env.URL_PROVIDER}/common/symbols`
  _http: any
  constructor() {
    this._http = axios
  }
  async call(): Promise<string> {
    const { data } = await this._http.get(this._baseUrl)
    if (data.message !== 'Success') throw new Error('error_fetching_data')
    return this.parseResponse(data.data)
  }
  private parseResponse(data: any[]) {
    const symbols = data.map(({ symbol }) => symbol?.replace('_', ' ')?.toLowerCase()) 
    return symbols?.sort()?.join('\n - ')
  }
}