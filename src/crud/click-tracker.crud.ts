import { AxiosRequestConfig } from "axios"

export const track = (): AxiosRequestConfig => {
    return {
        //url: `https://www.bookingclik.com/api/public/click`,
        url: `http://localhost:4010/api/public/click`,
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