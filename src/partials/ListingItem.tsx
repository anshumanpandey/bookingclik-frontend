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

const Avatar = styled.div`
    .listing-item.list-layout &{
        margin-top: -80px;
    }
`;


export type ListingItemProps = {
    layout?: 'GRID' | 'LIST',
    vehicle: Vehicle
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    const image_url = props.vehicle.image_preview_url ? props.vehicle.image_preview_url : "images/all/1.jpg"

    const [doDate] = useSearchWidgetState('doDate')
    const [puDate] = useSearchWidgetState('puDate')

    const carTransmission = props.vehicle.transmission || (props.vehicle.automatic == true ? 'Automatic' : null) || (props.vehicle.manual == true ? 'Manual' : null)

    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`} style={{
            height: '10rem'
        }}>
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

                        <Avatar className="listing-avatar">
                            <a href="#">
                                <img src={props.vehicle.client_logo ? `${process.env.REACT_APP_BACKEND_URL}/upload/${props.vehicle.client_logo}` : "images/avatar/1.jpg"} alt="" />
                            </a>
                            {props.vehicle.client_name && (<span className="avatar-tooltip">By  <strong>{props.vehicle.client_name}</strong></span>)}
                        </Avatar>
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>ACRISS {props.vehicle.acriss}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="card-popup-rainingvis" data-starrating2="5" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            {carTransmission && (
                                <span style={{ marginLeft: 0 }}>
                                    <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-car-side"></i> {carTransmission}
                                </span>
                            )}
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-male"></i> {props.vehicle.seats}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-door-closed"></i> {props.vehicle.doors}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-icicles"></i> {props.vehicle.ac ? 'Yes' : 'No'}
                            </span>
                            {props.vehicle.luggages && (
                                <span style={{ marginLeft: 0 }}>
                                    <i style={{ fontSize: '1rem', color: '#004767' }} className="fas fa-briefcase"></i> {props.vehicle.luggages}
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
                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}