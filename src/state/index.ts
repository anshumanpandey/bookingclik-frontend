import { createGlobalState, createStore } from 'react-hooks-global-state';

type InitialState = {
    loading: boolean
    token: null | string
    error: null | string
}
const initialState: InitialState = {
    loading: false,
    token: null,
    error: null
};

const token = localStorage.getItem('token')
if (token) {
    initialState.token = token
}

const normalReducer = (state: any, action: { type: string, state?: any }): InitialState => {
    switch (action.type) {
        case 'loading': {
            return { ...state, loading: action.state };
        }
        case 'token': {
            localStorage.setItem('token', action.state)
            return { ...state, token: state };
        }
        case 'logout': {
            localStorage.removeItem('token')
            return { ...state, token: null };
        }
        case 'error': {
            return { ...state, error: action.state };
        }
        default: return state;
    }
}

export const { dispatch: dispatchGlobalState, useGlobalState, getState: getGlobalState } = createStore(normalReducer, initialState)
