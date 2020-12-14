import { ReactElement } from 'react'
import { UseFormMethods } from 'react-hook-form'

export type Props = {
  errors: UseFormMethods['errors']
  name: string
  render: (message: string) => ReactElement
}
