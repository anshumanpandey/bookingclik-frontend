import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

type Props = {
    options: { label: string, value: string }[]
    category: { name: string, propertyToWatch: string, type: string }
    onChange: (v: string[]) => void
}
export const SimpleTagSearchWidget: React.FC<Props> = ({ options, category, onChange }) => {
    const [optionsSelected, setOptions] = useState<{ label: string, value: string }[]>([]);

    const styles = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginBottom: '1rem',
        marginTop: 'unset',
    }

    useEffect(() => {
        onChange(optionsSelected.map(i => i.value))
    }, [optionsSelected]);

    return (
        <div className=" fl-wrap filter-tags" style={styles}>
            <Typography gutterBottom style={{ borderBottom: '1px solid #eee' }}>
                Filter by {category.name}
            </Typography>
            {options.map(option => {
                return (
                    <div key={option.label}>
                        <input type="checkbox" name={`tag-search-${option.label}`} checked={optionsSelected.find(selectedOption => selectedOption.label === option.label) !== undefined} onChange={() => {
                            const found = optionsSelected.find(selectedOption => selectedOption.label === option.label);

                            setOptions(prev => {
                                if (found) {
                                    return [...prev.filter(o => o.label !== found.label)]
                                }

                                return [...prev, option];
                            })
                        }} />
                        <label htmlFor="check-aa">{option.label}</label>
                    </div>
                );
            })}
        </div>
    );
}