import React, { useEffect, useState } from 'react';
import useAxios, { ResponseValues } from 'axios-hooks'
//@ts-ignore
import { Dot } from 'react-animated-dots';
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { IataCode, SearchResponse, CarsSearchCriteria } from '../../types';
import { DefaultListSearchFilters, ListCarsFilter } from './SearchFilter';
import { useGlobalState } from '../../state';

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
            <Filter {...criteria} onChange={(r: CarsSearchCriteria) => {
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

    const [ ,setLoading] = useGlobalState('loading');
    const [search, setSearch] = useState<ResponseValues<SearchResponse> | null>(null);
    const [results, setResults] = useState<any[] | null>((state && state.hasOwnProperty('search')) ? state.search.results.scrape.vehicle : null);

    useEffect(() => {
        if (!state || !state.hasOwnProperty('search')) {
            history.push('/')
        }
    }, []);

    useEffect(() => {
        if (search && search.data) setResults(search.data.scrape.vehicle)
        if (search) setLoading(search.loading)
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
                {results.map((v: any, idx: number) => <ListingItem key={v.name} {...v} />)}
            </>
        );
    }

    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div className="map-container column-map right-pos-map" id="listResultsPage">
                        <div id="map-main"></div>
                        <ul className="mapnavigation">
                            <li><a href="#" className="prevmap-nav">Prev</a></li>
                            <li><a href="#" className="nextmap-nav">Next</a></li>
                        </ul>
                        <div className="scrollContorl mapnavbtn" title="Enable Scrolling"><span><i className="fa fa-lock"></i></span></div>
                    </div>
                    <div className="col-list-wrap left-list">
                        <div className="listsearch-options fl-wrap" id="lisfw" >
                            <div className="container">
                                <div className="listsearch-header fl-wrap">
                                    <h3>Results For : <span>{criteria.term}</span></h3>
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