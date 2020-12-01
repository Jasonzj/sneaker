import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

// hooks
import useRequire from '../../hooks/useRequire'

// components
import SearchSuggestion from '../SearchSuggestion'

// type
import { MathchType } from './type'
import { SearchSuggestionsLoader } from '../../utils/api'
import { SearchSuggestionHitsType, AnyStringObjectType, ApiLoaderType } from '../../utils/global'

// css
import style from './searchBar.module.css'

// config
import config from '../../utils/config'
const { interfaceName, defaultInterface } = config

const SearchBar: React.FC = () => {
  const history = useHistory()
  const match: MathchType = useRouteMatch({ path: '/search/:siteName/:key', exact: true })

  const [suggestionValue, setSuggestionValue] = useState(interfaceName.dewu)
  const [interfaceValue, setInterfaceValue] = useState(defaultInterface)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [focus, setFocus] = useState(false)

  const apiSearchSuggestionsLoader = useCallback<ApiLoaderType>(
    (params, cancelToken) => SearchSuggestionsLoader({ suggestionValue, searchKeyWord }, cancelToken),
    [searchKeyWord, suggestionValue],
  )

  const { response: hits } = useRequire<SearchSuggestionHitsType, AnyStringObjectType>({
    apiLoader: apiSearchSuggestionsLoader,
    defaultData: [],
    debounce: true,
    notification: false,
    disabled: !searchKeyWord,
  })

  const onSelectInterfaceHandle = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    setInterfaceValue(e.currentTarget.value)
  }, [])

  const onSelectSuggestionHandle = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
    setSuggestionValue(e.currentTarget.value)
  }, [])

  const onClickSuggestionHandle = useCallback(
    (keyWord: string) => {
      setSearchKeyWord(keyWord)
      history.push(`/search/${interfaceValue}/${keyWord}`)
    },
    // eslint-disable-next-line
    [interfaceValue],
  )

  const onSearchInputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value)
    !focus && setFocus(true)
  }

  const onKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && submitSearch()
  }

  const submitSearch = () => {
    searchKeyWord && history.push(`/search/${interfaceValue}/${searchKeyWord}`)
    focus && setFocus(false)
  }

  const isHits = Boolean(hits && hits.length)

  useEffect(
    () => {
      if (match) {
        const key = match.params.key
        const siteName = match.params.siteName
        setInterfaceValue(siteName)
        setSearchKeyWord(key)
      }
    },
    // eslint-disable-next-line
    [],
  )

  return (
    <div className={style.searchBox}>
      <input
        type='text'
        title='search_input'
        value={searchKeyWord}
        onKeyDown={onKeyDownHandle}
        className={style.searchInput}
        onChange={onSearchInputChangeHandle}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <button title='search_button' onClick={submitSearch} className={style.searchButton} />
      <div className={style.selectBox}>
        <span>Search Interface: </span>
        <select
          title='search_interface_select'
          className={style.searchInterface}
          onChange={onSelectInterfaceHandle}
          value={interfaceValue}
        >
          <option value={interfaceName.dewu}>Dewu</option>
          <option value={interfaceName.stockx}>StockX</option>
          <option value={interfaceName.goat}>Goat</option>
          <option value={interfaceName.db}>DB</option>
        </select>
        <span>Search Suggestions Interface: </span>
        <select className={style.searchInterface} onChange={onSelectSuggestionHandle} value={suggestionValue}>
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
