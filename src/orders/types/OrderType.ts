// export type OrderType = 'pickup' | 'delivery' | 'dinein';
export enum OrderType {
  pickup = 'PICKUP',
  delivery = 'DELIVERY',
  dinein = 'QR-ORDER',
}

export const orderTypeItems = {
    PICKUP: 'Pickup',
    DELIVERY: 'Delivery',
    DINEIN: 'QR-order'
}