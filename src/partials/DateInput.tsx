import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FormLabel } from '@material-ui/core';
import Calendar from 'rc-calendar';
//@ts-ignore
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import { DATE_FORMAT } from '../utils/DateFormat';

type Props = {
    onChange: (v: moment.Moment) => void,
    defaultValue?: moment.Moment | null
    style?: React.CSSProperties
    label?: string
}
export const DateInput: React.FC<Props> = ({ onChange, defaultValue, style, label }) => {
    const [date, setDate] = useState<moment.Moment | null>(defaultValue ? defaultValue : null);
    useEffect(() => {
        if (date) onChange(date)
    }, []);

    const calendar = (<Calendar />);
    return (
        <>
            {label && <FormLabel style={{ float: 'left' }}>{label}</FormLabel>}
            <DatePicker
                animation="slide-up"
                value={date}
                disabled={false}
                calendar={calendar}
                onChange={(v: any) => {
                    setDate(moment(v._d));
                    onChange(moment(v._d))
                }}
            >{
                    ({ value }: any) => {
                        return (
                            <input
                                readOnly={true}
                                style={{ ...style, height: '100%' }}
                                placeholder={`Date: ${moment().format(DATE_FORMAT)}`}
                                value={date ? date.format(DATE_FORMAT) : undefined}
                            />
                        )
                    }
                }</DatePicker>
        </>
    )
}