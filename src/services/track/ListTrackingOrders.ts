import { ITrackingOrder, TrackingOrder } from '@models/track'
import { getRepository } from 'typeorm'

interface IQuery {
  chat_id: string
  message_id: string
}

export default class ListTrackingOrders {
  _repo: any
  constructor() {
    this._repo = getRepository(TrackingOrder)
  }
  async call(query?: IQuery): Promise<ITrackingOrder[]> {
    if (query) {
      return this._repo.find({ where: query })
    } return this._repo.find()
  }
}