import React from 'react'
import { render, screen } from '../../tests/routerRender'
import Header from './Header'
import config from '../../utils/config'
const { title } = config

test('should display text Sneakers App', () => {
  render(<Header />)

  expect(screen.getByText(title)).toBeInTheDocument()
})

test('should render 2 Link', () => {
  render(<Header />)

  expect(screen.getAllByRole('link')).toHaveLength(2)
})

test('should correct render trending link text', () => {
  render(<Header />)

  expect(screen.getByText('Dewu Trending')).toBeInTheDocument()
  expect(screen.getByText('Goat Trending')).toBeInTheDocument()
})
