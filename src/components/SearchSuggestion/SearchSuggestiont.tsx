import React from 'react'
import { Props } from './type'
import style from './searchSuggestion.module.css'
import config from '../../utils/config'

const { interfaceName } = config

const SearchSuggestion: React.FC<Props> = ({ hits, suggestionValue, onClickSuggestionHandle }) => {
  const liElement = () => {
    if (suggestionValue === interfaceName.stockx) {
      if (!hits[0].name) return
      return hits.map((shoe, index) => {
        return (
          <li className={style.stockx} key={index} onMouseDown={() => onClickSuggestionHandle(shoe.style_id)}>
            <img src={shoe.thumbnail_url} alt={shoe.name} />
            <div className={style.suggestionInfo}>
              <p className={style.shoeName}>{shoe.name}</p>
              <p>STYLE-ID: {shoe.style_id}</p>
            </div>
          </li>
        )
      })
    }

    return hits.map((shoe, index) => (
      <li className={style.dewu} key={index} onMouseDown={() => onClickSuggestionHandle(shoe.word)}>
        <p>{shoe.word}</p>
      </li>
    ))
  }

  return <ul className={style.suggestionUl}>{liElement()}</ul>
}

export default React.memo(SearchSuggestion)
