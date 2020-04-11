import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import { LocationDropdown, IataCode } from './LocationDropdown'

type DataToSend = {location: string, puDate: string, doDate: string }

const CarsFilter: React.FC<{ onChange: (d: DataToSend) => void }> = ({onChange}) => {
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [code, setCode] = useState<IataCode>();

    useEffect(() => {
        if (code && startDate && endDate){
            onChange({location: code.code, puDate: startDate, doDate: endDate });
        }
    }, [startDate, endDate, code]);

    return (
        <>
            <LocationDropdown onChange={setCode} />
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setStartDate(v.target.value.toString())
                    }
                }} />
            </div>
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setEndDate(v.target.value.toString())
                    }
                }} />
            </div>
        </>
    );
}

const DefaultFilter: React.FC = () => {
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

const filtersPerOption: { [k: string]: React.FC<{ onChange: (d: DataToSend) => void }> } = {
    'cars': CarsFilter
}
export function SearchWidget() {

    const [optionToSearch, setOptionToSearch] = useState<string>('cars');
    const [dataToSend, setDataToSend] = useState<DataToSend | null>(null);

    const CurrentFilter = filtersPerOption[optionToSearch] || DefaultFilter;

    const [{ data, loading, error }, postSearch] = useAxios<IataCode[]>('http://localhost:3030/search', { manual: true })
    console.log(data)

    const send = () => {
        console.log(dataToSend)
        postSearch({ params: dataToSend });
    }

    return (
        <div className="main-search-input-wrap">
            <div className="main-search-input fl-wrap" style={{ display: 'flex' }}>
                <CurrentFilter onChange={setDataToSend} />
                <div className="main-search-input-item" onClick={(e) => {
                    const val = $('#select-category').val();
                    if (val) {
                        setOptionToSearch(val.toString())
                    }
                }}>
                    <select data-display="All Categories" value={optionToSearch} className="chosen-select" id="select-category" >
                        <option value={'cars'}>Cars</option>
                        <option value={'shops'}>Shops</option>
                        <option value={'hotels'}>Hotels</option>
                        <option value={'restaurants'}>Restaurants</option>
                        <option value={'fitness'}>Fitness</option>
                        <option value={'events'}>Events</option>``
                    </select>
                </div>
                <button className="main-search-button" onClick={() => send()}>Search</button>
            </div>
        </div>
    );
}