import axios from 'axios'

export default class FetchAvailableCoins {
  _http: any
  constructor() {
    this._http = axios
  }
  async call(): Promise<void> {
    const { data } = await this._http.get('https://api.binance.com/api/v3/ticker/24hr?symbol=WINBNB')
    console.log(data)
  }
}
