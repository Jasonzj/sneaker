import React, { useState } from 'react'

// hooks
import useSearch from './hook'

// components
import SearchSuggestion from '../SearchSuggestion'

// css
import style from './searchBar.module.css'

// config
import config from '../../utils/config'
const { interfaceName } = config

const SearchBar: React.FC = () => {
  const [focus, setFocus] = useState(false)
  const {
    hits,
    searchKeyWord,
    suggestionValue,
    searchInputEl,
    searchBind,
    interfaceBind,
    suggestionBind,
    submitSearch,
    onKeyDownHandle,
    onClickSuggestionHandle,
  } = useSearch()

  const isHits = Boolean(hits && hits.length)

  return (
    <div className={style.searchBox}>
      <input
        type='text'
        title='search_input'
        ref={searchInputEl}
        onKeyDown={onKeyDownHandle}
        className={style.searchInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...searchBind}
      />
      <button title='search_button' onClick={submitSearch} className={style.searchButton} />
      <div className={style.selectBox}>
        <span>Search Interface: </span>
        <select title='search_interface_select' className={style.searchInterface} {...interfaceBind}>
          <option value={interfaceName.dewu}>Dewu</option>
          <option value={interfaceName.stockx}>StockX</option>
          <option value={interfaceName.goat}>Goat</option>
          <option value={interfaceName.db}>DB</option>
        </select>
        <span>Search Suggestions Interface: </span>
        <select className={style.searchInterface} {...suggestionBind}>
          <option value={interfaceName.dewu}>Dewu</option>
          <option value={interfaceName.stockx}>StockX</option>
        </select>
      </div>
      <div className={style.searchSuggestion}>
        {isHits && focus && searchKeyWord && (
          <SearchSuggestion
            hits={hits}
            suggestionValue={suggestionValue}
            onClickSuggestionHandle={onClickSuggestionHandle}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBar
