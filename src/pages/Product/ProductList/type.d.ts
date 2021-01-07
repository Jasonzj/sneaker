import { ShoeDetailsType } from '../../../types/global'

export type Props = {
  error: boolean
  loading: boolean
  shoeLists: ShoeDetailsType
  onOpenHandle: (i: number) => Promise<void>
}
