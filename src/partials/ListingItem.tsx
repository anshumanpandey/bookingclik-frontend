import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Decimal } from 'decimal.js';
import { Vehicle } from '../types';
import { useSearchWidgetState } from '../pages/main/useSearchWidgetGlobalState';

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

const Avatar = styled.div``;


export type ListingItemProps = {
    layout?: 'GRID' | 'LIST',
    vehicle: Vehicle
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    const image_url = props.vehicle.image_preview_url ? props.vehicle.image_preview_url : "images/all/1.jpg"

    const [doDate] = useSearchWidgetState('doDate')
    const [puDate] = useSearchWidgetState('puDate')

    const carTransmission = props.vehicle.transmission || (props.vehicle.automatic == true ? 'Automatic' : null) || (props.vehicle.manual == true ? 'Manual' : null)

    let AC = 'N/A'
    if (props.vehicle.ac === true) AC = 'Yes'
    if (props.vehicle.ac === false) AC = 'No'

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

    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`}>
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <div className="geodir-category-img" style={{ width: '40%' }}>
                    <img src={image_url} alt="" style={{ height: '100%' }} />
                    <div className="overlay"></div>
                </div>
                <ListingItemBody className="geodir-category-content">
                    <div>
                        {
                            props.vehicle.deeplink &&
                            <a style={{ left: '-70%', top: '0.5rem' }} target='_blank' className="listing-geodir-category capitalize" href={props.vehicle.deeplink}>Book Now</a>
                        }
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>ACRISS {props.vehicle.acriss}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="card-popup-rainingvis" data-starrating2="5" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-car-side"></i> {carTransmission || 'N/A'}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-male"></i> {props.vehicle.seats || 'N/A'} Seats
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-door-closed"></i> {props.vehicle.doors || 'N/A'} Doors
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-icicles"></i> {AC} AC
                            </span>
                            {props.vehicle.luggages && (
                                <span style={{ marginLeft: 0 }}>
                                    <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-briefcase"></i> {props.vehicle.luggages || 'N/A'} Bags
                                </span>
                            )}
                        </div>
                        <div className="geodir-category-location" style={{ padding: 0 }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div className="evticket-meta" style={{ paddingLeft: 0, paddingBottom: 0, paddingTop: '0.5rem', }}>
                                    <div className="evticket-price"><span>{props.vehicle.currency}</span> {props.vehicle.price}</div>
                                </div>
                                {props.vehicle.secondary_price && <div className="evticket-meta" style={{ paddingRight: 0 }}>
                                    <div className="evticket-price"><span>{props.vehicle.currency}</span> {props.vehicle.secondary_price}</div>
                                </div>}
                            </div>
                            {props.vehicle.secondary_price && (
                                <div className="evticket-meta fl-wrap" style={{ paddingLeft: '0px', paddingTop: 0 }}>
                                    <div className="evticket-available" style={{ float: 'left' }}>
                                        Save: <span>{props.vehicle.currency} {Decimal.sub(props.vehicle.secondary_price, props.vehicle.price).toNumber()}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {props.vehicle.fuel_policy && (
                            <div className="geodir-category-location" style={{ padding: 0, display: 'flex' }}>
                                <i style={{
                                    fontSize: '2.3rem',
                                    marginRight: '1rem',
                                }} className="fas fa-gas-pump"></i>
                                <div>
                                    {props.vehicle.carrentalcompanyname && (
                                        <h4 style={{ textAlign: 'left' }}><strong>Fuel Policy</strong></h4>
                                    )}
                                    <h3 style={{ marginBottom: 0 }}>{fuelPolicy}</h3>
                                </div>
                            </div>
                        )}

                        <div className="geodir-category-location" style={{ padding: 0 }}>
                            {props.vehicle.carrentalcompanyname && (
                                <h4 style={{ textAlign: 'left' }}>Supplied by <strong>{props.vehicle.carrentalcompanyname}</strong></h4>
                            )}
                            <Avatar className="">
                                <a href="#">
                                    <img style={{ height: '2.5rem' }} src={suplierLogoUrl} alt={props.vehicle.carrentalcompanyname || props.vehicle.suppliername} />
                                </a>
                            </Avatar>
                        </div>

                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}