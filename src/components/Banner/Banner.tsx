import React from 'react'
import style from './banner.module.css'

// components
import SearchBar from '../SearchBar'

import dewuLogo from '../../images/dewu.png'
import goatLogo from '../../images/goat.png'
import stockxLogo from '../../images/stockx.png'

// config
import config from '../../utils/config'
const { bannerText } = config

const Banner: React.FC = () => (
  <div className={style.banner}>
    <div className={style.introduce}>{bannerText}</div>
    <SearchBar />
    <div className={style.iconBar}>
      <img className={style.logo} src={goatLogo} alt='goat' />
      <img className={style.logo} src={dewuLogo} alt='dewu' />
      <img className={style.logo} src={stockxLogo} alt='stockx' />
    </div>
  </div>
)

export default Banner
