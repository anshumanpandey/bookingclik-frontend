import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios'
import useAxios, { makeUseAxios } from 'axios-hooks'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GRCGDSCode, Terms } from '../../types';
import { CarSearchWidgetFilters, DefaultSearchWidgetFilters } from './SearchFilter';
import moment from 'moment';
import { useSearchWidgetState, dispatchSearchState } from './useSearchWidgetGlobalState';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
import qs from 'qs';
import { dispatchFilteredState } from '../listResults/SearchGlobalState';
import { useGlobalState } from '../../state';


const normalUseAxios = makeUseAxios({
  axios: axios.create()
});

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const SearchWidget: React.FC<{ term: Terms }> = ({ term }) => {
  const history = useHistory()
  const [optionToSearch] = useState<string>('cars');

  const [puDate, setPuDate] = useSearchWidgetState('puDate')
  const [puTime, setPuTime] = useSearchWidgetState('puTime')
  const [doDate, setDoDate] = useSearchWidgetState('doDate')
  const [doTime, setDoTime] = useSearchWidgetState('doTime')
  const [age] = useSearchWidgetState('age')
  const [pickUpCode] = useSearchWidgetState('pickUpCode')
  const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')

  const [ip] = useGlobalState('ip');
  const [country] = useGlobalState('country');

  const CurrentFilter = optionToSearch === 'cars' ? CarSearchWidgetFilters : DefaultSearchWidgetFilters;

  const [{ data, loading, error }, doSearch] = useAxios<GRCGDSCode[]>({
    url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
    method: 'POST'
  }, { manual: true })

  const [visitorReq, sendVisitor] = normalUseAxios({
    url: `https://www.bookingclik.com/api/public/visitor/save`,
    method: 'POST'
  }, { manual: true })

  const send = () => {
    const date = moment();

    if (!pickUpCode) return

    const searchCriteria = {
      pickUpDate: puDate || date,
      pickUpTime: puTime || date.add(1, 'week'),

      dropOffDate: doDate || date,
      dropOffTime: doTime || date,

      pickUpLocation: pickUpCode,
      dropOffLocation: dropoffCode ? dropoffCode : pickUpCode
    }

    setPuDate(searchCriteria.pickUpDate);
    setDoDate(searchCriteria.dropOffDate);
    setDropoffCode(searchCriteria.dropOffLocation)

    const params = {
      pickUpLocationCode: searchCriteria.pickUpLocation.internalcode,
      pickUpLocationName: searchCriteria.pickUpLocation.locationname,
      dropOffLocationCode: searchCriteria.dropOffLocation ? searchCriteria.dropOffLocation.internalcode : searchCriteria.pickUpLocation.internalcode,
      dropOffLocationName: searchCriteria.dropOffLocation ? searchCriteria.dropOffLocation.locationname : searchCriteria.pickUpLocation.locationname,

      pickUpDate: searchCriteria.pickUpDate.unix(),
      pickUpTime: searchCriteria.pickUpTime.unix(),

      dropOffDate: searchCriteria.dropOffDate.unix(),
      dropOffTime: searchCriteria.dropOffTime.unix(),
      age: age,
    }

    doSearch({ data: { json: BuildJsonQuery(searchCriteria) } })
      .then(res => {
        const data = {
          ip: ip,
          country: country,

          pickupLocation: params.pickUpLocationName,
          pickupDate: searchCriteria.pickUpDate.format('YYYY-MM-DD'),
          pickupTime: searchCriteria.pickUpTime.format('HH:mm'),

          dropoffLocation: params.dropOffLocationName,
          dropoffDate: searchCriteria.dropOffDate.format('YYYY-MM-DD'),
          dropoffTime: searchCriteria.dropOffTime.format('HH:mm'),
        }
        return sendVisitor({ data })
          .then(() => res)
          .catch(() => res)

      })
      .then((res) => {
        history.push({
          pathname: '/results',
          search: `?${qs.stringify(params)}`,
          state: {
            results: res.data,
          }
        });
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="main-search-input-wrap" style={{ maxWidth: '1096px' }}>
      <div style={{
        display: "flex",
        position: "relative",
        backgroundColor: "black",
        padding: "2rem",
        marginTop: "5rem",
        borderRadius: '0.25rem',
      }}>
        <div className="main-search-input fl-wrap" style={{ display: 'flex', flexDirection: 'column', boxShadow: 'unset', padding: 0, background: 'unset', marginTop: 0, height: '100%', justifyContent: 'space-around' }}>
          <div>
            <CurrentFilter style={{
              borderTopLeftRadius: '30px',
              borderBottomLeftRadius: '30px',
            }} />
          </div>
          <div>
            <button className="main-search-button" onClick={() => send()} style={{ position: 'relative', marginTop: '1rem', borderRadius: '0.25rem', float: 'right', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Search
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader-wrap" style={{ justifyContent: 'center', backgroundColor: '#00476710', position: 'absolute', display: 'flex' }}>

        </div>
      )}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', zIndex: 20, top: '20rem', left: '50%', right: '50%', transform: 'translate(-50%, -50%)', width: '18rem', }}>
          <img style={{ width: '60%' }} src={`${process.env.PUBLIC_URL}/images/logoblue.png`} />
          <div style={{ position: 'unset' }} className="pulse"></div>
        </div>
      )}
    </div>
  );
}