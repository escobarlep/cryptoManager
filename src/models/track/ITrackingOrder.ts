export interface ITrackingOrder {
    id?: number
    symbols: String //SQLite dont support array :/
    chat_id: Number
    message_id: Number
    user: String
    createdAt?: Date
}
