import { render, screen } from '@testing-library/react'
import ErrorMessage from './'
import React from 'react'

test('should render correctly with no error', () => {
  const { asFragment } = render(
    <ErrorMessage errors={{}} name='test' render={(message: string) => <p>{message}</p>} />,
  )

  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly with flat error', () => {
  const { asFragment } = render(
    <ErrorMessage
      errors={{ flat: { type: 'flat', message: 'flat' } }}
      name='flat'
      render={(message: string) => <p>{message}</p>}
    />,
  )

  expect(screen.getByText('flat')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly with flat error and render className', () => {
  const { asFragment } = render(
    <ErrorMessage
      errors={{ flat: { type: 'flat', message: 'flat' } }}
      name='flat'
      render={(message: string) => <p className='flat'>{message}</p>}
    />,
  )

  expect(screen.getByText('flat')).toHaveClass('flat')
  expect(asFragment()).toMatchSnapshot()
})
