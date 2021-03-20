import { ICoin } from '@models/coin'
import axios from 'axios'
import AddCoinRegister from './AddCoinRegister'

export default class FetchCoin {
  _baseUrl: String = `${process.env.URL_PROVIDER}/market/ticker?symbol=`
  _http: any
  constructor(args: string[]) {
    this._http = axios
    const coin = args[0] ? args[0].trim().toUpperCase() : 'BTC'
    const currency = args[1] ? args[1].trim().toUpperCase() : 'BRL'
    this._baseUrl += `${coin}_${currency}`
  }
  async call(): Promise<string> {
    const { data } = await this._http.get(this._baseUrl)
    if (data.message !== 'Success') throw new Error('error_fetching_data');
    const persistData = new AddCoinRegister()
    persistData
      .call(data.data)
      .catch(console.error)

    return this.parseResponse(data.data)
  }
  private parseResponse(coin: ICoin): string {
    const responseString = `
      \nMoeda: ${coin.symbol}
(24h) Máxima: ${coin.high24h}
(24h) Mínima: ${coin.low24h}
Preço Atual: ${coin.lastPrice}
Variação: ${ ((Number(coin.lastPrice) * 100 / Number(coin.low24h)) - 100).toFixed(2) }%
    `
    return responseString
  }
}