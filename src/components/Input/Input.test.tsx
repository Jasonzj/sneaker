import { render, screen } from '@testing-library/react'
import Input from './'

const props = {
  type: 'text',
  name: 'username',
  register: jest.fn(),
  errors: {},
  rules: {},
  placeholder: 'username',
}

test('should render correctly placeholder and type', () => {
  const { asFragment } = render(<Input {...props} />)
  const input = screen.getByRole('textbox')

  expect(input).toHaveProperty('placeholder', 'username')
  expect(input).toHaveProperty('type', 'text')
  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly className', () => {
  const { rerender, asFragment } = render(<Input {...props} />)
  const input = screen.getByRole('textbox')

  expect(input).not.toHaveClass('error')

  rerender(<Input {...props} errors={{ username: { type: 'username', message: 'error' } }} />)

  expect(input).toHaveClass('error')
  expect(asFragment()).toMatchSnapshot()
})
