import React, { useState } from 'react'
import Slider from 'react-slick'

import { formatTime } from '../../utils/common'

// type
import { Props } from './type'
import { SizePricesType } from '../../utils/global'

// components
import PriceTable from '../../components/PriceTable'
import DataBoundary from '../DataBoundary/DataBoundary'
import Draggable from 'react-draggable'

// css
import style from './productDetail.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ProductDetail: React.FC<Props> = ({ shoe, followingLists, onCloseHandle, onFollowHandle, loading }) => {
  const [isShowImg, setIsShowImg] = useState(false)
  const { images, baseProperties, sizePrices } = shoe
  const followIndex = followingLists.indexOf(shoe.styleID)
  const isFollow = followIndex > -1
  const isNobaseProperties = !(baseProperties && baseProperties.length)
  const isNoImage = !(images && images.length)
  const loadingConfig = {
    spinning: loading,
    backGroundColor: '#ffffff',
  }
  const defaultImage = (
    <Slider>
      <img src={shoe.image || shoe.image2} alt={shoe.showName} />
    </Slider>
  )

  const bashPropertiesElement = () => {
    return baseProperties?.map((item) => {
      return (
        <p key={item.key}>
          {item.key}: {item.value}
        </p>
      )
    })
  }

  const imagesElement = () => {
    return images?.map((url) => {
      return <img src={url} key={url} alt={shoe.showName} />
    })
  }

  const onShowImgHandle = () => {
    isShowImg ? setIsShowImg(false) : setIsShowImg(true)
  }

  return (
    <div>
      <div className={style.detail}>
        {/* header */}
        <header className={style.header}>
          <button onClick={onCloseHandle} className={style.closeBtn}>
            X
          </button>
        </header>

        <div className={style.container}>
          {/* content */}
          <div className={style.content}>
            <div className={style.photoBox}>
              <div className={style.photo}>
                <DataBoundary error={isNoImage} info={defaultImage} loading={{ spinning: loading }}>
                  <Slider {...settings}>{imagesElement()}</Slider>
                </DataBoundary>
              </div>
              <p className={style.time} title='data_time'>
                Data Time: {formatTime(shoe.time)}
              </p>
            </div>

            <div className={style.information}>
              <h2 className={style.showName}>{shoe.showName}</h2>
              <div className={style.link}>
                <a href={shoe.resellLinks.goat} target='_blank' rel='noreferrer noopener'>
                  Visit Goat
                </a>
                <a href={shoe.resellLinks.stockX} target='_blank' rel='noreferrer noopener'>
                  Visit StockX
                </a>
                <a onClick={() => onFollowHandle(shoe.styleID, followIndex, isFollow)} title='follow_button'>
                  {isFollow ? 'unfollow' : 'follow'}
                </a>
              </div>
              <p className={style.tab}>Properties</p>
              <div className={style.bashProperties} title='product_basePropperties'>
                <DataBoundary error={isNobaseProperties} info='No BaseProperties' loading={loadingConfig}>
                  {bashPropertiesElement()}
                </DataBoundary>
              </div>
            </div>
          </div>

          {/* sizeTable */}
          <div className={style.sizeTable}>
            <DataBoundary error={!sizePrices} info='No Price Table' loading={loadingConfig}>
              <PriceTable sizePrices={sizePrices as SizePricesType} />
            </DataBoundary>
          </div>

          {/* SizeImage */}
          <div className={style.sizeImage}>
            {shoe.sizeImage && (
              <button onClick={onShowImgHandle} className={style.showImgBtn}>
                {isShowImg ? 'Hide Size Chart' : 'Show Size Chart'}
              </button>
            )}
            {isShowImg && (
              <Draggable onStart={(e) => e.preventDefault()}>
                <img src={shoe.sizeImage} alt='sizeTable' />
              </Draggable>
            )}
          </div>
        </div>
      </div>
      <div onClick={onCloseHandle} className={style.fullScreen}></div>
    </div>
  )
}

export default React.memo(ProductDetail)
