import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import ProductCard from './ProductCard'
import { props, props2 } from './test.mock'

test('should display shoeName', () => {
  render(<ProductCard {...props} />)

  expect(screen.getByText(/Air Jordan/)).toHaveTextContent('【情侣款】Air Jordan 1 Low Black Toe (GS) 黑脚趾')
})

test('should display minPrice', () => {
  render(<ProductCard {...props} />)

  expect(screen.getByText('$242')).toBeInTheDocument()
})

test('should display brand of minPrice', () => {
  render(<ProductCard {...props} />)

  expect(screen.getByText('dewu')).toBeInTheDocument()
})

test('should correct handle src of image', () => {
  const { rerender } = render(<ProductCard {...props} />)
  const img = screen.getByAltText(/Air Jordan/i)

  expect((img as HTMLImageElement).src).toBe('https://cdn.poizon.com/temp/FlMFxr0ydbti1Wn2Y6BHdyysKGVq')

  rerender(<ProductCard {...props2} />)

  expect((img as HTMLImageElement).src).toBe(
    'https://stockx.imgix.net/Air-Jordan-1-Low-Black-Toe-GS-Product.jpg',
  )
})

test('should call onClick callback', () => {
  render(<ProductCard {...props} />)

  user.click(screen.getByText(/Air Jordan/))

  expect(props.onOpenHandle).toHaveBeenCalled()
})
