import React from 'react'
import style from './button.module.css'
import { Props } from './type'

const Button: React.FC<Props> = ({ text, type, loading }) => {
  return (
    <button type={type} className={style.button} disabled={loading}>
      <div className={style.content}>{loading ? 'Loading...' : text}</div>
    </button>
  )
}

export default React.memo(Button)
