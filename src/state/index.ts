import { createGlobalState } from 'react-hooks-global-state';
 
const initialState = { loading: false };
export const { useGlobalState } = createGlobalState(initialState);
