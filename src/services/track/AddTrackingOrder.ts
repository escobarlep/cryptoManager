import { ITrackingOrder, TrackingOrder } from '@models/track'
import { getRepository } from 'typeorm'

export default class AddTrackingOrder {
  _repo: any
  constructor() {
    this._repo = getRepository(TrackingOrder)
  }
  async call(data: ITrackingOrder) {
    const order = new TrackingOrder()
    order.symbols = data.symbols
    order.chat_id = data.chat_id
    order.message_id = data.message_id
    order.user = data.user
    order.createdAt = new Date()
    order.updatedAt = new Date()
    await this._repo.save(order)

    return order
  }
}