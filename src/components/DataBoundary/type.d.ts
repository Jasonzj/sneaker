import { ReactElement } from 'react'
export type Props = {
  error: unknown
  info?: string | ReactElement
  loading?: {
    spinning: boolean
    isShowText?: boolean
    backGroundColor?: string
  }
}
