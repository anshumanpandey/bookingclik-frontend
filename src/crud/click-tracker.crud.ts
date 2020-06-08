import { AxiosRequestConfig } from "axios"

export const track = (): AxiosRequestConfig => {
    return {
        url: process.env.REACT_APP_CLICK_TRACK_URL,
        //url: `http://localhost:4010/api/public/click`,
        method: 'POST'
    }
}

export const getUserData = (): AxiosRequestConfig => {
    return {
        url: `https://www.cloudflare.com/cdn-cgi/trace`,
    }
}

export const getUserIp = (): AxiosRequestConfig => {
    return {
        url: `http://api.hostip.info/get_json.php`,
    }
}

export const getSupplierInfo = (): AxiosRequestConfig => {
    return {
        url: `${process.env.REACT_APP_GRCGDS_BACKEND}/brokers/suppliers/${process.env.REACT_APP_ACCOUNT_ID}`
    }
}