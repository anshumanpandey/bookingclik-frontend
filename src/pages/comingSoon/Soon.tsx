import React from 'react';

export const Soon = () => {

    return (
        <>
            <div className="fixed-bg">
                <div className="overlay"></div>
                <div className="bubble-bg"></div>
            </div>
            <div className="cs-wrapper fl-wrap">
                <div className="container small-container counter-widget" data-countdate="09/12/2019">
                    <div>
                        <h1 
                        className="fl-wrap"
                        style={{
                            color: '#fff',
                            fontSize: '64px',
                            fontWeight: 800,
                        }}>BookingClik</h1>
                    </div>
                    <span className="section-separator"></span>
                    <h3 className="soon-title">Our website is coming soon!</h3>

                    <div className="countdown fl-wrap">
                        <h3 style={{
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: 800,
                        }}>
                            BookingClick is a website that allows you to find the best
                            Hotel, Car Rental, Flights and Cruises around the world!
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