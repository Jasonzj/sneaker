import { useState, useCallback } from 'react'
import { searchJumpScroll } from '../../utils/common'

// api hooks
import useRequire from '../../hooks/useRequire'
import useRefCallback from '../../hooks/useRefCallback'
import {
  FollowingDetailListsLoader,
  FollowingListsLoader,
  ProductListsLoader,
  ProductPriceLoader,
  TrendingListsLoader,
  unFollowLoader,
  FollowLoader,
} from '../../apis'

// type
import { ApiLoaderType, ProductDetailReqType, ShoeDetailsType, ShoeDetailType } from '../../types/global'
import { useFollowingReturnType, useShoeListsParamsType, useShoeListsReturnType } from './type'

let curIndex = 0
let curStyleId = ''

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
    disabledByFunc: ({ styleId }) => styleId !== curStyleId,
  })

  const onOpenHandle = useRefCallback(async (i: number) => {
    setIsShow(true)
    const curShoe = shoeLists[i]
    curStyleId = curShoe.styleID
    curIndex = i

    if (curShoe.sizePrices && curShoe.images?.length) return setDetailLoading(false)

    const result = await getPrice({ styleId: curShoe.styleID })

    shoeLists[i] = {
      ...curShoe,
      ...result,
    }

    setShoeLists([...shoeLists])
  })

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

  const onFollowHandle = useRefCallback((styleId: string, followIndex: number, isFollow: boolean) => {
    if (isFollow) {
      unFollowLoader({ styleId })
      followingLists.splice(followIndex, 1)
    } else {
      FollowLoader({ styleId })
      followingLists.push(styleId)
    }

    setFollowingLists([...followingLists])
  })

  return [followingLists, onFollowHandle]
}
