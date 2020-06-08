import { AxiosRequestConfig } from "axios"

export const sendEmail = (): AxiosRequestConfig => {
    return {
        method: 'POST',
        url: `https://www.carrentalclik.com/contact.php`,
    }
}