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

                <div className="hero-section-wrap fl-wrap" >

                    <div className="container" style={{ margin: 'auto'}}>
                        <div className="intro-item fl-wrap" >
                            <h2 style={{ textAlign: 'left', maxWidth: '1096px', margin: 'auto' }}>Find your ride.</h2>
                        </div>
                        <SearchWidget term={Terms.Cars} />
                    </div>


                </div>
            </section>
        </>
    )
}