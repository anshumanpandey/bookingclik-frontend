import React, { useState, useEffect, useContext, useMemo } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
import { Typography, Slider } from '@material-ui/core';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { DateInput } from '../../partials';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import { useSearchState } from './SearchGlobalState';
import moment from 'moment';
import { useSearchWidgetState } from '../main/useSearchWidgetGlobalState';
import { TimeInput } from '../../partials/TimeInput';
import { TagSearchWidget } from '../../widget/TagSearchWidget';
import { Terms, DynamicFilter } from '../../types';

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


export const ListCarsFilter: React.FC = () => {
    const [puDate, setPuDate] = useSearchWidgetState("puDate")
    const [puTime, setPuTime] = useSearchWidgetState("puTime")

    const [doDate, setDoDate] = useSearchWidgetState("doDate")
    const [doTime, setDoTime] = useSearchWidgetState("doTime")

    const [iataCode, setIataCode] = useSearchWidgetState("code")

    return (
        <>

            <LocationDropdown
                secondary={true}
                defaultValue={iataCode}
                style={{ backgroundColor: '#4DB7FE', color: 'white' }}
                customeClasses="listsearch-input-item listResultSelect"
                onChange={setIataCode}
            />
            <div className="listsearch-input-item">
                <DateInput defaultValue={puDate} onChange={(v) => setPuDate(v)} />
            </div>

            <div className="listsearch-input-item">
                <TimeInput defaultValue={puTime} onChange={(v) => setPuTime(v)} />
            </div>

            <div className="listsearch-input-item">
                <DateInput defaultValue={doDate} onChange={(v) => setDoDate(v)} />
            </div>

            <div className="listsearch-input-item">
                <TimeInput defaultValue={doTime} onChange={(v) => setDoTime(v)} />
            </div>

        </>
    );
}

export const SortFilterCars: React.FC = () => {
    const [search] = useSearchState('scrape')

    const [sortPrice, setSortPrice] = useSortState('price');

    const [airConditioner, setAirConditioner] = useFilterState('airConditioner');
    const [priceRange, setPriceRange] = useFilterState('priceRange');
    const [noDoors, setNoDoors] = useFilterState('noDoors');
    const [noSeats, setNoSeats] = useFilterState('noSeats');
    const [, setTransmission] = useFilterState('transmission');
    const [transmissionOptions] = useFilterState('transmissionOptions');
    const [term] = useSearchWidgetState("term")

    const [filterReq] = useAxios<DynamicFilter[]>({
        url: `${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/categories/${Terms.Cars}`,
    })

    // @ts-ignore
    useEffect(() => { $('#transmission-select').niceSelect() }, []);
    // @ts-ignore
    useEffect(() => { $('#transmission-select').niceSelect('update') }, [transmissionOptions]);

    const mostExpensiveCar: any | undefined = search.vehicle.sort((a, b) => b.vehicle.price - a.vehicle.price)[0]

    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>

                <div className="profile-edit-container add-list-container">
                    <Panel buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                        <h4 className="more-filter-option" style={{ float: 'left' }}>Filter</h4>
                    </div>} >
                        <div className="custom-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="act-widget fl-wrap" style={{ marginBottom: 0 }}>
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

                                {filterReq.data && filterReq.data.map((filter: any) => {
                                    if (filter.values.length === 0) return <></>;
                                    return (
                                        <div className="col-md-12">
                                            <TagSearchWidget
                                                options={filter.values.map((f:any) => ({ label: f.name, value: f.value }))}
                                                category={{ name: filter.name, propertyToWatch: filter.responseProperty }}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    );
                                })}

                                <div className="col-md-12">
                                    <div className="quantity act-widget-header fl-wrap">
                                        <span>
                                            <img src="http://www.right-cars.com/public/img/icons/door.png" />
                                            No. Doors :
                                        </span>
                                        <div className="quantity-item">
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="-" onClick={() => noDoors - 1 >= 0 ? setNoDoors(noDoors - 1) : undefined} className="minus" />
                                            <input type="text" style={{ marginBottom: 0 }} name="quantity" title="Qty" className="qty" step="1" readOnly value={noDoors} />
                                            <input type="button" style={{ marginBottom: 0 }} readOnly value="+" onClick={() => noDoors + 1 >= 0 ? setNoDoors(noDoors + 1) : undefined} className="plus" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
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

                                <div className="col-md-12">
                                    <Typography id="range-slider" gutterBottom>
                                        Price range
                                    </Typography>
                                    <Slider
                                        min={0}
                                        max={mostExpensiveCar ? parseFloat(mostExpensiveCar.vehicle.price) : 0}
                                        value={priceRange}
                                        onChange={(e, v) => {
                                            if (!Array.isArray(v)) return
                                            setPriceRange([v[0], v[1]])
                                        }}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                    />
                                </div>
                            </div>
                        </div>
                    </Panel>
                    <Panel buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                        <h4 className="more-filter-option" style={{ float: 'left' }}>Sort</h4>
                    </div>}>
                        <div className="custom-form">

                            <div className="row">
                                <div className="col-md-12">
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



