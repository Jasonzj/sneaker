import { render, screen } from '@testing-library/react'
import PriceTable from './PriceTable'
import { props, props2, props3, usSizesArr, dewuSizesArr } from './test.mock'
import { Props } from './type'

const setup = (props: Props) => {
  const { rerender } = render(<PriceTable {...props} />)

  return {
    rerender,
  }
}

test('should display all price td', () => {
  setup(props)
  const tdLength = (usSizesArr.length + 1) * 2 + (dewuSizesArr.length + 1)

  expect(screen.getAllByRole('cell')).toHaveLength(tdLength)
})

test('should correct display brandName', () => {
  setup(props)
  const brandNames = screen.getAllByTitle('brand_name')

  expect(brandNames[0]).toHaveTextContent('stockx')
  expect(brandNames[1]).toHaveTextContent('goat')
})

test('should handle display price table error', () => {
  const { rerender } = setup(props2)

  expect(screen.getByText(/No Dewu Price/i)).toBeInTheDocument()

  rerender(<PriceTable {...props3} />)

  expect(screen.getByText(/No Goat and Stockx Price/i)).toBeInTheDocument()
  expect(screen.getByText(/No Dewu Price/i)).toBeInTheDocument()
})

test('should display goat price', () => {
  setup(props2)
  const brandNames = screen.getAllByTitle('brand_name')

  expect(brandNames[0]).toHaveTextContent('goat')
})
