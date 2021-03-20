export interface ICoin {
  symbol: String
  ask: Number
  baseVolume24h: Number
  bid: Number
  high24h: Number
  lastPrice: Number
  low24h: Number
  open24h: Number
  quoteVolume24h: Number
  timestamp?: Date
  createdAt: Date
}