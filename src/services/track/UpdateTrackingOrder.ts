import { ITrackingOrder, TrackingOrder } from '@models/track'
import { getRepository } from 'typeorm'

export default class UpdateTrackingOrder {
  _repo: any
  constructor() {
    this._repo = getRepository(TrackingOrder)
  }
  async call(data: ITrackingOrder) {
    const { chat_id, message_id } = data
    const order = await this._repo.find({where: { chat_id, message_id }})
    if (!order) throw new Error('error_tracking_not_found')

    order.symbols = data.symbols
    order.user = data.user
    order.updatedAt = new Date()
    await this._repo.save(order)

    return order
  }
}