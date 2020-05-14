import React, { useEffect, useState, useRef } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { SearchResponse, Terms, GRCGDSCode } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter, SearchFilterCars } from './SearchFilter';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import moment from 'moment';
import { dispatchSearchState, useSearchState, dispatchFilteredState, useFilteredSearchState } from './SearchGlobalState';
import { useSearchWidgetState } from '../main/useSearchWidgetGlobalState';
import { useDynamicFiltersState } from '../../widget/DynamicFilterState';
import { useGlobalState } from '../../state';
import queryString from 'query-string';
import qs from 'qs';
import { useDidUpdateEffect } from '../../utils/DidUpdateEffect';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
import useDidMountEffect from '../../utils/useDidMountEffect';

export const SearchForm: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
    const history = useHistory<{ results: SearchResponse, params: { location: GRCGDSCode, puDate: number, puTime: number, doDate: number, doTime: number } }>();
    const [puDate] = useSearchWidgetState('puDate')
    const [term] = useSearchWidgetState('term')
    const [doTime] = useSearchWidgetState('doTime')
    const [doDate] = useSearchWidgetState('doDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [pickUpCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode] = useSearchWidgetState('dropoffCode')

    const [dynamicFilters] = useDynamicFiltersState('activeFilters');

    const [searchRequest, doSearch] = useAxios<SearchResponse>({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
        method: 'POST',
    }, { manual: true })

    useDidMountEffect(() => {
        console.log('dispatchFilteredState')

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
                dispatchSearchState({ type: 'set', state: res.data.scrape })
                dispatchFilteredState({ type: 'set', state: res.data.scrape })
            })
    }
    const Filter = term === Terms.Cars ? ListCarsFilter : DefaultListSearchFilters;

    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#154a64' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Filter />
                    <button style={{ backgroundColor: '#03bfcb', color: 'white', fontSize: '1.3rem', float: 'right', fontWeight: 'bold', alignSelf: 'end' }} onClick={() => {
                        onSearch()
                        send()
                    }} className="button fs-map-btn">{searchRequest.loading ? 'Searching...' : 'Search'}</button>
                </div>
            </div>
        </>
    );
}

export function ListResult() {
    const history = useHistory<{ results: SearchResponse, params: { location: GRCGDSCode, puDate: number, puTime: number, doDate: number, doTime: number } }>();
    const state = history.location.state;

    const [searchPanelOpen, setSearchPanelOpen] = useState(false)
    const [doDate, setDoDate] = useSearchWidgetState('doDate')
    const [doTime, setDoTime] = useSearchWidgetState('doTime')
    const [puDate, setPuDate] = useSearchWidgetState('puDate')
    const [puTime, setPuTime] = useSearchWidgetState('puTime')
    const [pickUpCode, setPickUpCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')
    const [layout, setLayout] = useState<'GRID' | 'LIST'>('LIST');
    const [search, setSearch] = useSearchState('scrape')
    const [sortPrice, setSortPrice] = useSortState('price');
    const [, setLoading] = useGlobalState('loading')
    const [filetredSearch] = useFilteredSearchState('filteredScrape');
    const [isfiltering] = useFilteredSearchState('isfiltering');

    const [{ data, loading, error }, doSearch] = useAxios({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
        method: 'POST'
    }, { manual: true })

    const urlParams = queryString.parse(history.location.search)

    useEffect(() => {
        console.log('init')
        console.log(state)

        // @ts-ignore
        if (!state || !state.hasOwnProperty('results')) {
            setLoading(true)

            if (!urlParams.pickUpLocationCode) return
            if (!urlParams.dropOffLocationCode) return


            const params = {
                pickUpLocation: {
                    internalcode: urlParams.pickUpLocationCode?.toString(),
                    locationname: urlParams.pickUpLocationName?.toString()
                } as GRCGDSCode,
                pickUpDate: urlParams.pickUpDate ? moment.unix(parseInt(urlParams.pickUpDate.toString())) : moment(),
                pickUpTime: urlParams.pickUpTime ? moment.unix(parseInt(urlParams.pickUpTime.toString())) : moment(),

                dropOffLocation: {
                    internalcode: urlParams.dropOffLocationCode?.toString(),
                    locationname: urlParams.dropOffLocationName?.toString()
                } as GRCGDSCode,
                dropOffDate: urlParams.dropOffDate ? moment.unix(parseInt(urlParams.dropOffDate.toString())) : moment(),
                dropOffTime: urlParams.dropOffTime ? moment.unix(parseInt(urlParams.dropOffTime.toString())) : moment(),
            }
            setPickUpCode(params.pickUpLocation);
            setDropoffCode(params.dropOffLocation);
            setDoDate(params.dropOffDate);
            setDoTime(params.dropOffTime);
            setPuDate(params.pickUpDate);
            setPuTime(params.pickUpTime);


            doSearch({ data: { json: BuildJsonQuery(params) } })
                .then(r => {
                    dispatchSearchState({ type: 'set', state: r.data.scrape })
                    dispatchFilteredState({ type: 'set', state: r.data.scrape })
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        } else {
            const params = {
                pickUpLocation: {
                    internalcode: urlParams.pickUpLocationCode?.toString(),
                    locationname: urlParams.pickUpLocationName?.toString()
                } as GRCGDSCode,
                pickUpDate: urlParams.pickUpDate ? moment.unix(parseInt(urlParams.pickUpDate.toString())) : moment(),
                pickUpTime: urlParams.pickUpTime ? moment.unix(parseInt(urlParams.pickUpTime.toString())) : moment(),

                dropOffLocation: {
                    internalcode: urlParams.dropOffLocationCode?.toString(),
                    locationname: urlParams.dropOffLocationName?.toString()
                } as GRCGDSCode,
                dropOffDate: urlParams.dropOffDate ? moment.unix(parseInt(urlParams.dropOffDate.toString())) : moment(),
                dropOffTime: urlParams.dropOffTime ? moment.unix(parseInt(urlParams.dropOffTime.toString())) : moment(),
            }
            setPickUpCode(params.pickUpLocation);
            setDropoffCode(params.dropOffLocation);
            setDoDate(params.dropOffDate);
            setDoTime(params.dropOffTime);
            setPuDate(params.pickUpDate);
            setPuTime(params.pickUpTime);

            dispatchSearchState({ type: 'set', state: state.results.scrape })
            dispatchFilteredState({ type: 'set', state: state.results.scrape })
        }
    }, []);


    let Body = (<div className="section-title">
        <h2>No results founds!</h2>
        <span className="section-separator"></span>
        <p>Please modify your search. We are sorry we do not have any availability for the dates and times you have selected.</p>
    </div>)

    let cheapestCar = null
    if (filetredSearch.vehicle) {
        cheapestCar = filetredSearch.vehicle.sort((a: any, b: any) => a.vehicle.price - b.vehicle.price)[0];
    }

    if (filetredSearch.vehicle.length > 0) {
        let filteredValues = filetredSearch.vehicle
            .sort((a: any, b: any) => {
                if (sortPrice === PriceSortOrder.DESC) return a.vehicle.price - b.vehicle.price
                if (sortPrice === PriceSortOrder.ASC) return b.vehicle.price - a.vehicle.price
                return a.vehicle.price - b.vehicle.price
            })
        Body = (
            <>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <div className="row" style={{ width: '100%' }}>
                        <div className="scroll-nav-wrapper no-fixed fl-wrap" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                        }}>
                            <div style={{
                                color: '#878C9F',
                                borderRadius: '6px',
                                padding: '5px 15px',
                                fontSize: '13px',
                                fontWeight: 500,
                                alignSelf: 'center',
                            }}>Sort By:</div>

                            <nav className="scroll-nav scroll-init sort">
                                <ul>
                                    <li onClick={() => setSortPrice((prev) => {
                                        if (prev === PriceSortOrder.DESC) return PriceSortOrder.ASC
                                        if (prev === PriceSortOrder.ASC) return PriceSortOrder.DESC
                                        return PriceSortOrder.ASC
                                    })}><a className="act-scrlink" href="#sec1">Price</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 'unset', float: 'left', color: 'black', alignSelf: 'flex-start' }} className="big-header">Showing {filteredValues.length} out of {search.vehicle.length} cars
                {filetredSearch.vehicle && filetredSearch.vehicle.length !== 0 &&
                                ` from ${cheapestCar ? cheapestCar.vehicle.currency : ''} ${cheapestCar ? cheapestCar.vehicle.price : ''}`}
                        </h3>
                </div>
                <div>
                    {isfiltering && (
                        <div className="loader-wrap" style={{ justifyContent: 'center', backgroundColor: '#00476710', position: 'absolute', display: 'flex' }}>
                            <div style={{ marginTop: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img style={{ width: '60%'}} src={`${process.env.PUBLIC_URL}/images/logoblue.png`} />
                                <div style={{ position: 'unset' }} className="pulse"></div>
                            </div>
                        </div>
                    )}
                    {filteredValues.map((v: any, idx: number) => <ListingItem key={idx} {...v} layout={layout} />)}
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <section className="gray-bg no-pading no-top-padding" style={{ paddingTop: "1rem" }} id="sec1">
                        <div className="col-list-wrap fh-col-list-wrap  left-list">
                            <div className="container" style={{ maxWidth: 'unset', margin: 'auto' }}>
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="listsearch-header fl-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: 'unset' }}>
                                                <i className="fa fa-car" ></i>
                                                {'   '}
                                                <span style={{ color: '#154a64' }}>{pickUpCode?.locationname} ({pickUpCode?.internalcode})</span> |
                                        {'  '}
                                                {puDate?.format("ddd, MMM D")}, {puTime?.format(" H:mma")} -
                                            {doDate?.format("ddd, MMM D")}, {doTime?.format(" H:mma")}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div onClick={() => setSearchPanelOpen(p => !p)} style={{ float: 'right' }}>
                                                    <h4 style={{ color: '#154a64to-top' }}>Change Search <i className="fa fa-search"></i></h4>
                                                </div>
                                                <div className="listing-view-layout">
                                                    <ul>
                                                        {/*<li onClick={() => setLayout('GRID')}>
                                                            <div style={{ cursor: 'pointer' }} className={`grid ${layout === 'GRID' ? 'active' : ''}`}>
                                                                <i className="fa fa-th-large"></i>
                                                            </div>
                                                        </li>*/}
                                                        {/*
                                                    TODO: enable this later
                                                    <li onClick={() => setLayout('LIST')}>
                                                        <div style={{ cursor: 'pointer' }} className={`list ${layout === 'LIST' ? 'active' : ''}`}>
                                                            <i className="fa fa-list-ul"></i>
                                                        </div>
                                                    </li>*/}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <Panel open={searchPanelOpen} >
                                            <SearchForm onSearch={() => {
                                                console.log('closing')
                                                setSearchPanelOpen(false)
                                            }} />
                                        </Panel>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="fl-wrap">
                                            <SearchFilterCars />
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="fl-wrap card-listing">
                                            {Body}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="fl-wrap card-listing">
                                            <img style={{ maxWidth: '100%' }} src={'images/all/ad.png'}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="limit-box fl-wrap"></div>
                </div>
            </div>
            <Footer />
        </>
    );
}