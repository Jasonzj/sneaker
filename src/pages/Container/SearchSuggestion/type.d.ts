import { SearchSuggestionHitsType } from '../../../types/global'

export type Props = {
  hits: SearchSuggestionHitsType
  suggestionValue: string
  onClickSuggestionHandle: (keyWord: string) => void
}
