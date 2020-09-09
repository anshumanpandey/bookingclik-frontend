import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';
import { useMediaQuery } from 'react-responsive';

export const CarsTab: React.FC = () => {
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })

    const [, setTerm] = useSearchWidgetState('term')

    useEffect(() => {
        setTerm(Terms.Cars);
    });

    return (
        <>
            <section className="scroll-con-sec hero-section" style={{ paddingTop: '100px', height: isSm ? '80vh': 'unset' }} data-scrollax-parent="true" id="sec1">
            <div className="bg" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/bg/car.jpg`})`}}  data-bg={`${process.env.PUBLIC_URL}/images/bg/car.jpg`} data-scrollax="properties: { translateY: '200px' }"></div>

                <div className="hero-section-wrap fl-wrap" >

                    <div className="container" style={{ margin: 'auto'}}>
                        <div className="intro-item fl-wrap" >
                            <h2 style={{ textAlign: 'left', maxWidth: '1096px', margin: 'auto', color: '#154a64' }}>Book Your Car Rental Today!</h2>
                        </div>
                        <SearchWidget term={Terms.Cars} />
                    </div>


                </div>
            </section>
        </>
    )
}