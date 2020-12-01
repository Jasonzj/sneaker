import { AxiosResponse, CancelToken } from 'axios'

export type SizePricesType = {
  dewu: Record<string, number>
  stockx: Record<string, number>
  goat: Record<string, number>
}

export type ShoeDetailType = {
  showName: string
  brand?: string
  silhoutte?: string
  styleID: string
  make?: string
  colorway?: string
  retailPrice?: string
  releaseDate?: string
  description?: string
  urlKey: string
  image: string
  image2: string
  spuId: number
  slug: string
  lowestPrice: {
    stockx: number
    goat: number
    dewu: number
    [propnames: string]: number
  }
  resellLinks: {
    stockX: string
    goat: string
    dewu: string
  }
  images?: string[]
  baseProperties?: {
    key: string
    value: string
  }[]
  time: number
  sizePrices?: SizePricesType
  sizeImage?: string
}

export type ShoeDetailsType = ShoeDetailType[]

export type SearchSuggestionHitType = {
  combinationMd5: string
  word: string
  name: string
  brand: string
  thumbnail_url: string
  media: {
    imageUrl: string
  }
  grid_glow_picture_url: string
  url: string
  release_date: string
  categories: [][]
  product_category: string
  ticker_symbol: string
  style_id: string
  make: string
  model: string
  short_description: string
  gender: string
  colorway: string
  price: number
  description: string
  highest_bid: number
  total_dollars: number
  lowest_ask: number
  last_sale: number
  sales_last_72: number
  deadstock_sold: number
  quality_bid: number
  active: number
  new_release: null
  featured: null
  lock_selling: boolean
  selling_countries: [][]
  buying_countries: [][]
  traits: [][]
  objectID: string
}

export type SearchSuggestionHitsType = SearchSuggestionHitType[]

export type ProductDetailReqType = {
  styleId: string
}

export type Response<T> = {
  success: boolean
  msg: string
  data: T
  isDBSearch: boolean
}

export type ApiLoaderType = <T, P>(
  params?: P,
  cancelToken?: CancelToken,
) => Promise<AxiosResponse<Response<T>>>
