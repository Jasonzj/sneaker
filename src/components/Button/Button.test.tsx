import { render, screen } from '@testing-library/react'
import Button from './Button'
import { Props } from './type'

const props: Props = {
  text: 'Login In',
  type: 'submit',
  loading: false,
}

test('should take a snapshot', () => {
  const { asFragment } = render(<Button {...props} />)

  expect(asFragment()).toMatchSnapshot()
})

test('should correct display text', () => {
  render(<Button {...props} />)

  expect(screen.getByText('Login In')).toBeInTheDocument()
})

test('should correct display type', () => {
  render(<Button {...props} />)

  expect(screen.getByRole('button')).toHaveProperty('type', 'submit')
})

test('should correct display loading status', () => {
  const { rerender } = render(<Button {...props} />)

  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()

  rerender(<Button {...props} loading={true} />)

  expect(screen.getByText(/Loading/i)).toBeInTheDocument()
})
