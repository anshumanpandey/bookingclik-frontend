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
    const [userReq] = normalUseAxios({ url: `https://www.cloudflare.com/cdn-cgi/trace` })
    const [topLocationReq] = normalUseAxios({ url: `https://www.bookingclik.com/api/public/top-locations/get` })
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
                        <div className="container">
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
                                                    <article className="geodir-category-listing fl-wrap">
                                                        <div className="geodir-category-img">
                                                            <img style={{ height: 300 }} src={l.imagePath} alt="" />
                                                            <h3 style={{
                                                                float: "left",
                                                                width: "100%",
                                                                marginBottom: "10px",
                                                                position: "absolute",
                                                                zIndex: 10,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                                fontSize: "20px",
                                                                fontWeight: 600,
                                                                color: "#334e6f"
                                                            }}>{l.name}</h3>
                                                        </div>
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