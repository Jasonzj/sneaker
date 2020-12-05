import { match } from 'react-router-dom'
import { BindFormType } from '../../../hooks/useFormBind'
import { SearchSuggestionHitsType } from '../../../utils/global'
import { RefObject } from 'react'

export type MathchType = match<{ key: string; siteName: string }> | null

export type useSearchReturnType = {
  hits: SearchSuggestionHitsType
  searchKeyWord: string
  suggestionValue: string
  searchInputEl: RefObject<HTMLInputElement>
  searchBind: BindFormType
  interfaceBind: BindFormType
  suggestionBind: BindFormType
  submitSearch: () => void
  onClickSuggestionHandle: (keyWord: string) => void
  onKeyDownHandle: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
