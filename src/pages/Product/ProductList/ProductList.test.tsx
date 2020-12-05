import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductList from './ProductList'
import { props, props2 } from './test.mock'

test('should render shoeLists', () => {
  render(<ProductList {...props} />)
  expect(screen.getAllByTestId('product_card')).toHaveLength(1)
})

test('should error display errorMsg', () => {
  render(<ProductList {...props2} />)
  expect(screen.getByText('Search Fail!')).toBeInTheDocument()
})
