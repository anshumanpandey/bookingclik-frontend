import React, { useState, useEffect } from 'react';
import { FormControlLabel, FormLabel, Checkbox } from '@material-ui/core';
import { DateInput, LocationDropdown, TimeInput } from '../../partials';
import { useSearchWidgetState, dispatchSearchState } from './useSearchWidgetGlobalState';
import { TIME_FORMAT } from '../../utils/DateFormat';
import moment from 'moment';
import { useDidUpdateEffect } from '../../utils/DidUpdateEffect';

export const CarSearchWidgetFilters: React.FC<{ style: React.CSSProperties }> = () => {
    const [doDate] = useSearchWidgetState('doDate')
    const [puDate] = useSearchWidgetState('puDate')
    const [pickupCode, setPickupCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')
    const [displayDropoffInput, setDisplayDropoffInput] = useState(dropoffCode ? true : false)

    useDidUpdateEffect(() => {
        dispatchSearchState({ type: 'dropoff.date', state: puDate })
    }, [puDate])

    useEffect(() => {
        if (pickupCode.internalcode == dropoffCode.internalcode) {
            setDisplayDropoffInput(false)
        }
    }, [pickupCode, dropoffCode])

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
                        control={<Checkbox onChange={() => {
                            setDisplayDropoffInput(p => {
                                const status = !p;
                                if (status == false) {
                                    setDropoffCode(pickupCode);
                                }
                                return !p;
                            })
                        }} checked={!displayDropoffInput} style={{ color: 'white', alignSelf: 'flex-start' }} />}
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
                                    border: 'unset',
                                    borderRadius: '6px',
                                }}
                                defaultValue={puDate}
                                onChange={(v) => dispatchSearchState({ type: 'pickup.date', state: v })} />
                            </div>
                        </div>

                        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                            <div className="main-search-input-item" style={{ width: '100%' }}>
                                <TimeInput
                                    defaultValue={moment().set("hour", 10).set("minute", 30)}
                                    style={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    onChange={(v) => dispatchSearchState({ type: 'pickup.time', state: v })}
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
                                    borderRadius: '6px',
                                }} onChange={(v) => dispatchSearchState({ type: 'dropoff.date', state: v })} />
                            </div>
                            </div>

                        <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                            <div className="main-search-input-item" style={{ borderRight: 'unset', width: '100%' }}>
                                <TimeInput
                                    defaultValue={moment().set("hour", 10).set("minute", 30)}
                                    style={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    onChange={(v) => dispatchSearchState({ type: 'dropoff.time', state: v })}
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