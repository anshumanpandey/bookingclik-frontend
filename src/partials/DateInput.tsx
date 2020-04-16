import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'rc-calendar';
//@ts-ignore
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';

export const DateInput: React.FC<{onChange: (v: string) => void, defaultValue?: string | null }> = ({onChange, defaultValue}) => {
    const [date, setDate] = useState<moment.Moment | null>(defaultValue ? moment(defaultValue, "DD/MM/YYYY") : null);

    useEffect(() => {
        if (defaultValue) onChange(defaultValue)
    }, []);

    const calendar = (<Calendar/>);
    return (
        <div>
            <DatePicker
                animation="slide-up"
                value={date}
                disabled={false}
                calendar={calendar}
                onChange={(v: any) =>{
                    setDate(moment(v._d));
                    onChange(moment(v._d).format("DD/MM/YYYY"))
                }}
            >{
                ({value}: any) => {
                    return (
                        <input
                            readOnly={true}
                            placeholder={`Date: ${moment().format('DD/MM/YYYY')}`}
                            value={value ? value.format("DD/MM/YYYY") : undefined}
                        />
                    )
                }
            }</DatePicker>
        </div>
    )
}