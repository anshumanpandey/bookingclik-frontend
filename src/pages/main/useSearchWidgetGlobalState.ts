import { createGlobalState } from "react-hooks-global-state"
import moment from "moment";
import { GRCGDSCode, Terms } from "../../types";

type ContextType = {
    term: Terms

    puDate: moment.Moment | null,
    doDate: moment.Moment | null,

    puTime: moment.Moment | null,
    doTime: moment.Moment | null,

    code: GRCGDSCode | null,
}
const initialState = {
    term: Terms.Cars,
    puDate: moment().add(3, 'day'),
    doDate: moment().add(5, 'day'),

    puTime: moment().add(3, 'day'),
    doTime: moment().add(5, 'day'),
    code: null,
}

export const { useGlobalState: useSearchWidgetState } = createGlobalState<ContextType>(initialState);