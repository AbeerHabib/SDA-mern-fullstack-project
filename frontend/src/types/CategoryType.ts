export type Category = {
  _id: string
  name: string
  slug: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}