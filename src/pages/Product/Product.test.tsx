import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '../../tests/routerRender'
import Container from '../Container/Container'
import { rest, server } from '../../tests/testSever'
import { product_error } from '../../tests/test.mock'
import config from '../../utils/config'
const { interfaceName } = config

const setup = () => {
  const { unmount, asFragment } = render(<Container />)

  const Search_Title = screen.getByTitle('search_title')
  const Search_Input = screen.getByTitle('search_input')
  const Search_Button = screen.getByTitle('search_button')
  const Search_Select = screen.getByTitle('search_interface_select')

  return { unmount, asFragment, Search_Title, Search_Input, Search_Button, Search_Select }
}

test('should display Trending(dewu) in first', async () => {
  const { asFragment, Search_Title } = setup()

  await screen.findByTestId('product_card')

  expect(Search_Title).toHaveTextContent('Trending(dewu)')
  expect(asFragment()).toMatchSnapshot()
})

test('keyword empty not allow search', async () => {
  const { Search_Title, Search_Button } = setup()

  await screen.findByTestId('product_card')
  user.click(Search_Button)

  expect(Search_Title).toHaveTextContent('Trending(dewu)')
})

test('title should display keyword after search', async () => {
  const { asFragment, Search_Title, Search_Input, Search_Button, Search_Select } = setup()

  user.type(Search_Input, 'Air')
  user.selectOptions(Search_Select, interfaceName.goat)
  user.click(Search_Button)

  await screen.findByTestId('product_card')

  expect(Search_Title).toHaveTextContent('Search goat for (Air)')
  expect(asFragment()).toMatchSnapshot()
})

test('select onChange should search again', async () => {
  const { asFragment, Search_Title, Search_Button, Search_Select } = setup()

  user.selectOptions(Search_Select, interfaceName.stockx)
  user.click(Search_Button)

  await screen.findByTestId('product_card')

  expect(Search_Title).toHaveTextContent('Search stockx for (Air)')
  expect(asFragment()).toMatchSnapshot()
})

test('keyword onChange should search again', async () => {
  const { asFragment, Search_Title, Search_Button, Search_Input } = setup()

  user.clear(Search_Input)
  user.type(Search_Input, 'Nike')
  user.click(Search_Button)

  await screen.findByTestId('product_card')

  expect(Search_Title).toHaveTextContent('Search stockx for (Nike)')
  expect(asFragment()).toMatchSnapshot()
})

test('trending button onClick should jump correct', async () => {
  const { asFragment, Search_Title } = setup()

  user.click(screen.getByText('Goat Trending'))

  await screen.findByTestId('product_card')

  expect(screen.getByTitle('search_title')).toHaveTextContent('Trending(goat)')
  expect(asFragment()).toMatchSnapshot()

  user.click(screen.getByText('Dewu Trending'))

  await screen.findByTestId('product_card')

  expect(Search_Title).toHaveTextContent('Trending(dewu)')
  expect(asFragment()).toMatchSnapshot()
})

test('should handle server error', async () => {
  server.use(
    rest.get('/api/v1/trending/dewu', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  const { asFragment } = setup()

  expect(await screen.findByText('Search Fail!')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  server.use(
    rest.get('/api/v1/trending/dewu', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(product_error))
    }),
  )

  user.click(screen.getByText('Goat Trending'))
  user.click(screen.getByText('Dewu Trending'))

  expect(await screen.findByText('Search Fail!')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()
})

test('should show correctly productDetail Model', async () => {
  setup()

  user.click(await screen.findByTestId('product_card'))

  expect(await screen.findByText('US Size')).toBeInTheDocument()
})

test('should show correctly following button', async () => {
  const { unmount, asFragment } = setup()

  user.click(await screen.findByTestId('product_card'))

  expect(await screen.findByText('unfollow')).toBeInTheDocument()
  expect(asFragment()).toMatchSnapshot()

  server.use(
    rest.get('/api/v1/user/following', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  unmount()
  const { asFragment: asFragment2 } = setup()

  user.click(await screen.findByTestId('product_card'))

  expect(await screen.findByText('follow')).toBeInTheDocument()
  expect(asFragment2()).toMatchSnapshot()

  // prevent tests leaking
  await screen.findByText('Show Size Chart')
})

// test('should handle server error in productDeatil', async () => {
//   server.use(
//     rest.get('/api/v1/prices/554724-058', (req, res, ctx) => {
//       return res(ctx.status(500))
//     }),
//   )

//   setup()

//   const Product_Card = await screen.findByTestId('product_card')

//   user.click(Product_Card)

//   expect(await screen.findByText('No BaseProperties')).toBeInTheDocument()

//   server.use(
//     rest.get('/api/v1/prices/554724-058', (req, res, ctx) => {
//       return res(ctx.json(prices_error))
//     }),
//   )

//   user.click(Product_Card)

//   expect(await screen.findByText('No BaseProperties')).toBeInTheDocument()
// })
