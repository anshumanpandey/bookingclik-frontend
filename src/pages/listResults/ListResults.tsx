import React, { useEffect, useState } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { IataCode, SearchResponse, CarsSearchCriteria } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter, SortFilterCars } from './SearchFilter';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import moment from 'moment';
import { useSearchState } from './SearchGlobalState';

export const SearchForm: React.FC<{ criteria: CarsSearchCriteria }> = ({ criteria }) => {
    const [startDate, setStartDate] = useState<string | null>(criteria.puDate || null);
    const [endDate, setEndDate] = useState<string | null>(criteria.doDate || null);
    const [iataCode, setIatacode] = useState<IataCode>(criteria.location || undefined);
    const [, setSearch] = useSearchState('scrape')

    const [searchRequest, doSearch] = useAxios<SearchResponse>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

    useEffect(() => {
        if (!searchRequest.data) return
        setSearch(searchRequest.data.scrape)
    }, [searchRequest])

    const send = () => {
        if (!(iataCode && startDate && endDate)) {
            return;
        }
        const searchCriteria = { location: iataCode.code, puDate: startDate, doDate: endDate };
        doSearch({ params: searchCriteria })
            .then((res) => {
                setSearch(res.data.scrape)
            })
    }
    const Filter = criteria.term.toLowerCase() === 'cars' ? ListCarsFilter : DefaultListSearchFilters;

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
                    <Filter
                        {...criteria}
                        onChange={(r: CarsSearchCriteria) => {
                            setStartDate(r.puDate)
                            setEndDate(r.doDate)
                            setIatacode(r.location)
                        }} />
                    <button onClick={() => send()} className="button fs-map-btn">{searchRequest.loading ? 'Searching...' : 'Search'}</button>
                </div>
            </div>
        </>
    );
}

export function ListResult() {
    const history = useHistory<any>();
    const state = history.location.state;

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
        if (!state || !state.hasOwnProperty('search')) {
            history.push('/')
        }
        setSearch(state.search.results.scrape)
    }, []);

    useEffect(() => {
        if (!search.vehicle) return
        const options: Set<string> = search.vehicle.reduce((prev, next) => {
            prev.add(next.vehicle.transmission)
            return prev
        }, new Set<string>())

        setTransmissionOptions(Array.from(options.values()))
    }, [search.details]);


    if (!state || !state.hasOwnProperty('search')) {
        return <></>;
    }

    const criteria = state.search.criteria;

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
                    .map((v: any, idx: number) => <ListingItem key={idx} {...v} criteria={state.search.criteria} layout={layout} />)}
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
                        <div className="listsearch-options fl-wrap" id="lisfw" >
                            <div className="container">
                                <Panel buttonNode={<div className="listsearch-header fl-wrap">
                                    <h3>
                                        <i className="fa fa-car" ></i>
                                        {'   '}
                                        <span>{criteria.location.location} ({criteria.location.code})</span> |
                                        {' '}
                                        {moment(state.search.results.scrape.details.pickup.datetime, "DD/MM/YYYY H:mm").format("ddd, MMM D, H:mma")} -
                                        {moment(state.search.results.scrape.details.dropoff.datetime, "DD/MM/YYYY H:mm").format("ddd, MMM D, H:mma")}
                                    </h3>
                                    <div style={{ float: 'right', color: '#4db7fe' }}>
                                        <h4>Change Search <i className="fa fa-search"></i></h4>
                                    </div>
                                </div>} >

                                    <SearchForm criteria={criteria} />
                                </Panel>
                                {search.vehicle.length !== 0 && (
                                    <>
                                        <div className="listsearch-header fl-wrap" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        }}>
                                            <h3>
                                                Results For : <span>{criteria.term}</span> |
                                                {search.vehicle && search.vehicle.length !== 0 &&
                                                ` ${search.vehicle.length} Vehicles listed below from ${cheapestCar? cheapestCar.vehicle.currency : ''} ${cheapestCar ? cheapestCar.vehicle.price : ''}`}
                                            </h3>
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
                                        <SortFilterCars />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="list-main-wrap fl-wrap card-listing">
                            <a className="custom-scroll-link back-to-filters btf-l" href="#lisfw"><i className="fa fa-angle-double-up"></i><span>Back to Filters</span></a>
                            <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {Body}
                            </div>
                            {/* <a className="load-more-button" href="#">Load more <i className="fa fa-circle-o-notch"></i> </a>*/}
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