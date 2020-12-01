import React from 'react'
import { Link } from 'react-router-dom'

// components
import User from '../User'

// css
import style from './header.module.css'
import logo from '../../images/logo.png'

// config
import config from '../../utils/config'
const { title } = config

const Header: React.FC = () => (
  <header className={style.header}>
    <div className={style.logoBox}>
      <h1>{title}</h1>
      <img src={logo} className={style.logo} alt='logo' />
    </div>
    <nav className={style.nav}>
      <Link to='/trending/dewu'>Dewu Trending</Link>
      <Link to='/trending/goat'>Goat Trending</Link>
      <User />
    </nav>
  </header>
)

export default Header
