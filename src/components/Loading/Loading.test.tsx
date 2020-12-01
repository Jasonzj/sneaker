import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

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
  const { rerender } = render(<Loading {...props_true} />)
  const loader = screen.getByTitle('loader')

  return {
    loader,
    rerender,
  }
}

test('should take a snapshot', async () => {
  const { asFragment } = render(<Loading {...props_true} />)

  expect(asFragment()).toMatchSnapshot()
})

test('should correct display loading text acording to props isShowText', () => {
  const { rerender } = setup()

  expect(screen.getByText('LOADING')).toBeInTheDocument()

  rerender(<Loading {...props_false} />)

  expect(screen.queryByText('LOADING')).not.toBeInTheDocument()
})

test('should display specified backGroundColor', () => {
  const { rerender, loader } = setup()

  expect(loader).toHaveStyle('background-color: #ffffff')

  rerender(<Loading {...props_false} />)

  expect(loader).toHaveStyle('background-color: ')
})

test('should correct display or hidden acording to props spinning', () => {
  const { rerender, loader } = setup()

  expect(loader).not.toHaveClass('hidden')

  rerender(<Loading {...props_false} />)

  expect(loader).toHaveClass('hidden')
})
