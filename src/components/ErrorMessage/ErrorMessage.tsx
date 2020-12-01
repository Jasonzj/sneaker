import React from 'react'
import { Props } from './type'

const ErrorMessage: React.FC<Props> = ({ error, name, render }) => {
  return <>{error[name] && render(error[name].message)}</>
}

export default ErrorMessage
