import { createGlobalState } from "react-hooks-global-state"

type DinamicFilter = {
    category: { name: string, propertyToWatch: string },
    activeValues: { label: string, value: string}[]
}

type ContextType = {
    activeFilters: DinamicFilter[]
}
const initialState = {
    activeFilters: []
}

export const { useGlobalState: useDynamicFiltersState } = createGlobalState<ContextType>(initialState);