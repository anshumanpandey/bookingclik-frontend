import { createGlobalState } from "react-hooks-global-state"

type ContextType = {
    noSeats: number,
    noDoors: number,
    transmission:  string | null,
    transmissionOptions: string[],
    airConditioner: boolean,
}
const initialState = {
    noSeats: 0,
    noDoors: 0,
    transmission: null,
    transmissionOptions: [],
    airConditioner: false,
}

export const { useGlobalState: useFilterState} = createGlobalState<ContextType>(initialState);