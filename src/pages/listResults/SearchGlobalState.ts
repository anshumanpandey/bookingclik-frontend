import { createGlobalState } from "react-hooks-global-state"
import { SearchResponse } from "../../types";

export const { useGlobalState: useFilterState} = createGlobalState<SearchResponse | null>(null);