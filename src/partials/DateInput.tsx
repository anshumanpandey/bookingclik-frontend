import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { FormLabel, InputBase } from '@material-ui/core';
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
    disabledBefore?: Moment
}
export const DateInput: React.FC<Props> = ({ onChange, defaultValue, style, label, disabledBefore }) => {
    const [date, setDate] = useState<moment.Moment | null | undefined>(defaultValue);
    useEffect(() => {
        if (date) onChange(date)
    }, []);

    const calendar = (<Calendar
        showDateInput={false}
        format={DATE_FORMAT}
        disabledDate={(current: any) => {
            const date = moment();
            date.hour(0);
            date.minute(0);
            date.second(0);

            if (disabledBefore) {
                const c = disabledBefore.clone().startOf("day").add(1, 'days')
                return current.isBefore(c);
            }

            if (!current) {
                // allow empty select
                return false;
            }

            return current.isBefore(date); // This is MomentJS function 
        }}
    />);
    return (
        <>
            <DatePicker
                animation="slide-up"
                value={date || defaultValue}
                calendar={calendar}
                onChange={(v: any) => {
                    setDate(moment(v._d));
                    onChange(moment(v._d))
                }}
            >{
                    ({ value }: any) => {
                        let val = defaultValue
                        if (date) val = date

                        return (
                            <InputBase
                                startAdornment={(
                                    <div style={{ paddingLeft: '0.5rem' }}>
                                        <i style={{ color: '#154a64' }} className="fa fa-calendar"></i>
                                    </div>
                                )}
                                readOnly={true}
                                style={{ ...style, float: 'left', background: 'white', height: '100%', width: '95%' }}
                                placeholder={`Date: ${moment().format(DATE_FORMAT)}`}
                                value={val ? val.format(DATE_FORMAT) : undefined}
                            />
                        )
                    }
                }</DatePicker>
        </>
    )
}