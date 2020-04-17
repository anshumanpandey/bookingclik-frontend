import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

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
        price: string;
        currency?: string,
        custom_location: string
        image_preview_url?: string
        baseUrl?: string
    }
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    const image_url = props.vehicle.image_preview_url ? `${props.vehicle.baseUrl}${props.vehicle.image_preview_url}` : "images/all/1.jpg"
    return (
        <div className={`listing-item ${props.layout === 'LIST' ? 'list-layout' : ''}`}>
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <div className="geodir-category-img">
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
                            }}  href="#">Book Now</a>
                        </form>
                        <Avatar className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                            <span className="avatar-tooltip">Added By  <strong>Lisa Smith</strong></span>
                        </Avatar>
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>ACRISS {props.vehicle.acriss}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                            <span>
                                <img src="http://www.right-cars.com/public/img/icons/manual.png"/>Transmission {props.vehicle.transmission}
                            </span>
                            <span>
                                <img src="http://www.right-cars.com/public/img/icons/seats.png"/>Seats {props.vehicle.seats}
                            </span>
                            <span>
                                <img src="http://www.right-cars.com/public/img/icons/door.png"/>doors {props.vehicle.doors}
                            </span>
                        </div>
                        <div className="geodir-category-location">
                            <a href="#0" className="map-item">Price {props.vehicle.price} {props.vehicle.currency}</a>
                        </div>
                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}