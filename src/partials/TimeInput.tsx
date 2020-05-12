import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputBase } from '@material-ui/core';
import moment from 'moment';

type Props = {
    onChange: (v: moment.Moment) => void,
    defaultValue?: moment.Moment | null
}
export const TimeInput: React.FC<Props> = ({ onChange, defaultValue }) => {
    const [hours, setHour] = useState<moment.Moment | undefined>(defaultValue || undefined);

    useEffect(() => {
        if (hours) onChange(hours)
    }, [hours]);

    return (
        <Select
            className={`TimeInput ${!hours ? 'gray-text' : ''}`}
            fullWidth={true}
            labelId="demo-simple-select-label"
            value={hours ? hours.format('H:mm') : 'none'}
            input={<InputBase />}
            onChange={(e) => {
                if (typeof e.target.value == 'string') {
                    setHour(moment(e.target.value.toString(), 'HH:mm'))
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
            }).flat(2).map(i => <MenuItem value={i}>{i}</MenuItem>)}
        </Select>
    )
}