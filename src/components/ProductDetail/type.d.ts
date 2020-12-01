import { ShoeDetailType } from '../../utils/global'

export type Props = {
  shoe: ShoeDetailType
  followingLists: string[]
  onCloseHandle: () => void
  onFollowHandle: (styleId: string, followIndex: number, isFollow: boolean) => void
  loading: boolean
}
