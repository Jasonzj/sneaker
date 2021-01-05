import { render, screen } from '../../../tests/routerRender'
import user from '@testing-library/user-event'
import User from './'

window.localStorage.setItem('name', 'John')
window.localStorage.setItem('token', 'token')

test('should correctly render username', () => {
  render(<User />)

  user.hover(screen.getByRole('img'))

  expect(screen.getByText('John')).toBeInTheDocument()
})

test('should correctly remove token when sign out', () => {
  render(<User />)

  expect(window.localStorage.getItem('token')).toBe('token')

  user.hover(screen.getByRole('img'))
  user.click(screen.getByText('Sign Out'))

  expect(window.localStorage.getItem('token')).toBeNull()
})
