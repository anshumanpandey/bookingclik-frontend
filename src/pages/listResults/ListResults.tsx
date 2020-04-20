import React, { useEffect, useState } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { SearchResponse, Terms } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter, SortFilterCars } from './SearchFilter';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import moment from 'moment';
import { useSearchState } from './SearchGlobalState';
import { useSearchWidgetState } from '../main/useSearchWidgetGlobalState';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/DateFormat';

export const SearchForm: React.FC = () => {
    const [puDate] = useSearchWidgetState('puDate')
    const [term] = useSearchWidgetState('term')
    const [doTime] = useSearchWidgetState('doTime')
    const [doDate] = useSearchWidgetState('doDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [iataCode] = useSearchWidgetState('code')

    const [, setSearch] = useSearchState('scrape')

    const [searchRequest, doSearch] = useAxios<SearchResponse>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

    const send = () => {
        if (!iataCode) {
            return;
        }

        const searchCriteria = {
            location: iataCode.code,
            puDate: puDate ? puDate.format(DATE_FORMAT) : moment().format(DATE_FORMAT),
            puTime: puTime ? puTime.format(TIME_FORMAT) : moment().format(TIME_FORMAT),
            doDate: doDate ? doDate.format(DATE_FORMAT) : moment().format(DATE_FORMAT),
            doTime: doTime ? doTime.format(TIME_FORMAT) : moment().format(TIME_FORMAT),
        };

        doSearch({ params: searchCriteria })
            .then((res) => {
                setSearch(res.data.scrape)
            })
    }
    const Filter = term === Terms.Cars ? ListCarsFilter : DefaultListSearchFilters;

    return (
        <>
            {searchRequest.loading && (
                <div className="loader-wrap">
                    <div className="pin"></div>
                    <div className="pulse"></div>
                </div>
            )}
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Filter />
                    <button onClick={() => send()} className="button fs-map-btn">{searchRequest.loading ? 'Searching...' : 'Search'}</button>
                </div>
            </div>
        </>
    );
}

export function ListResult() {
    const history = useHistory<{ results: SearchResponse }>();
    const state = history.location.state;

    const [doDate] = useSearchWidgetState('doDate')
    const [doTime] = useSearchWidgetState('doTime')
    const [puDate] = useSearchWidgetState('puDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [iataCode] = useSearchWidgetState('code')
    const [term] = useSearchWidgetState('term')

    const [layout, setLayout] = useState<'GRID' | 'LIST'>('GRID');

    const [search, setSearch] = useSearchState('scrape')

    const [airConditioner] = useFilterState('airConditioner');
    const [noDoors] = useFilterState('noDoors');
    const [noSeats] = useFilterState('noSeats');
    const [priceRange] = useFilterState('priceRange');
    const [transmission] = useFilterState('transmission');
    const [, setTransmissionOptions] = useFilterState('transmissionOptions');

    const [sortPrice] = useSortState('price');

    useEffect(() => {
        if (!state || !state.hasOwnProperty('results')) {
            history.push('/')
            return
        }
        // @ts-ignore
        setSearch(state.results.scrape)
    }, []);

    useEffect(() => {
        if (!search.vehicle) return
        const options: Set<string> = search.vehicle.reduce((prev, next) => {
            prev.add(next.vehicle.transmission)
            return prev
        }, new Set<string>())

        setTransmissionOptions(Array.from(options.values()))
    }, [search.details]);


    if (!state || !state.hasOwnProperty('results')) {
        return <></>;
    }

    let Body = (<div className="section-title">
        <h2>No results founds!</h2>
        <div className="section-subtitle">No results founds!</div>
        <span className="section-separator"></span>
        <p>Please modify your search. We are sorry we do not have any availability for the dates and times you have selected.</p>
    </div>)

    if (search.vehicle.length > 0) {
        Body = (
            <>
                {search.vehicle
                    .filter(c => airConditioner === true ? c.vehicle.airConditioner === "Yes" : true)
                    .filter(c => {
                        if (noDoors <= 0) {
                            return true
                        }
                        // doors property is a string with format NUM/NUM
                        if (c.vehicle.doors.includes('/')) {
                            const valuePair = c.vehicle.doors.split('/');
                            // if we only get one value use it 
                            if (valuePair.length == 1) return parseInt(valuePair[0]) >= noDoors
                            const sortedValues = valuePair.sort((a, b) => parseInt(a) - parseInt(a));
                            const lastValue = sortedValues.pop()
                            if (!lastValue) return parseInt(valuePair[0]) >= noDoors
                            if (sortedValues.length !== 0) return parseInt(lastValue) >= noDoors
                        }

                        return parseInt(c.vehicle.doors) >= noDoors
                    })
                    .filter(c => {
                        if (noSeats <= 0) {
                            return true
                        }
                        return c.vehicle.seats >= noSeats
                    })
                    .filter(c => airConditioner === true ? c.vehicle.airConditioner === "Yes" : true)
                    .filter(c => transmission !== null ? c.vehicle.transmission === transmission : true)
                    .filter(c => transmission !== null ? c.vehicle.transmission === transmission : true)
                    .filter(c => {
                        if (priceRange[0] == 0) return true
                        return c.vehicle.price >= priceRange[0];
                    })
                    .filter(c => {
                        if (priceRange[1] == 0) return true
                        return c.vehicle.price <= priceRange[1];
                    })
                    .sort((a: any, b: any) => {
                        if (sortPrice === PriceSortOrder.DESC) return a.vehicle.price - b.vehicle.price
                        if (sortPrice === PriceSortOrder.ASC) return b.vehicle.price - a.vehicle.price
                        return a.vehicle.price - b.vehicle.price
                    })
                    .map((v: any, idx: number) => <ListingItem key={idx} {...v} layout={layout} />)}
            </>
        );
    }

    let cheapestCar = null
    if (search.vehicle) {
        cheapestCar = search.vehicle.sort((a, b) => a.vehicle.price - b.vehicle.price)[0];
    }
    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div className="col-list-wrap left-list" style={{ width: '100%' }}>
                        <div className="row" style={{ marginBottom: '1.5rem' }} >
                            <div className="col-md-12 listsearch-options">
                                <div className="container">

                                    <Panel buttonNode={<div className="listsearch-header fl-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3>
                                            <i className="fa fa-car" ></i>
                                            {'   '}
                                            <span>{iataCode?.location} ({iataCode?.code})</span> |
                                        {' '}
                                            {puDate?.format("ddd, MMM D")}, {puTime?.format(" H:mma")} -
                                            {doDate?.format("ddd, MMM D")}, {doTime?.format(" H:mma")}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <div style={{ float: 'right', color: '#4db7fe' }}>
                                                <h4>Change Search <i className="fa fa-search"></i></h4>
                                            </div>
                                            <div className="listing-view-layout">
                                                <ul>
                                                    <li onClick={() => setLayout('GRID')}>
                                                        <div style={{ cursor: 'pointer' }} className={`grid ${layout === 'GRID' ? 'active' : ''}`}>
                                                            <i className="fa fa-th-large"></i>
                                                        </div>
                                                    </li>
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
                                    </div>} >

                                        <SearchForm />
                                    </Panel>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }} >
                            <div style={{ paddingRight: 0, width: '30%' }}>
                                <div className="fl-wrap" id="lisfw" style={{ background: 'white', borderRadius: '6px' }} >
                                    <div className="container" style={{ margin: '0 auto' }}>

                                        {search.vehicle.length !== 0 && (
                                            <>
                                                <div className="listsearch-header fl-wrap" style={{
                                                    paddingTop: 10,
                                                    paddingBottom: 10,
                                                }}>
                                                    <h3>
                                                        Results For: <span>{term}</span>
                                                    </h3>
                                                    <h3>
                                                        {search.vehicle && search.vehicle.length !== 0 &&
                                                            ` ${search.vehicle.length} Vehicles listed below from ${cheapestCar ? cheapestCar.vehicle.currency : ''} ${cheapestCar ? cheapestCar.vehicle.price : ''}`}
                                                    </h3>
                                                </div>
                                                <SortFilterCars />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '50%' }}>
                                <div className="list-main-wrap fl-wrap card-listing" style={{ borderRadius: '6px', padding: 0 }}>
                                    <div className="container" style={{ width: '100%', margin: 0 }}>
                                        {Body}
                                    </div>
                                    {/* <a className="load-more-button" href="#">Load more <i className="fa fa-circle-o-notch"></i> </a>*/}
                                </div>
                            </div>
                            <div style={{ width: '20%' }}>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>
                                <p>ADS</p>

                            </div>
                        </div>

                    </div>
                    <div className="limit-box fl-wrap"></div>
                    <section className="gradient-bg">
                        <div className="cirle-bg">
                            <div className="bg" data-bg="images/bg/circle.png"></div>
                        </div>
                        <div className="container">
                            <div className="join-wrap fl-wrap">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h3>Join our online community</h3>
                                        <p>Grow your marketing and be happy with your online business</p>
                                    </div>
                                    <div className="col-md-4"><a href="#" className="join-wrap-btn modal-open">Sign Up <i className="fa fa-sign-in"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}