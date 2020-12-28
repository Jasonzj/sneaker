import user from '@testing-library/user-event'
import { render, screen, waitForElementToBeRemoved } from '../../tests/routerRender'
import Container from '../Container/'
import { createHashHistory } from 'history'
import { usernameRules, passwordRules } from '../../utils/rules'
import { login_default, login_error } from '../../tests/test.mock'
import { rest, server } from '../../tests/testSever'

beforeEach(() => {
  jest.useFakeTimers()
})

const history = createHashHistory()
history.push('/sign_in')

test('should render correctly rules of the error', async () => {
  const { asFragment } = render(<Container />)
  const Username_Input = screen.getByPlaceholderText('username')
  const Password_Input = screen.getByPlaceholderText('password')

  user.type(Username_Input, 'a')
  user.type(Password_Input, 'a')

  expect(await screen.findAllByText(usernameRules.minLength.message)).toHaveLength(2)
  expect(Username_Input).toHaveClass('error')
  expect(Password_Input).toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()

  user.type(Username_Input, 'dmin')
  user.type(Password_Input, 'dmin')

  expect(await screen.findByText(passwordRules.pattern.message)).toBeInTheDocument()
  expect(screen.queryByText(usernameRules.minLength.message)).not.toBeInTheDocument()
  expect(Username_Input).not.toHaveClass('error')
  expect(Password_Input).toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()

  user.type(Username_Input, '0123456789012345')
  user.type(Password_Input, '0123456789012345')

  expect(await screen.findAllByText(usernameRules.maxLength.message)).toHaveLength(2)
  expect(Username_Input).toHaveClass('error')
  expect(Password_Input).toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()

  user.clear(Username_Input)
  user.clear(Password_Input)

  expect(await screen.findAllByText(usernameRules.required)).toHaveLength(2)
  expect(Username_Input).toHaveClass('error')
  expect(Password_Input).toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()

  user.type(Username_Input, 'admin')
  user.type(Password_Input, 'admin1')

  await waitForElementToBeRemoved(() => screen.getAllByText(usernameRules.required))
  expect(screen.queryByText(usernameRules.minLength.message)).not.toBeInTheDocument()
  expect(screen.queryByText(usernameRules.maxLength.message)).not.toBeInTheDocument()
  expect(screen.queryByText(passwordRules.pattern.message)).not.toBeInTheDocument()
  expect(Username_Input).not.toHaveClass('error')
  expect(Password_Input).not.toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly class with page changed', async () => {
  const { asFragment } = render(<Container />)

  user.click(screen.getByText('Sign Up'))

  expect(await screen.findByText('Sign Up')).toHaveClass('active')
  expect(asFragment()).toMatchSnapshot()
})

test('should handle correctly login', async () => {
  history.push('/sign_in')
  const { asFragment, rerender } = render(<Container />)

  user.type(screen.getByPlaceholderText('username'), 'admin')
  user.type(screen.getByPlaceholderText('password'), 'admin1')
  user.click(screen.getByRole('button', { name: 'Login In' }))

  expect(await screen.findByTestId('product_card')).toBeInTheDocument()
  expect(window.localStorage.getItem('token')).toBe(login_default.data.token)
  expect(window.localStorage.getItem('name')).toBe(login_default.data.username)
  expect(asFragment()).toMatchSnapshot()

  server.use(
    rest.get('/api/v1/trending/dewu', (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(login_error))
    }),
  )

  history.push('/sign_in')
  rerender(<Container />)

  user.type(await screen.findByPlaceholderText('username'), 'admin')
  user.type(screen.getByPlaceholderText('password'), 'admin1')
  user.click(screen.getByRole('button', { name: 'Login In' }))

  expect(await screen.findByText(login_error.msg)).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
