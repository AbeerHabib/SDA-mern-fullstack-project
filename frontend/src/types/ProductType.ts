import { Category } from "./CategoryType";

export type Product = {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  quantity: number;
  sold: number;
  shipping: number;
  category: Category;
  image: File | undefined | string
  createdAt: Date
}
  
export type ProductState = {
  products: Product[]
  pagination: {
    currentPage: number,
    totalPages: number,
    totalProducts: number
  },
  error: null | string
  isLoading: boolean
  searchTerm: string
}