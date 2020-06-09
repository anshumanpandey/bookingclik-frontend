import React, { useEffect } from 'react';
import { Header, Footer } from '../../partials';
import { CarsTab } from './CarsTab';
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { useSplashScreen } from '../../utils/UseSplashScreen';
import { useGlobalState } from '../../state';
import CountriesJson from '../../partials/CountriesJson.json';

const normalUseAxios = makeUseAxios({
    axios: axios.create()
});

export function Main() {
    const [userReq] = normalUseAxios({url: `https://www.cloudflare.com/cdn-cgi/trace`})
    const [, setIp] = useGlobalState('ip');
    const [, setCountry] = useGlobalState('country');

    useEffect(() => {
        if (userReq.data) {
            const currentVisitorJson = userReq.data.split(`\n`).reduce((json: any,next: any) => {
                const [key, val] = next.split("=");
                json[key] = val;
                return json;
            }, {})
            setIp(currentVisitorJson.ip)
            setCountry(CountriesJson.find(i => i.code == currentVisitorJson.loc)?.name || '')
        }
    },[userReq.loading]);

    
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