import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks';
import parse from 'html-react-parser';

const normalUseAxios = makeUseAxios({
    axios: axios.create()
});

export const CarsTab: React.FC = () => {
    const [topLocationReq] = normalUseAxios({ url: `http://localhost:4010/api/public/about/get` })

    return (
        <>
            <div className="cs-wrapper fl-wrap" style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="container counter-widget" data-countdate="09/12/2019">
                    <div>
                        <h1
                            className="fl-wrap"
                            style={{
                                fontSize: '48px',
                                fontWeight: 800,
                            }}>About Us</h1>
                    </div>
                    <span className="section-separator"></span>
                    {topLocationReq.loading && <div className="pulse"></div>}
                    <p>{!topLocationReq.loading && parse(topLocationReq.data.body)}</p>
                    <div className="countdown fl-wrap">
                        <h3 style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 800,
                        }}>
                            CarrentalClik is a website that allows you to find the best
                            Car Rental around the world!
                    </h3>
                    </div>
                    <div className="subcribe-form fl-wrap">
                        <p>For More details please email admin@bookingclik.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}