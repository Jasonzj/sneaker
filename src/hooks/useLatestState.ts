import { useRef, useEffect, MutableRefObject } from 'react'

const useLatestState = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  })

  return ref
}

export default useLatestState
