import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';

export const FlightsTab: React.FC = () => {

    return (
        <div className="container">
            <div className="intro-item fl-wrap">
                <h2>We will help you to find Flights</h2>
                <h3>Find great flights.</h3>
            </div>
            <SearchWidget term={Terms.Flights} />
        </div>
    )
}