import React from 'react'
import { render, screen } from '../../tests/routerRender'
import Banner from './Banner'
import config from '../../utils/config'
const { bannerText } = config

test('should display bannerText', () => {
  render(<Banner />)

  expect(screen.getByText(bannerText)).toBeInTheDocument()
})

test('should render 3 brand logo<img>', () => {
  render(<Banner />)

  expect(screen.getAllByRole('img')).toHaveLength(3)
})
