import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { HashRouter as Router } from 'react-router-dom'

const AllTheProviders: React.FC = ({ children }) => {
  return <Router>{children}</Router>
}

const customRender = (ui: React.ReactElement): RenderResult => render(ui, { wrapper: AllTheProviders })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
