import React from 'react'
import { MessageType } from './type'
import style from './message.module.css'

import { ReactComponent as Success } from '../../images/success.svg'
import { ReactComponent as Error } from '../../images/error.svg'

const iconMap = {
  success: <Success />,
  error: <Error />,
}

export interface MessageProps {
  text: string
  type: MessageType
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  return (
    <div className={style.message} data-testid='test-message'>
      <div className={style.content}>
        <div className={style.icon}>{iconMap[type]}</div>
        <div className={style.text}>{text}</div>
      </div>
    </div>
  )
}

export default Message
