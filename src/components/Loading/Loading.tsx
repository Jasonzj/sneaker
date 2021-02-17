import React from 'react'
import classNames from 'classnames'
import style from './loading.module.css'
import { Props } from './type'

const Loading: React.FC<Props> = ({ spinning, isShowText = false, backGroundColor }) => {
  return (
    <div
      className={classNames(style.loader, {
        [style.hidden]: !spinning,
        [style.fullScreen]: false,
      })}
      style={{ backgroundColor: backGroundColor }}
      title='loader'
    >
      <div className={style.wrapper}>
        <div className={style.inner} />
        {isShowText && <div className={style.text}>LOADING</div>}
      </div>
    </div>
  )
}

export default React.memo(Loading)
