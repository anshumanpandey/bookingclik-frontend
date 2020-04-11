import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'
import { IataCode } from '../types';

type Response = { list: IataCode[], dictionary: {[k:string]: IataCode}}
type Prop = {onChange: (str: IataCode) => void , className?: string, style?: React.CSSProperties, defaultValue?: string }

export const LocationDropdown: React.FC<Prop> = ({ onChange, className, style, defaultValue }) => {
    const selectID = "codesList";
    const [optionToSearch, setOptionToSearch] = useState<string>(defaultValue ?? '0');

    const [{ data, loading, error }, refetch] = useAxios<Response>('http://localhost:3030/iataCodes')

    const [readyToShow, setReadyToShow] = useState<boolean>(!loading);

    useEffect(() => {
        // @ts-ignore
        $(`#${selectID}`).niceSelect()
    }, []);

    useEffect(() => {
        if (data && data.list.length > 0) {
            // @ts-ignore
            $(`#${selectID}`).niceSelect('update');
            setReadyToShow(true);

            onChange(data.list[0]);
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
                <input type="text" value="Error loading. Try again" onClick={() => refetch()} />
            </div>
        )
    };

    return (
        <>
            <div className={className ? className : "main-search-input-item"} style={{
                display: readyToShow ? 'unset': 'none',
                ...style
            }} onClick={(e) => {
                const val = $(`#${selectID}`).val();
                if (val) {
                    setOptionToSearch(val.toString())
                    const code = data.dictionary[val.toString()]
                    if (code) onChange(code);
                }
            }}>
                <select value={optionToSearch} id={selectID} >
                    {data && data.list.map((code) => {
                        return <option key={code.code} value={code.code}>{code.location}</option>
                    })}
                </select>
            </div>
            { (!readyToShow && !error) && <LoadingIndicator />}
            { (error && !loading) && <ErroIndicator />}
        </>
    );
}