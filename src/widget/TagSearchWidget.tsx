import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

type Props = {
    options: string[]
    category: string
    onChange: (v: string[]) => void
}
export const TagSearchWidget: React.FC<Props> = ({ options, category }) => {
    const [optionsSelected, setOptions] = useState<string[]>([]);

    const styles = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginBottom: '1rem',
    }

    return (
        <div className=" fl-wrap filter-tags" style={styles}>
            <Typography gutterBottom style={{ borderBottom: '1px solid #eee' }}>
                Filter by {category}
            </Typography>
            {options.map(o => {
                const option = o.replace(/\s/g, '-');
                return (
                    <div>
                        <input key={option} type="checkbox" name={`tag-search-${option}`} checked={optionsSelected.find(selectedOption => selectedOption === option) !== undefined} onChange={() => {
                            const found = optionsSelected.find(selectedOption => selectedOption === option);

                            setOptions(prev => {
                                if (found) {
                                    return prev.filter(o => o !== found)
                                }

                                return [...prev, option];
                            })
                        }} />
                        <label htmlFor="check-aa">{o}</label>
                    </div>
                );
            })}
        </div>
    );
}