export default class NovadaxDao {
  constructor(coinSymbol: string, coinCurrency: string) {
    // TODO: validate Symbol

    this._baseUrl += `${coinSymbol}_${coinCurrency}`
  }

  getBaseUrl(): string {
    return `${process.env.URL_PROVIDER}`
  }

  private parseCoinDetail(coin: any): string {
    const newDate = new Date()
    const hours = newDate.toTimeString().split(' ')[0]
    const date = (new Intl.DateTimeFormat('pt-br')).format(newDate)
    let responseString = `
\nData: ${date} ${hours}
\nMoeda: ${coin.symbol}
(24h) Máxima: ${coin.high24h}
(24h) Mínima: ${coin.low24h}
Preço Atual: ${coin.lastPrice}
Variação: ${ ((Number(coin.lastPrice) * 100 / Number(coin.low24h)) - 100).toFixed(2) }%
`
    return responseString
  }
}