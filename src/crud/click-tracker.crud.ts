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