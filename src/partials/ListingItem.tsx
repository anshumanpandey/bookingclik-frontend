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


    let suplierLogoUrl = "images/avatar/1.jpg"
    if (props.vehicle.supplier_logo) {
        if (RegExp('http').test(props.vehicle.supplier_logo)) {
            suplierLogoUrl = props.vehicle.supplier_logo
        } else {
            suplierLogoUrl = `${process.env.REACT_APP_GRCGDS_BACKEND}/public/upload/${props.vehicle.supplier_logo}`
        }
    }

    let fuelPolicy = props.vehicle.fuel_policy
    if (props.vehicle.fuel_policy == 1) fuelPolicy = 'FullToFull'
    if (props.vehicle.fuel_policy == 2) fuelPolicy = 'FullToEmpty'
    if (props.vehicle.fuel_policy == 3) fuelPolicy = 'EmptyToEmpty'
    if (props.vehicle.fuel_policy == 4) fuelPolicy = 'HalfToEmpty'
    if (props.vehicle.fuel_policy == 5) fuelPolicy = 'QuarterToEmpty'
    if (props.vehicle.fuel_policy == 6) fuelPolicy = 'HalfToHalf'
    if (props.vehicle.fuel_policy == 7) fuelPolicy = 'QuarterToQuarter'
    if (props.vehicle.fuel_policy == 8) fuelPolicy = 'PrepaidFullToFull'
    if (props.vehicle.fuel_policy == 9) fuelPolicy = 'PrepaidFullToEmpty'

    let currencySymbol = '$'
    if (props.vehicle.currency == 'EUR') currencySymbol = '€'

    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`}>
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <ListingItemBody className="geodir-category-content">
                    <div style={{ display: 'flex' }}>
                        <div className="geodir-category-img" style={{ width: 'unset', marginRight: '2rem' }}>
                            <img style={{ width: 200, height: 113 }} src={image_url} alt={props.vehicle.carrentalcompanyname || props.vehicle.suppliername} />
                            <div className="overlay"></div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            {props.vehicle.acriss && (
                                <h4 style={{
                                    fontSize: '0.8rem',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                }}>{GetTypeClassFromAcrissCode(props.vehicle.acriss)}</h4>
                            )}
                            <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                            <p>ACRISS {props.vehicle.acriss}</p>
                            <div className="card-popup-rainingvis" data-starrating2="5" style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>
                                {carTransmission && (
                                    <span style={{ marginLeft: 0, display: 'flex' }} className="icon icon--car icon--transmission">
                                        {carTransmission || 'N/A'}
                                    </span>
                                )}
                                {props.vehicle.seats && (
                                    <span style={{ marginLeft: 0 }}>
                                        <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-male"></i> {props.vehicle.seats} Seats
                                    </span>
                                )}
                                {props.vehicle.doors && (
                                    <span style={{ marginLeft: 0, display: 'flex' }} className="icon icon--car icon--doors">
                                        {props.vehicle.doors} Doors
                                    </span>
                                )}
                                {props.vehicle.ac && (
                                    <span style={{ marginLeft: 0 }}>
                                        <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-icicles"></i> AC
                                    </span>
                                )}
                                {props.vehicle.luggages && (
                                    <span style={{ marginLeft: 0 }}>
                                        <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-briefcase"></i> {props.vehicle.luggages} Bags
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="row">
                            <div className="col-md-6">
                                {props.vehicle.fuel_policy && (
                                    <div className="geodir-category-location" style={{ padding: 0, display: 'flex' }}>
                                        <i style={{
                                            fontSize: '1.8rem',
                                            marginRight: '1rem',
                                        }} className="fas fa-gas-pump"></i>
                                        <div>
                                            {props.vehicle.carrentalcompanyname && (
                                                <h5 style={{ textAlign: 'left' }}><strong>Fuel Policy</strong></h5>
                                            )}
                                            <h4 style={{ marginBottom: 0, textAlign: 'left' }}>{fuelPolicy}</h4>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <div className="geodir-category-location" style={{ padding: 0 }}>

                                    {props.vehicle.winter_tyres_included && <p style={{ paddingBottom: 0 }}><i style={{ color: 'green' }} className="fas fa-check"></i> Winter Tyres Included</p>}
                                    {props.vehicle.snow_chains_included && <p style={{ paddingBottom: 0 }}><i style={{ color: 'green' }} className="fas fa-check"></i> Snow Chains Included</p>}
                                    {props.vehicle.road_tax_included && <p style={{ paddingBottom: 0 }}><i style={{ color: 'green' }} className="fas fa-check"></i>Road Tax Included</p>}
                                    {props.vehicle.unlimited_mileage && <p style={{ paddingBottom: 0 }}><i style={{ color: 'green' }} className="fas fa-check"></i>Unlimited Mileage</p>}
                                </div>
                            </div>
                        </div>



                        <div className="geodir-category-location" style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                {props.vehicle.carrentalcompanyname && (
                                    <h4 style={{ textAlign: 'left' }}>Supplied by</h4>
                                )}
                                <Avatar>
                                    <img style={{ width: '70px', height: '35px' }} src={suplierLogoUrl} alt={props.vehicle.carrentalcompanyname || props.vehicle.suppliername} />
                                </Avatar>
                            </div>
                            <div style={{ display: 'flex'}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div className="evticket-meta" style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: '0.5rem', }}>
                                        <div className="evticket-price"><span>{currencySymbol}</span> {props.vehicle.price}</div>
                                    </div>
                                    {props.vehicle.secondary_price && <div className="evticket-meta" style={{ paddingRight: 0 }}>
                                        <div className="evticket-price"><span>{currencySymbol}</span> {props.vehicle.secondary_price}</div>
                                    </div>}
                                </div>
                                {
                                    props.vehicle.deeplink &&
                                    <a style={{
                                        height: 'min-content',
                                        color: 'white',
                                        backgroundColor: '#004767',
                                        padding: '10px 25px',
                                        borderRadius: '4px',
                                        boxShadow: '0px 0px 0px 7px rgba(255,255,255,0.4)'
                                    }} target='_blank' className="capitalize" href={props.vehicle.deeplink}>Book Now</a>
                                }
                            </div>
                        </div>


                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}