import React, { useState, useEffect } from 'react';
import { throttle } from "throttle-debounce";
// @ts-ignore
import { InputBase, CircularProgress, withStyles, WithStyles, createStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IataCode } from '../types';
import { useHttp } from '../utils/AxiosConfig';

let styles = createStyles({
    input: {
        width: '80%!important',
        paddingTop: 0,
        fontSize: '0.8rem'
    },
    inputRoot: {
        flexWrap: 'unset'
    }
})

interface Prop {
    onChange: (str: IataCode) => void,
    customeClasses?: string,
    style?: React.CSSProperties,
    defaultValue?: IataCode,
    secondary?: boolean,
    classes?: {
        input: string
        inputRoot: string
    }
}

const LocationDropdownComponent: React.FC<Prop & WithStyles<typeof styles, true>> = ({ secondary, onChange, customeClasses, classes, style, defaultValue }) => {
    const [{ data, loading, error }, refetch] = useHttp<IataCode[]>({ url: '/iataCodes' })

    const [open, setOpen] = useState(false);

    const [readyToShow, setReadyToShow] = useState<boolean>(!loading);

    useEffect(() => {
        if (data && data.length > 0) {
            setReadyToShow(true);

            onChange(data[0]);
        }
    }, [data]);

    const LoadingIndicator = () => {
        return (
            <div className={customeClasses ? customeClasses : "main-search-input-item"}>
                <input type="text" placeholder="Loading codes..." value="" disabled={true} />
            </div>
        )
    };

    const searchCode = throttle(1000, (v: string) => refetch({ params: { search: v }}))

    return (
        <>
            <div className={customeClasses ? customeClasses : "main-search-input-item"} style={{
                ...style
            }}>
                <Autocomplete
                    id="combo-box-demo"
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onInputChange={(e, v) => {
                        if (v === '') return
                        return searchCode(v)
                    }}
                    defaultValue={defaultValue}
                    loading={open && data !== null}
                    options={(data && data.length !== 0) ? data : []}
                    getOptionLabel={(option: IataCode) => option.location}
                    filterOptions={x => x}
                    classes={{
                        inputRoot: classes.inputRoot
                    }}
                    renderInput={(params) => {
                        return (
                            <InputBase
                                {...params.InputProps}
                                id={params.id}
                                disabled={params.disabled}
                                classes={{
                                    input: `${classes.input} ${secondary ? 'secondary' : undefined} `,
                                }}
                                placeholder="Select Pickup Location"
                                inputProps={params.inputProps}
                                endAdornment={(
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )}
                            />
                        );
                    }}
                />
            </div>
            {(!readyToShow && !error) && <LoadingIndicator />}
        </>
    );
}

export const LocationDropdown = withStyles(styles)(LocationDropdownComponent) as (props: Prop) => React.ReactElement;