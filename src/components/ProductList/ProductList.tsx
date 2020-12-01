import React, { useMemo } from 'react'

// type
import { Props } from './type'

// component
import ProductCard from '../ProductCard'
import DataBoundary from '../DataBoundary'

// css
import style from './productList.module.css'

const ProductList: React.FC<Props> = ({ error, loading, shoeLists, onOpenHandle }) => {
  const loadingConfig = {
    spinning: loading,
    isShowText: true,
  }

  return useMemo(
    () => (
      <div className={style.box}>
        <DataBoundary
          error={error}
          loading={loadingConfig}
          info={<div className={style.errorMsg}>Search Fail!</div>}
        >
          {shoeLists.map((shoe, i) => (
            <ProductCard key={shoe.styleID} shoe={shoe} onOpenHandle={onOpenHandle} index={i} />
          ))}
        </DataBoundary>
      </div>
    ),
    // eslint-disable-next-line
    [error, loading],
  )
}

export default ProductList
