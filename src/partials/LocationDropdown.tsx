import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
// @ts-ignore
import { InputBase, CircularProgress, withStyles, WithStyles, createStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IataCode } from '../types';

const styles = createStyles({
    input: {
        paddingTop: 0,
        fontSize: '0.8rem'
    }
})

type Response = { list: IataCode[], dictionary: { [k: string]: IataCode } }
interface Prop {
    onChange: (str: IataCode) => void,
    customeClasses?: string,
    style?: React.CSSProperties,
    defaultValue?: IataCode,
    classes?: {
        input: string
    }
}



const LocationDropdownComponent: React.FC<Prop & WithStyles<typeof styles, true>> = ({ onChange, customeClasses, classes, style, defaultValue }) => {
    const [{ data, loading, error }, refetch] = useAxios<IataCode[]>('/iataCodes', { manual: true })

    const [open, setOpen] = useState(false);

    const [readyToShow, setReadyToShow] = useState<boolean>(!loading);

    /*React.useEffect(() => {
        if (!open) return 
        refetch();
      }, [open]);*/

    const selectStyles = {
        menu: (provided: any) => ({ ...provided, color: 'hsl(0,0%,20%)' }),
        singleValue: (provided: any) => ({ ...provided, color: (style && style.color) ? style.color : 'color: hsl(0,0%,20%)' }),
        indicatorSeparator: (provided: any) => ({ ...provided, display: 'none' }),
        valueContainer: (provided: any) => ({ ...provided, height: '100%' }),
        control: (provided: any) => ({ ...provided, flex: 1, display: 'flex', border: 'unset', ...style }),
        container: (provided: any) => ({ ...provided, height: '100%', display: 'flex' }),
        input: (provided: any) => ({
            ...provided, height: '100%',
            'input': {
                backgroundColor: 'red'
            }
        }),
        dropdownIndicator: (provided: any, state: any) => {
            return {
                ...provided,
                color: (style && style.color) ? style.color : "#4DB7FE",
                transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                ':hover': {
                    color: (style && style.color) ? style.color : "#4DB7FE",
                }
            };
        }
    }

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

    const ErroIndicator = () => {
        return (
            <div className={customeClasses ? customeClasses : "main-search-input-item"}>
                <input type="text" value="Error loading. Click to try again" onClick={() => refetch()} />
            </div>
        )
    };

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
                        refetch({ params: { search: v }})
                    }}
                    defaultValue={defaultValue}
                    loading={open && data && data.length === 0}
                    options={data || []}
                    getOptionLabel={(option: IataCode) => option.location}
                    renderInput={(params) => {
                        return (
                            <InputBase
                                {...params}
                                classes={classes}
                                placeholder="Select Pickup Location"
                                endAdornment={(
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
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