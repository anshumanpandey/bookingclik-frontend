import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
// @ts-ignore
import Select, { Async } from 'react-select-virtualized';
import { IataCode } from '../types';
import { useHttp } from '../utils/AxiosConfig';
import { throttle } from 'throttle-debounce';

type Response = { list: IataCode[], dictionary: {[k:string]: IataCode}}
type Prop = {onChange: (str: IataCode) => void , className?: string, style?: React.CSSProperties, defaultValue?: IataCode }

export const LocationDropdown: React.FC<Prop> = ({ onChange, className, style, defaultValue }) => {
    const [{ data, loading, error }, refetch] = useHttp<IataCode[]>()

    const [readyToShow, setReadyToShow] = useState<boolean>(!loading);

    const selectStyles = {
        menu: (provided: any) => ({ ...provided, color: 'hsl(0,0%,20%)'}),
        singleValue: (provided: any) => ({ ...provided, color: (style && style.color) ? style.color : 'color: hsl(0,0%,20%)'}),
        indicatorSeparator: (provided: any) => ({ ...provided, display: 'none'}),
        valueContainer: (provided: any) => ({ ...provided, height: '100%'}),
        control: (provided: any) => ({ ...provided, flex: 1, display: 'flex', border: 'unset', ...style}),
        container: (provided: any) => ({ ...provided, height: '100%', display: 'flex'}),
        input: (provided: any) => ({
            ...provided, height: '100%',
            'input': {
                backgroundColor: 'red'
            }
        }),
        dropdownIndicator: (provided:any, state:any) => {
            return {
                ...provided,
                color: (style && style.color) ? style.color : "#4DB7FE",
                transform: state.selectProps.menuIsOpen ? 'rotate(180deg)': 'rotate(0deg)',
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
            <div className={className ? className : "main-search-input-item"}>
                <input type="text" placeholder="Loading codes..." value="" disabled={true}/>
            </div>
        )
    };
    
    const ErroIndicator = () => {
        return (
            <div className={className ? className : "main-search-input-item"}>
                <input type="text" value="Error loading. Click to try again" onClick={() => refetch()} />
            </div>
        )
    };

    return (
        <>
            <div className={className ? className : "main-search-input-item"} style={{
                display: readyToShow ? 'unset': 'none',
                ...style
            }}>

                <Async
                    onChange={(opt: IataCode) => {
                        if (opt) onChange(opt);
                    }}
                    loadOptions={throttle(1000, (v, cb) => {
                        refetch({ url: `/iataCodes?search=${v}` })
                        .then(r => r.data)
                        .then(codes => {
                            return cb(codes)
                        })
                    })}
                    placeholder="Search"
                    classNamePrefix="react-select"
                    defaultValue={defaultValue ? defaultValue : undefined}
                    formatOptionLabel={(obj:IataCode) => obj.location}
                    getOptionLabel={(obj:IataCode) => obj.location}
                    styles={selectStyles}
                    isClearable={false}
                    isSearchable={true}
                    getOptionValue={(obj:IataCode) => obj.code}
                />
            </div>
            { (!readyToShow && !error) && <LoadingIndicator />}
            { (error && !loading) && <ErroIndicator />}
        </>
    );
}