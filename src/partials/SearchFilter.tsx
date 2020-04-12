import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';
import { LocationDropdown } from './LocationDropdown';
import { IataCode } from '../types';

const DateInput: React.FC<{onChange: (v: string) => void, defaultValue?: string | null }> = ({onChange, defaultValue}) => {
    useEffect(() => {
        if (defaultValue) onChange(defaultValue)
    }, []);
    return (
        <NumberFormat
            type="text"
            defaultValue={defaultValue || undefined}
            format={(value) => {
                let format = "DD/MM/YYYY";

                if (value.length <= 1) {
                    format = `${value.slice(0, 1)}/MM/YYYY`;
                } else if (value.length <= 2) {
                    let day = value;
                    if (parseInt(day) > 31) day = '31';
                    format = `${day}/MM/YYYY`;
                } else if (value.length >= 3 && value.length <= 4) {
                    const month = parseInt(value.slice(2)) > 12 ? '12' : value.slice(2);

                    format = `${value.slice(0, 2)}/${month}/YYYY`
                } else if (value.length >= 4 && value.length <= 8) {
                    let year = value.slice(4, 8);

                    if (year.length === 4 && parseInt(year) < dayjs().year()) {
                        year = dayjs().year().toString()
                    }

                    format = `${value.slice(0, 2)}/${value.slice(2, 4)}/${year.length < 4 ? `${year}${`YYYY`.slice(year.length)}`: year}`
                } else {
                    let year = value.slice(4, 8);

                    format = `${value.slice(0, 2)}/${value.slice(2, 4)}/${year}`
                }
                return format;
            }}
            placeholder="Date: 09/12/2019"
            onValueChange={(v) => {
                if (v.value.length === 8) {
                    onChange(v.formattedValue)
                }
            }}
        />
    );
}

export const DefaultSearchFilters: React.FC = () => {
    return (
        <div className="listsearch-input-wrap fl-wrap">
            <div className="listsearch-input-item">
                <i className="mbri-key single-i"></i>
                <input type="text" placeholder="Keywords?" value="" />
            </div>
            <div className="listsearch-input-item">
                <select data-placeholder="Location" className="listResultSelect">
                    <option>All Locations</option>
                    <option>Bronx</option>
                    <option>Brooklyn</option>
                    <option>Manhattan</option>
                    <option>Queens</option>
                    <option>Staten Island</option>
                </select>
            </div>
            <div className="listsearch-input-item">
                <select data-placeholder="All Categories" className="listResultSelect">
                    <option>All Categories</option>
                    <option>Shops</option>
                    <option>Hotels</option>
                    <option>Restaurants</option>
                    <option>Fitness</option>
                    <option>Events</option>
                </select>
            </div>
            <div className="listsearch-input-text" id="autocomplete-container">
                <label><i className="mbri-map-pin"></i> Enter Addres </label>
                <input type="text" placeholder="Destination , Area , Street" id="autocomplete-input" className="qodef-archive-places-search" value="" />
                <a href="#" className="loc-act qodef-archive-current-location"><i className="fa fa-dot-circle-o"></i></a>
            </div>
            <div className="hidden-listing-filter fl-wrap">
                <div className="distance-input fl-wrap">
                    <div className="distance-title"> Radius around selected destination <span></span> km</div>
                    <div className="distance-radius-wrap fl-wrap">
                        <input className="distance-radius rangeslider--horizontal" type="range" min="1" max="100" step="1" value="1" data-title="Radius around selected destination" />
                    </div>
                </div>
                <div className=" fl-wrap filter-tags">
                    <h4>Filter by Tags</h4>
                    <input id="check-aa" type="checkbox" name="check" />
                    <label htmlFor="check-aa">Elevator in building</label>
                    <input id="check-b" type="checkbox" name="check" />
                    <label htmlFor="check-b">Friendly workspace</label>
                    <input id="check-c" type="checkbox" name="check" />
                    <label htmlFor="check-c">Instant Book</label>
                    <input id="check-d" type="checkbox" name="check" />
                    <label htmlFor="check-d">Wireless Internet</label>
                </div>
            </div>
            <button className="button fs-map-btn">Update</button>
            <div className="more-filter-option">More Filters <span></span></div>
        </div>
    );
}

export type CarsSearchCriteria = { term: 'cars', location: IataCode, puDate: string | null, doDate: string | null }
export type CarsFilterProps = { onChange: (d: CarsSearchCriteria) => void };

export const ResultsCarsFilter: React.FC<CarsFilterProps & CarsSearchCriteria> = ({ onChange, puDate, doDate, location }) => {
    const [startDate, setStartDate] = useState<string | null>(puDate || null);
    const [endDate, setEndDate] = useState<string | null>(doDate || null);
    const [code, setCode] = useState<IataCode>(location || undefined);

    useEffect(() => {
        if (code) {
            onChange({ term: 'cars', puDate: startDate, doDate: endDate, location: code })
        }
    }, [startDate, endDate, code]);

    return (
        <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LocationDropdown defaultValue={location} style={{ backgroundColor: '#4DB7FE', color: 'white' }} className="listsearch-input-item listResultSelect" onChange={setCode} />
                <div className="listsearch-input-item">
                    <DateInput defaultValue={puDate} onChange={(v) => setStartDate(v)} />
                </div>
                <div className="listsearch-input-item">
                    <DateInput defaultValue={doDate} onChange={(v) => setEndDate(v)} />
                </div>

            </div>
        </div>
    );
}

const CarSearchWidgetFilters: React.FC<CarsFilterProps> = ({ onChange }) => {
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

const DefaultSearchWidgetFilters: React.FC = () => {
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

type FilterMap = {
    searchlist: {
        [k: string]: React.FC<any>
        default: React.FC<any>
    },
    searchWidget: {
        [k: string]: React.FC<any>
        default: React.FC<any>
    }
}
export const FilterMap: FilterMap = {
    searchlist: {
        cars: ResultsCarsFilter,
        default: DefaultSearchFilters
    },
    searchWidget: {
        cars: CarSearchWidgetFilters,
        default: DefaultSearchWidgetFilters
    }
}