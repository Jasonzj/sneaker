import { ReactElement } from 'react'
import { DeepMap, FieldError } from 'react-hook-form'

export type Props = {
  error: DeepMap<Record<string, any>, FieldError>
  name: string
  render: (message: string) => ReactElement
}
