import { createGlobalState, createStore } from 'react-hooks-global-state';

type InitialState = {
    loading: boolean
    token: null | string
    error: null | string
    success: null | string
    profile: null | {[ key: string]: any}
}
const initialState: InitialState = {
    loading: false,
    token: null,
    error: null,
    success: null,
    profile: null
};

const token = localStorage.getItem('token')
if (token) {
    initialState.token = token
}

const profile = localStorage.getItem('profile')
if (profile) {
    initialState.profile = JSON.parse(profile)
}

const normalReducer = (state: any, action: { type: string, state?: any }): InitialState => {
    switch (action.type) {
        case 'loading': {
            return { ...state, loading: action.state };
        }
        case 'token': {
            localStorage.setItem('token', action.state)
            return { ...state, token: action.state };
        }
        case 'profile': {
            localStorage.setItem('profile', JSON.stringify(action.state))
            return { ...state, profile: action.state };
        }
        case 'logout': {
            localStorage.removeItem('token')
            return { ...state, token: null };
        }
        case 'error': {
            return { ...state, error: action.state };
        }
        case 'success': {
            return { ...state, success: action.state };
        }
        default: return state;
    }
}

export const { dispatch: dispatchGlobalState, useGlobalState, getState: getGlobalState } = createStore(normalReducer, initialState)
