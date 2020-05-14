import React, { useEffect } from 'react';
import { Header, Footer } from '../../partials';
import { CarsTab } from './CarsTab';
import { HotelsTab } from './HotelsTab';
import { FlightsTab } from './FlightsTab';
import { CruisesTab } from './CruisesTab';
import { useSplashScreen } from '../../utils/UseSplashScreen';

export function Main() {
    
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