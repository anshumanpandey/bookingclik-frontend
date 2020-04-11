import React, { useEffect } from 'react';
import { ListingItem, ListingItemProps } from '../partials/ListingItem';
import { useHistory } from 'react-router-dom';
import { FilterMap } from '../partials/SearchFilter';

export function ListResult() {
    const history = useHistory<{ search: { criteria: { term: string }, results: ListingItemProps[] } }>();

    const state = history.location.state;
    useEffect(() => {
        //@ts-ignore
        $(`select.listResultSelect`).niceSelect()
        if (!state || !state.hasOwnProperty('search')) {
            history.push('/')
        }
    }, []);

    if (!state || !state.hasOwnProperty('search')) {
        return <></>;
    }

    const criteria = state.search.criteria;
    // @ts-ignore
    const fakeResults = state.search.results.scrape.vehicle;
    const Filter = FilterMap.searchlist[criteria.term.toLowerCase()] ? FilterMap.searchlist[criteria.term.toLowerCase()] : FilterMap.searchlist.default;

    return (
        <>
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
                        <Filter {...criteria} />
                    </div>
                </div>
                <div className="list-main-wrap fl-wrap card-listing">
                    <a className="custom-scroll-link back-to-filters btf-l" href="#lisfw"><i className="fa fa-angle-double-up"></i><span>Back to Filters</span></a>
                    <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {fakeResults.length == 0 && (
                            <div className="section-title">
                                <h2>Please modify your search</h2>
                                <div className="section-subtitle">popular questions</div>
                                <span className="section-separator"></span>
                                <p>We are sorry we do not have any availability for the dates and times you have selected.</p>
                            </div>
                        )}
                        {fakeResults.length > 0 && fakeResults.map((v: any, idx: number) => {
                            return (
                                <ListingItem key={v.name} {...v} />
                            );
                        })}
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
        </>
    );
}