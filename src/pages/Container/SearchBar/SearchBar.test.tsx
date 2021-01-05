import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import SearchBar from './SearchBar'
import { Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import config from '../../../utils/config'

const { interfaceName, defaultInterface } = config

const history = createHashHistory()

const history2 = createHashHistory()
history2.location.pathname = '/search/db/Nike'

const historys = [history, history2]

const setup = (index: number) => {
  render(
    <Router history={historys[index]}>
      <SearchBar />
    </Router>,
  )
  const input = screen.getByRole('textbox', { name: 'search_input' })
  const select = screen.getByRole('combobox', { name: 'search_interface_select' })

  return {
    input,
    select,
  }
}

test('should search-input value empty before input', () => {
  const { input } = setup(0)

  expect(input).toHaveValue('')
})

test('should search-input value allow to be changed ', () => {
  const { input } = setup(0)

  user.type(input, 'Nike')

  expect(input).toHaveValue('Nike')
})

test('should select default value', () => {
  const { select } = setup(0)

  expect(select).toHaveValue(defaultInterface)
})

test('should select value allow to be changed ', () => {
  const { select } = setup(0)

  user.selectOptions(select, interfaceName.goat)

  expect(select).toHaveValue(interfaceName.goat)
})

test('should search-input value use pathname', () => {
  const { input } = setup(1)

  expect(input).toHaveValue('Nike')
})

test('should select value use pathname', () => {
  const { select } = setup(1)

  expect(select).toHaveValue('db')
})
