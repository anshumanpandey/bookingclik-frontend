import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useDynamicFiltersState } from './DynamicFilterState';

type Props = {
    options: { label: string, value: string }[]
    category: { name: string, propertyToWatch: string, type: string }
    onChange: (v: string[]) => void
}
export const NumberSearchWidget: React.FC<Props> = ({ options, category }) => {
    const [counter, setCounter] = useState(0);
    const [, setDinamicFilters] = useDynamicFiltersState('activeFilters');

    useEffect(() => {
        setDinamicFilters(prev => {
            if (counter === 0) return prev.filter(f => f.category.name !== category.name)

            const currentCategory = prev.find(p => p.category.name === category.name);

            //category is on state
            if (currentCategory) {
                return [
                    ...prev.filter(f => f.category.name !== category.name),
                    { ...currentCategory, counter: counter }
                ]
            }

            prev.push({ category, activeValues: [], counter: counter })
            return [ ...prev];
        })
    }, [counter]);

    return (
        <div className="quantity act-widget-header fl-wrap">
            <span>
                <img src="http://www.right-cars.com/public/img/icons/door.png" />
                                            {category.name}:
                                        </span>
            <div className="quantity-item">
                <input type="button" style={{ marginBottom: 0 }} onClick={() => setCounter(prev => {
                    if (prev == 0) return 0
                    return prev - 1
                })} readOnly value="-" className="minus" />
                <input type="text" style={{ marginBottom: 0 }} name="quantity" title="Qty" className="qty" step="1" readOnly value={counter} />
                <input type="button" style={{ marginBottom: 0 }} onClick={() => setCounter(prev => prev + 1)} readOnly value="+" className="plus" />
            </div>
        </div>
    );
}