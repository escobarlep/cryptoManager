import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TrackingOrder {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbols: String
  @Column()
  chat_id: Number
  @Column()
  message_id: Number
  @Column()
  user: String
  @Column()
  createdAt: Date
  @Column()
  updatedAt: Date
}