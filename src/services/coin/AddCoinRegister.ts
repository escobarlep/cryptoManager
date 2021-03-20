import { Coin, ICoin } from '@models/coin'
import { getRepository } from 'typeorm'

export default class AddCoinRegister {
  _repo: any
  constructor() {
    this._repo = getRepository(Coin)
  }
  async call(data: ICoin) {
    const coin = new Coin()
    coin.symbol = data.symbol
    coin.ask = data.ask
    coin.baseVolume24h = data.baseVolume24h
    coin.bid = data.bid
    coin.high24h = data.high24h
    coin.lastPrice = data.lastPrice
    coin.low24h = data.low24h
    coin.open24h = data.open24h
    coin.quoteVolume24h = data.quoteVolume24h
    coin.createdAt = new Date(data.timestamp)
    await this._repo.save(coin)

    return coin
  }
}