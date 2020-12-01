import { AnyObjectType } from './global'

/**
 * 格式化时间戳
 *
 * @param {number} time 时间戳
 * @returns {string}
 */
export const formatTime = (time: number): string => {
  const date = new Date(time + 8 * 3600 * 1000)
  return date.toJSON().substr(0, 19).replace('T', ' ')
}

/**
 * 是否为空对象
 *
 * @param {(AnyObjectType | undefined)} o
 * @returns {boolean}
 */
export const isEmptyObject = (o: AnyObjectType | undefined): boolean => {
  if (o === undefined) return true
  return Object.keys(o).length === 0
}

export const searchJumpScroll = (): void => window.scrollTo({ top: 580, behavior: 'smooth' })
