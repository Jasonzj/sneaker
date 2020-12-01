import { SearchSuggestionHitsType } from '../../utils/global'

type Props = {
  hits: SearchSuggestionHitsType
  suggestionValue: string
  onClickSuggestionHandle: (keyWord: string) => void
}
