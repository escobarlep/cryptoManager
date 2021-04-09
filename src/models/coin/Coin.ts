import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbol: String
  @Column({ nullable: true })
  ask: Number
  @Column({ nullable: true })
  baseVolume24h: Number
  @Column({ nullable: true })
  bid: Number
  @Column({ nullable: true })
  high24h: Number
  @Column({ nullable: true })
  lastPrice: Number
  @Column({ nullable: true })
  low24h: Number
  @Column({ nullable: true })
  open24h: Number
  @Column({ nullable: true })
  quoteVolume24h: Number
  @Column()
  createdAt: Date
}