// export type OrderType = 'pickup' | 'delivery' | 'dinein';
export enum OrderType {
  pickup = 'PICKUP',
  delivery = 'DELIVERY',
  dinein = 'DINEIN',
}

export const orderTypeItems = {
    PICKUP: 'Pickup',
    DELIVERY: 'Delivery',
    DINEIN: 'Dine-in'
}