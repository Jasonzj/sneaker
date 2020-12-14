import React from 'react'
import { RegisterOptions, UseFormMethods } from 'react-hook-form'

export type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  type: string
  name: string
  placeholder: string
  rules: RegisterOptions
  register: UseFormMethods['register']
  errors: UseFormMethods['errors']
}
