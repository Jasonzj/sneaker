import { useState, useEffect, useRef } from 'react'
import { ApiLoaderType } from '../utils/global'
import message from '../components/Message'
import axios, { CancelToken as CancelTokenType } from 'axios'

type ConfigType<T> = {
  apiLoader: ApiLoaderType
  defaultData: T
  manual?: boolean
  debounce?: boolean
  disabled?: boolean
  cleanEffect?: boolean
  notification?: boolean
  loadingInitialState?: boolean
  callback?: () => void
}

type UseRequireType<T, P> = {
  response: T
  loading: boolean
  error: boolean
  isDBSearch: boolean | undefined
  setResponse: React.Dispatch<React.SetStateAction<T>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  run: (reqParams: P) => Promise<T | undefined>
}

/**
 * 请求管理hook
 *
 * @template T response数据类型
 * @template P request参数类型
 * @param {ConfigType<T>} {
 *   apiLoader, 请求加载函数，effect依赖项，引用变得会自动发起请求
 *   defaultData, 默认数据
 *   callback, 请求完后执行的callback
 *   manual = false, 是否手动控制请求，True通过run发起请求，False通过effect自动请求
 *   debounce = false, 是否开启effect请求防抖
 *   disabled = false, 是否禁用请求
 *   cleanEffect = false, 是否清理副作用请求的数据
 *   notification = true, 是否发送Message
 *   loadingInitialState = true, loading初始状态
 * }
 * @returns {UseRequireType<T, P>}
 */
const useRequire = <T, P>({
  apiLoader,
  defaultData,
  callback,
  manual = false,
  debounce = false,
  disabled = false,
  cleanEffect = false,
  notification = true,
  loadingInitialState = true,
}: ConfigType<T>): UseRequireType<T, P> => {
  const currentApiLoader = useRef<ApiLoaderType | null>(null)
  const currentDisabled = useRef<boolean>(disabled)
  const [loading, setLoading] = useState(loadingInitialState)
  const [response, setResponse] = useState(defaultData)
  const [error, setError] = useState(false)
  const [isDBSearch, setIsDBSearch] = useState<boolean | undefined>(false)

  // 禁用处理，保存最新值用于中途中断
  currentDisabled.current = disabled

  useEffect(
    () => {
      let timer: NodeJS.Timeout
      // 竞态处理，只适用副作用请求模式
      const source = axios.CancelToken.source()
      currentApiLoader.current = apiLoader

      // 禁用
      if (disabled) return

      // 手动
      if (manual) return

      // 防抖
      if (debounce) {
        timer = setTimeout(() => {
          getData(undefined, source.token)
        }, 500)
      } else {
        getData(undefined, source.token)
      }

      return () => {
        cleanEffect && setResponse(defaultData)
        debounce && clearTimeout(timer)

        // 竞态处理: 如果请求未完成则取消请求
        if (process.env.NODE_ENV === 'test') return
        source.cancel('Operation canceled by the user')
      }
    },
    // eslint-disable-next-line
    [apiLoader],
  )

  const run = async (reqParams: P) => {
    return await getData(reqParams)
  }

  const getData = async (reqParams?: P, cancelToken?: CancelTokenType) => {
    setLoading(true)
    setError(false)

    try {
      const result = await apiLoader<T, P>(reqParams, cancelToken)
      const resultData = result.data

      // if (currentApiLoader.current !== apiLoader) return //竞态处理
      if (currentDisabled.current) return //禁用处理

      notification && resultData.msg && message.success(resultData.msg)
      resultData.success ? setResponse(resultData.data) : setError(true)

      setIsDBSearch(resultData.isDBSearch)
      setLoading(false)

      callback && callback()

      return resultData.data
    } catch (e) {
      if (process.env.NODE_ENV === 'development') console.error(e)

      if (currentApiLoader.current !== apiLoader) return //竞态处理

      const response = e.response

      notification && response?.data?.msg && message.error(response.data.msg)

      setLoading(false)
      setError(true)
    }
  }

  return { response, loading, error, isDBSearch, setResponse, setLoading, setError, run }
}

export default useRequire
