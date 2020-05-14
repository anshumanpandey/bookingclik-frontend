import React from 'react';

export const Soon = () => {

    return (
        <>
            <div className="fixed-bg">
                <div className="bg"  data-bg="images/bg/car.jpeg"></div>
            </div>
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
                            color: '#fff',
                            fontSize: '64px',
                            fontWeight: 800,
                        }}>CarrentalClik</h1>
                    </div>
                    <span className="section-separator"></span>
                    <h1 className="soon-title">Our website is coming soon!</h1>
                    <h3 className="soon-title-2">Launch Date - 15th May, 2020</h3>

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
    );
}