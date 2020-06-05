import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import useDidMountEffect from '../utils/useDidMountEffect';
import ResolveCurrencySymbol from '../utils/ResolveCurrencySymbol';

type Props = {
    options: { label: string, value: string, total?: number[], cars?: any[] }[]
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


    return (
        <div className=" fl-wrap filter-tags" style={styles}>
            <Typography gutterBottom style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                By {category.name}
            </Typography>
            {options.map(option => {
                let cheapesCar = {currency: "€", price: 0};
                if (option.cars && option.cars.length != 0) {
                    cheapesCar = option.cars.sort((a: any, b: any) => a.vehicle.price - b.vehicle.price)[0].vehicle
                }

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
                                {option.cars && <label style={{ padding: 0 }}>
                                    ({option.total && option.total.length})
                                </label>}
                            </div>
                            {option.cars && <label style={{ padding: 0 }}>
                                {ResolveCurrencySymbol(cheapesCar.currency)}{Math.floor(cheapesCar.price)}.00
                            </label>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}