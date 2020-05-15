import { configure } from 'axios-hooks'
import Axios from 'axios'
import { getGlobalState, dispatchGlobalState } from '../state';

const axios = Axios.create({})

axios.interceptors.request.use(
    config => {
        const state = getGlobalState()

      if (state.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }

      return config;
    }
  );
  axios.interceptors.response.use(
    config => {
      return config;
    },
    (error) => {
      console.log(error.response)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatchGlobalState({ type: 'error', state: error.response.data.error});
        if (error.response.status === 401) {
            dispatchGlobalState({ type: 'logout' });
        }
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Something happened in setting up the request that triggered an Error');
        console.log(error.message);
      }
      return Promise.reject(error);
    }
  );

configure({ axios, cache: false })