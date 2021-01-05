import { render, screen } from '@testing-library/react'
import Loading from './'

const props_true = {
  spinning: true,
  isShowText: true,
  backGroundColor: '#ffffff',
}

const props_false = {
  spinning: false,
  isShowText: false,
}

const setup = () => {
  const { rerender, asFragment } = render(<Loading {...props_true} />)
  const loader = screen.getByTitle('loader')

  return {
    loader,
    rerender,
    asFragment,
  }
}

test('should display correctly loading text acording to props isShowText', () => {
  const { rerender, asFragment } = setup()

  expect(screen.getByText('LOADING')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  rerender(<Loading {...props_false} />)

  expect(screen.queryByText('LOADING')).not.toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('should display specified backGroundColor', () => {
  const { rerender, loader } = setup()

  expect(loader).toHaveStyle('background-color: #ffffff')

  rerender(<Loading {...props_false} />)

  expect(loader).toHaveStyle('background-color: ')
})

test('should display correctly or hidden acording to props spinning', () => {
  const { rerender, loader } = setup()

  expect(loader).not.toHaveClass('hidden')

  rerender(<Loading {...props_false} />)

  expect(loader).toHaveClass('hidden')
})
