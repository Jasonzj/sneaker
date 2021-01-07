import { renderHook } from '@testing-library/react-hooks'
import useRequire, { ConfigType } from '../useRequire'
import { TrendingListsLoader } from '../../apis'
import { ApiLoaderType, ShoeDetailsType } from '../../types/global'
import { product_default } from '../../tests/test.mock'

beforeEach(() => {
  jest.useFakeTimers()
})

const apiProductListsLoaderDewu: ApiLoaderType = (params, cancelToken) =>
  TrendingListsLoader({ siteName: 'dewu' }, cancelToken)
const apiProductListsLoaderGoat: ApiLoaderType = (params, cancelToken) =>
  TrendingListsLoader({ siteName: 'goat' }, cancelToken)

const setup = (option: ConfigType<ShoeDetailsType>) =>
  renderHook((o: Record<string, any> = {}) =>
    useRequire({
      ...option,
      ...o,
    }),
  )

test('useRequire should be auto run', async () => {
  const callback = jest.fn()
  const { result, waitForNextUpdate, unmount } = setup({
    apiLoader: apiProductListsLoaderDewu,
    defaultData: [],
    cleanEffect: true,
    callback,
  })

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
  const { result, waitForNextUpdate, unmount } = setup({
    apiLoader: apiProductListsLoaderDewu,
    defaultData: [],
    manual: true,
  })

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
  const { waitForNextUpdate, unmount, rerender } = setup({
    apiLoader: apiProductListsLoaderDewu,
    defaultData: [],
    debounce: true,
    callback,
  })

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
  const { result, waitForNextUpdate, unmount, rerender } = setup({
    apiLoader: apiProductListsLoaderDewu,
    defaultData: [],
    cleanEffect: true,
  })

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

test('useRequire disabled should work', async () => {
  const callback = jest.fn()
  const { result, unmount, rerender } = setup({
    apiLoader: apiProductListsLoaderDewu,
    defaultData: [],
    disabled: false,
    manual: true,
    callback,
  })

  result.current.run(0)
  rerender({ apiLoader: apiProductListsLoaderDewu, disabled: true })
  jest.runAllTimers()

  expect(callback).toHaveBeenCalledTimes(0)

  unmount()
})
