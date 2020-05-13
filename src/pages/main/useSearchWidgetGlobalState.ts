import { createGlobalState } from "react-hooks-global-state"
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
}
const initialState = {
    term: Terms.Cars,
    puDate: null,
    doDate: null,

    puTime: null,
    doTime: null,
    pickUpCode: null,
    dropoffCode: null,
}

export const { useGlobalState: useSearchWidgetState } = createGlobalState<ContextType>(initialState);