import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import ProductDetail from './ProductDetail'
import { props, props2 } from './test.mock'
import { formatTime } from '../../../utils/common'

test('number of slider img should correct ', () => {
  render(<ProductDetail {...props} />)

  expect(screen.getAllByAltText(props.shoe.showName)).toHaveLength(4 + 4 + 1)
})

test('slider should display image2', () => {
  render(<ProductDetail {...props2} />)
  const slider_img = screen.getByRole('img', { name: props2.shoe.showName })

  expect((slider_img as HTMLImageElement).src).toBe(props2.shoe.image2)
})

test('should display correct time', () => {
  render(<ProductDetail {...props} />)

  expect(screen.getByTitle('data_time')).toHaveTextContent(formatTime(props.shoe.time))
})

test('should correct handle bashProperties', () => {
  const { rerender } = render(<ProductDetail {...props} />)
  const basePropperties = screen.getByTitle('product_basePropperties').querySelectorAll('p')

  expect(basePropperties).toHaveLength(props.shoe.baseProperties.length)

  rerender(<ProductDetail {...props2} />)

  expect(screen.getByText('No BaseProperties')).toBeInTheDocument()
})

test('should correct handle sizePrices', () => {
  const { rerender } = render(<ProductDetail {...props} />)

  expect(screen.getByText('US Size')).toBeInTheDocument()

  rerender(<ProductDetail {...props2} />)

  expect(screen.getByText('No Price Table')).toBeInTheDocument()
})

test('should correct display sizeImage by click the button', () => {
  render(<ProductDetail {...props} />)
  const button = screen.getByRole('button', { name: 'Show Size Chart' })

  expect(button).toHaveTextContent('Show Size Chart')
  expect(screen.queryByAltText('sizeTable')).not.toBeInTheDocument()

  user.click(button)

  expect(button).toHaveTextContent('Hide Size Chart')
  expect(screen.getByAltText('sizeTable')).toBeInTheDocument()
})

test('should correct display button according to prop sizeImage', () => {
  const { rerender } = render(<ProductDetail {...props} />)
  const button_name = { name: 'Show Size Chart' }

  expect(screen.getByRole('button', button_name)).toBeInTheDocument()

  rerender(<ProductDetail {...props2} />)

  expect(screen.queryByRole('button', button_name)).not.toBeInTheDocument()
})
