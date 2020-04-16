import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useAxios from 'axios-hooks'
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { IataCode, CarsSearchCriteria, Terms } from '../../types';
import { CarSearchWidgetFilters, DefaultSearchWidgetFilters } from './SearchFilter';
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const SearchWidget: React.FC<{ term: Terms}> = ({ term }) => {
  const history = useHistory()
  const [optionToSearch, setOptionToSearch] = useState<string>('cars');
  const [searchCriteria, setSearchCriteria] = useState<CarsSearchCriteria | null>(null);

  const CurrentFilter = optionToSearch === 'cars' ? CarSearchWidgetFilters : DefaultSearchWidgetFilters;

  const [{ data, loading, error }, doSearch] = useAxios<IataCode[]>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

  const send = () => {
    if (!searchCriteria) return

    const firstDate = dayjs();
    searchCriteria.puDate = searchCriteria.puDate || firstDate.format(`DD/MM/YYYY`);

    if (searchCriteria.doDate) {
      searchCriteria.doDate = searchCriteria.doDate;
    } else if (searchCriteria.puDate) {
      searchCriteria.doDate = dayjs(searchCriteria.puDate, `DD/MM/YYYY`).add(1, 'week').format(`DD/MM/YYYY`);
    } else {
      searchCriteria.doDate = dayjs().add(1, 'week').format(`DD/MM/YYYY`)
    }
     

    doSearch({ params: {...searchCriteria, location: searchCriteria.location.code} })
      .then(res => {
        history.push('/results', {
          search: {
            criteria: { term: term, ...searchCriteria },
            results: res.data
          }
        });
      });
  }

  return (
    <div className="main-search-input-wrap">
      <div className="main-search-input fl-wrap" style={{ display: 'flex' }}>
        <CurrentFilter style={{
          borderTopLeftRadius: '30px',
          borderBottomLeftRadius: '30px',
        }} onChange={setSearchCriteria} />
        <button className="main-search-button" onClick={() => send()}>
          Search {loading && <CircularProgress color="inherit" size={15} />}
        </button>
      </div>
    </div>
  );
}