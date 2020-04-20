import { createGlobalState } from "react-hooks-global-state"
import { SearchResponse } from "../../types";

const initialState = {
    scrape: {
        details: { 
            pickup: { location: "DBV", datetime: "13/07/2020 20:00" },
            dropoff: { location: "DBV", datetime: "16/07/2020 20:00" } 
        },
        vehicle: []
    }
}


export const { useGlobalState: useSearchState } = createGlobalState<SearchResponse>(initialState);