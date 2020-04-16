import React from 'react';
import styled from 'styled-components';

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
    vehicle: {
        doors: string;
        name: string;
        transmission: string;
        acriss: string;
        price: string;
        currency?: string
    }
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    return (
        <div className="listing-item">
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <div className="geodir-category-img">
                    <img src="images/all/1.jpg" alt="" style={{ height: '100%' }} />
                    <div className="overlay"></div>
                    <div className="list-post-counter"><span>{props.vehicle.doors} doors</span></div>
                </div>
                <ListingItemBody className="geodir-category-content fl-wrap">
                    <div>
                        <a className="listing-geodir-category capitalize" href="listing.html">{props.vehicle.acriss}</a>
                        <Avatar className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                            <span className="avatar-tooltip">Added By  <strong>Lisa Smith</strong></span>
                        </Avatar>
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>ACRISS {props.vehicle.acriss}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                            <span>Transmission {props.vehicle.transmission}</span>
                        </div>
                        <div className="geodir-category-location"><a href="#0" className="map-item">Price {props.vehicle.price} {props.vehicle.currency}</a></div>
                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}