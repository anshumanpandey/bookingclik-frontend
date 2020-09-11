import React, { useEffect } from 'react';
import { Header, Footer } from '../../partials';
import { CarsTab } from './CarsTab';
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { useSplashScreen } from '../../utils/UseSplashScreen';
import { useGlobalState } from '../../state';
import CountriesJson from '../../partials/CountriesJson.json';
import parse from 'html-react-parser';

const normalUseAxios = makeUseAxios({
    axios: axios.create()
});

export function Main() {
    const [userReq] = normalUseAxios({ url: `https://www.cloudflare.com/cdn-cgi/trace` })
    const [topLocationReq] = normalUseAxios({ url: `https://www.bookingclik.com/api/public/top-locations/get` })
    const [aboutReq] = normalUseAxios({ url: `https://www.bookingclik.com/api/public/about/get` })

    const [, setIp] = useGlobalState('ip');
    const [, setCountry] = useGlobalState('country');

    useEffect(() => {
        if (userReq.data) {
            const currentVisitorJson = userReq.data.split(`\n`).reduce((json: any, next: any) => {
                const [key, val] = next.split("=");
                json[key] = val;
                return json;
            }, {})
            setIp(currentVisitorJson.ip)
            setCountry(CountriesJson.find(i => i.code == currentVisitorJson.loc)?.name || '')
        }
    }, [userReq.loading]);


    useSplashScreen()
    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    <div id="tabs-container" style={{ padding: 0 }}>
                        <CarsTab />
                    </div>
                    <section className="gray-section">
                        <div className="container" style={{ margin: 'auto'}}>
                            <div className="section-title">
                                <h2>About Us</h2>
                            </div>
                        </div>
                        <div className="container" style={{ margin: 'auto'}}>
                            {aboutReq.loading && <div className="pulse"></div>}
                            <p>{!aboutReq.loading && parse(aboutReq.data.body)}</p>
                        </div>
                    </section>
                    <section className="gray-section">
                        <div className="container" style={{ margin: 'auto'}}>
                            <div className="section-title">
                                <h2>Top Locations</h2>
                            </div>
                        </div>
                        {topLocationReq.loading && <div className="pulse"></div>}
                        {!topLocationReq.loading && topLocationReq.data && topLocationReq.data.length != 0 && (
                            <div className="list-carousel fl-wrap card-listing ">
                                <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between", flexWrap: 'wrap' }} className="listing-carousel ">
                                    {topLocationReq.data.map((l: any) => {
                                        return (
                                            <div className="slick-slide-item" style={{ maxWidth: '33%' }}>
                                                <div className="listing-item">
                                                    <article style={{ border: "unset"}} className="geodir-category-listing fl-wrap">
                                                        <h3 style={{
                                                                float: "left",
                                                                width: "100%",
                                                                fontSize: "20px",
                                                                fontWeight: 600,
                                                                color: "#334e6f"
                                                            }}>{l.name}</h3>
                                                    </article>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        )}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}