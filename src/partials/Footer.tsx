import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';


export const Footer = () => {
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 1200px)' })

    useEffect(() => {
        $(window).on("scroll", function (a) {
            //@ts-ignore
            if ($(this).scrollTop() > 150) {
                $(".to-top").fadeIn(500);
            } else {
                $(".to-top").fadeOut(500);
            }
        });
    }, []);

    let isBig = true
    if (isSm == false) isBig = false
    if (isTablet == false) isBig = false
    return (
        <>
            <div style={{ margin: 0 }} className="sub-footer fl-wrap">
                <div className="container" style={{ margin: 'auto' }}>
                    <div className="row">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: 'unset'}} className="copyright">@2020 BookingClik Ltd</div>
                        </div>
                    </div>
                </div>
            </div>
            <a style={{ backgroundColor: '#154a64' }} className="to-top"><i className="fa fa-angle-up"></i></a>
        </>
    );
}