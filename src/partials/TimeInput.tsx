import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputBase } from '@material-ui/core';
import moment from 'moment';

type Props = {
    onChange: (v: moment.Moment) => void,
    defaultValue?: moment.Moment | null
    grayBackgraound?: boolean
    style?: React.CSSProperties
}
export const TimeInput: React.FC<Props> = ({ style, onChange, defaultValue, grayBackgraound }) => {
    const [hours, setHour] = useState<moment.Moment | undefined>(defaultValue ? defaultValue : undefined);

    useEffect(() => {
        if (hours) onChange(hours)
    }, [hours]);

    let val = defaultValue
    if (hours) val = hours

    return (
        <>
        <Select
            className={`TimeInput ${!hours ? 'gray-text' : ''} ${grayBackgraound ? 'gray-background' : ''}`}
            fullWidth={true}
            labelId="demo-simple-select-label"
            value={val ? val.format('H:mm') : 'none'}
            input={<InputBase style={style} />}
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
            }).flat(2).map(i => <MenuItem value={i}>{i}</MenuItem>)}
        </Select>
        </>
    )
}