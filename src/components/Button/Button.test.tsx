import { render, screen } from '@testing-library/react'
import Button from './Button'
import { Props } from './type'

const props: Props = {
  text: 'Login In',
  type: 'submit',
  loading: false,
}

test('should render correctly text', () => {
  const { asFragment } = render(<Button {...props} />)

  expect(screen.getByText('Login In')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly type', () => {
  render(<Button {...props} />)

  expect(screen.getByRole('button')).toHaveProperty('type', 'submit')
})

test('should render correctly loading status', () => {
  const { rerender, asFragment } = render(<Button {...props} />)

  expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()

  rerender(<Button {...props} loading={true} />)

  expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
