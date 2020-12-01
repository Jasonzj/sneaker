import React from 'react'
import Loading from '../Loading'
import { Props } from './type'

const DataBoundary: React.FC<Props> = ({ error, info, loading = null, children }) => (
  <>
    {loading && <Loading {...loading} />}
    {error ? info : children}
  </>
)

export default DataBoundary
