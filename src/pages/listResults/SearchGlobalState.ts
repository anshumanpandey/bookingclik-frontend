import { createGlobalState, createStore } from "react-hooks-global-state"
import { SearchResponse, Scrape } from "../../types";

type FilteredScrape = {
    filteredScrape: Scrape
}

const normalReducer = (state: any, action: { type: string, state: any }) => {
    switch (action.type) {
        case 'set': return { scrape: {...action.state} };
        default: return state;
    }
};

const initialState = {
    scrape: {
        details: {
            pickup: { location: "DBV", datetime: "13/07/2020 20:00" },
            dropoff: { location: "DBV", datetime: "16/07/2020 20:00" }
        },
        vehicle: []
    },
}


const filteredReducer = (state: any, action: { type: string, state: any }) => {
    switch (action.type) {
        case 'set': {
            return { filteredScrape: {...action.state} };
        }
        case 'loading': {
            return { ...state, isfiltering: state };
        }
        default: {
            return state;
        }
    }
};

const initialFilteredState = {
    isfiltering: false,
    filteredScrape: {
        details: {
            pickup: { location: "DBV", datetime: "13/07/2020 20:00" },
            dropoff: { location: "DBV", datetime: "16/07/2020 20:00" }
        },
        vehicle: []
    }
}


export const { dispatch: dispatchSearchState, useGlobalState: useSearchState } = createStore(normalReducer, initialState)
export const { dispatch: dispatchFilteredState, useGlobalState: useFilteredSearchState } = createStore(filteredReducer, initialFilteredState)