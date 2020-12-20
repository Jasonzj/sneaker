import { render, screen } from '@testing-library/react'
import DataBoundary from './'

const props = {
  error: false,
  info: <div>Search Fail!</div>,
  loading: {
    spinning: true,
  },
}

test('should render correctly loading status', () => {
  const { rerender, asFragment } = render(<DataBoundary {...props} />)

  expect(screen.getByTitle('loader')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  rerender(<DataBoundary {...props} loading={undefined} />)

  expect(screen.queryByTitle('loader')).not.toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('should render correctly error info and children', () => {
  const { rerender, asFragment } = render(
    <DataBoundary {...props}>
      <div>test</div>
    </DataBoundary>,
  )

  expect(screen.getByText('test')).toBeInTheDocument()
  expect(screen.queryByText('Search Fail!')).not.toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  rerender(
    <DataBoundary {...props} error={true}>
      <div>test</div>
    </DataBoundary>,
  )

  expect(screen.getByText('Search Fail!')).toBeInTheDocument()
  expect(screen.queryByText('test')).not.toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})
