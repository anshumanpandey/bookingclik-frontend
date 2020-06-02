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
                    clientId: 'AbBy2EJkKQpvu6zmf9gaySHsC5UK-mFjwqI_zLxaNCS60V4cIDU4mR7o5LsBtIU8KAjrh4yqdzsu3J_N'
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