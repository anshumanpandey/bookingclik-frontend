import { createGlobalState } from "react-hooks-global-state"

export type DinamicFilter = {
    category: { name: string, propertyToWatch: string, type: string },
    activeValues: { label: string, value: string}[],
    counter?: number
    range?: [number, number]
}

type ContextType = {
    activeFilters: DinamicFilter[]
}
const initialState = {
    activeFilters: []
}

export const { useGlobalState: useDynamicFiltersState } = createGlobalState<ContextType>(initialState);