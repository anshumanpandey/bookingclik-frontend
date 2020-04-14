import React, { useEffect, useState } from 'react';

const calculateTimeLeft = () => {
    const difference = +new Date("2020-8-01") - +new Date();
    let timeLeft = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString(),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString(),
            minutes: Math.floor((difference / 1000 / 60) % 60).toString(),
            seconds: Math.floor((difference / 1000) % 60).toString(),
        };
    }

    return timeLeft;
};

type TimeLeft = { days: string, hours: string, minutes: string, seconds: string, }
export const Soon = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    return (
        <>
            <div className="fixed-bg">
                <div className="bg" data-bg="images/bg/1.jpg"></div>
                <div className="overlay"></div>
                <div className="bubble-bg"></div>
            </div>
            <div className="cs-wrapper fl-wrap">
                <div className="container small-container counter-widget" data-countDate="09/12/2019">
                    <div className="cs-logo"><img src="images/logo.png" alt="" /></div>
                    <span className="section-separator"></span>
                    <h3 className="soon-title">Our website is coming soon!</h3>
                    <h3 style={{
                        color:'#fff',
                        fontSize:'14px',
                        fontWeight:800,
                    }}>
                        BookingClick is a website that allow you to find the best
                        Hotel, Car Rental, Flights and Cruises around the world!
                    </h3>
                    <div className="countdown fl-wrap">
                        <div className="cs-countdown-item">
                            <span className="days rot">{timeLeft.days}</span>
                            <p>days</p>
                        </div>
                        <div className="cs-countdown-item">
                            <span className="hours rot">{timeLeft.hours}</span>
                            <p>hours </p>
                        </div>
                        <div className="cs-countdown-item no-dec">
                            <span className="minutes rot2">{timeLeft.minutes}</span>
                            <p>minutes </p>
                        </div>
                        <div className="cs-countdown-item">
                            <span className="seconds rot2">{timeLeft.seconds}</span>
                            <p>seconds</p>
                        </div>
                    </div>
                    <div className="subcribe-form fl-wrap">
                        <p>For More details please email admin@bookingclik.com</p>
                    </div>
                    <div className="cs-social fl-wrap">
                        <ul>
                            <li><a href="#" target="_blank" ><i className="fa fa-facebook-official"></i></a></li>
                            <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#" target="_blank" ><i className="fa fa-chrome"></i></a></li>
                            <li><a href="#" target="_blank" ><i className="fa fa-vk"></i></a></li>
                            <li><a href="#" target="_blank" ><i className="fa fa-whatsapp"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}