import { AxiosRequestConfig } from "axios"

export const postTransaction = (): AxiosRequestConfig => {
    return {
        method: 'POST',
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/paypal-transaction-complete`,
    }
}