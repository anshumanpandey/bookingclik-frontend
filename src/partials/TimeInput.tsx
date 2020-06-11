import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputBase } from '@material-ui/core';
import moment from 'moment';

type Props = {
    onChange: (v: moment.Moment) => void,
    defaultValue?: moment.Moment | null
    style?: React.CSSProperties
}
export const TimeInput: React.FC<Props> = ({ style, onChange, defaultValue }) => {
    const [hours, setHour] = useState<moment.Moment | undefined>(defaultValue ? defaultValue : undefined);

    useEffect(() => {
        if (hours) onChange(hours)
    }, [hours]);

    let val = defaultValue
    if (hours) val = hours

    return (
        <>
        <Select
            className={`TimeInput ${!val ? 'gray-text' : ''}`}
            fullWidth={true}
            labelId="demo-simple-select-label"
            value={val ? val.format('H:mm') : 'none'}
            input={<InputBase
                startAdornment={(
                    <div style={{ paddingLeft: '0.5rem' }}>
                        <i style={{ color: '#154a64'}} className="fa fa-clock"></i>
                    </div>
                )}
                style={{ ...style}}
            />}
            onChange={(e) => {
                if (typeof e.target.value == 'string') {
                    setHour(moment(e.target.value.toString(), 'H:mm'))
                }
                return
            }}
        >
            <MenuItem value="none" disabled>
                HH:mm
            </MenuItem>
            {Array(24).fill(1).map((_, hour) => {
                return [
                    `${hour}:00`,
                    `${hour}:15`,
                    `${hour}:30`,
                    `${hour}:45`,
                ];               
            }).flat(2).map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
        </Select>
        </>
    )
}