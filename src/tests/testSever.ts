import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { following_default, prices_default, product_default, suggestions_error } from './test.mock'

const server = setupServer(
  rest.get('/api/v1/trending/dewu', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product_default))
  }),
  rest.get('/api/v1/trending/goat', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product_default))
  }),
  rest.get('/api/v1/search/goat/Air', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product_default))
  }),
  rest.get('/api/v1/search/stockx/Air', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product_default))
  }),
  rest.get('/api/v1/search/stockx/Nike', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(product_default))
  }),
  rest.get('/api/v1/prices/554724-058', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(prices_default))
  }),
  rest.get('/api/v1/user/following', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(following_default))
  }),
  rest.get('/api/v1/suggestions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(suggestions_error))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

export { rest, server }
