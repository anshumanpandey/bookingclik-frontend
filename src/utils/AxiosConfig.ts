import { useState, useEffect } from 'react';
import { configure } from 'axios-hooks'
import Axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
 
const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL ?  process.env.REACT_APP_BACKEND_URL : window.location.origin
})
 
configure({ axios })

type RequestData<T> = { data: T | null, error: any | null, loading: boolean}
type HookRequest<T> = (config?: AxiosRequestConfig) => AxiosPromise<T>

export const useHttp = <T>(config?: AxiosRequestConfig): [RequestData<T>, HookRequest<T>] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return [
      { data, loading, error},
      (over?: AxiosRequestConfig) => {
        setLoading(true)
        return axios({ ...config, ...over})
        .then(r => {
          setLoading(false)
          setData(r.data)
          return r
        })
        .catch(err => {
          setError(err)
          throw err;
        })
      }
    ]
};