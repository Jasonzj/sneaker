import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import message from './'

beforeEach(() => {
  jest.useFakeTimers()
})

test('should render correctly message text and type', async () => {
  render(
    <>
      <button
        onClick={() => {
          message.success('success_test')
        }}
      >
        success_click
      </button>
      <button
        onClick={() => {
          message.error('error_test')
        }}
      >
        error_click
      </button>
    </>,
  )

  expect(screen.queryByTestId('test-message')).not.toBeInTheDocument()

  user.click(screen.getByText('success_click'))
  user.click(screen.getByText('error_click'))

  expect(await screen.findByText('success_test')).toBeInTheDocument()
  expect(screen.getByText('success.svg'))

  expect(await screen.findByText('error_test')).toBeInTheDocument()
  expect(screen.getByText('error.svg'))

  act(() => {
    jest.runAllTimers()
  })

  expect(screen.queryByTestId('test-message')).not.toBeInTheDocument()
})

test('should render correctly the number of message', async () => {
  const btnArr = [1, 2, 3, 4]
  render(
    <>
      {btnArr.map((item) => (
        <button
          key={item}
          onClick={() => {
            message.success(`${item}`)
          }}
        >
          {`${item}_click`}
        </button>
      ))}
    </>,
  )

  user.click(screen.getByText(`1_click`))
  user.click(screen.getByText(`2_click`))
  expect(screen.getAllByTestId('test-message')).toHaveLength(2)

  user.click(screen.getByText(`3_click`))
  user.click(screen.getByText(`3_click`))
  expect(screen.getAllByTestId('test-message')).toHaveLength(3)

  act(() => {
    jest.runAllTimers()
  })
})

test('should not exceed MaxCount:5', () => {
  const btnArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  render(
    <>
      {btnArr.map((item) => (
        <button
          key={item}
          onClick={() => {
            message.success(`${item}`)
          }}
        >
          {`${item}_click`}
        </button>
      ))}
    </>,
  )

  btnArr.forEach((item) => {
    user.click(screen.getByText(`${item}_click`))
  })

  act(() => {
    jest.advanceTimersByTime(200)
  })

  expect(screen.getAllByTestId('test-message')).toHaveLength(5)

  act(() => {
    jest.runAllTimers()
  })
})
