import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { TIME_FORMAT } from '../utils/DateFormat';

type Props = {
    onChange: (v: moment.Moment) => void,
    defaultValue?: moment.Moment | null
}
export const TimeInput: React.FC<Props> = ({ onChange, defaultValue }) => {
    const [hours, setHour] = useState<moment.Moment | undefined>(defaultValue || undefined );

    useEffect(() => {
        if (hours) onChange(hours)
    }, [hours]);

    return (
            <TimePicker
                defaultValue={hours}
                className="time-input"
                placeholder={`Time: ${TIME_FORMAT}`}
                showSecond={false}
                onChange={setHour}
                format={TIME_FORMAT}
                inputReadOnly
                clearIcon={<></>}
            />
    )
}