import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Decimal } from 'decimal.js';
import { Vehicle } from '../types';
import { useSearchWidgetState } from '../pages/main/useSearchWidgetGlobalState';
import GetTypeClassFromAcrissCode from '../utils/GetTypeClassFromAcrissCode';

const ListingItemBody = styled.div`
padding-top: 1rem !important;
display: flex;
flex-direction: column;
flex: 1;
justify-content: space-between;
`;

const ListingItemInner = styled.article`
    height: 100%;
    display: flex;
    flex-direction: column;
    .listing-item.list-layout &{
        flex-direction: row
    }
`;

const Avatar = styled.div`
    float: left
`;


export type ListingItemProps = {
    layout?: 'GRID' | 'LIST',
    vehicle: Vehicle
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    const image_url = props.vehicle.image_preview_url ? props.vehicle.image_preview_url : "images/all/car_not_found.png"

    const [doDate] = useSearchWidgetState('doDate')
    const [puDate] = useSearchWidgetState('puDate')

    let carTransmission = null
    if (RegExp("(M|N|C)").test(props.vehicle.acriss[2])) {
        carTransmission = "Manual"
    }
    if (RegExp("(A|B|D)").test(props.vehicle.acriss[2])) {
        carTransmission = "Automatic"
    }

    let doors = '4-5'
    if (props.vehicle.acriss[1] == 'B') doors = '2-3'
    if (props.vehicle.acriss[1] == 'C') doors = '2-4'
    if (props.vehicle.acriss[1] == 'D') doors = '4-5'


    let suplierLogoUrl = "images/avatar/1.jpg"
    if (props.vehicle.supplier_logo) {
        if (RegExp('http').test(props.vehicle.supplier_logo)) {
            suplierLogoUrl = props.vehicle.supplier_logo
        } else {
            suplierLogoUrl = `${process.env.REACT_APP_GRCGDS_BACKEND}/public/upload/${props.vehicle.supplier_logo}`
        }
    }

    let fuelPolicy = props.vehicle.fuel_policy
    if (props.vehicle.fuel_policy == 1) fuelPolicy = 'Full To Full'
    if (props.vehicle.fuel_policy == 2) fuelPolicy = 'Full To Empty'
    if (props.vehicle.fuel_policy == 3) fuelPolicy = 'Empty To Empty'
    if (props.vehicle.fuel_policy == 4) fuelPolicy = 'Half To Empty'
    if (props.vehicle.fuel_policy == 5) fuelPolicy = 'Quarter To Empty'
    if (props.vehicle.fuel_policy == 6) fuelPolicy = 'Half To Half'
    if (props.vehicle.fuel_policy == 7) fuelPolicy = 'Quarter To Quarter'
    if (props.vehicle.fuel_policy == 8) fuelPolicy = 'Prepaid Full To Full'
    if (props.vehicle.fuel_policy == 9) fuelPolicy = 'Prepaid Full To Empty'

    let currencySymbol = '$'
    if (props.vehicle.currency == 'EUR') currencySymbol = '€'

    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`}>
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <ListingItemBody className="geodir-category-content" style={{ padding: '15px 10px 5px' }}>
                    <div className="row">
                        <div className="col-md-5" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                {props.vehicle.acriss && (
                                    <h4 style={{
                                        fontSize: '0.8rem',
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                    }}>{GetTypeClassFromAcrissCode(props.vehicle.acriss)}</h4>
                                )}
                                <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                            </div>
                            <div className="geodir-category-img" style={{ width: 'unset', marginRight: '2rem' }}>
                                <img style={{ width: 200, height: 113, backgroundColor: 'white' }} src={image_url} alt={props.vehicle.carrentalcompanyname || props.vehicle.suppliername} />
                                <div style={{ backgroundColor: 'white' }} className="overlay"></div>
                            </div>
                            <div className="card-popup-rainingvis" data-starrating2="5" style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>
                                {(props.vehicle.seats !== null && props.vehicle.seats !== undefined && props.vehicle.seats !== 0) && (
                                    <span style={{ marginLeft: 0 }}>
                                        <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-male"></i> {props.vehicle.seats}
                                    </span>
                                )}
                                {props.vehicle.luggages != null && props.vehicle.luggages != undefined && props.vehicle.luggages != 0 && (
                                    <span style={{ marginLeft: 0 }}>
                                        <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-briefcase"></i> {props.vehicle.luggages}
                                    </span>
                                )}
                                <span style={{ marginLeft: 0, display: 'flex' }} className="icon icon--car icon--doors">
                                    {doors}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3" style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {props.vehicle.fuel_policy && (
                                <div className="geodir-category-location" style={{ marginTop: '0.5rem', padding: 0, display: 'flex' }}>
                                    <i style={{
                                        fontSize: '1.1rem',
                                        marginRight: '1rem',
                                    }} className="fas fa-gas-pump"></i>
                                    <div>
                                        {props.vehicle.carrentalcompanyname && (
                                            <p style={{ textAlign: 'left', padding: 0 }}>Fuel Policy:</p>
                                        )}
                                        <h4 style={{ marginBottom: 0, textAlign: 'left', padding: 0 }}>{fuelPolicy}</h4>
                                    </div>
                                </div>
                            )}
                            <div className="geodir-category-location" style={{ marginTop: '0.5rem', padding: 0, display: 'flex' }}>
                                <object style={{ height: '1.1rem', marginRight: '1rem' }} type="image/svg+xml" data="images/icons/q1.svg">
                                </object>
                                <div>
                                    <p style={{ textAlign: 'left', padding: 0 }}>Mileage:</p>
                                    <h4 style={{ marginBottom: 0, textAlign: 'left', padding: 0 }}>Unlimited</h4>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                marginTop: '1rem'
                            }}>
                                {carTransmission && (
                                    <span style={{ marginBottom: '0.5rem', marginLeft: 0, display: 'flex' }}>
                                        <i style={{ color: 'inherit' }} className="fas fa-check"></i> {carTransmission || 'N/A'} Transmission
                                    </span>
                                )}

                                {props.vehicle.ac && (
                                    <span style={{ marginBottom: '0.5rem', marginLeft: 0 }}>
                                        <i style={{ color: 'inherit' }} className="fas fa-check"></i> Air Conditioning
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="geodir-category-location" style={{ marginTop: '0.5rem', padding: 0, color: '#157f41' }} >
                                <p style={{ color: '#157f41', paddingBottom: 0 }}>Included for Free</p>
                                {props.vehicle.winter_tyres_included && <p style={{ color: 'inherit', paddingBottom: 0 }}><i style={{ color: 'inherit' }} className="fas fa-check"></i> Winter Tyres Included</p>}
                                {props.vehicle.snow_chains_included && <p style={{ color: 'inherit', paddingBottom: 0 }}><i style={{ color: 'inherit' }} className="fas fa-check"></i> Snow Chains Included</p>}
                                {props.vehicle.road_tax_included && <p style={{ color: 'inherit', paddingBottom: 0 }}><i style={{ color: 'inherit' }} className="fas fa-check"></i>Road Tax Included</p>}
                            </div>
                        </div>


                        <div className="col-md-2">

                            <div className="geodir-category-location" style={{
                                marginTop: '0.5rem',
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'end',
                                flexDirection: 'column',
                            }}>
                                <div>
                                    {props.vehicle.carrentalcompanyname && (
                                        <h4 style={{ textAlign: 'left' }}>Supplied by</h4>
                                    )}
                                    <Avatar>
                                        <img style={{ width: '70px', height: '35px' }} src={suplierLogoUrl} alt={props.vehicle.carrentalcompanyname || props.vehicle.suppliername} />
                                    </Avatar>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div className="evticket-meta" style={{ padding: 'unset' }}>
                                            <div style={{ fontSize: '1.4rem', color: 'black' }} className="evticket-price"><span style={{ color: 'black' }}>{currencySymbol}</span> {props.vehicle.price}</div>
                                        </div>
                                        {props.vehicle.secondary_price && <div className="evticket-meta" style={{ paddingRight: 0 }}>
                                            <div className="evticket-price"><span>{currencySymbol}</span> {props.vehicle.secondary_price}</div>
                                        </div>}
                                    </div>
                                    {
                                        props.vehicle.deeplink &&
                                        <a id="book-now-btn" target='_blank' className="capitalize" href={props.vehicle.deeplink}>Select</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div >

    );
}