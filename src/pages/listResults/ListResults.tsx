import React, { useEffect, useState } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { IataCode, SearchResponse, CarsSearchCriteria } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter } from './SearchFilter';
import { useFilterState } from './FiltersGlobalState';
import { useSortState, PriceSortOrder } from './SortGlobalState';

export const SearchForm: React.FC<{ onSearch: (r: ResponseValues<SearchResponse>) => void, criteria: CarsSearchCriteria }> = ({ onSearch, criteria }) => {
    const [startDate, setStartDate] = useState<string | null>(criteria.puDate || null);
    const [endDate, setEndDate] = useState<string | null>(criteria.doDate || null);
    const [iataCode, setIatacode] = useState<IataCode>(criteria.location || undefined);

    const [res, doSearch] = useAxios<SearchResponse>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

    useEffect(() => {
        onSearch(res)
    }, [res])

    const send = () => {
        if (!(iataCode && startDate && endDate)) {
            return;
        }
        const searchCriteria = { location: iataCode.code, puDate: startDate, doDate: endDate };
        doSearch({ params: searchCriteria })
            .then(() => {
                onSearch(res);
            })
    }
    const Filter = criteria.term.toLowerCase() === 'cars' ? ListCarsFilter : DefaultListSearchFilters;

    return (
        <>
            {res.loading && (
                <div className="loader-wrap">
                    <div className="pin"></div>
                    <div className="pulse"></div>
                </div>
            )}
            <Filter
            {...criteria}
            onChange={(r: CarsSearchCriteria) => {
                setStartDate(r.puDate)
                setEndDate(r.doDate)
                setIatacode(r.location)
            }} />
            <button style={{ marginTop: 20 }} onClick={() => send()} className="button fs-map-btn">{res.loading ? 'Searching...' : 'Search'}</button>
        </>
    );
}

export function ListResult() {
    const history = useHistory<{ search: { criteria: { term: string } & CarsSearchCriteria, results: SearchResponse } }>();
    const state = history.location.state;

    const [search, setSearch] = useState<ResponseValues<SearchResponse> | null>(null);
    const [results, setResults] = useState<any[] | null>((state && state.hasOwnProperty('search')) ? state.search.results.scrape.vehicle : null);

    const [airConditioner] = useFilterState('airConditioner');
    const [noDoors] = useFilterState('noDoors');
    const [noSeats, setNoSeats] = useFilterState('noSeats');
    const [transmission] = useFilterState('transmission');
    const [, setTransmissionOptions] = useFilterState('transmissionOptions');
    
    const [sortPrice, setSortPrice] = useSortState('price');

    useEffect(() => {
        if (!state || !state.hasOwnProperty('search')) {
            history.push('/')
        }
    }, []);

    useEffect(() => {
        if (!results) return 
        const options: Set<string> = results.reduce((prev,next) => {
            prev.add(next.vehicle.transmission)
            return prev
        }, new Set())
        setTransmissionOptions(Array.from(options.values()))
    }, [results]);

    useEffect(() => {
        if (search && search.data) setResults(search.data.scrape.vehicle)
    }, [search]);

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

    if (results && results.length > 0) {
        Body = (
            <>
                {results
                .filter(c => airConditioner === true ? c.airConditioner === true : true)
                .filter(c => {
                    if (noDoors <= 0) {
                        return true
                    }
                    // doors property is a string with format NUM/NUM
                    if (c.vehicle.doors.includes('/')) {
                        const valuePair = c.vehicle.doors.split('/');
                        // if we only get one value use it 
                        if (valuePair.length == 1) return valuePair[0] >= noDoors
                        const sortedValues = valuePair.sort((a: number,b: number) => a-b);
                        if (sortedValues.length !== 0) return sortedValues.pop() >= noDoors
                    }

                    return c.vehicle.doors >= noDoors
                })
                .filter(c => airConditioner === true ? c.vehicle.airConditioner === true : true)
                .filter(c => transmission !== null ? c.vehicle.transmission === transmission : true)
                .sort((a: any,b: any) => {
                    if (sortPrice === PriceSortOrder.DESC) return a.vehicle.price - b.vehicle.price
                    if (sortPrice === PriceSortOrder.ASC) return b.vehicle.price - a.vehicle.price
                    return a.vehicle.price - b.vehicle.price
                })
                .map((v: any, idx: number) => <ListingItem key={idx} {...v} criteria={state.search.criteria} />)}
            </>
        );
    }

    let cheapestCar = null
    if (results) {
        cheapestCar = results.sort((a,b) => a.vehicle.price - b.vehicle.price)[0];
    }
    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div className="col-list-wrap left-list" style={{ width: '100%' }}>
                        <div className="listsearch-options fl-wrap" id="lisfw" >
                            <div className="container">
                                <div className="listsearch-header fl-wrap">
                                    <h3>
                                        Results For : <span>{criteria.term}</span> | 
                                        {results && results.length !== 0 && ` ${results.length} Vehicles listed below from ${cheapestCar.vehicle.currency} ${cheapestCar.vehicle.price}`}
                                    </h3>
                                    <div className="listing-view-layout">
                                        <ul>
                                            <li><div style={{ cursor: 'pointer' }} className="grid active"><i className="fa fa-th-large"></i></div></li>
                                            <li><div style={{ cursor: 'pointer' }} className="list"><i className="fa fa-list-ul"></i></div></li>
                                        </ul>
                                    </div>
                                </div>
                                <SearchForm criteria={criteria} onSearch={setSearch} />
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