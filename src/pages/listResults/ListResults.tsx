import React, { useEffect, useState, useRef } from 'react';
import useAxios, { ResponseValues, makeUseAxios } from 'axios-hooks'
import axios from 'axios'
//@ts-ignore
import { ListingItem } from '../../partials/ListingItem';
import { Header, Footer } from '../../partials';
import { useHistory } from 'react-router-dom';
import { SearchResponse, Terms, GRCGDSCode, Visitor } from '../../types';
import { ListCarsFilter, SearchFilterCars } from './SearchFilter';
import { getUserData, getUserIp } from '../../crud/click-tracker.crud';
import { useSortState, PriceSortOrder } from './SortGlobalState';
import { Panel } from '../../partials/Panel';
import moment from 'moment';
import { dispatchSearchState, useSearchState, dispatchFilteredState, useFilteredSearchState } from './SearchGlobalState';
import { useSearchWidgetState } from '../main/useSearchWidgetGlobalState';
import { useDynamicFiltersState } from '../../widget/DynamicFilterState';
import { useGlobalState, dispatchGlobalState } from '../../state';
import queryString from 'query-string';
import { useDidUpdateEffect } from '../../utils/DidUpdateEffect';
import BuildJsonQuery from '../../utils/BuildJsonQuery';
//@ts-ignore
import ShowMore from '@tedconf/react-show-more';
import { useMediaQuery } from 'react-responsive'

import adver from '../../images/adver.png';
import mobilead from '../../images/mobilead.jpeg';


const normalUseAxios = makeUseAxios({
    axios: axios.create()
});
type Banners = {
    desktopBannerFileName: string,
    mobileBannerFileName: string,
    urlToOpen: string
}
const AdRow = ({ banners }: { banners: Banners | null }) => {
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 1200px)' })

    const desktopBanner = banners ? `https://www.bookingclik.com/preview/${banners.desktopBannerFileName}` : adver
    const mobileBanner = banners ? `https://www.bookingclik.com/preview/${banners.mobileBannerFileName}` : mobilead

    let isBig = true
    if (isSm == false) isBig = false
    if (isTablet == false) isBig = false

    return (
        <div className="col-md-12 col-lg-3">
            <div className="fl-wrap card-listing" style={{ display: 'flex', flexDirection: 'column' }}>
                <a href={banners?.urlToOpen} target="_blank">
                    <img style={{ alignSelf: isBig ? 'self-start' : 'center', maxWidth: '100%', marginBottom: '2rem' }} src={isBig ? desktopBanner : mobileBanner}></img>
                </a>
                <a href={banners?.urlToOpen} target="_blank">
                    <img style={{ alignSelf: isBig ? 'self-start' : 'center', maxWidth: '100%' }} src={isBig ? desktopBanner : mobileBanner}></img>
                </a>

            </div>
        </div>
    );
}

export function ListResult() {
    const history = useHistory<{ results: SearchResponse, params: { location: GRCGDSCode, puDate: number, puTime: number, doDate: number, doTime: number } }>();
    const state = history.location.state;

    const [searchPanelOpen, setSearchPanelOpen] = useState(false)
    const [doDate] = useSearchWidgetState('doDate')
    const [doTime] = useSearchWidgetState('doTime')
    const [puDate] = useSearchWidgetState('puDate')
    const [puTime] = useSearchWidgetState('puTime')
    const [pickUpCode, setPickUpCode] = useSearchWidgetState('pickUpCode')
    const [dropoffCode, setDropoffCode] = useSearchWidgetState('dropoffCode')
    const [layout, setLayout] = useState<'GRID' | 'LIST'>('LIST');
    const [search, setSearch] = useSearchState('scrape')
    const [sortPrice, setSortPrice] = useSortState('price');
    const [isLoading, setLoading] = useGlobalState('loading')
    const [filetredSearch] = useFilteredSearchState('filteredScrape');
    const [isfiltering] = useFilteredSearchState('isfiltering');
    const isSm = useMediaQuery({ query: '(min-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 1200px)' })
    const [supplierBanners, setSupplierBanners] = useState(null);

    let isBig = true
    if (isSm == false) isBig = false
    if (isTablet == false) isBig = false

    const [{ data, loading, error }, doSearch] = useAxios({
        url: `${process.env.REACT_APP_GRCGDS_BACKEND ? process.env.REACT_APP_GRCGDS_BACKEND : window.location.origin}/brokers/importer`,
        method: 'POST'
    }, { manual: true })

    const [userReq] = normalUseAxios(getUserData())
    const [ipReq] = normalUseAxios<{ ip: string }>(getUserIp())
    const [blacklistReq] = normalUseAxios({ url: process.env.REACT_APP_BLACKLISTED_COMPANIES_URL })
    const [unavailableReq, getUnavailable] = normalUseAxios({ url: process.env.REACT_APP_UNAVAILABLES_COMPANIES_URL }, { manual: true })

    const urlParams = queryString.parse(history.location.search)

    const [bannersReq] = normalUseAxios({ url: `${process.env.REACT_APP_RANDOM_BANNER_URL}?locationCode=${pickUpCode?.internalcode}` })
    useEffect(() => {
        if (bannersReq.data) {
            setSupplierBanners(bannersReq.data)
        }
    }, [bannersReq.loading])


    useEffect(() => {
        if (!blacklistReq.data) return
        if (blacklistReq.error) return
        if (filetredSearch.vehicle.length == 0) return

        const vehicles = filetredSearch.vehicle
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
            .filter((i: any,idx: number, arr: []) => {
                if (unavailableReq.data) {
                    const names = unavailableReq.data.map((u: any) => u.companyName.toLowerCase().trim())
                    return !names.includes(i.vehicle.grcgds_supplier_name.toLowerCase().trim())
                }
                return true
            })
            .map((i: any, idx: number, arr: []) => {
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

        filetredSearch.vehicle = [...vehicles];


        dispatchSearchState({ type: 'set', state: filetredSearch })
        dispatchFilteredState({ type: 'set', state: filetredSearch })
    }, [filetredSearch.length, blacklistReq.loading, isLoading, loading, unavailableReq.loading]);

    useEffect(() => {
        dispatchGlobalState({ type: 'loading', state: true })

        getUnavailable()
            .then(({ data: unavailableData }) => {
                let scrapePromise = Promise.resolve(state?.results?.scrape)
                // @ts-ignore
                if (!state || !state.hasOwnProperty('results')) {

                    if (!urlParams.pickUpLocationCode) return
                    if (!urlParams.dropOffLocationCode) return


                    const params = {
                        pickUpLocation: {
                            internalcode: urlParams.pickUpLocationCode?.toString(),
                            locationname: urlParams.pickUpLocationName?.toString()
                        } as GRCGDSCode,
                        pickUpDate: urlParams.pickUpDate ? moment.unix(parseInt(urlParams.pickUpDate.toString())) : moment(),
                        pickUpTime: urlParams.pickUpTime ? moment.unix(parseInt(urlParams.pickUpTime.toString())) : moment(),

                        dropOffLocation: {
                            internalcode: urlParams.dropOffLocationCode?.toString(),
                            locationname: urlParams.dropOffLocationName?.toString()
                        } as GRCGDSCode,
                        dropOffDate: urlParams.dropOffDate ? moment.unix(parseInt(urlParams.dropOffDate.toString())) : moment(),
                        dropOffTime: urlParams.dropOffTime ? moment.unix(parseInt(urlParams.dropOffTime.toString())) : moment(),
                    }
                    setPickUpCode(params.pickUpLocation);
                    setDropoffCode(params.dropOffLocation);
                    dispatchSearchState({ type: 'dropoff.date', state: params.dropOffDate })
                    dispatchSearchState({ type: 'dropoff.time', state: params.dropOffTime })
                    dispatchSearchState({ type: 'pickup.date', state: params.pickUpDate })
                    dispatchSearchState({ type: 'pickup.time', state: params.pickUpTime })


                    scrapePromise = doSearch({ data: { json: BuildJsonQuery(params) } })
                        .then(r => r.data.scrape)
                } else {
                    const params = {
                        pickUpLocation: {
                            internalcode: urlParams.pickUpLocationCode?.toString(),
                            locationname: urlParams.pickUpLocationName?.toString()
                        } as GRCGDSCode,
                        pickUpDate: urlParams.pickUpDate ? moment.unix(parseInt(urlParams.pickUpDate.toString())) : moment(),
                        pickUpTime: urlParams.pickUpTime ? moment.unix(parseInt(urlParams.pickUpTime.toString())) : moment(),

                        dropOffLocation: {
                            internalcode: urlParams.dropOffLocationCode?.toString(),
                            locationname: urlParams.dropOffLocationName?.toString()
                        } as GRCGDSCode,
                        dropOffDate: urlParams.dropOffDate ? moment.unix(parseInt(urlParams.dropOffDate.toString())) : moment(),
                        dropOffTime: urlParams.dropOffTime ? moment.unix(parseInt(urlParams.dropOffTime.toString())) : moment(),
                    }
                    setPickUpCode(params.pickUpLocation);
                    setDropoffCode(params.dropOffLocation);
                    dispatchSearchState({ type: 'dropoff.date', state: params.dropOffDate })
                    dispatchSearchState({ type: 'dropoff.time', state: params.dropOffTime })
                    dispatchSearchState({ type: 'pickup.date', state: params.pickUpDate })
                    dispatchSearchState({ type: 'pickup.time', state: params.pickUpTime })
                }

                scrapePromise
                    .then(scrape => {
                        console.log(scrape.vehicle)
                        const mapperVehicles = scrape.vehicle.map((v: any, idx: number) => {
                            const dropDate = doDate.set('hours', 0).set('m', 0)
                            const pickDate = puDate.set('hours', 0).set('m', 0)

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
                                if (unavailableData) {
                                    const names = unavailableData.map((u: any) => u.companyName.toLowerCase().trim())
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

                        scrape.vehicle = mapperVehicles;

                        dispatchSearchState({ type: 'set', state: scrape })
                        dispatchFilteredState({ type: 'set', state: scrape })
                        dispatchGlobalState({ type: 'loading', state: false })
                    })
                    .catch(() => setLoading(false))

            })
            .catch(() => setLoading(false))

    }, []);


    let Body = (
        <>
            {(isfiltering || isLoading) && (
                <div className="loader-wrap" style={{ justifyContent: 'center', backgroundColor: '#00476710', position: 'absolute', display: 'flex' }}>

                </div>
            )}
            {!isLoading && <div className="section-title">
                <h2>No results founds!</h2>
                <span className="section-separator"></span>
                <p>Please modify your search. We are sorry we do not have any availability for the dates and times you have selected.</p>
            </div>}
        </>
    )

    let cheapestCar = null
    if (filetredSearch.vehicle) {
        cheapestCar = filetredSearch.vehicle.sort((a: any, b: any) => a.vehicle.price - b.vehicle.price)[0];
    }

    if (filetredSearch.vehicle.length > 0) {
        let filteredValues = filetredSearch.vehicle
            .sort((a: any, b: any) => {
                if (sortPrice === PriceSortOrder.DESC) return a.vehicle.price - b.vehicle.price
                if (sortPrice === PriceSortOrder.ASC) return b.vehicle.price - a.vehicle.price
                return a.vehicle.price - b.vehicle.price
            })
        Body = (
            <>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <div className="row" style={{ width: '100%' }}>
                        <div className="scroll-nav-wrapper no-fixed fl-wrap" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                        }}>
                            <div style={{
                                color: '#878C9F',
                                borderRadius: '6px',
                                padding: '5px 15px',
                                fontSize: '13px',
                                fontWeight: 500,
                                alignSelf: 'center',
                            }}>Sort By:</div>

                            <nav className="scroll-nav scroll-init sort">
                                <ul>
                                    <li onClick={() => setSortPrice((prev) => {
                                        if (prev === PriceSortOrder.DESC) return PriceSortOrder.ASC
                                        if (prev === PriceSortOrder.ASC) return PriceSortOrder.DESC
                                        return PriceSortOrder.ASC
                                    })}><a className="act-scrlink" href="#sec1">Price</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 'unset', float: 'left', color: 'black', alignSelf: 'flex-start', marginTop: '0.5rem', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }} className="big-header">
                        Showing {filteredValues.length} out of {search.vehicle.length} cars
                        {filetredSearch.vehicle && filetredSearch.vehicle.length !== 0 &&
                            ` from ${cheapestCar ? cheapestCar.vehicle.currency : ''} ${cheapestCar ? `${Math.floor(cheapestCar.vehicle.price)}.00` : ''}`}
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {isfiltering && (
                        <div className="loader-wrap" style={{ justifyContent: 'center', backgroundColor: '#00476710', position: 'absolute', display: 'flex' }}>

                        </div>
                    )}

                    <ShowMore
                        items={filteredValues}
                        by={30}
                    >
                        {({
                            current,
                            onMore,
                        }: any) => (
                                <React.Fragment>
                                    {current.map((item: any, idx: number) => (
                                        <ListingItem
                                            key={idx}
                                            currentVisitor={userReq.data}
                                            ip={ipReq.data?.ip}
                                            doDate={doDate}
                                            doTime={doTime}
                                            puDate={puDate}
                                            puTime={puTime}
                                            {...item}
                                            layout={layout}
                                        />
                                    ))}
                                    {onMore && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                                        <button disabled={!onMore} style={{ backgroundColor: '#03bfcb', color: 'white', fontSize: '1.3rem', float: 'right', fontWeight: 'bold', alignSelf: 'end' }} onClick={() => {
                                            if (!!onMore) onMore();
                                        }} className="button fs-map-btn">Load more</button>
                                    </div>}
                                </React.Fragment>
                            )}
                    </ShowMore>

                </div>
            </>
        );
    }

    return (
        <>
            {(isfiltering || isLoading) && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', zIndex: 20, top: '20rem', left: '50%', right: '50%', transform: 'translate(-50%, -50%)', width: '18rem', }}>
                    <img style={{ width: '60%' }} src={`${process.env.PUBLIC_URL}/images/logoblue.png`} />
                    <div style={{ position: 'unset' }} className="pulse"></div>
                </div>
            )}
            <Header />
            <div id="wrapper">
                <div className="content">
                    <section className="gray-bg no-pading no-top-padding" style={{ paddingTop: "1rem" }} id="sec1">
                        <div className="col-list-wrap fh-col-list-wrap  left-list">
                            <div className="container" style={{ maxWidth: 'unset', margin: 'auto' }}>
                                <div className="row">
                                    <div className="col-md-offset-1 col-md-8">

                                        <div className="listsearch-header fl-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: 'unset' }}>
                                                <i className="fa fa-car" ></i>
                                                {'   '}
                                                <span style={{ color: '#154a64' }}>{pickUpCode?.locationname} ({pickUpCode?.internalcode})</span> |
                                        {'  '}
                                                {puDate?.format("ddd, MMM D")}, {puTime?.format(" H:mma")} -
                                            {doDate?.format("ddd, MMM D")}, {doTime?.format(" H:mma")}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div onClick={() => setSearchPanelOpen(p => !p)} style={{ float: 'right' }}>
                                                    <h4 style={{ cursor: 'pointer', color: '#154a64' }}>Change Search <i className="fa fa-search"></i></h4>
                                                </div>
                                                <div className="listing-view-layout">
                                                    <ul>
                                                        {/*<li onClick={() => setLayout('GRID')}>
                                                            <div style={{ cursor: 'pointer' }} className={`grid ${layout === 'GRID' ? 'active' : ''}`}>
                                                                <i className="fa fa-th-large"></i>
                                                            </div>
                                                        </li>*/}
                                                        {/*
                                                    TODO: enable this later
                                                    <li onClick={() => setLayout('LIST')}>
                                                        <div style={{ cursor: 'pointer' }} className={`list ${layout === 'LIST' ? 'active' : ''}`}>
                                                            <i className="fa fa-list-ul"></i>
                                                        </div>
                                                    </li>*/}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <Panel open={searchPanelOpen} >
                                            <ListCarsFilter onSearch={() => {
                                                setSearchPanelOpen(false)
                                            }} />
                                        </Panel>
                                    </div>
                                </div>
                                <div className="row">
                                    {!isBig && <AdRow banners={supplierBanners} />}
                                    <div style={{ fontSize: '14px', padding: isBig ? 0 : "0px 15px 0px 15px" }} className="col-lg-offset-1 col-md-12 col-lg-2">
                                        <div style={{ marginBottom: !isBig ? '0.5rem' : 0 }} className="fl-wrap">
                                            <SearchFilterCars />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="fl-wrap card-listing">
                                            {Body}
                                        </div>
                                    </div>
                                    {isBig && <AdRow banners={supplierBanners} />}
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="limit-box fl-wrap"></div>
                </div>
            </div>
            <Footer />
        </>
    );
}