import React from 'react'

// type
import { Props } from './type'

// components
import ProductList from '../../components/ProductList'
import ProductDetail from '../../components/ProductDetail'

// css
import style from './product.module.css'

// api hooks
import { useFollowing, useShoeLists } from './hooks'

const Products: React.FC<Props> = ({ match }) => {
  const {
    params: { key, siteName },
  } = match
  const isTrendingPage = match.path.includes('trending')
  const isFollowingPage = match.path.includes('following')

  const [followingLists, onFollowHandle] = useFollowing()
  const {
    isShow,
    error,
    loading,
    curIndex,
    shoeLists,
    onOpenHandle,
    onCloseHandle,
    detailLoading,
    isDBSearch,
  } = useShoeLists({ key, siteName, isTrendingPage, isFollowingPage })

  const titleElement = () => {
    if (isTrendingPage) return `Trending(${siteName})`
    if (isFollowingPage) return `My Following`
    return (
      <div>
        Search {siteName} for <span className={style.key}>({key})</span>
        {isDBSearch && <span className={style.failInfo}>Search Fail, Return DB Data</span>}
      </div>
    )
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title} title='search_title'>
          {titleElement()}
        </h1>
      </div>
      <ProductList error={error} loading={loading} shoeLists={shoeLists} onOpenHandle={onOpenHandle} />
      {isShow && (
        <ProductDetail
          shoe={shoeLists[curIndex]}
          loading={detailLoading}
          followingLists={followingLists}
          onCloseHandle={onCloseHandle}
          onFollowHandle={onFollowHandle}
        />
      )}
    </div>
  )
}

export default Products
