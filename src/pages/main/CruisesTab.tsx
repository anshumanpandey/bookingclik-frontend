import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';

export const CruisesTab: React.FC = () => {

    return (
        <section className="scroll-con-sec hero-section" style={{ paddingTop: '100px', height: '80vh' }} data-scrollax-parent="true" id="sec1">
            <div className="bg"  data-bg="images/bg/cruise.jpg" data-scrollax="properties: { translateY: '200px' }"></div>

            <div className="overlay"></div>
            <div className="hero-section-wrap fl-wrap">



                <div className="container">
                    <div className="intro-item fl-wrap">
                        <h2 style={{ textAlign: 'left', width: '90%',float: 'right'}}>Find your cruise.</h2>
                    </div>
                    <SearchWidget term={Terms.Cruises} />
                </div>

            </div>
            <div className="bubble-bg"> </div>
            <div className="header-sec-link">
                <div className="container"><a href="#sec2" className="custom-scroll-link">Let's Start</a></div>
            </div>
        </section>
    )
}