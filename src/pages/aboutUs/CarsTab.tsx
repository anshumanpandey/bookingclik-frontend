import React, { useState, useEffect } from 'react';
import { Terms } from '../../types';

export const CarsTab: React.FC = () => {

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
                    <p>
                        The Bookingclik network is a series of websites for the travel industry, providing the end user with a central point to book, hotels, flights, cruises, airport transfers and car rentals. CarrentalClik is just one of these sites focused on car rentals
                        The carrentalclik website has been designed to be easy to use, packed with over 15,000 locations where you can rent a vehicle and listing some of the best deals on car rental available. When you have done your search, found the vehicle of your choice, you are directed to the website of the car rental company.
                        Here at carrentalclik we do no charge any booking fees, in fact we do not charge anything, it’s a complete free service allowing you the customer to get the best price possible on your next car rental.
                        Book your car rental today
                        The Bookingclik network is a series of websites for the travel industry, providing the end user with a central point to book, hotels, flights, cruises, airport transfers and car rentals. CarrentalClik is just one of these sites focused on car rentals
                        The carrentalclik website has been designed to be easy to use, packed with over 15,000 locations where you can rent a vehicle and listing some of the best deals on car rental available. When you have done your search, found the vehicle of your choice, you are directed to the website of the car rental company.
                        Here at carrentalclik we do no charge any booking fees, in fact we do not charge anything, it’s a complete free service allowing you the customer to get the best price possible on your next car rental.
                        Book your car rental today
                    </p>

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