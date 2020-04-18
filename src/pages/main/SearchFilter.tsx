import React, { useState, useEffect } from 'react';
import TimePicker from 'rc-time-picker';
import { DateInput, LocationDropdown } from '../../partials';
import { useSearchWidgetState } from './useSearchWidgetGlobalState';
import { TIME_FORMAT } from '../../utils/DateFormat';

export const CarSearchWidgetFilters: React.FC<{ style: React.CSSProperties}> = () => {
    const [, setDoDate] = useSearchWidgetState('doDate')
    const [, setDoTime] = useSearchWidgetState('doTime')
    const [, setPuDate] = useSearchWidgetState('puDate')
    const [, setPuTime] = useSearchWidgetState('puTime')
    const [, setIataCode] = useSearchWidgetState('code')

    return (
        <>
            <div className="row" style={{ color: 'white', textAlign: 'left' }}>
                <div className="col-md-2" style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <label>Location</label>
                </div>

                <div className="col-md-3" style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <label>Pick up Date</label>
                </div>

                <div className="col-md-2" style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <label>Pick up Time</label>
                </div>

                <div className="col-md-3" style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <label>Drop off Date</label>
                </div>

                <div className="col-md-2" style={{ paddingRight: 0, paddingLeft: 0 }}>
                    <label>Drop off Time</label>
                </div>
            </div>

            <div className="row" style={{ backgroundColor: 'white', borderRadius: '0.25rem' }}>
                <div className="col-md-2" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <LocationDropdown onChange={setIataCode} style={{
                        borderTopLeftRadius: '30px',
                        borderBottomLeftRadius: '30px',
                        width: '100%'
                    }} />
                </div>
                <div className="col-md-3" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <div className="main-search-input-item" style={{ width: '100%' }}>
                        <DateInput onChange={(v) => setPuDate(v)} />
                    </div>
                </div>

                <div className="col-md-2" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <div className="main-search-input-item" style={{ width: '100%' }}>
                        <TimePicker
                            placeholder={`Time: ${TIME_FORMAT}`}
                            showSecond={false}
                            onChange={setPuTime}
                            format={TIME_FORMAT}
                            inputReadOnly
                        />
                    </div>
                </div>

                <div className="col-md-3" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>

                    <div className="main-search-input-item" style={{ width: '100%' }}>
                        <DateInput onChange={(v) => setDoDate(v)} />
                    </div>
                </div>
                <div className="col-md-2" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <div className="main-search-input-item" style={{ borderRight: 'unset', width: '100%' }}>
                        <TimePicker
                            placeholder={`Time: ${TIME_FORMAT}`}
                            showSecond={false}
                            onChange={setDoTime}
                            format={TIME_FORMAT}
                            inputReadOnly
                        />
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