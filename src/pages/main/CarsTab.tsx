import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';

export const CarsTab: React.FC = () => {

    const [, setTerm] = useSearchWidgetState('term')

    useEffect(() => {
        setTerm(Terms.Cars);
    });

    return (
        <>
            <section className="scroll-con-sec hero-section" style={{ paddingTop: '100px', height: '80vh' }} data-scrollax-parent="true" id="sec1">
            <div className="bg"  data-bg="images/bg/car.jpeg" data-scrollax="properties: { translateY: '200px' }"></div>

                <div className="overlay"></div>
                <div className="hero-section-wrap fl-wrap" >

                    <div className="container" style={{ margin: 'auto'}}>
                        <div className="intro-item fl-wrap" >
                            <h2 style={{ textAlign: 'left', width: '90%',float: 'right'}}>Find your ride.</h2>
                        </div>
                        <SearchWidget term={Terms.Cars} />
                    </div>


                </div>
                <div className="bubble-bg"> </div>
                <div className="header-sec-link">
                    <div className="container"><a href="#sec2" className="custom-scroll-link">Let's Start</a></div>
                </div>
            </section>
        </>
    )
}