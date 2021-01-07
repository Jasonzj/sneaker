import { useEffect, useCallback, useRef } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

// hooks api
import useFormBind from '../../../hooks/useFormBind'
import useRequire from '../../../hooks/useRequire'
import { SearchSuggestionsLoader } from '../../../utils/api'

// type
import { ApiLoaderType, SearchSuggestionHitsType } from '../../../types/global'
import { MathchType, useSearchReturnType } from './type'

// config
import config from '../../../utils/config'
const { interfaceName, defaultInterface } = config

const useSearch = (): useSearchReturnType => {
  const history = useHistory()
  const match: MathchType = useRouteMatch({ path: '/search/:siteName/:key', exact: true })

  const [suggestionBind, suggestionValue] = useFormBind(interfaceName.dewu)
  const [interfaceBind, interfaceValue, setInterfaceValue] = useFormBind(defaultInterface)
  const [searchBind, searchKeyWord, setSearchKeyWord] = useFormBind('')
  const searchInputEl = useRef<HTMLInputElement>(null)

  const apiSearchSuggestionsLoader = useCallback<ApiLoaderType>(
    (params, cancelToken) => SearchSuggestionsLoader({ suggestionValue, searchKeyWord }, cancelToken),
    [searchKeyWord, suggestionValue],
  )

  const { response: hits } = useRequire<SearchSuggestionHitsType, Record<string, string>>({
    apiLoader: apiSearchSuggestionsLoader,
    defaultData: [],
    debounce: true,
    notification: false,
    disabled: !searchKeyWord,
  })

  const onClickSuggestionHandle = useCallback(
    (keyWord: string) => {
      setSearchKeyWord(keyWord)
      history.push(`/search/${interfaceValue}/${keyWord}`)
    },
    // eslint-disable-next-line
    [interfaceValue],
  )

  const onKeyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && submitSearch()
  }

  const submitSearch = () => {
    searchKeyWord && history.push(`/search/${interfaceValue}/${searchKeyWord}`)
    searchInputEl?.current && searchInputEl.current.blur()
  }

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

  return {
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
  }
}

export default useSearch
