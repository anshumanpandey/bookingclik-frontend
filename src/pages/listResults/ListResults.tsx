import React, { useEffect, useState } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { IataCode, SearchResponse, CarsSearchCriteria } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter } from './SearchFilter';
import { useFilterState } from './FiltersGlobalState';

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
    const state = { search: 
        {
            results: {scrape:{details:{"pickup":{"location":"DBV","datetime":"13/07/2020 20:00"},"dropoff":{"location":"DBV","datetime":"16/07/2020 20:00"}},"vehicle":[{"vehicle":{"name":"VW UP","custom_location":"DBVA01","doors":"2/4","transmission":"Manual","acriss":"MCMR","price":"155.62","currency":"EUR","image_preview_url":"/images/side-vwup.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Hyundai i10","custom_location":"DBVA01","doors":"4","transmission":"Manual","acriss":"MDMR","price":"155.62","currency":"EUR","image_preview_url":"/images/side-hyundaii10.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Suzuki Swift","custom_location":"DBVA01","doors":"2/4","transmission":"Manual","acriss":"ECMR","price":"157.64","currency":"EUR","image_preview_url":"/images/side-suzukiswift.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW Polo","custom_location":"DBVA01","doors":"4/5","transmission":"Manual","acriss":"EDMR","price":"157.89","currency":"EUR","image_preview_url":"/images/side-vwpolo.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Vauxhall Astra","custom_location":"DBVA01","doors":"2/4","transmission":"Manual","acriss":"CCMR","price":"202.62","currency":"EUR","image_preview_url":"/images/side-vauxhallastra.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Ford Focus","custom_location":"DBVA01","doors":"4/5","transmission":"Manual","acriss":"CDMR","price":"202.92","currency":"EUR","image_preview_url":"/images/side-fordfocus.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW UP","custom_location":"DBVA01","doors":"2/4","transmission":"Automatic","acriss":"MCAR","price":"223.45","currency":"EUR","image_preview_url":"/images/side-vwup.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Ford Fiesta","custom_location":"DBVA01","doors":"4/5","transmission":"Automatic","acriss":"EDAR","price":"228.16","currency":"EUR","image_preview_url":"/images/side-fordfiesta.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Skoda Rapid","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"IDMR","price":"285.32","currency":"EUR","image_preview_url":"/images/side-skodarapid.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Skoda Octavia","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"SDMR","price":"296.53","currency":"EUR","image_preview_url":"/images/side-skodaoctavia.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW Golf","custom_location":"DBVA01","doors":"4/5","transmission":"Automatic","acriss":"CDAR","price":"309.64","currency":"EUR","image_preview_url":"/images/side-vwgolf.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"BMW 1 Series","custom_location":"DBVA01","doors":"4","transmission":"Automatic","acriss":"DDAR","price":"339.12","currency":"EUR","image_preview_url":"/images/side-bmw1series.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Suzuki Vitara","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"SFMR","price":"351.64","currency":"EUR","image_preview_url":"/images/side-suzukivitara.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Skoda Octavia","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"SWMR","price":"361.55","currency":"EUR","image_preview_url":"/images/side-skodaoctaviacombi.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW Passat","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"FDMR","price":"372.76","currency":"EUR","image_preview_url":"/images/side-vwpassat.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Ford Focus Turnier","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"CWMR","price":"381.46","currency":"EUR","image_preview_url":"/images/side-fordfocusestate.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Ford Focus Turnier","custom_location":"DBVA01","doors":"5","transmission":"Automatic","acriss":"CWAR","price":"393.93","currency":"EUR","image_preview_url":"/images/side-fordfocusestate.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW Passat","custom_location":"DBVA01","doors":"5","transmission":"Automatic","acriss":"FDAR","price":"419.55","currency":"EUR","image_preview_url":"/images/side-vwpassat.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Vauxhall Zafira","custom_location":"DBVA01","doors":"5","transmission":"Manual","acriss":"SVMR","price":"438.54","currency":"EUR","image_preview_url":"/images/side-vauxhallzafira.png\r\n","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Vauxhall Zafira","custom_location":"DBVA01","doors":"5","transmission":"Automatic","acriss":"SVAR","price":"481.12","currency":"EUR","image_preview_url":"/images/side-vauxhallzafira.png\r\n","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Renault Trafic","custom_location":"DBVA01","doors":"4","transmission":"Manual","acriss":"FVMR","price":"554.12","currency":"EUR","image_preview_url":"/images/side-renaulttrafic.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"VW Tiguan","custom_location":"DBVA01","doors":"5","transmission":"Automatic","acriss":"RFAR","price":"568.90","currency":"EUR","image_preview_url":"/images/side-vwtiguan.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"BMW 5 Series","custom_location":"DBVA01","doors":"5","transmission":"Automatic","acriss":"PDAR","price":"716.24","currency":"EUR","image_preview_url":"/images/side-bmw5series.png","baseUrl":"https://www.right-cars.com"}},{"vehicle":{"name":"Mercedes-Benz Vito","custom_location":"DBVA01","doors":"4","transmission":"Automatic","acriss":"UVAR","price":"821.58","currency":"EUR","image_preview_url":"/images/side-mercedesvito.png","baseUrl":"https://www.right-cars.com"}}]}},
            criteria: {
                term: "cars" as "cars",
                doDate: 'string',
                puDate: 'string',
                location: { id: 1, code: 'DBV', location: 'Dubrovnik' }
            }
    }
    };

    const [search, setSearch] = useState<ResponseValues<SearchResponse> | null>(null);
    const [results, setResults] = useState<any[] | null>((state && state.hasOwnProperty('search')) ? state.search.results.scrape.vehicle : null);

    const [airConditioner] = useFilterState('airConditioner');
    const [noDoors] = useFilterState('noDoors');
    const [noSeats, setNoSeats] = useFilterState('noSeats');
    const [transmission] = useFilterState('transmission');
    const [, setTransmissionOptions] = useFilterState('transmissionOptions');

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
                .map((v: any, idx: number) => <ListingItem key={v.name} {...v} criteria={state.search.criteria} />)}
            </>
        );
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
                                        {results && results.length !== 0 && ` ${results.length} cars founds!`} | 
                                        Lowest price {results && results.length !== 0 && Math.min(...results.reduce((prev, next) => {prev.push(parseFloat(next.vehicle.price)); return prev}, []))}
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