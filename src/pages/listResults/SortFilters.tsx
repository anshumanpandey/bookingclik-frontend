import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import { useSearchState } from './SearchGlobalState';


export const SortFilterCars: React.FC = () => {
    const [search] = useSearchState('scrape')

    const [sortPrice, setSortPrice] = useSortState('price');

    let body = <CircularProgress color="inherit" />

    return (
        <>
            <div className="add-list-container">
                <Panel buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                    <h4 className="more-filter-option" style={{ float: 'left' }}>Sort</h4>
                </div>}>
                    <div className="custom-form">

                        <div className="row">
                            <div className="col-md-12">
                                <div className="list-single-header-item-opt fl-wrap" onClick={() => setSortPrice(sortPrice == PriceSortOrder.ASC ? PriceSortOrder.DESC : PriceSortOrder.ASC)}>
                                    <div className="list-single-header-cat fl-wrap">
                                        <a href="#" onClick={(e) => e.preventDefault()}>Price {sortPrice}</a>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </Panel>
            </div>
        </>
    );
}



