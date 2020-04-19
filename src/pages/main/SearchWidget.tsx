import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useAxios from 'axios-hooks'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { IataCode, Terms } from '../../types';
import { CarSearchWidgetFilters, DefaultSearchWidgetFilters } from './SearchFilter';
import moment from 'moment';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';
import { DATE_FORMAT, TIME_FORMAT } from '../../utils/DateFormat';
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const SearchWidget: React.FC<{ term: Terms }> = ({ term }) => {
  const history = useHistory()
  const [optionToSearch] = useState<string>('cars');

  const [puDate] = useSearchWidgetState('puDate')
  const [puTime] = useSearchWidgetState('puTime')
  const [doDate] = useSearchWidgetState('doDate')
  const [doTime] = useSearchWidgetState('doTime')
  const [iataCode] = useSearchWidgetState('code')

  const CurrentFilter = optionToSearch === 'cars' ? CarSearchWidgetFilters : DefaultSearchWidgetFilters;

  const [{ data, loading, error }, doSearch] = useAxios<IataCode[]>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

  const send = () => {
    const date = moment();
    const searchCriteria = {
      term: term,
      puDate: puDate || date,
      puTime: puTime || date.add(1, 'week'),

      doDate: doDate || date,
      doTime: doTime || date,
      location: iataCode
    }

    if (!searchCriteria.location) return

    const params = {
     location: searchCriteria.location.code,
     puDate: searchCriteria.puDate.format(DATE_FORMAT),
     puTime: searchCriteria.puTime.format(TIME_FORMAT),

     doDate: searchCriteria.doDate.format(DATE_FORMAT),
     doTime: searchCriteria.doTime.format(TIME_FORMAT),
    }

    doSearch({ params })
      .then(res => {
        history.push('/results', {
          results: res.data
        });
      });
  }

  return (
    <div className="main-search-input-wrap" style={{ maxWidth: '1096px' }}>
      <div style={{
        height: "13rem",
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
            <button className="main-search-button" onClick={() => send()} style={{ position: 'relative', borderRadius: '0.25rem', float: 'right', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Search {loading && <CircularProgress color="inherit" size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}