import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../partials';
import useAxios from 'axios-hooks'
import { PayPalButton } from "react-paypal-button-v2";
import { postTransaction, getTransactions } from '../../crud/paypal.crud';
import { dispatchGlobalState } from '../../state';
import DataTable from 'react-data-table-component';

export const Paypal: React.FC = () => {
    const [postReq, post] = useAxios(postTransaction(), { manual: true })
    const [getReq, refetch] = useAxios(getTransactions())


    return (
        <>
            <DataTable
                noHeader
                progressPending={getReq.loading}
                columns={[
                    {
                        name: '#',
                        selector: '',
                    },
                    {
                        name: 'Order ID',
                        selector: 'id',
                    },

                    {
                        name: 'Created At',
                        selector: 'created_at',
                    },
                ]}
                data={getReq.data}
            />
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