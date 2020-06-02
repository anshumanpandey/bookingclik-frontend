import { createGlobalState } from "react-hooks-global-state"

export enum PriceSortOrder {
    ASC= "ASC",
    DESC= "DESC"
}
type ContextType = {
    price: PriceSortOrder,
}
const initialState = {
    price: PriceSortOrder.DESC,
}

export const { useGlobalState: useSortState } = createGlobalState<ContextType>(initialState);