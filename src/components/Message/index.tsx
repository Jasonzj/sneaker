import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Message from './Message'
import { NoticeType, MessageApiType } from './type'
import style from './message.module.css'

let seed = 0
const now = Date.now()
const getUuid = (): string => {
  const id = seed
  seed += 1
  return `MESSAGE_${now}_${id}`
}

let add: (notice: NoticeType) => void

export const MessageContainer: React.FC = () => {
  const [notices, setNotices] = useState<NoticeType[]>([])
  const timeout = 3 * 1000
  const maxCount = 5

  const remove = (key: string) => {
    setNotices((prevNotices) => prevNotices.filter(({ key: itemKey }) => key !== itemKey))
  }

  add = (notice: NoticeType) => {
    // 筛选重复消息
    const isRepeat = notices.some((item) => item.text === notice.text)

    if (isRepeat) return

    setNotices((prevNotices) => [...prevNotices, notice])

    setTimeout(() => {
      remove(notice.key)
    }, timeout)
  }

  useEffect(() => {
    if (notices.length > maxCount) {
      const [firstNotice] = notices
      remove(firstNotice.key)
    }
  }, [notices])

  return (
    <div className={style.container}>
      <TransitionGroup>
        {notices.map(({ text, key, type }) => (
          <CSSTransition timeout={200} in key={key} classNames='message-ani'>
            <Message type={type} text={text} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

let el = document.querySelector('#message-wrapper')
if (!el) {
  el = document.createElement('div')
  el.className = 'message-wrapper'
  el.id = 'message-wrapper'
  document.body.append(el)
}

ReactDOM.render(<MessageContainer />, el)

const api: MessageApiType = {
  success: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'success',
    })
  },
  error: (text) => {
    add({
      text,
      key: getUuid(),
      type: 'error',
    })
  },
}

export default api
