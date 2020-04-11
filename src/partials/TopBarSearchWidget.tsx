import React from 'react';

export function TopBarSearchWidget() {
    return (
        <div className="header-search vis-header-search">
            <div className="header-search-input-item">
                <input type="text" placeholder="Keywords" value="" />
            </div>
            <div className="header-search-select-item">
                <select data-placeholder="All Categories" className="chosen-select" >
                    <option>All Categories</option>
                    <option>Shops</option>
                    <option>Hotels</option>
                    <option>Restaurants</option>
                    <option>Fitness</option>
                    <option>Events</option>
                </select>
            </div>
            <button className="header-search-button" onClick={() => window.location.href = 'listing.html'}>Search</button>
        </div>
    );
}