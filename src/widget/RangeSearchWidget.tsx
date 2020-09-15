import React, { useState, useEffect } from 'react';
import { Typography, Slider } from '@material-ui/core';
import { useDynamicFiltersState } from './DynamicFilterState';

type Props = {
    minValue: string
    maxValue: string
    category?: { name: string, propertyToWatch: string, type: string }
    onChange: (v: number[]) => void
}
export const RangeSearchWidget: React.FC<Props> = ({ minValue, maxValue, category, onChange }) => {
    const [range, setRange] = useState<[number, number]>([0, 0] as [number, number]);
    const [rangeToDisplay, setRangeToDisplay] = useState<[number, number]>([0, 0] as [number, number]);

    const [, setDinamicFilters] = useDynamicFiltersState('activeFilters');

    useEffect(() => {
        setDinamicFilters(prev => {
            if (category?.propertyToWatch && category?.type) {
                if (range[0] === 0 && range[1] === 0) return prev.filter(f => f.category.name !== category.name)

                const currentCategory = prev.find(p => p.category.name === category.name);

                //category is on state
                if (currentCategory) {
                    currentCategory.range = range
                    return [...prev.filter(p => p.category.name !== currentCategory.category.name), currentCategory]
                }

                prev.push({ category, activeValues: [], range: range })
                return [...prev];
            }
            return prev
        })
    }, [range]);

    return (
        <>
            <Typography id="range-slider" gutterBottom>
                {category?.name} range
                </Typography>
            <Slider
                min={parseFloat(minValue)}
                max={parseFloat(maxValue)}
                value={rangeToDisplay}
                onChange={(e, v) => {
                    if (!Array.isArray(v)) return
                    setRangeToDisplay([v[0], v[1]])
                }}
                onChangeCommitted={(e, v) => {
                    if (!Array.isArray(v)) return
                    setRange([v[0], v[1]])
                    onChange(v)
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
        </>
    );
}