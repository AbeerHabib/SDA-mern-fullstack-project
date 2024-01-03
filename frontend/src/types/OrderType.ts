import { Product } from "./ProductType";
import { User } from "./UserType";

export type Order = {
  _id: string
  products: OrderProduct[]
  user?: User
  visitor?: string
  status:
  "Not processed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled" 
  //payment: IorderPayment
  createdAt: Date
  updatedAt?: Date
};

export type OrderProduct = {
  product: Product
  quantity: number
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}