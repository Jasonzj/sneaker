import { renderHook, act } from '@testing-library/react-hooks'
import useRequire from '../useRequire'
import { TrendingListsLoader } from '../../utils/api'
import { ApiLoaderType } from '../../utils/global'
import { product_default } from '../../tests/test.mock'

beforeEach(() => {
  jest.useFakeTimers()
})

const apiProductListsLoaderDewu: ApiLoaderType = (params, cancelToken) =>
  TrendingListsLoader({ siteName: 'dewu' }, cancelToken)
const apiProductListsLoaderGoat: ApiLoaderType = (params, cancelToken) =>
  TrendingListsLoader({ siteName: 'goat' }, cancelToken)

test('useRequire should be auto run', async () => {
  const callback = jest.fn()
  const { result, waitForNextUpdate, unmount } = renderHook(() =>
    useRequire({
      apiLoader: apiProductListsLoaderDewu,
      defaultData: [],
      cleanEffect: true,
      callback,
    }),
  )

  expect(result.current.loading).toBe(true)
  expect(result.current.error).toBe(false)

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(result.current.loading).toBe(false)
  expect(result.current.error).toBe(false)
  expect(result.current.response).toEqual(product_default.data)
  expect(callback).toHaveBeenCalled()

  unmount()
})

test('useRequire should be manually triggered', async () => {
  const { result, waitForNextUpdate, unmount } = renderHook(() =>
    useRequire({
      apiLoader: apiProductListsLoaderDewu,
      defaultData: [],
      manual: true,
    }),
  )

  expect(result.current.loading).toBe(true)
  expect(result.current.error).toBe(false)

  result.current.run(0)

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(result.current.loading).toBe(false)
  expect(result.current.error).toBe(false)
  expect(result.current.response).toEqual(product_default.data)

  unmount()
})

test('useRequire debounce should work', async () => {
  const callback = jest.fn()
  const { waitForNextUpdate, unmount, rerender } = renderHook((o: Record<string, any> = {}) =>
    useRequire({
      apiLoader: apiProductListsLoaderDewu,
      defaultData: [],
      debounce: true,
      callback,
      ...o,
    }),
  )

  jest.advanceTimersByTime(100)
  rerender({ apiLoader: apiProductListsLoaderGoat })
  jest.advanceTimersByTime(100)
  rerender({ apiLoader: apiProductListsLoaderDewu })
  jest.advanceTimersByTime(100)
  rerender({ apiLoader: apiProductListsLoaderGoat })

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(callback).toHaveBeenCalledTimes(1)

  rerender({ apiLoader: apiProductListsLoaderDewu, debounce: false })

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(callback).toHaveBeenCalledTimes(2)

  unmount()
})

test('useRequire cleanEffect should work', async () => {
  const { result, waitForNextUpdate, unmount, rerender } = renderHook((o: Record<string, any> = {}) =>
    useRequire({
      apiLoader: apiProductListsLoaderDewu,
      defaultData: [],
      cleanEffect: true,
      ...o,
    }),
  )

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(result.current.response).toEqual(product_default.data)

  rerender({ apiLoader: apiProductListsLoaderGoat })

  expect(result.current.response).toEqual([])

  jest.runAllTimers()
  await waitForNextUpdate()

  expect(result.current.response).toEqual(product_default.data)

  unmount()
})
