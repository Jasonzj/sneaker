import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'

const customRender = (ui: React.ReactElement): RenderResult => render(ui, { wrapper: HashRouter })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
