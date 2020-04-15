import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import useAxios from 'axios-hooks'
import { useHistory } from 'react-router-dom';
import { IataCode, CarsSearchCriteria } from '../../types';
import { CarSearchWidgetFilters, DefaultSearchWidgetFilters } from './SearchFilter';
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export function SearchWidget() {
  const history = useHistory()
  const selectID = 'select-category'
  const [optionToSearch, setOptionToSearch] = useState<string>('cars');
  const [searchCriteria, setSearchCriteria] = useState<CarsSearchCriteria | null>(null);

  const CurrentFilter = optionToSearch === 'cars' ? CarSearchWidgetFilters : DefaultSearchWidgetFilters;

  const [{ data, loading, error }, doSearch] = useAxios<IataCode[]>(`${process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

  useEffect(() => {
    // @ts-ignore
    $(`#${selectID}`).niceSelect()
  }, []);

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
            criteria: { term: 'Cars', ...searchCriteria },
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
        <div className="main-search-input-item" onClick={(e) => {
          const val = $('#select-category').val();
          if (val) {
            setOptionToSearch(val.toString())
          }
        }}>
          <select data-display="All Categories" defaultValue={optionToSearch} id={selectID} >
            <option value={'cars'}>Cars</option>
            <option value={'shops'}>Shops</option>
            <option value={'hotels'}>Hotels</option>
            <option value={'restaurants'}>Restaurants</option>
            <option value={'fitness'}>Fitness</option>
            <option value={'events'}>Events</option>``
          </select>
        </div>
        <button className="main-search-button" onClick={() => send()}>Search</button>
      </div>
    </div>
  );
}