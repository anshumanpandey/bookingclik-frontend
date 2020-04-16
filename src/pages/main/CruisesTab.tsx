import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';

export const CruisesTab: React.FC = () => {

    return (
        <div className="container">
            <div className="intro-item fl-wrap">
                <h2>We will help you to find Cruises</h2>
                <h3>Find great Cruises.</h3>
            </div>
            <SearchWidget term={Terms.Cruises} />
        </div>
    )
}