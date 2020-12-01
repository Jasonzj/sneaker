export type MessageType = 'success' | 'error'

export type NoticeType = {
  type: MessageType
  key: string
  text: string
}

export type MessageApiType = {
  success: (text: string) => void
  error: (text: string) => void
}
