import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import useAxios from 'axios-hooks'
import { PayPalButton } from "react-paypal-button-v2";
import { postTransaction } from '../../crud/paypal.crud';
import { dispatchGlobalState } from '../../state';

export const ProfilePage: React.FC = () => {
    const [{ data, loading, error }, post] = useAxios(postTransaction(), { manual: true })


    return (
        <>
            <PayPalButton
                onButtonReady={() => {
                    console.log('Paypal btn ready')
                }}
                options={{
                    clientId: 'AX1dp6TsC0lUgPd-N_ezG8VggCXXQruDTnd8b55ZpoEFYOz5KSX3lpyOeCdAhIdBdohIyRb0mLxAxqtg'
                }}
                amount="0.01"
                onSuccess={(details: { [k: string]: any }, data: {}) => {
                    post()
                        .then(() => {
                            dispatchGlobalState({ type: 'success', state: "Transaction completed by " + details.payer.name.given_name });
                        });
                }}
            />
        </>
    )
}