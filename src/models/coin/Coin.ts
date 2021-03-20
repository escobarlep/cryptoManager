import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbol: String
  @Column()
  ask: Number
  @Column()
  baseVolume24h: Number
  @Column()
  bid: Number
  @Column()
  high24h: Number
  @Column()
  lastPrice: Number
  @Column()
  low24h: Number
  @Column()
  open24h: Number
  @Column()
  quoteVolume24h: Number
  @Column()
  createdAt: Date

}