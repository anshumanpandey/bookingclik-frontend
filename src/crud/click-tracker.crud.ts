import { AxiosRequestConfig } from "axios"

export const track = (): AxiosRequestConfig => {
    return {
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/public/click`,
        method: 'POST'
    }
}

export const getUserData = (): AxiosRequestConfig => {
    return {
        url: `https://ipapi.co/json/`,
    }
}

export const getSupplierInfo = (): AxiosRequestConfig => {
    return {
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/brokers/suppliers/${process.env.REACT_APP_ACCOUNT_ID}`
    }
}