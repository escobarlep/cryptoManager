import { ListTrackingOrders } from '@services/track'

export default async (bot: any) => {
  const list = new ListTrackingOrders()
  console.log(await list.call())
}
