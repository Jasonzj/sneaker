import React from 'react'
import { Props } from './type'

const ErrorMessage: React.FC<Props> = ({ errors, name, render }) => {
  return <>{errors[name] && render(errors[name].message)}</>
}

export default ErrorMessage
