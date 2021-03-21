export interface ITrackingOrder {
    id?: number
    symbols: string //SQLite dont support array :/
    chat_id: number
    message_id: number
    user: string
    createdAt?: Date
}
