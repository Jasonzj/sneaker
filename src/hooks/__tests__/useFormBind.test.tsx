import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import useFormBind from '../useFormBind'

const Example = () => {
  const [valueBind, value] = useFormBind('test')

  return (
    <>
      <input type='text' {...valueBind} />
      <span>{value}</span>
    </>
  )
}

test('useFormBind should correctly bind value', () => {
  render(<Example />)
  const input = screen.getByRole('textbox')

  expect(input).toHaveValue('test')
  expect(screen.getByText('test')).toBeInTheDocument()

  user.type(input, 'ing')

  expect(input).toHaveValue('testing')
  expect(screen.getByText('testing')).toBeInTheDocument()

  user.clear(input)

  expect(input).toHaveValue('')
  expect(screen.queryByText('testing')).not.toBeInTheDocument()
})
