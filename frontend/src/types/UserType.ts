import { Order } from "./OrderType"

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  address?: string
  orders?: Order[]
  isAdmin: boolean
  isBanned: boolean
}

export type resetPasswordType = {
  token: string
  password: string
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  isBanned: boolean
  isLoggedIn: boolean
  userData: User | null
}