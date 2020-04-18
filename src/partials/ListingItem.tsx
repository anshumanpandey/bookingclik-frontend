import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {Decimal} from 'decimal.js';

const ListingItemBody = styled.div`
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
    criteria: {
        doDate: string;
        puDate: string;
    };
    vehicle: {
        doors: string;
        seats: string;
        name: string;
        transmission: string;
        acriss: string;
        price: number;
        secondary_price: number;
        currency?: string,
        custom_location: string
        image_preview_url?: string
        baseUrl?: string
        client_name?: string
        client_logo?: string
    }
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    const image_url = props.vehicle.image_preview_url ? `${props.vehicle.baseUrl}${props.vehicle.image_preview_url}` : "images/all/1.jpg"
    let transmissionNode = (<>
        <img src="http://www.right-cars.com/public/img/icons/manual.png" />{props.vehicle.transmission}
    </>);

    if (props.vehicle.transmission === "Automatic") {
        transmissionNode = (<>
            <img src="http://www.right-cars.com/public/img/icons/automatic.png" />{props.vehicle.transmission}
        </>);
    }
    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`}>
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <div className="geodir-category-img" style={{ minHeight: '13rem' }}>
                    <img src={image_url} alt="" style={{ height: '100%' }} />
                    <div className="overlay"></div>
                    <div className="list-post-counter"><span>{props.vehicle.doors} doors</span></div>
                </div>
                <ListingItemBody className="geodir-category-content fl-wrap">
                    <div>
                        <form id="book-now-form" target="_blank" method="post" action="http://right-cars.com/booking-vehicle.php">

                            <input type="hidden" name="driverage" value="33" />
                            <input type="hidden" name="pickuplocation" value={props.vehicle.custom_location} />
                            <input type="hidden" name="pickup_date" value={props.criteria.puDate.replace(/\//g, '-')} />
                            <input type="hidden" name="dropoff_date" value={props.criteria.doDate.replace(/\//g, '-')} />

                            <input type="hidden" name="pickuptime" value={dayjs().format('H:mm')} />
                            <input type="hidden" name="dropofftime" value={dayjs().format('H:mm')} />

                            <a className="listing-geodir-category capitalize" onClick={() => {
                                //@ts-ignore
                                document.getElementById('book-now-form')?.submit();
                            }} href="#">Book Now</a>
                        </form>
                        <Avatar className="listing-avatar">
                            <a href="#">
                                <img src={props.vehicle.client_logo ? `${process.env.REACT_APP_BACKEND_URL}/upload/${props.vehicle.client_logo}`: "images/avatar/1.jpg"} alt="" />
                            </a>
                            {props.vehicle.client_name && (<span className="avatar-tooltip">By  <strong>{props.vehicle.client_name}</strong></span>)}
                        </Avatar>
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>ACRISS {props.vehicle.acriss}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span style={{ marginLeft: 0 }}>
                                {transmissionNode}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <img src="http://www.right-cars.com/public/img/icons/seats.png" />{props.vehicle.seats}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <img src="http://www.right-cars.com/public/img/icons/door.png" />{props.vehicle.doors}
                            </span>
                            <span style={{ marginLeft: 0 }}>
                                <img src="http://www.right-cars.com/public/img/icons/AC.png" />Yes
                            </span>
                        </div>
                        <div className="geodir-category-location" style={{ padding: 0 }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div className="evticket-meta" style={{ paddingLeft: 0 }}>
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