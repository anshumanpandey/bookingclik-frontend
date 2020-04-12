import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import { useHistory } from 'react-router-dom';
import { IataCode } from '../types';
import { CarsSearchCriteria, FilterMap } from './SearchFilter';

export function SearchWidget() {
  const history = useHistory()
  const selectID = 'select-category'
  const [optionToSearch, setOptionToSearch] = useState<string>('cars');
  const [searchCriteria, setSearchCriteria] = useState<CarsSearchCriteria | null>(null);

  const CurrentFilter = FilterMap.searchWidget[optionToSearch] ? FilterMap.searchWidget[optionToSearch] : FilterMap.searchWidget.default;

  const [{ data, loading, error }, doSearch] = useAxios<IataCode[]>(`${process.env.REACT_APP_BACKEND_URL ?  process.env.REACT_APP_BACKEND_URL : window.location.origin}/search`, { manual: true })

  useEffect(() => {
    // @ts-ignore
    $(`#${selectID}`).niceSelect()
  }, []);

  const send = () => {
    if (!searchCriteria) {
      return;
    }

    doSearch({ params: { location: searchCriteria.location.code, puDate: searchCriteria.puDate, doDate: searchCriteria.doDate } })
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
          <select data-display="All Categories" value={optionToSearch} id={selectID} >
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