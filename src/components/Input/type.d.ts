import React from 'react'
import { DeepMap, FieldError } from 'react-hook-form'

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined

export type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  type: string
  name: string
  placeholder: string
  rules: Record<string, any>
  register: (rules: Record<string, any>) => RefReturn
  errors: DeepMap<Record<string, unknown>, FieldError>
}
