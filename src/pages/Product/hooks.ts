import { useState, useCallback } from 'react'
import { searchJumpScroll } from '../../utils/common'

// api hooks
import useRequire from '../../hooks/useRequire'
import useLastestState from '../../hooks/useLastestState'
import {
  FollowingDetailListsLoader,
  FollowingListsLoader,
  ProductListsLoader,
  ProductPriceLoader,
  TrendingListsLoader,
  unFollowLoader,
  FollowLoader,
} from '../../utils/api'

// type
import { ApiLoaderType, ProductDetailReqType, ShoeDetailsType, ShoeDetailType } from '../../types/global'
import { useFollowingReturnType, useShoeListsParamsType, useShoeListsReturnType } from './type'

let curIndex = 0

export const useShoeLists = ({
  key,
  siteName,
  isTrendingPage,
  isFollowingPage,
}: useShoeListsParamsType): useShoeListsReturnType => {
  const [isShow, setIsShow] = useState(false)

  const apiProductListsLoader = useCallback<ApiLoaderType>(
    (params, cancelToken) =>
      isTrendingPage
        ? TrendingListsLoader({ siteName }, cancelToken)
        : isFollowingPage
        ? FollowingDetailListsLoader(params, cancelToken)
        : ProductListsLoader({ siteName, key }, cancelToken),
    [key, siteName, isTrendingPage, isFollowingPage],
  )
  const { response: shoeLists, setResponse: setShoeLists, error, loading, isDBSearch } = useRequire<
    ShoeDetailsType,
    Record<string, string>
  >({
    apiLoader: apiProductListsLoader,
    defaultData: [],
    cleanEffect: true,
    callback: searchJumpScroll,
  })

  const { loading: detailLoading, setLoading: setDetailLoading, run: getPrice } = useRequire<
    ShoeDetailType,
    ProductDetailReqType
  >({
    apiLoader: ProductPriceLoader,
    defaultData: {} as ShoeDetailType,
    manual: true,
    disabled: isShow === false,
  })

  const lastestShoeLists = useLastestState<ShoeDetailsType>(shoeLists)

  const onOpenHandle = useCallback(
    async (i: number) => {
      setIsShow(true)
      const curShoe = lastestShoeLists.current[i]
      curIndex = i

      if (curShoe.sizePrices && curShoe.images?.length) return setDetailLoading(false)

      const result = await getPrice({ styleId: curShoe.styleID })

      lastestShoeLists.current[i] = {
        ...curShoe,
        ...result,
      }

      setShoeLists([...lastestShoeLists.current])
    },
    // eslint-disable-next-line
    [],
  )

  const onCloseHandle = useCallback(() => {
    setIsShow(false)
  }, [])

  return {
    isShow,
    error,
    loading,
    curIndex,
    shoeLists,
    onOpenHandle,
    onCloseHandle,
    detailLoading,
    isDBSearch,
  }
}

export const useFollowing = (): useFollowingReturnType => {
  const { response: followingLists, setResponse: setFollowingLists } = useRequire<
    string[],
    Record<string, string>
  >({
    apiLoader: FollowingListsLoader,
    notification: false,
    defaultData: [],
  })

  const onFollowHandle = useCallback(
    (styleId: string, followIndex: number, isFollow: boolean) => {
      setFollowingLists((lists) => {
        if (isFollow) {
          unFollowLoader({ styleId })
          lists.splice(followIndex, 1)
          return [...lists]
        }

        FollowLoader({ styleId })
        lists.push(styleId)
        return [...lists]
      })
    },
    // eslint-disable-next-line
    [],
  )

  return [followingLists, onFollowHandle]
}
