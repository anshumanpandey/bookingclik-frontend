import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';

export const CarsTab: React.FC = () => {

    return (
        <div className="container">
            <div className="intro-item fl-wrap">
                <h2>We will help you to find all cars</h2>
                <h3>Find great cars.</h3>
            </div>
            <SearchWidget term={Terms.Cars} />
        </div>
    )
}