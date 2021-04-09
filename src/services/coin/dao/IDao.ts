export interface IDao {
  getBaseUrl(): string,
  getFetchUrl(): string,
  parseCoinDetail(coin: any): string
}