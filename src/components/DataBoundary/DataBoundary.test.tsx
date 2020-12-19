import { render, screen } from '@testing-library/react'
import DataBoundary from './DataBoundary'

const props = {
  error: false,
  info: <div>Search Fail!</div>,
  loading: {
    spinning: true,
  },
}

test('should take a snapshot', () => {
  const { asFragment } = render(
    <DataBoundary {...props}>
      <div>test</div>
    </DataBoundary>,
  )

  expect(asFragment()).toMatchSnapshot()
})

test('should correct display loading status', () => {
  const { rerender } = render(<DataBoundary {...props} />)

  expect(screen.getByTitle('loader')).toBeInTheDocument()

  rerender(<DataBoundary {...props} loading={undefined} />)

  expect(screen.queryByTitle('loader')).not.toBeInTheDocument()
})

test('should correct handle error', () => {
  const { rerender } = render(
    <DataBoundary {...props}>
      <div>test</div>
    </DataBoundary>,
  )

  expect(screen.getByText('test')).toBeInTheDocument()
  expect(screen.queryByText('Search Fail!')).not.toBeInTheDocument()

  rerender(
    <DataBoundary {...props} error={true}>
      <div>test</div>
    </DataBoundary>,
  )

  expect(screen.getByText('Search Fail!')).toBeInTheDocument()
  expect(screen.queryByText('test')).not.toBeInTheDocument()
})
