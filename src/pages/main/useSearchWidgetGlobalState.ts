import { createStore } from "react-hooks-global-state"
import moment from "moment";
import { GRCGDSCode, Terms } from "../../types";

type ContextType = {
    term: Terms

    puDate: moment.Moment | null,
    doDate: moment.Moment | null,

    puTime: moment.Moment | null,
    doTime: moment.Moment | null,

    pickUpCode: GRCGDSCode | null,
    dropoffCode: GRCGDSCode | null,
    age: number,
}
const initialState: ContextType = {
    term: Terms.Cars,
    puDate: null,
    doDate: null,

    puTime: null,
    doTime: null,
    pickUpCode: null,
    dropoffCode: null,
    age: 19,
}

const puCodeInternalcode = localStorage.getItem('pickup.code.internalcode')
const puCodeLocationname = localStorage.getItem('pickup.code.locationname')
if (puCodeInternalcode && puCodeLocationname) {
    initialState.pickUpCode = {
        internalcode: puCodeInternalcode,
        locationname: puCodeLocationname,
    }
}

const poCodeInternalcode = localStorage.getItem('dropoff.code.internalcode')
const poCodeLocationname = localStorage.getItem('dropoff.code.locationname')
if (poCodeInternalcode && poCodeLocationname) {
    initialState.dropoffCode = {
        internalcode: poCodeInternalcode,
        locationname: poCodeLocationname,
    }
}


const puDate = localStorage.getItem('pickup.date')
if (puDate) {
    const thisDate = moment.unix(parseInt(puDate))
    if (thisDate.isValid()){
        initialState.puDate = thisDate
    }
}

const puTime = localStorage.getItem('pickup.time')
if (puTime) {
    const thisDate = moment.unix(parseInt(puTime))
    if (thisDate.isValid()){
        initialState.puTime = thisDate
    }
}

const doDate = localStorage.getItem('dropoff.date')
if (doDate) {
    const thisDate = moment.unix(parseInt(doDate))
    if (thisDate.isValid()){
        initialState.doDate = thisDate
    }
}

const doTime = localStorage.getItem('dropoff.time')
if (doTime) {
    const thisDate = moment.unix(parseInt(doTime))
    if (thisDate.isValid()){
        initialState.doTime = thisDate
    }
}


const normalReducer = (state: any, action: { type: string, state: any }) => {
    switch (action.type) {
        case 'set': {
            return { ...state, scrape: {...action.state} };
        }
        case 'pickup.code': {
            localStorage.setItem('pickup.code.internalcode', action.state.internalcode)
            localStorage.setItem('pickup.code.locationname', action.state.locationname)
            return { ...state, pickUpCode: action.state };
        }
        case 'pickup.date': {
            localStorage.setItem('pickup.date', action.state.unix())
            return { ...state, puDate: action.state };
        }
        case 'pickup.time': {
            localStorage.setItem('pickup.time', action.state.unix())
            return { ...state, puTime: action.state };
        }
        case 'dropoff.code': {
            localStorage.setItem('dropoff.code.internalcode', action.state.internalcode)
            localStorage.setItem('dropoff.code.locationname', action.state.locationname)
            return { ...state, dropoffCode: action.state };
        }
        case 'dropoff.date': {
            localStorage.setItem('dropoff.date', action.state.unix())
            return { ...state, doDate: action.state };
        }
        case 'dropoff.time': {
            localStorage.setItem('dropoff.time', action.state.unix())
            return { ...state, doTime: action.state };
        }
        default: return state;
    }
};

export const { dispatch: dispatchSearchState, useGlobalState: useSearchWidgetState } = createStore(normalReducer, initialState)