import React, { useState, useEffect, useContext, useMemo } from 'react';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { IataCode, CarsFilterProps, CarsSearchCriteria } from '../../types';
import { DateInput } from '../../partials';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';

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
        <>

            <LocationDropdown secondary={true} defaultValue={location} style={{ backgroundColor: '#4DB7FE', color: 'white' }} customeClasses="listsearch-input-item listResultSelect" onChange={setCode} />
            <div className="listsearch-input-item">
                <DateInput defaultValue={puDate} onChange={(v) => setStartDate(v)} />
            </div>
            <div className="listsearch-input-item">
                <DateInput defaultValue={doDate} onChange={(v) => setEndDate(v)} />
            </div>

        </>
    );
}

export const SortFilterCars: React.FC = () => {
    const [sortPrice, setSortPrice] = useSortState('price');

    const [airConditioner, setAirConditioner] = useFilterState('airConditioner');
    const [noDoors, setNoDoors] = useFilterState('noDoors');
    const [noSeats, setNoSeats] = useFilterState('noSeats');
    const [, setTransmission] = useFilterState('transmission');
    const [transmissionOptions] = useFilterState('transmissionOptions');

    useEffect(() => {
        // @ts-ignore
        $('#transmission-select').niceSelect()
    }, []);

    useEffect(() => {
        // @ts-ignore
        $('#transmission-select').niceSelect('update')
    }, [transmissionOptions]);

    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>

                <div className="profile-edit-container add-list-container">
                    <Panel buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                        <h4 className="more-filter-option" style={{ float: 'left' }}>Filter</h4>
                    </div>} >
                        <div className="custom-form">
                            <div className="row" style={{ display: 'flex'}}>
                                <div className="col-md-6">
                                    <div className="act-widget fl-wrap" style={{ marginBottom: 0}}>
                                        <div className="act-widget-header">
                                            <h4>A/C</h4>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch5" checked={airConditioner} onChange={() => setAirConditioner(!airConditioner)} />
                                                <label className="onoffswitch-label" htmlFor="myonoffswitch5">
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {(
                                    <div className="col-md-6" onClick={(e) => {
                                        const value = $('#transmission-select').val();
                                        if (!value) return

                                        if (transmissionOptions.includes(value.toString())) {
                                            setTransmission(value.toString())
                                        } else {
                                            setTransmission(null)
                                        }

                                    }}>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            paddingBottom: '15px',
                                        }}>
                                        <select id="transmission-select" data-placeholder="Transmission" className="no-search-select transmission-select" >
                                            <option value="all">Transmission</option>
                                            {transmissionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="quantity act-widget-header fl-wrap">
                                        <span>
                                        <img src="http://www.right-cars.com/public/img/icons/door.png"/>
                                            No. Doors : 
                                        </span>
                                        <div className="quantity-item">
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="-" onClick={() => noDoors - 1 >= 0 ? setNoDoors(noDoors - 1) : undefined} className="minus" />
                                            <input type="text" style={{ marginBottom: 0 }} name="quantity" title="Qty" className="qty" step="1" readOnly value={noDoors} />
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="+" onClick={() => noDoors + 1 >= 0 ? setNoDoors(noDoors + 1) : undefined} className="plus" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="quantity act-widget-header fl-wrap">
                                        <span>
                                            <img src="http://www.right-cars.com/public/img/icons/seats.png" />
                                            No. Seats : 
                                        </span>
                                        <div className="quantity-item">
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="-" onClick={() => noSeats - 1 >= 0 ? setNoSeats(noSeats - 1) : undefined} className="minus" />
                                            <input type="text" style={{ marginBottom: 0 }} readOnly name="quantity" title="Qty" className="qty" step="1" value={noSeats} />
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="+" onClick={() => noSeats + 1 >= 0 ? setNoSeats(noSeats + 1) : undefined} className="plus" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <Panel buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                        <h4 className="more-filter-option" style={{ float: 'left' }}>Sort</h4>
                    </div>}>
                        <div className="custom-form">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="list-single-header-item-opt fl-wrap" onClick={() => setSortPrice(sortPrice == PriceSortOrder.ASC ? PriceSortOrder.DESC : PriceSortOrder.ASC)}>
                                        <div className="list-single-header-cat fl-wrap">
                                            <a href="#" onClick={(e) => e.preventDefault()}>Price {sortPrice}</a>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </Panel>


                </div>
            </div>
        </>
    );
}



