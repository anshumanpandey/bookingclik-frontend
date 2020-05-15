import { AxiosRequestConfig } from "axios"

export const logIn = (): AxiosRequestConfig => {
    return {
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/login`,
        method: 'POST'
    }
}