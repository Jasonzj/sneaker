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
 * @param {(Record<string, unknown> | undefined)} o
 * @returns {boolean}
 */
export const isEmptyObject = (o: Record<string, unknown> | undefined | null): boolean => {
  if (!o) return true
  return Object.keys(o).length === 0
}

export const searchJumpScroll = (): void => window.scrollTo({ top: 580, behavior: 'smooth' })
