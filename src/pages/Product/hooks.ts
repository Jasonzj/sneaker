import { useState, useCallback, useRef } from 'react'
import { searchJumpScroll } from '../../utils/common'

// api hooks
import useRequire from '../../hooks/useRequire'
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
import {
  AnyStringObjectType,
  ApiLoaderType,
  ProductDetailReqType,
  ShoeDetailsType,
  ShoeDetailType,
} from '../../utils/global'
import { useFollowingReturnType, useShoeListsParamsType, useShoeListsReturnType } from './type'

let curIndex = 0

export const useShoeLists = ({
  key,
  siteName,
  isTrendingPage,
  isFollowingPage,
}: useShoeListsParamsType): useShoeListsReturnType => {
  const currentShoeLists = useRef<ShoeDetailsType>([])
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
    AnyStringObjectType
  >({
    apiLoader: apiProductListsLoader,
    defaultData: [],
    cleanEffect: true,
    callback: searchJumpScroll,
  })

  const { loading: detailLoading, setLoading: setDetailLoading, run } = useRequire<
    ShoeDetailType,
    ProductDetailReqType
  >({
    apiLoader: ProductPriceLoader,
    defaultData: {} as ShoeDetailType,
    manual: true,
    disabled: isShow === false,
  })

  const onOpenHandle = useCallback(
    async (i: number) => {
      setIsShow(true)
      const curShoe = currentShoeLists.current[i]
      curIndex = i

      if (curShoe.sizePrices && curShoe.images?.length) return setDetailLoading(false)

      const result = await run({ styleId: curShoe.styleID })

      currentShoeLists.current[i] = {
        ...curShoe,
        ...result,
      }

      setShoeLists([...currentShoeLists.current])
    },
    // eslint-disable-next-line
    [],
  )

  const onCloseHandle = useCallback(() => {
    setIsShow(false)
  }, [])

  // 保存最新值，避免deps依赖
  currentShoeLists.current = shoeLists

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
    AnyStringObjectType
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
