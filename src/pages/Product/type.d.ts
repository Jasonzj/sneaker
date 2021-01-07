import { match } from 'react-router-dom'
import { ShoeDetailsType } from '../../types/global'

export type Props = {
  /** match to use for the get KeyWord */
  match: match<{ key: string; siteName: string }>
}

type useShoeListsParamsType = {
  key: string
  siteName: string
  isTrendingPage: boolean
  isFollowingPage: boolean
}

type useShoeListsReturnType = {
  isShow: boolean
  error: boolean
  loading: boolean
  curIndex: number
  shoeLists: ShoeDetailsType
  onOpenHandle: (i: number) => Promise<void>
  onCloseHandle: () => void
  detailLoading: boolean
  isDBSearch: boolean | undefined
}

type useFollowingReturnType = [string[], (styleId: string, followIndex: number, isFollow: boolean) => void]
