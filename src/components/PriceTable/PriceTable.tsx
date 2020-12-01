import React from 'react'
import { Props } from './type'
import { isEmptyObject } from '../../utils/common'
import NoInfo from '../DataBoundary'
import style from './priceTable.module.css'

enum siteName {
  goat = 'goat',
  stockx = 'stockx',
  dewu = 'dewu',
}

const PriceTable: React.FC<Props> = ({ sizePrices }) => {
  const { dewu = {}, goat = {}, stockx = {} } = sizePrices
  const isDewu = !isEmptyObject(dewu)
  const isGoat = !isEmptyObject(goat)
  const isStockx = !isEmptyObject(stockx)
  const usSizes: Set<string> = new Set()

  for (const size in goat) {
    usSizes.add(size)
  }
  for (const size in stockx) {
    usSizes.add(size)
  }

  const usSizesArr = Array.from(usSizes).sort((a, b) => +a - +b)
  const dewuSizeArr = dewu && Object.keys(dewu).sort((a, b) => +a - +b)

  const isMinPriceClassName = (size: string, price: number) => {
    if (!price) return
    const goatPrice = (isGoat && goat[size]) || 10000
    const stockxPrice = (isStockx && stockx[size]) || 10000
    const minPrices = Math.min(goatPrice, stockxPrice)

    return price === minPrices ? style.minPrice : ''
  }

  const trElement = (name: siteName) => {
    if (name === siteName.dewu) {
      return (
        <tr>
          <td key='dewu'>dewu</td>
          {dewuSizeArr.map((size) => (
            <td key={size}>${dewu[size]}</td>
          ))}
        </tr>
      )
    }

    return (
      !isEmptyObject(sizePrices[name]) && (
        <tr>
          <td title='brand_name' key={name}>
            {name}
          </td>
          {usSizesArr.map((size) => {
            const price = sizePrices[name][size]
            return (
              <td key={size} className={isMinPriceClassName(size, price)}>
                {price ? `$${price}` : '--'}
              </td>
            )
          })}
        </tr>
      )
    )
  }

  return (
    <div className={style.priceTable}>
      <NoInfo error={!(isStockx || isGoat)} info='No Goat and Stockx Price'>
        <div className={style.tableBox}>
          <table>
            <thead>
              <tr>
                <th>US Size</th>
                {usSizesArr.map((size) => (
                  <th key={size}> {size} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trElement(siteName.stockx)}
              {trElement(siteName.goat)}
            </tbody>
          </table>
        </div>
      </NoInfo>

      <NoInfo error={!isDewu} info='No Dewu Price'>
        <div className={style.tableBox}>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                {dewuSizeArr.map((size) => (
                  <th key={size}> {size} </th>
                ))}
              </tr>
            </thead>
            <tbody>{trElement(siteName.dewu)}</tbody>
          </table>
        </div>
      </NoInfo>
    </div>
  )
}

export default React.memo(PriceTable)
