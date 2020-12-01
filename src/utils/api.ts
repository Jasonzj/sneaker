import { Method } from 'axios'
import request from './request'
import { ApiLoaderType } from './global'

enum methods {
  get = 'get',
  post = 'post',
  put = 'put',
  del = 'delete',
}

const setApiLoader = (api: string, method: Method): ApiLoaderType => {
  return async (params, cancelToken) => {
    const getParams = params && method === methods.get ? `/${Object.values(params).join('/')}` : ''
    return await request({
      method,
      url: `${api}${getParams}`,
      data: getParams ? null : params,
      cancelToken,
    })
  }
}

const getProductPrice = `/prices`
const getProductLists = `/search`
const getTrendingLists = `/trending`
const getFollowingLists = `/user/following`
const getFollowingDetailLists = `/user/following?isDetail=true`
const getSearchSuggestions = `/suggestions`
const login = `/login`
const register = `/register`

export const ProductListsLoader = setApiLoader(getProductLists, methods.get)
export const ProductPriceLoader = setApiLoader(getProductPrice, methods.get)
export const TrendingListsLoader = setApiLoader(getTrendingLists, methods.get)
export const FollowLoader = setApiLoader(getFollowingLists, methods.put)
export const unFollowLoader = setApiLoader(getFollowingLists, methods.del)
export const FollowingListsLoader = setApiLoader(getFollowingLists, methods.get)
export const FollowingDetailListsLoader = setApiLoader(getFollowingDetailLists, methods.get)
export const SearchSuggestionsLoader = setApiLoader(getSearchSuggestions, methods.get)
export const LoginLoader = setApiLoader(login, methods.post)
export const RegisterLoader = setApiLoader(register, methods.post)
