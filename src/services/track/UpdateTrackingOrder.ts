import { ITrackingOrder, TrackingOrder } from '@models/track'
import { getRepository } from 'typeorm'

export default class UpdateTrackingOrder {
  _repo: any
  constructor() {
    this._repo = getRepository(TrackingOrder)
  }
  async call(data: ITrackingOrder) {
    const { chat_id, symbols, message_id } = data
    const order = await this._repo.findOne({where: { chat_id }})
    if (!order) throw new Error('error_tracking_not_found')
    if(message_id) order.message_id = message_id
    if(symbols) order.symbols = symbols
    order.updatedAt = new Date()

    await this._repo.save(order)

    return order
  }
}