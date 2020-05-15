import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';


export const ProfilePage: React.FC = () => {

    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">
                    Profile
                </div>
            </div>
            <Footer />
        </>
    )
}