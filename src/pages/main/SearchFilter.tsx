import React, { useState, useEffect } from 'react';
import { CarsFilterProps, IataCode } from '../../types';
import { DateInput, LocationDropdown } from '../../partials';

export const CarSearchWidgetFilters: React.FC<CarsFilterProps> = ({ onChange }) => {
    const [puDate, setPuDate] = useState<string | null>(null);
    const [doDate, setDoDate] = useState<string | null>(null);
    const [code, setCode] = useState<IataCode>();

    useEffect(() => {
        if (code) {
            onChange({ term: 'cars', location: code, puDate, doDate });
        }
    }, [puDate, doDate, code]);

    return (
        <>
            <LocationDropdown onChange={setCode} style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
            }} />
            <div className="main-search-input-item">
                <DateInput onChange={(v) => setPuDate(v)} />
            </div>
            <div className="main-search-input-item">
                <DateInput onChange={(v) => setDoDate(v)} />
            </div>
        </>
    );
}

export const DefaultSearchWidgetFilters: React.FC = () => {
    return (
        <>
            <div className="main-search-input-item">
                <input type="text" placeholder="What are you looking for?" value="" />
            </div>
            <div className="main-search-input-item location" id="autocomplete-container">
                <input type="text" placeholder="Location" id="autocomplete-input" value="" />
                <a href="#"><i className="fa fa-dot-circle-o"></i></a>
            </div>
        </>
    );
}