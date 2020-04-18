import { createGlobalState } from "react-hooks-global-state"

type ContextType = {
    noSeats: number,
    noDoors: number,
    priceRange: [number, number],
    transmission:  string | null,
    transmissionOptions: string[],
    airConditioner: boolean,
}
const initialState = {
    noSeats: 0,
    noDoors: 0,
    priceRange: [0, 0] as [number, number],
    transmission: null,
    transmissionOptions: [],
    airConditioner: false,
}

export const { useGlobalState: useFilterState} = createGlobalState<ContextType>(initialState);