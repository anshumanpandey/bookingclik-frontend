import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks'

export type IataCode = { id: number, code: string, location: string }
type Response = { list: IataCode[], dictionary: {[k:string]: IataCode}}

export const LocationDropdown: React.FC<{onChange: (str: IataCode) => void }> = ({ onChange }) => {
    const selectID = "codesList";
    const [optionToSearch, setOptionToSearch] = useState<string>('cars');

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
            <div className="main-search-input-item">
                <input type="text" placeholder="Loading codes..." value="" disabled={true}/>
            </div>
        )
    };
    
    const ErroIndicator = () => {
        return (
            <div className="main-search-input-item">
                <input type="text" value="Error loading. Try again" onClick={() => refetch()} />
            </div>
        )
    };

    return (
        <>
            <div className="main-search-input-item" id="LocationDropdownWidget" style={{ display: readyToShow ? 'unset': 'none'}} onClick={(e) => {
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