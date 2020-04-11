import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import { LocationDropdown } from './LocationDropdown';
import { IataCode } from '../types';
import { useHistory } from 'react-router-dom';

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

export type ResultsCarsFilterCb = { location: IataCode, puDate: string, doDate: string }

export const ResultsCarsFilter: React.FC<{ onChange: (d: ResultsCarsFilterCb) => void } & ResultsCarsFilterCb> = ({ puDate, doDate, location }) => {
    const history = useHistory()
    const [startDate, setStartDate] = useState<string>(puDate);
    const [endDate, setEndDate] = useState<string>(doDate);
    const [code, setCode] = useState<IataCode>(location || undefined);

    const [{ data, loading, error }, doSearch] = useAxios<IataCode[]>(`${process.env.REACT_APP_BACKEND_URL ?  process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })


    const send = () => {
        if (!(code && startDate && endDate)) {
            return;
        }
        const searchCriteria = { location: code.code, puDate, doDate };
        doSearch({ params: searchCriteria})
        .then(res => {
            history.push('/results', {
                search: {
                    criteria: { term: 'cars', ...searchCriteria },
                    results: res.data
                }
            })

        });
    }

    return (
        <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <LocationDropdown defaultValue={location.code} className="listsearch-input-item listResultSelect" onChange={setCode} />
                <div className="listsearch-input-item">
                    <input type="text" placeholder="Date: 09/12/2019" defaultValue={puDate} onChange={(v) => {
                        if (v.target.value) {
                            setStartDate(v.target.value.toString())
                        }
                    }} />
                </div>
                <div className="listsearch-input-item">
                    <input type="text" placeholder="Date: 09/12/2019" defaultValue={doDate} onChange={(v) => {
                        if (v.target.value) {
                            setEndDate(v.target.value.toString())
                        }
                    }} />
                </div>

            </div>
            <button style={{ marginTop: 20 }} onClick={() => send()} className="button fs-map-btn">Update</button>
        </div>
    );
}

const CarSearchWidgetFilters: React.FC<{ onChange: (d: ResultsCarsFilterCb) => void }> = ({ onChange }) => {
    const [puDate, setPuDate] = useState<string>();
    const [doDate, setDoDate] = useState<string>();
    const [code, setCode] = useState<IataCode>();

    useEffect(() => {
        if (code && puDate && doDate) {
            onChange({ location: code, puDate, doDate });
        }
    }, [puDate, doDate, code]);

    return (
        <>
            <LocationDropdown onChange={setCode} />
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setPuDate(v.target.value.toString())
                    }
                }} />
            </div>
            <div className="main-search-input-item">
                <input type="text" placeholder="Date: 09/12/2019" onChange={(v) => {
                    if (v.target.value) {
                        setDoDate(v.target.value.toString())
                    }
                }} />
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