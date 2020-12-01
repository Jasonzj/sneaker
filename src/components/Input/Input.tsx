import React from 'react'
import classNames from 'classnames'
import ErrorMessage from '../../components/ErrorMessage'
import style from './input.module.css'
import { Props } from './type'

const Input: React.FC<Props> = ({ type, name, register, rules, errors, placeholder }) => (
  <div className={style.inputBox}>
    <input
      type={type}
      name={name}
      ref={register(rules)}
      placeholder={placeholder}
      className={classNames(style.input, {
        [style.error]: errors[name],
      })}
    />
    <ErrorMessage
      error={errors}
      name={name}
      render={(message) => <p className={style.errorMsg}>{message}</p>}
    />
  </div>
)

export default Input
