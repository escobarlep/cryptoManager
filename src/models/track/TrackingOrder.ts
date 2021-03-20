import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TrackingOrder {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbols: String
  @Column({ unique: true })
  chat_id: Number
  @Column({ nullable: true })
  message_id: Number
  @Column()
  user: String
  @Column()
  createdAt: Date
  @Column()
  updatedAt: Date
}