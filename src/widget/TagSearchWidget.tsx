import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useDynamicFiltersState } from './DynamicFilterState';

type Props = {
    options: { label: string, value: string}[]
    category: { name: string, propertyToWatch: string, type: string }
    onChange: (v: string[]) => void
}
export const TagSearchWidget: React.FC<Props> = ({ options, category }) => {
    const [optionsSelected, setOptions] = useState<{ label: string, value: string}[]>([]);
    const [, setDinamicFilters] = useDynamicFiltersState('activeFilters');

    const styles = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginBottom: '1rem',
        marginTop: 'unset',
    }

    useEffect(() => {
        setDinamicFilters(prev => {
            if (optionsSelected.length == 0) return [...prev.filter(p => p.category.name !== category.name)]
            const currentCategory = prev.find(p => p.category.name === category.name);

            //category is on state
            if (currentCategory) {
                // find properties not active on category and add them
                const nonExistingActiveFiltersValues = optionsSelected.filter(v => !currentCategory.activeValues.includes(v));
                if (nonExistingActiveFiltersValues.length !== 0) currentCategory.activeValues.push(...nonExistingActiveFiltersValues)

                // find properties on state but not active anymore
                const valuesNotActiveAnymore = currentCategory.activeValues.filter(v => !optionsSelected.includes(v));
                if (valuesNotActiveAnymore.length !== 0) currentCategory.activeValues = currentCategory.activeValues.filter(v => !valuesNotActiveAnymore.includes(v));

                const newValues = [ ...prev.filter(p => p.category.name !== currentCategory.category.name), currentCategory]
                return newValues;
            }

            prev.push({ category, activeValues: optionsSelected})
            return [...prev];
        })
    }, [optionsSelected]);

    return (
        <div className=" fl-wrap filter-tags" style={styles}>
            <Typography gutterBottom style={{ borderBottom: '1px solid #eee' }}>
                Filter by {category.name}
            </Typography>
            {options.map(option => {
                return (
                    <div key={option.label}>
                        <input style={{ marginBottom: 0 }} type="checkbox" id={`tag-search-${option.label}`} name={`tag-search-${option.label}`} checked={optionsSelected.find(selectedOption => selectedOption.label === option.label) !== undefined} onChange={() => {
                            const found = optionsSelected.find(selectedOption => selectedOption.label === option.label);

                            setOptions(prev => {
                                if (found) {
                                    return [...prev.filter(o => o.label !== found.label)]
                                }

                                return [...prev, option];
                            })
                        }} />
                        <label htmlFor={`tag-search-${option.label}`}>{option.label}</label>
                    </div>
                );
            })}
        </div>
    );
}