import { SearchSuggestionHitsType } from '../../../utils/global'

export type Props = {
  hits: SearchSuggestionHitsType
  suggestionValue: string
  onClickSuggestionHandle: (keyWord: string) => void
}
