import React, { useEffect } from 'react';
import { Header, Footer } from '../../partials';
import { CarsTab } from './CarsTab';
import { useSplashScreen } from '../../utils/UseSplashScreen';

export function AboutUs() {
    
    useSplashScreen()
    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">

                    <div id="tabs-container" style={{ padding: 0 }}>
                        <CarsTab />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}