import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TrackingOrder {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbols: string
  @Column({ unique: true })
  chat_id: number
  @Column({ nullable: true })
  message_id: number
  @Column()
  user: string
  @Column()
  createdAt: Date
  @Column()
  updatedAt: Date
}