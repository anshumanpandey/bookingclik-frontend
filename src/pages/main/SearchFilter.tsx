import React, { useState, useEffect } from 'react';
import { FormControlLabel, FormLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, makeStyles, InputBase } from '@material-ui/core';
import { DateInput, LocationDropdown, TimeInput } from '../../partials';
import { useSearchWidgetState, dispatchSearchState } from './useSearchWidgetGlobalState';
import { useMediaQuery } from 'react-responsive'
import moment from 'moment';
import { useDidUpdateEffect } from '../../utils/DidUpdateEffect';

export const CarSearchWidgetFilters: React.FC<{ style: React.CSSProperties }> = () => {
    const [doDate] = useSearchWidgetState('doDate')
    const [puDate] = useSearchWidgetState('puDate')
    const [pickupCode, setPickupCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')
    const [age, setAge] = useSearchWidgetState('age')
    const [displayDropoffInput, setDisplayDropoffInput] = useState(false)

    const isSm = useMediaQuery({ query: '(min-width: 768px)' })

    useDidUpdateEffect(() => {
        dispatchSearchState({ type: 'dropoff.date', state: puDate.clone().startOf("d").add(2, "d") })
    }, [puDate])

    useEffect(() => {
        setDropoffCode(null)
        setDisplayDropoffInput(false)

        dispatchSearchState({ type: 'pickup.time', state: moment().set("hour", 10).set("minute", 30) })
        dispatchSearchState({ type: 'dropoff.time', state: moment().set("hour", 10).set("minute", 30) })
    }, [])

    useEffect(() => {
        if (!displayDropoffInput) setDropoffCode(null)
    }, [pickupCode])

    return (
        <>
            <div className="row">
                <div className="col-md-12" style={{ marginBottom: displayDropoffInput ? '1rem' : 0, display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ paddingRight: '1rem', width: '100%' }}>
                            <LocationDropdown defaultCode={pickupCode} onChange={setPickupCode} style={{
                                borderTopLeftRadius: '30px',
                                borderBottomLeftRadius: '30px',
                                width: '100%',
                                backgroundColor: 'white',
                                borderRadius: '0.25rem'
                            }} />
                        </div>
                    </div>

                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox onChange={() => {
                            setDisplayDropoffInput(p => {
                                const status = !p;
                                if (status == true) {
                                    setDropoffCode(null);
                                }
                                return !p;
                            })
                        }} checked={!displayDropoffInput} style={{ color: 'white', alignSelf: 'flex-start' }} />}
                        label={'Return car on same location'}

                    />
                    {displayDropoffInput && (
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
            <div className="row" style={{ justifyContent: 'space-around', flexDirection: isSm ? 'unset' : 'column' }}>
                <div className="col-md-12 col-lg-5" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <FormLabel style={{ color: 'white', alignSelf: 'flex-start', flexDirection: 'column', marginBottom: '0.5rem' }}>Pick-up date</FormLabel>
                    <div style={{ display: 'flex', flexDirection: isSm ? 'unset' : 'row' }}>
                        <div className="col-md-12 col-lg-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0, width: '50%' }}>

                            <div className="main-search-input-item" style={{ width: '100%' }}>
                                <DateInput style={{
                                    border: 'unset',
                                    borderRadius: '6px',
                                }}
                                    defaultValue={puDate}
                                    onChange={(v) => dispatchSearchState({ type: 'pickup.date', state: v })} />
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0, width: '50%' }}>
                            <div className="main-search-input-item" style={{ width: '100%' }}>
                                <TimeInput
                                    defaultValue={moment().set("hour", 10).set("minute", 30)}
                                    style={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    onChange={(v) => dispatchSearchState({ type: 'pickup.time', state: v.clone().startOf("day") })}
                                />
                            </div>
                        </div>
                    </div>
                </div>



                <div className="col-md-12 col-lg-5" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="col-md-12 col-lg-11 col-lg-offset-1" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                        <FormLabel style={{ color: 'white', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Drop-off date</FormLabel>
                        <div style={{ display: 'flex' }}>
                            <div className="col-md-12 col-lg-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0, width: '50%' }}>

                                <div className="main-search-input-item" style={{ borderRight: 'unset', width: '100%' }}>
                                    <DateInput
                                        disabledBefore={puDate || undefined}
                                        defaultValue={doDate}
                                        style={{ borderRadius: '6px' }}
                                        onChange={(v) => dispatchSearchState({ type: 'dropoff.date', state: v })} />
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0, width: '50%' }}>
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
                <div className="col-md-12 col-lg-2" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="col-md-12 col-lg-11 col-lg-offset-1" style={{ display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0 }}>
                        <FormLabel style={{ color: 'white', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Age</FormLabel>
                        <div style={{ display: 'flex' }}>
                            <FormControl fullWidth={true} variant="outlined">
                                <Select
                                    className="TimeInput"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    input={<InputBase style={{ backgroundColor: 'white', borderRadius: 6, height: '3rem' }} />}
                                >
                                    <MenuItem value={19}>{19}</MenuItem>
                                    <MenuItem value={20}>{20}</MenuItem>
                                    <MenuItem value={21}>{21}</MenuItem>
                                    <MenuItem value={22}>{22}</MenuItem>
                                    <MenuItem value={23}>{23}</MenuItem>
                                    <MenuItem value={24}>{24}</MenuItem>
                                    <MenuItem value={"25-65"}>25-65</MenuItem>
                                    <MenuItem value={"66"}>66</MenuItem>
                                    <MenuItem value={"67"}>67</MenuItem>
                                    <MenuItem value={"68"}>68</MenuItem>
                                    <MenuItem value={"69"}>69</MenuItem>
                                    <MenuItem value={"70"}>70</MenuItem>
                                    <MenuItem value={"71"}>71</MenuItem>
                                    <MenuItem value={"72"}>72</MenuItem>
                                    <MenuItem value={"73"}>73</MenuItem>
                                    <MenuItem value={"74"}>74</MenuItem>
                                    <MenuItem value={"75"}>75</MenuItem>
                                    <MenuItem value={"76"}>76</MenuItem>
                                    <MenuItem value={"77"}>77</MenuItem>
                                    <MenuItem value={"78"}>78</MenuItem>
                                    <MenuItem value={"79"}>79</MenuItem>
                                    <MenuItem value={"80"}>80</MenuItem>
                                    <MenuItem value={"81"}>81</MenuItem>
                                    <MenuItem value={"82"}>82</MenuItem>
                                    <MenuItem value={"83"}>83</MenuItem>
                                    <MenuItem value={"84"}>84</MenuItem>
                                    <MenuItem value={"85"}>85</MenuItem>
                                </Select>
                            </FormControl>
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