import React, { useEffect, useState } from 'react';
import useAxios, { makeUseAxios } from 'axios-hooks'
import { CircularProgress, Checkbox, FormControlLabel, FormLabel, Typography, FormControl, MenuItem, Select, InputBase } from '@material-ui/core';
import { LocationDropdown } from '../../partials/LocationDropdown';
import { DateInput } from '../../partials';
import { Panel } from '../../partials/Panel';
import { useSearchWidgetState, dispatchSearchState } from '../main/useSearchWidgetGlobalState';
import { TimeInput } from '../../partials/TimeInput';
import { TagSearchWidget } from '../../widget/TagSearchWidget';
import { SimpleTagSearchWidget } from '../../widget/SimpleTagSearchWidget';
import { NumberSearchWidget } from '../../widget/NumberSearchWidget';
import { RangeSearchWidget } from '../../widget/RangeSearchWidget';
import { Terms, DynamicFilter, SearchResponse, GRCGDSCode } from '../../types';
import { useSearchState, dispatchFilteredState, useFilteredSearchState } from './SearchGlobalState';
import moment from 'moment';
import useDidMountEffect from '../../utils/useDidMountEffect';
import { useHistory } from 'react-router-dom';
import { useDynamicFiltersState } from '../../widget/DynamicFilterState';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
import qs from 'qs';
import { useMediaQuery } from 'react-responsive'
import ResolveCurrencySymbol from '../../utils/ResolveCurrencySymbol';
import axios from 'axios'

const normalUseAxios = makeUseAxios({
    axios: axios.create()
});

export const ListCarsFilter: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
    const history = useHistory<{ results: SearchResponse, params: { location: GRCGDSCode, puDate: number, puTime: number, doDate: number, doTime: number } }>();
    const [puDate] = useSearchWidgetState('puDate')
    const [term] = useSearchWidgetState('term')
    const [doTime] = useSearchWidgetState('doTime')
    const [doDate] = useSearchWidgetState('doDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [pickUpCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode] = useSearchWidgetState('dropoffCode')
    const [age, setAge] = useSearchWidgetState('age')

    const [innerPuLocation, setPuLocation] = useState(pickUpCode);
    const [innterDoLocation, setDoLocation] = useState(dropoffCode);
    const [innerDoDate, setDoDate] = useState(doDate);
    const [innerDoTime, setDoTime] = useState(doTime);
    const [innerPuDate, setPuDate] = useState(puDate);
    const [innerPuTime, setPuTime] = useState(puTime);

    const [displayDropoffInput, setDisplayDropoffInput] = useState(false)

    const [dynamicFilters] = useDynamicFiltersState('activeFilters');

    const [searchRequest, doSearch] = useAxios<SearchResponse>({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
        method: 'POST',
    }, { manual: true })

    const [blacklistReq] = normalUseAxios({ url: process.env.REACT_APP_BLACKLISTED_COMPANIES_URL })
    const [unavailableReq, getUnavailable] = normalUseAxios({ url: process.env.REACT_APP_UNAVAILABLES_COMPANIES_URL })

    const isSm = useMediaQuery({ query: '(min-width: 768px)' })

    useDidMountEffect(() => {
        dispatchFilteredState({ type: 'loading', state: searchRequest.loading })
    }, [searchRequest]);

    useDidMountEffect(() => {
        send()
    }, [dynamicFilters.length]);

    useEffect(() => {
        if (!displayDropoffInput) setDoLocation(null)
    }, [innerPuLocation])

    useEffect(() => {
        if ((innerPuLocation && innterDoLocation) && innerPuLocation.internalcode == innterDoLocation.internalcode) {
            setDisplayDropoffInput(false)
            setDoLocation(null)
        } else {
            setDisplayDropoffInput(true)
        }
        setPuLocation(pickUpCode);
        setDoDate(doDate);
        setDoTime(doTime);
        setPuDate(puDate);
        setPuTime(puTime);
    }, [])

    const send = () => {
        if (!pickUpCode) return;
        if (!dropoffCode) return;

        const filterToSend = []

        if (dynamicFilters.some(filter => filter.category.type === 'tag' && filter.activeValues.length !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.category.type === 'tag' && filter.activeValues.length !== 0)
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.activeValues.map(v => v.value) })))
        }

        if (dynamicFilters.some(filter => filter.category.type === 'number' && filter.counter !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.category.type === 'number' && filter.counter !== 0)
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.counter })))
        }

        if (dynamicFilters.some(filter => filter.category.type === 'range' && filter.counter !== 0)) {
            filterToSend.push(...dynamicFilters
                .filter(filter => filter.range && filter.range.length == 2 && filter.range.some(v => v !== 0))
                .map(filter => ({ type: filter.category.type, [filter.category.propertyToWatch]: filter.range })))
        }

        let urlParams = {
            pickUpLocationCode: innerPuLocation.internalcode,
            pickUpLocationName: innerPuLocation.locationname,
            pickUpDate: innerPuDate ? innerPuDate.unix() : moment().unix(),
            pickUpTime: innerPuTime ? innerPuTime.unix() : moment().unix(),

            dropOffLocationCode: innterDoLocation ? innterDoLocation.internalcode : innerPuLocation.internalcode,
            dropOffLocationName: innterDoLocation ? innterDoLocation.locationname : innerPuLocation.internalcode,
            dropOffDate: innerDoDate ? innerDoDate.unix() : moment().unix(),
            dropOffTime: innerDoTime ? innerDoTime.unix() : moment().unix(),
        };

        const jsonParams = {
            pickUpLocation: innerPuLocation,
            dropOffLocation: innterDoLocation ? innterDoLocation : innerPuLocation,

            pickUpDate: innerPuDate ? innerPuDate : moment(),
            pickUpTime: innerPuTime ? innerPuTime : moment(),
            dropOffDate: innerDoDate ? innerDoDate : moment(),
            dropOffTime: innerDoTime ? innerDoTime : moment(),
            filters: dynamicFilters,
            age
        }

        dispatchFilteredState({ type: 'loading', state: true })
        doSearch({ data: { json: BuildJsonQuery(jsonParams) } })
            .then((res) => {
                history.push({
                    pathname: '/results',
                    search: `?${qs.stringify(urlParams)}`,
                });

                setTimeout(() => {
                    const mapperVehicles = res.data.scrape.vehicle.map((v: any, idx: number) => {
                        const dropDate = innerDoDate.set('hours', 0).set('m', 0)
                        const pickDate = innerPuDate.set('hours', 0).set('m', 0)

                        const daySpan = dropDate.diff(pickDate, 'days')
                        return {
                            ...v,
                            daySpan
                        };
                    })
                        .filter((i: any) => {
                            if (blacklistReq.data) {
                                let isBlacklisted = false;
                                blacklistReq.data
                                    .filter((c: any) => c.supplierName)
                                    .filter((c: any) => c.supplierName.toLowerCase().trim() == i.vehicle.grcgds_supplier_name.toLowerCase().trim())
                                    .forEach((c: { supplierName: string, companies: string[] }) => {
                                        if (c.companies.length == 0) isBlacklisted = true
                                        if (!i.vehicle.original_supplier) return false;

                                        const exist = c.companies.map(i => i.toLowerCase().trim()).includes(i.vehicle.original_supplier.toLowerCase().trim());

                                        if (!exist) {
                                            isBlacklisted = true;
                                        }
                                    })

                                return isBlacklisted;
                            }
                            return true;
                        })
                        .filter((i: any) => {
                            if (unavailableReq.data) {
                                const names = unavailableReq.data.map((u: any) => u.companyName.toLowerCase().trim())
                                return !names.includes(i.vehicle.grcgds_supplier_name.toLowerCase().trim())
                            }
                            return true
                        })
                        .map((i: any) => {
                            const item = {
                                vehicle: {
                                    ...i.vehicle,
                                    name: i.vehicle.name
                                        .replace(/(?:^|\W)or(?:$|\W)/, ' Or ')
                                        .replace(/(?:^|\W)OR(?:$|\W)/, ' Or ')
                                        .replace(/(?:^|\W)similar(?:$|\W)/, ' Similar')
                                        .replace(/(?:^|\W)SIMILAR(?:$|\W)/, ' Similar')
                                        .replace('|', '')
                                }
                            }

                            if (!item.vehicle.name.includes(' Or Similar')) {
                                item.vehicle.name = `${item.vehicle.name} Or Similar`
                            }

                            return item
                        })
                    res.data.scrape.vehicle = mapperVehicles;
                    dispatchFilteredState({ type: 'set', state: res.data.scrape })
                    dispatchSearchState({ type: 'set', state: res.data.scrape })
                    dispatchFilteredState({ type: 'loading', state: false })
                }, 0)
            })
    }
    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#154a64' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ paddingRight: '1rem', width: '100%' }}>
                                <LocationDropdown
                                    secondary={true}
                                    defaultCode={innerPuLocation}
                                    style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px' }}
                                    customeClasses="listsearch-input-item m-b-0"
                                    onChange={(v) => setPuLocation(v)} />
                            </div>
                        </div>
                    </div>
                    <FormControlLabel
                        style={{ color: 'white' }}
                        control={<Checkbox onChange={() => setDisplayDropoffInput(p => {
                            const s = !p;
                            if (s == true) {
                                setDoLocation(null);
                            }
                            return s;
                        })} checked={!displayDropoffInput} style={{ color: 'white', alignSelf: 'flex-start' }} />}
                        label={'Return car on same location'}

                    />
                    {displayDropoffInput && (
                        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>

                            <LocationDropdown
                                secondary={true}
                                defaultCode={innterDoLocation}
                                style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px' }}
                                customeClasses="listsearch-input-item m-b-0"
                                onChange={(v) => setDoLocation(v)} />
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: isSm ? 'row' : 'column' }}>
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormLabel style={{ color: 'white', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Pick-up date</FormLabel>
                            <div style={{ display: 'flex', justifyContent: isSm ? 'unset' : 'space-between' }}>
                                <div className="listsearch-input-item" style={{ width: '50%', display: 'flex', alignItems: 'stretch' }}>
                                    <DateInput style={{
                                        borderRadius: '6px',
                                        marginRight: '0.5rem',
                                        border: 'unset'
                                    }} defaultValue={puDate} onChange={(v) => setPuDate(v)} />
                                </div>

                                <div className="listsearch-input-item" style={{ width: isSm ? '40%' : '50%', background: 'white', borderRadius: '6px' }}>
                                    <TimeInput
                                        defaultValue={puTime?.set('seconds', 0)}
                                        onChange={(v) => setPuTime(v)} />
                                </div>
                            </div>
                        </div>

                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <FormLabel style={{ color: 'white', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Drop-off date</FormLabel>
                            <div style={{ display: 'flex', justifyContent: isSm ? 'unset' : 'space-between' }}>
                                <div className="listsearch-input-item" style={{ width: '50%', display: 'flex', alignItems: 'stretch' }}>
                                    <DateInput style={{
                                        borderRadius: '6px',
                                        border: 'unset',
                                        marginRight: '0.5rem'
                                    }} defaultValue={doDate} onChange={(v) => setDoDate(v)} />
                                </div>

                                <div className="listsearch-input-item" style={{ width: isSm ? '40%' : '50%', background: 'white', borderRadius: '6px' }}>
                                    <TimeInput
                                        style={{ borderRadius: '6px' }}
                                        defaultValue={doTime?.set('seconds', 0)}
                                        onChange={(v) => setDoTime(v)} />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: isSm ? '15%' : '100%', display: 'flex', flexDirection: 'column' }}>
                            <FormLabel style={{ color: 'white', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Age</FormLabel>
                            <div style={{ display: 'flex', justifyContent: isSm ? 'unset' : 'space-between', flex: 1 }}>
                                <div className="listsearch-input-item" style={{ width: "100%", display: 'flex', alignItems: 'stretch' }}>
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
                    <button style={{ backgroundColor: '#03bfcb', color: 'white', fontSize: '1.3rem', float: 'right', fontWeight: 'bold', alignSelf: 'end' }} onClick={() => {
                        dispatchSearchState({ type: 'pickup.date', state: innerPuDate })
                        dispatchSearchState({ type: 'pickup.time', state: innerPuTime })
                        dispatchSearchState({ type: 'dropoff.date', state: innerDoDate })
                        dispatchSearchState({ type: 'dropoff.time', state: innerDoTime })
                        dispatchSearchState({ type: 'pickup.code', state: innerPuLocation })
                        dispatchSearchState({ type: 'dropoff.code', state: innterDoLocation || innerPuLocation })
                        onSearch()
                        send()
                    }} className="button fs-map-btn">{searchRequest.loading ? 'Searching...' : 'Search'}</button>
                </div>
            </div>
        </>
    );


}

export const SearchFilterCars: React.FC = () => {
    const [search] = useSearchState('scrape')
    const [filteredSearch] = useFilteredSearchState('filteredScrape')
    const [pickUpCode] = useSearchWidgetState('pickUpCode')
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 1200px)' })

    let defaultOpen = true
    if (isSm == false) defaultOpen = false
    if (isTablet == false) defaultOpen = false

    const [filterReq] = useAxios<DynamicFilter[]>({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/categories/${Terms.Cars}`,
    })

    const [valuedLocationsReq, getValuedLocation] = normalUseAxios({
        url: `https://www.bookingclik.com/api/public/valuated-locations/get`,
    }, { manual: true })

    let body = <CircularProgress color="inherit" />

    const carRentalCompanyOptions = Array
        .from(filteredSearch.vehicle.reduce((prev: { add: (arg0: any) => void; }, next: { vehicle: { suppliername: any; carrentalcompanyname: any; }; }) => {
            const key = next.vehicle.carrentalcompanyname;
            if (key) {
                prev.add(key)
            }
            return prev
        }, new Set<string>()).values())
        .map(token => {
            const supplierCars = filteredSearch.vehicle.filter((v: any) => {
                return v.vehicle.carrentalcompanyname == token
            })
            return ({ label: token, value: token, cars: supplierCars, total: supplierCars }) as { label: string, value: string, total: any[], cars: any[] }
        })
        .sort(function (a, b) {
            if (a.label < b.label) { return -1; }
            if (a.label > b.label) { return 1; }
            return 0;
        })

    if (filterReq.error) {
        body = <h3>Error loading filters</h3>
    } else {
        body = (<div style={{ paddingBottom: 0 }} className="profile-edit-container add-list-container filters-panel">
            <Panel open={defaultOpen} defaultOpen={true} buttonNode={<div className="profile-edit-header fl-wrap" style={{ paddingBottom: 0 }}>
                <Typography gutterBottom style={{ textAlign: 'left' }}>
                    Filter
                </Typography>
            </div>} >
                <div className="custom-form">
                    <div className="row">
                        <div className="col-md-12">
                            <SimpleTagSearchWidget
                                options={[{ label: 'Standard Key', value: 'yes', cars: filteredSearch.vehicle, total: filteredSearch.vehicle }, { label: 'Key Less', value: 'no', cars: [], total: [] }]}
                                category={{ name: 'Key Type', propertyToWatch: 'rental_car_company', type: 'tag' }}
                                hidePrice={true}
                                onChange={(valuesToFilterFor) => {
                                    console.log(valuesToFilterFor)
                                    dispatchFilteredState({ type: 'loading', state: true })
                                    let cars = search.vehicle;
                                    setTimeout(() => {
                                        if (valuesToFilterFor.length != 0) {
                                            const hasNo = valuesToFilterFor.find(o => o == "no")
                                            if (hasNo)
                                                cars = []
                                        }
                                        dispatchFilteredState({ type: 'set', state: { ...search, vehicle: cars } })
                                        dispatchFilteredState({ type: 'loading', state: false })
                                    }, 0);
                                }}
                            />
                        </div>

                        {filterReq.data && filterReq.data.map((filter) => {
                            if (filter.type === 'tag' && filter.values.length !== 0) {
                                return (
                                    <div className="col-md-12">
                                        <TagSearchWidget
                                            key={filter.createdAt}
                                            options={filter.values
                                                .map((f: any) => ({
                                                    label: f.name.replace(/(GRC_GDS_CURRENCY_SYMBOL)/g, ResolveCurrencySymbol(filteredSearch.vehicle[0]?.vehicle.currency)),
                                                    value: f.value
                                                }))
                                                .sort((a, b) => {
                                                    if (filter.name == 'price') return -1;
                                                    if (a.label < b.label) { return -1; }
                                                    if (a.label > b.label) { return 1; }
                                                    return 0;
                                                })}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }

                            if (filter.type === 'number') {
                                return (
                                    <div className="col-md-12">
                                        <NumberSearchWidget
                                            key={filter.createdAt}
                                            options={filter.values.map((f: any) => ({ label: f.name, value: f.value }))}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }

                            if (filter.type === 'range') {
                                return (
                                    <div className="col-md-12">
                                        <RangeSearchWidget
                                            key={filter.createdAt}
                                            minValue={'0'}
                                            maxValue={'1000'}
                                            category={{ name: filter.name, propertyToWatch: filter.responseProperty, type: filter.type }}
                                            onChange={() => { }}
                                        />
                                    </div>
                                );
                            }
                        })}

                        {carRentalCompanyOptions.length !== 0 && (
                            <div className="col-md-12">
                                <SimpleTagSearchWidget
                                    options={carRentalCompanyOptions.filter(i => i.total.length !== 0)}
                                    category={{ name: 'Supplier', propertyToWatch: 'rental_car_company', type: 'tag' }}
                                    onChange={(valuesToFilterFor) => {
                                        dispatchFilteredState({ type: 'loading', state: true })
                                        let cars = search.vehicle;
                                        setTimeout(() => {
                                            if (valuesToFilterFor.length != 0) {
                                                cars = search.vehicle.filter((v: any) => {
                                                    return v.vehicle.carrentalcompanyname && v.vehicle.carrentalcompanyname.match(`(${valuesToFilterFor.join('|')})`);
                                                })
                                            }
                                            dispatchFilteredState({ type: 'set', state: { ...search, vehicle: cars } })
                                            dispatchFilteredState({ type: 'loading', state: false })
                                        }, 0);

                                    }}
                                />
                            </div>
                        )}

                        <div className="col-md-12">
                            <RangeSearchWidget
                                minValue={'0'}
                                maxValue={'100'}
                                //@ts-ignore
                                category={{ name: 'Review' }}
                                onChange={([from, to]) => {
                                    dispatchFilteredState({ type: 'loading', state: true })
                                    if (from == 0 && to == 0) {
                                        dispatchFilteredState({ type: 'set', state: { ...search, vehicle: search.vehicle } })
                                        dispatchFilteredState({ type: 'loading', state: false })
                                        return
                                    }
                                    

                                    getValuedLocation({ params: { from, to }})
                                    .then(({ data }) => {
                                        const foundValuedLocation = data.find((l: any) => l.name == pickUpCode.locationname)
                                        if (foundValuedLocation) {
                                            let cars = search.vehicle
                                            .filter(({ vehicle }: any) => {
                                                return vehicle.supplier_id == foundValuedLocation.grcgdsClientId
                                            })

                                            dispatchFilteredState({ type: 'set', state: { ...search, vehicle: cars } })
                                        } else {
                                            dispatchFilteredState({ type: 'set', state: { ...search, vehicle: [] } })
                                        }
                                        
                                        dispatchFilteredState({ type: 'loading', state: false })
                                    })
                                }}
                            />
                        </div>

                    </div>
                </div>
            </Panel>
        </div>);
    }

    return (
        <>
            <div className="listsearch-input-wrap fl-wrap" style={{ paddingRight: 20, paddingLeft: 20, display: 'flex', minHeight: '50%', flexDirection: 'column', marginTop: 0 }}>
                {body}
            </div>
        </>
    );
}



