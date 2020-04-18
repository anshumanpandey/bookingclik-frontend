import React, { useState, useEffect } from 'react';
//@ts-ignore
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
        <div className="row" style={{ color: 'white', textAlign: 'left' }}>
            <div className="col-md-4" style={{ paddingRight: 0, paddingLeft: 0}}>
                <label>Location</label>
            </div>

            <div className="col-md-4" style={{ paddingRight: 0, paddingLeft: 0}}>
                <label>Pick up Date</label>
            </div>

            <div className="col-md-4" style={{ paddingRight: 0, paddingLeft: 0}}>
                <label>Drop off Date</label>
            </div>
        </div>

        <div className="row" style={{ backgroundColor: 'white', borderRadius: '0.25rem'}}>
            <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0}}>
                <LocationDropdown onChange={setCode} style={{
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    width: '100%'
                }} />
            </div>
            <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0}}>
                <div className="main-search-input-item" style={{ width:'100%' }}>
                    <DateInput onChange={(v) => setPuDate(v)} />
                </div>
            </div>
            <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0}}>

                <div className="main-search-input-item" style={{ borderRight: 'unset', width:'100%' }}>
                    <DateInput onChange={(v) => setDoDate(v)} />
                </div>
            </div>
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