import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks'
import { CircularProgress, Checkbox, FormControlLabel, FormLabel, Typography } from '@material-ui/core';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { DateInput } from '../../partials';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import { useSearchWidgetState, dispatchSearchState } from '../main/useSearchWidgetGlobalState';
import { TimeInput } from '../../partials/TimeInput';
import { TagSearchWidget } from '../../widget/TagSearchWidget';
import { SimpleTagSearchWidget } from '../../widget/SimpleTagSearchWidget';
import { NumberSearchWidget } from '../../widget/NumberSearchWidget';
import { RangeSearchWidget } from '../../widget/RangeSearchWidget';
import { Terms, DynamicFilter, SearchResponse, GRCGDSCode } from '../../types';
import { useSearchState, dispatchFilteredState, useFilteredSearchState } from './SearchGlobalState';
import moment from 'moment';
import useDidMountEffect from '../../utils/useDidMountEffect';
import { useHistory } from 'react-router-dom';
import { useDynamicFiltersState } from '../../widget/DynamicFilterState';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
import qs from 'qs';
import CarBrands from './carbrands.json';

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


export const ListCarsFilter: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
    const history = useHistory<{ results: SearchResponse, params: { location: GRCGDSCode, puDate: number, puTime: number, doDate: number, doTime: number } }>();
    const [puDate] = useSearchWidgetState('puDate')
    const [term] = useSearchWidgetState('term')
    const [doTime] = useSearchWidgetState('doTime')
    const [doDate] = useSearchWidgetState('doDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [pickUpCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode] = useSearchWidgetState('dropoffCode')

    const [innerPuLocation, setPuLocation] = useState(pickUpCode);
    const [innterDoLocation, setDoLocation] = useState(dropoffCode);
    const [innerDoDate, setDoDate] = useState(doDate);
    const [innerDoTime, setDoTime] = useState(doTime);
    const [innerPuDate, setPuDate] = useState(puDate);
    const [innerPuTime, setPuTime] = useState(puTime);

    const [displayDropoffInput, setDisplayDropoffInput] = useState(dropoffCode ? true : false)


    const [dynamicFilters] = useDynamicFiltersState('activeFilters');

    const [searchRequest, doSearch] = useAxios<SearchResponse>({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
        method: 'POST',
    }, { manual: true })

    useDidMountEffect(() => {
        dispatchFilteredState({ type: 'loading', state: searchRequest.loading })
    }, [searchRequest]);

    useDidMountEffect(() => {
        send()
    }, [dynamicFilters.length]);

    const send = () => {
        if (!pickUpCode) return;
        if (!dropoffCode) return;

        const filterToSend = []

        if (dynamicFilters.some(filter => filter.category.type === 'tag' && filter.activeValues.length !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.category.type === 'tag' && filter.activeValues.length !== 0)
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.activeValues.map(v => v.value) })))
        }

        if (dynamicFilters.some(filter => filter.category.type === 'number' && filter.counter !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.category.type === 'number' && filter.counter !== 0)
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.counter })))
        }

        if (dynamicFilters.some(filter => filter.category.type === 'range' && filter.counter !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.range && filter.range.length == 2 && filter.range.some(v => v !== 0))
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.range })))
        }

        let urlParams = {
            pickUpLocationCode: pickUpCode.internalcode,
            pickUpLocationName: pickUpCode.locationname,
            pickUpDate: puDate ? puDate.unix() : moment().unix(),
            pickUpTime: puTime ? puTime.unix() : moment().unix(),

            dropOffLocationCode: dropoffCode.internalcode,
            dropOffLocationName: dropoffCode.locationname,
            dropOffDate: doDate ? doDate.unix() : moment().unix(),
            dropOffTime: doTime ? doTime.unix() : moment().unix(),
        };

        const jsonParams = {
            pickUpLocation: pickUpCode,
            dropOffLocation: dropoffCode,

            pickUpDate: puDate ? puDate : moment(),
            pickUpTime: puTime ? puTime : moment(),
            dropOffDate: doDate ? doDate : moment(),
            dropOffTime: doTime ? doTime : moment(),
            filters: dynamicFilters
        }

        doSearch({ data: { json: BuildJsonQuery(jsonParams) } })
            .then((res) => {
                history.push({
                    pathname: '/results',
                    search: `?${qs.stringify(urlParams)}`,
                });
                const mapperVehicles = res.data.scrape.vehicle.map((v: any, idx: number) => {
                    const dropDate = innerDoDate.set('hours', 0).set('m', 0)
                    const pickDate = innerPuDate.set('hours', 0).set('m', 0)

                    const daySpan = dropDate.diff(pickDate, 'days')
                    return {
                        ...v,
                        daySpan
                    };
                })

                res.data.scrape.vehicle = [...mapperVehicles];
                dispatchFilteredState({ type: 'set', state: res.data.scrape })
            })
    }
    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#154a64' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <LocationDropdown
                            secondary={true}
                            defaultCode={pickUpCode}
                            style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px' }}
                            customeClasses="listsearch-input-item m-b-0"
                            onChange={(v) => setPuLocation(v)} />
                    </div>
                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox onChange={() => setDisplayDropoffInput(p => !p)} checked={!displayDropoffInput} style={{ color: 'white', alignSelf: 'flex-start' }} />}
                        label={'Return car on same location'}

                    />
                    {displayDropoffInput && (
                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>

                            <LocationDropdown
                                secondary={true}
                                defaultCode={dropoffCode}
                                style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px' }}
                                customeClasses="listsearch-input-item m-b-0"
                                onChange={(v) => setDoLocation(v)} />
                        </div>
                    )}
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormLabel style={{ color: 'white', alignSelf: 'flex-start' }}>Pick-up date</FormLabel>
                            <div style={{ display: 'flex' }}>
                                <div className="listsearch-input-item" style={{ width: '40%', display: 'flex', alignItems: 'stretch' }}>
                                    <DateInput style={{
                                        borderRadius: '6px',
                                        marginRight: '0.5rem',
                                        border: 'unset'
                                    }} defaultValue={puDate} onChange={(v) => setPuDate(v)} />
                                </div>

                                <div className="listsearch-input-item" style={{ width: '40%', background: 'white', borderRadius: '6px' }}>
                                    <TimeInput
                                        defaultValue={puTime?.set('seconds', 0)}
                                        onChange={(v) => setPuTime(v)} />
                                </div>
                            </div>
                        </div>

                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormLabel style={{ color: 'white', alignSelf: 'flex-start' }}>Drop-off date</FormLabel>
                            <div style={{ display: 'flex' }}>
                                <div className="listsearch-input-item" style={{ width: '40%', display: 'flex', alignItems: 'stretch' }}>
                                    <DateInput style={{
                                        borderRadius: '6px',
                                        border: 'unset',
                                        marginRight: '0.5rem'
                                    }} defaultValue={doDate} onChange={(v) => setDoDate(v)} />
                                </div>

                                <div className="listsearch-input-item" style={{ width: '40%', background: 'white', borderRadius: '6px' }}>
                                    <TimeInput
                                        style={{ borderRadius: '6px' }}
                                        defaultValue={doTime?.set('seconds', 0)}
                                        onChange={(v) => setDoTime(v)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button style={{ backgroundColor: '#03bfcb', color: 'white', fontSize: '1.3rem', float: 'right', fontWeight: 'bold', alignSelf: 'end' }} onClick={() => {
                        dispatchSearchState({ type: 'pickup.date', state: innerPuDate })
                        dispatchSearchState({ type: 'pickup.time', state: innerPuTime })
                        dispatchSearchState({ type: 'dropoff.date', state: innerDoDate })
                        dispatchSearchState({ type: 'dropoff.time', state: innerDoTime })
                        dispatchSearchState({ type: 'pickup.code', state: innerPuLocation })
                        dispatchSearchState({ type: 'dropoff.code', state: innterDoLocation || innerPuLocation })
                        onSearch()
                        send()
                    }} className="button fs-map-btn">{searchRequest.loading ? 'Searching...' : 'Search'}</button>
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
        const key = next.vehicle.carrentalcompanyname;
        if (key) {
            prev.add(key)
        }
        return prev
    }, new Set<string>()).values()).map(token => ({ label: token, value: token })) as { label: string, value: string }[]

    if (filterReq.error) {
        body = <h3>Error loading filters</h3>
    } else {
        body = (<div className="profile-edit-container add-list-container filters-panel">
            <Panel defaultOpen={true} buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                <Typography gutterBottom style={{ textAlign: 'left' }}>
                    Filter
                </Typography>
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
                                    category={{ name: 'Supplier', propertyToWatch: 'rental_car_company', type: 'tag' }}
                                    onChange={(valuesToFilterFor) => {
                                        console.log("loading", 1)
                                        dispatchFilteredState({ type: 'loading', state: true })
                                        let cars = search.vehicle;
                                        setTimeout(() => {
                                            if (valuesToFilterFor.length != 0) {
                                                cars = search.vehicle.filter((v: any) => {
                                                    return v.vehicle.carrentalcompanyname && v.vehicle.carrentalcompanyname.match(`(${valuesToFilterFor.join('|')})`);
                                                })
                                            }
                                            dispatchFilteredState({ type: 'set', state: { ...search, vehicle: cars } })
                                            dispatchFilteredState({ type: 'loading', state: false })
                                        }, 0);

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



