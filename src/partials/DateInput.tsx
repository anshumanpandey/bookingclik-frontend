import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

export const DateInput: React.FC<{onChange: (v: string) => void, defaultValue?: string | null }> = ({onChange, defaultValue}) => {
    useEffect(() => {
        if (defaultValue) onChange(defaultValue)
    }, []);
    return (
        <NumberFormat
            type="text"
            defaultValue={defaultValue || undefined}
            format={(value) => {
                let format = "DD/MM/YYYY";

                if (value.length <= 1) {
                    format = `${value.slice(0, 1)}/MM/YYYY`;
                } else if (value.length <= 2) {
                    let day = value;
                    if (parseInt(day) > 31) day = '31';
                    format = `${day}/MM/YYYY`;
                } else if (value.length >= 3 && value.length <= 4) {
                    const month = parseInt(value.slice(2)) > 12 ? '12' : value.slice(2);

                    format = `${value.slice(0, 2)}/${month}/YYYY`
                } else if (value.length >= 4 && value.length <= 8) {
                    let year = value.slice(4, 8);

                    if (year.length === 4 && parseInt(year) < dayjs().year()) {
                        year = dayjs().year().toString()
                    }

                    format = `${value.slice(0, 2)}/${value.slice(2, 4)}/${year.length < 4 ? `${year}${`YYYY`.slice(year.length)}`: year}`
                } else {
                    let year = value.slice(4, 8);

                    format = `${value.slice(0, 2)}/${value.slice(2, 4)}/${year}`
                }
                return format;
            }}
            placeholder="Date: 09/12/2019"
            onValueChange={(v) => {
                if (v.value.length === 8) {
                    onChange(v.formattedValue)
                }
            }}
        />
    );
}