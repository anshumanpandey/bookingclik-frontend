import React, { useState, useEffect } from 'react';
import { FormControlLabel, FormLabel, Checkbox } from '@material-ui/core';
import { DateInput, LocationDropdown, TimeInput } from '../../partials';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';
import { TIME_FORMAT } from '../../utils/DateFormat';
import moment from 'moment';
import { useDidUpdateEffect } from '../../utils/DidUpdateEffect';

export const CarSearchWidgetFilters: React.FC<{ style: React.CSSProperties }> = () => {
    const [doDate, setDoDate] = useSearchWidgetState('doDate')
    const [, setDoTime] = useSearchWidgetState('doTime')
    const [puDate, setPuDate] = useSearchWidgetState('puDate')
    const [, setPuTime] = useSearchWidgetState('puTime')
    const [pickupCode, setPickupCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')
    const [displayDropoffInput, setDisplayDropoffInput] = useState(dropoffCode ? true : false)

    useDidUpdateEffect(() => {
        setDoDate(puDate)
    }, [puDate])

    return (
        <>
            <div className="row">
                <div className="col-md-12" style={{ marginBottom: displayDropoffInput ? '1rem': 0 ,display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <LocationDropdown defaultCode={pickupCode} onChange={setPickupCode} style={{
                        borderTopLeftRadius: '30px',
                        borderBottomLeftRadius: '30px',
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '0.25rem'
                    }} />
                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox onChange={() => setDisplayDropoffInput(p => !p)} checked={!displayDropoffInput} style={{ color: 'white', alignSelf: 'flex-start' }} />}
                        label={'Return car on same location'}

                    />
                    { displayDropoffInput && (
                        <LocationDropdown defaultCode={dropoffCode} onChange={setDropoffCode} style={{
                            borderTopLeftRadius: '30px',
                            borderBottomLeftRadius: '30px',
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: '0.25rem'
                        }} />
                    )}
                </div>
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <FormLabel style={{ color: 'white', alignSelf: 'flex-start', flexDirection: 'column' }}>Pick-up date</FormLabel>
                    <div>
                        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>

                            <div className="main-search-input-item" style={{ width: '100%' }}>
                                <DateInput style={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    border: 'unset',
                                    borderBottomLeftRadius: '6px',
                                    borderTopLeftRadius: '6px',
                                }}
                                defaultValue={puDate}
                                onChange={(v) => setPuDate(v)} />
                            </div>
                        </div>

                        <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                            <div className="main-search-input-item" style={{ width: '100%' }}>
                                <TimeInput
                                    defaultValue={moment().set("hour", 10).set("minute", 30)}
                                    style={{ backgroundColor: 'white', borderLeft: '1px solid gray', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: '6px', borderTopRightRadius: '6px' }}
                                    onChange={setPuTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="col-md-11 col-md-offset-1" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                        <FormLabel style={{ color: 'white', alignSelf: 'flex-start' }}>Drop-off date</FormLabel>
                        <div>
                        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>

                            <div className="main-search-input-item" style={{ borderRight: 'unset', width: '100%' }}>
                                <DateInput
                                    defaultValue={doDate}
                                    style={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: '6px',
                                    borderTopLeftRadius: '6px',
                                }} onChange={(v) => setDoDate(v)} />
                            </div>
                            </div>

                        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                            <div className="main-search-input-item" style={{ borderRight: 'unset', width: '100%' }}>
                                <TimeInput
                                    defaultValue={moment().set("hour", 10).set("minute", 30)}
                                    style={{ backgroundColor: 'white', borderLeft: '1px solid gray', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: '6px', borderTopRightRadius: '6px' }}
                                    onChange={setDoTime}
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const DefaultSearchWidgetFilters: React.FC = () => {
    return (
        <>
            <div className="main-search-input-item">
                <input type="text" placeholder="What are you looking for?" value="" />
            </div>
            <div className="main-search-input-item location" id="autocomplete-container">
                <input type="text" placeholder="Location" id="autocomplete-input" value="" />
                <a href="#"><i className="fa fa-dot-circle-o"></i></a>
            </div>
        </>
    );
}