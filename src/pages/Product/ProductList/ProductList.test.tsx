import { render, screen } from '@testing-library/react'
import ProductList from './ProductList'
import { props, props2 } from './test.mock'

test('should render shoeLists', () => {
  render(<ProductList {...props} />)
  expect(screen.getByTestId('product_card')).toBeInTheDocument()
})

test('should error display errorMsg', () => {
  render(<ProductList {...props2} />)
  expect(screen.getByText('Search Fail!')).toBeInTheDocument()
})
