import { Coin, ICoin } from '@models/coin'
import { getRepository, ILike } from 'typeorm'

export default class ListCoins {
  _repo: any
  constructor() {
    this._repo = getRepository(Coin)
  }
  async call(symbol?: string): Promise<string> {
    let coins: ICoin[] 
    if(symbol) {
      coins = await this._repo.find({
        symbol: ILike(`%${symbol}%`)
      })
    } else coins = await this._repo.find()
    return this.parseResponse(coins)
  }
  private parseResponse(coins: ICoin[]): string {
    const messageCoin = coins.map((coin: ICoin) => {
      const newDate = new Date(coin.createdAt)
      const hours = newDate.toTimeString().split(' ')[0]
      const date = (new Intl.DateTimeFormat('pt-br')).format(newDate)
      return `
      \nData: ${date} ${hours}
Moeda: ${coin.symbol}
(24h) Máxima: ${coin.high24h}
(24h) Mínima: ${coin.low24h}
Preço Atual: ${coin.lastPrice}`
    }).join('\n')
    return messageCoin
  }
}