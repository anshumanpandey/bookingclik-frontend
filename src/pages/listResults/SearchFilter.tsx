import React, { useState, useEffect } from 'react';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { IataCode, CarsFilterProps, CarsSearchCriteria } from '../../types';
import { DateInput } from '../../partials';

export const DefaultListSearchFilters: React.FC = () => {
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


export const ListCarsFilter: React.FC<CarsFilterProps & CarsSearchCriteria> = ({ onChange, puDate, doDate, location }) => {
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
                <LocationDropdown defaultValue={location} style={{ backgroundColor: '#4DB7FE', color: 'white' }} customeClasses="listsearch-input-item listResultSelect" onChange={setCode} />
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
