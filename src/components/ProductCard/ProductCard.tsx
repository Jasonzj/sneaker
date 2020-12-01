import React from 'react'
import { Props } from './type'
import style from './productCard.module.css'

const ProductCard: React.FC<Props> = ({ shoe, index, onOpenHandle }) => {
  const lowestPrice = shoe.lowestPrice
  const minPriceBrand = Object.keys(lowestPrice).sort(
    (a: string, b: string) => lowestPrice[a] - lowestPrice[b],
  )[0]
  const minPrice = lowestPrice[minPriceBrand]

  return (
    <div className={style.card} onClick={() => onOpenHandle(index)} data-testid='product_card'>
      <img src={shoe.image || shoe.image2} alt={shoe.showName} />
      <div className={style.shoeName}>{shoe.showName}</div>
      <div className={style.price}>${minPrice}</div>
      <div className={style.brand}>{minPriceBrand}</div>
    </div>
  )
}

export default ProductCard
