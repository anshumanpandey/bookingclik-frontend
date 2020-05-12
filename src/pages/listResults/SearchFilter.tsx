import React, { useEffect } from 'react';
import useAxios from 'axios-hooks'
import { CircularProgress, Checkbox, FormControlLabel, FormLabel } from '@material-ui/core';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { DateInput } from '../../partials';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import { useSearchWidgetState } from '../main/useSearchWidgetGlobalState';
import { TimeInput } from '../../partials/TimeInput';
import { TagSearchWidget } from '../../widget/TagSearchWidget';
import { SimpleTagSearchWidget } from '../../widget/SimpleTagSearchWidget';
import { NumberSearchWidget } from '../../widget/NumberSearchWidget';
import { RangeSearchWidget } from '../../widget/RangeSearchWidget';
import { Terms, DynamicFilter } from '../../types';
import { useSearchState, dispatchFilteredState, useFilteredSearchState } from './SearchGlobalState';

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

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <LocationDropdown
                    secondary={true}
                    defaultCode={iataCode}
                    style={{ backgroundColor: '#4DB7FE', color: 'white' }}
                    customeClasses="listsearch-input-item m-b-0"
                    onChange={setIataCode}
                />
                <FormControlLabel
                    control={<Checkbox style={{ alignSelf: 'flex-start' }} />}
                    label={'Return car on same location'}

                />
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
                <FormLabel style={{ alignSelf: 'flex-start' }}>Pick-up date</FormLabel>
                <div style={{ display: 'flex' }}>
                    <div className="listsearch-input-item" style={{ width: '30%', display: 'flex', alignItems: 'stretch' }}>
                        <DateInput style={{
                            borderBottomLeftRadius: '6px',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            border: 'unset'
                        }} defaultValue={puDate} onChange={(v) => setPuDate(v)} />
                    </div>

                    <div className="listsearch-input-item" style={{ width: '30%' }}>
                        <TimeInput style={{ borderLeft: '1px solid gray', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: '6px', borderTopRightRadius: '6px' }} grayBackgraound={true} defaultValue={puTime} onChange={(v) => setPuTime(v)} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
                <FormLabel style={{ alignSelf: 'flex-start' }}>Drop-off date</FormLabel>
                <div style={{ display: 'flex' }}>
                    <div className="listsearch-input-item" style={{ width: '30%', display: 'flex', alignItems: 'stretch' }}>
                        <DateInput style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            border: 'unset'
                        }} defaultValue={doDate} onChange={(v) => setDoDate(v)} />
                    </div>

                    <div className="listsearch-input-item" style={{ width: '30%' }}>
                        <TimeInput style={{ borderLeft: '1px solid gray', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: '6px', borderTopRightRadius: '6px' }} grayBackgraound={true} defaultValue={doTime} onChange={(v) => setDoTime(v)} />
                    </div>
                </div>
            </div>

        </>
    );
}

export const SearchFilterCars: React.FC = () => {
    const [search] = useSearchState('scrape')

    const [sortPrice, setSortPrice] = useSortState('price');
    const [transmissionOptions] = useFilterState('transmissionOptions');

    const [filterReq] = useAxios<DynamicFilter[]>({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/categories/${Terms.Cars}`,
    })

    // @ts-ignore
    useEffect(() => { $('#transmission-select').niceSelect() }, []);
    // @ts-ignore
    useEffect(() => { $('#transmission-select').niceSelect('update') }, [transmissionOptions]);

    let body = <CircularProgress color="inherit" />

    const carRentalCompanyOptions = Array.from(search.vehicle.reduce((prev: { add: (arg0: any) => void; }, next: { vehicle: { suppliername: any; carrentalcompanyname: any; }; }) => {
        const key = next.vehicle.suppliername ? next.vehicle.suppliername : next.vehicle.carrentalcompanyname
        if (key) {
            prev.add(key)
        }
        return prev
    }, new Set<string>()).values()).map(token => ({ label: token, value: token })) as { label: string, value: string }[]

    if (filterReq.error) {
        body = <h3>Error loading filters</h3>
    } else {
        body = (<div className="profile-edit-container add-list-container">
            <Panel defaultOpen={true} buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                <h4 className="more-filter-option" style={{ float: 'left' }}>Filter</h4>
            </div>} >
                <div className="custom-form">
                    <div className="row">

                        {filterReq.data && filterReq.data.map((filter) => {
                            if (filter.type === 'tag' && filter.values.length !== 0) {
                                return (
                                    <div className="col-md-12">
                                        <TagSearchWidget
                                            key={filter.createdAt}
                                            options={filter.values.map((f: any) => ({ label: f.name, value: f.value }))}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }

                            if (filter.type === 'number') {
                                return (
                                    <div className="col-md-12">
                                        <NumberSearchWidget
                                            key={filter.createdAt}
                                            options={filter.values.map((f: any) => ({ label: f.name, value: f.value }))}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }

                            if (filter.type === 'range') {
                                return (
                                    <div className="col-md-12">
                                        <RangeSearchWidget
                                            key={filter.createdAt}
                                            minValue={'0'}
                                            maxValue={'1000'}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }
                        })}

                        {carRentalCompanyOptions.length !== 0 && (
                            <div className="col-md-12">
                                <SimpleTagSearchWidget
                                    options={carRentalCompanyOptions}
                                    category={{ name: 'Rental car company', propertyToWatch: 'rental_car_company', type: 'tag' }}
                                    onChange={(valuesToFilterFor) => {
                                        let cars = search.vehicle;
                                        if (valuesToFilterFor.length != 0) {
                                            cars = search.vehicle.filter((v: any) => {
                                                return valuesToFilterFor.includes(v.vehicle.carrentalcompanyname || '') ||
                                                    valuesToFilterFor.includes(v.vehicle.suppliername || '')
                                            })
                                        }

                                        dispatchFilteredState({ type: 'set', state: { ...search, vehicle: cars } })
                                    }}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </Panel>
        </div>);
    }

    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', minHeight: '50%', flexDirection: 'column', marginTop: 0 }}>
                {body}
            </div>
        </>
    );
}



