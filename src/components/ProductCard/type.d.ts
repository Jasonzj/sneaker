import { ShoeDetailType } from '../../utils/global'

export type Props = {
  shoe: ShoeDetailType
  index: number
  onOpenHandle: (i: number) => Promise<void>
}

export type priceKey = 'stockx' | 'goat' | 'dewu'
