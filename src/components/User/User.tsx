import React from 'react'
import Dropdown from 'rc-dropdown'
import { createHashHistory } from 'history'
import { Link } from 'react-router-dom'

// css
import style from './user.module.css'
import 'rc-dropdown/assets/index.css'

const User: React.FC = () => {
  const history = createHashHistory()
  const name = window.localStorage.getItem('name')

  const onSignOut = () => {
    window.localStorage.removeItem('token')
    history.push('/sign_in')
  }

  const menu = (
    <ul className={style.menu}>
      <li className={style.name}>{name}</li>
      <li>
        <Link to='/following'>Following</Link>
      </li>
      <li onClick={onSignOut}>Sign Out</li>
    </ul>
  )

  return (
    <div className={style.main}>
      <Dropdown overlay={menu} trigger={['hover']} animation='slide-up'>
        <div className={style.content}>
          <div className={style.avatar}>
            <img src='https://api.prodless.com/avatar.png' />
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default User
