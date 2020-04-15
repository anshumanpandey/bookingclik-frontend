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
        category: string;
        name: string;
        description: string;
    }
}
export const ListingItem: React.FC<ListingItemProps> = (props) => {
    return (
        <div className="listing-item">
            <ListingItemInner className="geodir-category-listing fl-wrap listing-item-wrapper">
                <div className="geodir-category-img">
                    <img src="images/all/1.jpg" alt="" style={{ height: '100%' }} />
                    <div className="overlay"></div>
                    <div className="list-post-counter"><span>4</span><i className="fa fa-heart"></i></div>
                </div>
                <ListingItemBody className="geodir-category-content fl-wrap">
                    <div>
                        <a className="listing-geodir-category capitalize" href="listing.html">{props.vehicle.category}</a>
                        <Avatar className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                            <span className="avatar-tooltip">Added By  <strong>Lisa Smith</strong></span>
                        </Avatar>
                        <h3><a href="listing-single.html">{props.vehicle.name}</a></h3>
                        <p>{props.vehicle.description}</p>
                    </div>
                    <div className="geodir-category-options fl-wrap">
                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                            <span>(7 reviews)</span>
                        </div>
                        <div className="geodir-category-location"><a href="#0" className="map-item"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                    </div>
                </ListingItemBody>
            </ListingItemInner>
        </div>

    );
}