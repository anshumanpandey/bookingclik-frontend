import { AxiosRequestConfig } from "axios"

export const postTransaction = (): AxiosRequestConfig => {
    return {
        method: 'POST',
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/paypal-transaction-complete`,
    }
}

export const getTransactions = (): AxiosRequestConfig => {
    return {
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/paypal-transactions`,
        method: 'GET',
    }
}