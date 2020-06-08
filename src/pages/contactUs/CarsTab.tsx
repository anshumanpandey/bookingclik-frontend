import React, { useState, useEffect } from 'react';
import { SearchWidget } from './SearchWidget';
import { Terms } from '../../types';

export const CarsTab: React.FC = () => {
    return (
        <>
            <section className="scroll-con-sec hero-section" style={{ paddingTop: '100px', height: '80vh' }} data-scrollax-parent="true" id="sec1">
            <div className="bg" style={{ backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/bg/car.jpg`})`}}  data-bg={`${process.env.PUBLIC_URL}/images/bg/car.jpg`} data-scrollax="properties: { translateY: '200px' }"></div>

                <div className="hero-section-wrap fl-wrap" >

                    <div className="container" style={{ margin: 'auto'}}>
                        <div className="intro-item fl-wrap" >
                            <h2 style={{ textAlign: 'left', maxWidth: '1096px', margin: 'auto' }}>Contact Us!</h2>
                        </div>
                        <SearchWidget />
                    </div>


                </div>
            </section>
        </>
    )
}