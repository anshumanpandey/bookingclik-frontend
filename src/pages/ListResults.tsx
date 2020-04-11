import React, { useEffect } from 'react';
import { ListingItem, ListingItemProps } from '../partials/ListingItem';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Icon = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    background-color: #4DB7FE;
    border: 1px solid;
    border-radius: 50%;
    color: #4DB7FE;

    i {
        color: white
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

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
    const fakeResults = state.search.results;
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
                                    <li><div style={{ cursor: 'pointer'}} className="grid active"><i className="fa fa-th-large"></i></div></li>
                                    <li><div style={{ cursor: 'pointer'}} className="list"><i className="fa fa-list-ul"></i></div></li>
                                </ul>
                            </div>
                        </div>
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
                        {fakeResults.length > 0 && fakeResults.map((v, idx) => {
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