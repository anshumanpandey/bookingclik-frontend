import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useAxios from 'axios-hooks'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GRCGDSCode, Terms } from '../../types';
import { CarSearchWidgetFilters, DefaultSearchWidgetFilters } from './SearchFilter';
import moment from 'moment';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
import qs from 'qs';

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const SearchWidget: React.FC<{ term: Terms }> = ({ term }) => {
  const history = useHistory()
  const [optionToSearch] = useState<string>('cars');

  const [puDate] = useSearchWidgetState('puDate')
  const [puTime] = useSearchWidgetState('puTime')
  const [doDate] = useSearchWidgetState('doDate')
  const [doTime] = useSearchWidgetState('doTime')
  const [pickUpCode] = useSearchWidgetState('pickUpCode')
  const [dropoffCode] = useSearchWidgetState('dropoffCode')

  const CurrentFilter = optionToSearch === 'cars' ? CarSearchWidgetFilters : DefaultSearchWidgetFilters;

  const [{ data, loading, error }, doSearch] = useAxios<GRCGDSCode[]>({
    url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
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

    const params = {
      pickUpLocationCode: searchCriteria.pickUpLocation.internalcode,
      pickUpLocationName: searchCriteria.pickUpLocation.locationname,
      dropOffLocationCode: searchCriteria.dropOffLocation ? searchCriteria.dropOffLocation.internalcode: searchCriteria.pickUpLocation.internalcode,
      dropOffLocationName: searchCriteria.dropOffLocation ? searchCriteria.dropOffLocation.locationname: searchCriteria.pickUpLocation.locationname,

      pickUpDate: searchCriteria.pickUpDate.unix(),
      pickUpTime: searchCriteria.pickUpTime.unix(),

      dropOffDate: searchCriteria.dropOffDate.unix(),
      dropOffTime: searchCriteria.dropOffTime.unix(),
    }

    doSearch({ data: { json: BuildJsonQuery(searchCriteria) } })
      .then(res => {
        history.push({
          pathname: '/results',
          search: `?${qs.stringify(params)}`,
          state: {
            results: res.data,
          }
        });
      });
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
              Search {loading && <CircularProgress color="inherit" size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}