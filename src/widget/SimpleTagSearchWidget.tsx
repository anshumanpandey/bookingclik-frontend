import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import useDidMountEffect from '../utils/useDidMountEffect';

type Props = {
    options: { label: string, value: string, total?: number[], cars: any[] }[]
    category: { name: string, propertyToWatch: string, type: string }
    onChange: (v: string[]) => void,
}
export const SimpleTagSearchWidget: React.FC<Props> = ({ options, category, onChange }) => {
    const [optionsSelected, setOptions] = useState<{ label: string, value: string }[]>([]);

    const styles = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginBottom: '1rem',
        marginTop: 'unset',
    }
    
    useDidMountEffect(() => {
        onChange(optionsSelected.map(i => i.value))
    }, [optionsSelected]);

    console.log(options[0].cars)

    return (
        <div className=" fl-wrap filter-tags" style={styles}>
            <Typography gutterBottom style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                By {category.name}
            </Typography>
            {options.map(option => {
                return (
                    <div key={option.label} style={{ display: 'flex', alignItems: 'center' }}>
                        <input style={{ marginBottom: 0 }} type="checkbox" id={`tag-search-${option.label}`} name={`tag-search-${option.label}`} checked={optionsSelected.find(selectedOption => selectedOption.label === option.label) !== undefined} onChange={() => {
                            const found = optionsSelected.find(selectedOption => selectedOption.label === option.label);

                            setOptions(prev => {
                                if (found) {
                                    return [...prev.filter(o => o.label !== found.label)]
                                }

                                return [...prev, option];
                            })
                        }} />
                        <div style={{width: '100%',display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex'}}>
                                <label style={{ paddingRight: 5 }} htmlFor={`tag-search-${option.label}`}>
                                    {option.label}
                                </label>
                                <label style={{ padding: 0 }}>
                                    ({option.total && option.total.length})
                                </label>
                            </div>
                            <label style={{ padding: 0 }}>
                                    ({option.cars && option.cars.length != 0 && option.cars.sort((a: any, b: any) => a.vehicle.price - b.vehicle.price)[0].vehicle.price })
                            </label>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}