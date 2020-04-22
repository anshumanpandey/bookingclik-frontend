import { createGlobalState } from "react-hooks-global-state"

type ContextType = {
    transmissionOptions: string[],
}
const initialState = {
    transmissionOptions: [],
}

export const { useGlobalState: useFilterState} = createGlobalState<ContextType>(initialState);