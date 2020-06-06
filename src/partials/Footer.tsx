import React, { useEffect, useState } from 'react';


export const Footer = () => {
    return (
        <>
            <div style={{ margin: 0 }} className="sub-footer fl-wrap">
                <div className="container" style={{ margin: 'auto' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">@2020 BookingClik Ltd</div>
                        </div>
                    </div>
                </div>
            </div>
            <a style={{ backgroundColor: '#154a64' }} className="to-top"><i className="fa fa-angle-up"></i></a>
        </>
    );
}