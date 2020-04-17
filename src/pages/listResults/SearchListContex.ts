import React, { createContext, useContext, useState, useCallback } from 'react';

type ContextType = {
    noSeats: number,
    noDoors: number,
    transmission: 'manual' | 'automatic' | null,
    airConditioner: boolean,

    setNoSeats: (v: number) => void,
    setNoDoors: (v: number) => void,
    setTransmission: (v: 'manual' | 'automatic') => void,
    setAirConditioner: (v: boolean) => void,
}
export const SearchListContex = createContext<ContextType>({
    noSeats: 0,
    noDoors: 0,
    transmission: 'manual',
    airConditioner: false,

    setNoSeats: (v: number) => { },
    setNoDoors: (v: number) => { },
    setTransmission: (v: 'manual' | 'automatic') => { },
    setAirConditioner: (v: boolean) => { },
});

export const useSearchContext = (): ContextType => {
    const [noSeats, setCurrentNoSeats] = useState<number>(0);
    const [noDoors, setCurrentNoDoors] = useState<number>(0);
    const [transmission, setCurrentTransmission] = useState<'manual' | 'automatic' | null>(null);
    const [airConditioner, setCurrentAirConditioner] = useState<boolean>(false);

    const setNoSeats = useCallback((v: number) => setCurrentNoSeats(v), []);
    const setNoDoors = useCallback((v: number) => setCurrentNoDoors(v), []);
    const setTransmission = useCallback((v: 'manual' | 'automatic' | null) => setCurrentTransmission(v), []);
    const setAirConditioner = useCallback((v: boolean) => setCurrentAirConditioner(v), []);

    return {
        noSeats,
        noDoors,
        transmission,
        airConditioner,
        setNoSeats,
        setNoDoors,
        setTransmission,
        setAirConditioner,
    }
}