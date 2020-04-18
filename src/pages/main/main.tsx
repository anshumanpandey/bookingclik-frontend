import React from 'react';
import { Header, Footer } from '../../partials';
import { SearchWidget } from './SearchWidget';
import { CarsTab } from './CarsTab';
import { HotelsTab } from './HotelsTab';
import { FlightsTab } from './FlightsTab';
import { CruisesTab } from './CruisesTab';

export function Main() {
    return (
        <>
            <Header />
            <div id="wrapper">
                <div className="content">

                    <div id="tabs-container" style={{ padding: 0 }}>
                        <ul className="tabs-menu" style={{ margin: 'unset', border: 'unset', display: 'flex', paddingTop: '1rem' }}>
                            <li className="current" style={{ marginLeft: '4rem'}}>
                                <a href="#tab-cars">
                                    <i className="fa fa-car" ></i>
                                    {'  '}
                                        Cars
                                    </a>
                            </li>
                            <li>
                                <a href="#tab-hotels">
                                    <i className="fa fa-hotel" ></i>
                                    {'  '}
                                        Hotels
                                        </a>
                            </li>
                            <li>
                                <a href="#tab-flights">
                                    <i className="fa fa-plane-departure"></i>
                                    {'  '}
                                        Flights
                                        </a>
                            </li>
                            <li>
                                <a href="#tab-cruises">
                                    <i className="fa fa-ship"></i>
                                    {'  '}
                                        Cruises
                                        </a>
                            </li>
                        </ul>
                        <div className="tab">
                            <div id="tab-cars" className="tab-content" style={{ padding: 0 }}>
                                <CarsTab />
                            </div>
                        </div>
                        <div className="tab">
                            <div id="tab-hotels" className="tab-content" style={{ padding: 0 }}>
                                <HotelsTab />
                            </div>
                        </div>
                        <div className="tab">
                            <div id="tab-flights" className="tab-content" style={{ padding: 0 }}>
                                <FlightsTab />
                            </div>
                        </div>
                        <div className="tab">
                            <div id="tab-cruises" className="tab-content" style={{ padding: 0 }}>
                                <CruisesTab />
                            </div>
                        </div>
                    </div>




                    <section id="sec2">
                        <div className="container">
                            <div className="section-title">
                                <h2>Featured Categories</h2>
                                <div className="section-subtitle">Catalog of Categories</div>
                                <span className="section-separator"></span>
                                <p>Explore some of the best tips from around the city from our partners and friends.</p>
                            </div>
                            <div className="gallery-items fl-wrap mr-bot spad">
                                <div className="gallery-item">
                                    <div className="grid-item-holder">
                                        <div className="listing-item-grid">
                                            <div className="bg" data-bg="images/all/1.jpg"></div>
                                            <div className="listing-counter"><span>10 </span> Locations</div>
                                            <div className="listing-item-cat">
                                                <h3><a href="listing.html">Conference and Event</a></h3>
                                                <p>Constant care and attention to the patients makes good record</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-item gallery-item-second">
                                    <div className="grid-item-holder">
                                        <div className="listing-item-grid">
                                            <div className="bg" data-bg="images/all/1.jpg"></div>
                                            <div className="listing-counter"><span>6 </span> Locations</div>
                                            <div className="listing-item-cat">
                                                <h3><a href="listing.html">Cafe - Pub</a></h3>
                                                <p>Constant care and attention to the patients makes good record</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-item">
                                    <div className="grid-item-holder">
                                        <div className="listing-item-grid">
                                            <div className="bg" data-bg="images/all/1.jpg"></div>
                                            <div className="listing-counter"><span>21 </span> Locations</div>
                                            <div className="listing-item-cat">
                                                <h3><a href="listing.html">Gym - Fitness</a></h3>
                                                <p>Constant care and attention to the patients makes good record</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-item">
                                    <div className="grid-item-holder">
                                        <div className="listing-item-grid">
                                            <div className="bg" data-bg="images/all/1.jpg"></div>
                                            <div className="listing-counter"><span>7 </span> Locations</div>
                                            <div className="listing-item-cat">
                                                <h3><a href="listing.html">Hotels</a></h3>
                                                <p>Constant care and attention to the patients makes good record</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="gallery-item">
                                    <div className="grid-item-holder">
                                        <div className="listing-item-grid">
                                            <div className="bg" data-bg="images/all/1.jpg"></div>
                                            <div className="listing-counter"><span>15 </span> Locations</div>
                                            <div className="listing-item-cat">
                                                <h3><a href="listing.html">Shop - Store</a></h3>
                                                <p>Constant care and attention to the patients makes good record</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="listing.html" className="btn  big-btn circle-btn dec-btn  color-bg flat-btn">View All<i className="fa fa-eye"></i></a>
                        </div>
                    </section>
                    <section className="gray-section">
                        <div className="container">
                            <div className="section-title">
                                <h2>Popular listings</h2>
                                <div className="section-subtitle">Best Listings</div>
                                <span className="section-separator"></span>
                                <p>Nulla tristique mi a massa convallis cursus. Nulla eu mi magna.</p>
                            </div>
                        </div>
                        <div className="list-carousel fl-wrap card-listing ">
                            <div className="listing-carousel  fl-wrap ">
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>4</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Retail</a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Lisa Smith</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Event in City Mol</a></h3>
                                                <p>Sed interdum metus at nisi tempor laoreet.  </p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                                                        <span>(7 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>15</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Event</a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Mark Rose</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Cafe "Lollipop"</a></h3>
                                                <p>Morbi suscipit erat in diam bibendum rutrum in nisl.</p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="4">
                                                        <span>(17 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>13</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Gym </a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Nasty Wood</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Gym In Brooklyn</a></h3>
                                                <p>Morbiaccumsan ipsum velit tincidunt . </p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="3">
                                                        <span>(16 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>3</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Shops</a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Nasty Wood</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Shop in Boutique Zone</a></h3>
                                                <p>Morbiaccumsan ipsum velit tincidunt . </p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="4">
                                                        <span>(6 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>35</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Cars</a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Kliff Antony</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Best deal For the Cars</a></h3>
                                                <p>Lorem ipsum gravida nibh vel velit.</p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                                                        <span>(11 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="listing-item">
                                        <article className="geodir-category-listing fl-wrap">
                                            <div className="geodir-category-img">
                                                <img src="images/all/1.jpg" alt="" />
                                                <div className="overlay"></div>
                                                <div className="list-post-counter"><span>553</span><i className="fa fa-heart"></i></div>
                                            </div>
                                            <div className="geodir-category-content fl-wrap">
                                                <a className="listing-geodir-category" href="listing.html">Restourants</a>
                                                <div className="listing-avatar"><a href="author-single.html"><img src="images/avatar/1.jpg" alt="" /></a>
                                                    <span className="avatar-tooltip">Added By  <strong>Adam Koncy</strong></span>
                                                </div>
                                                <h3><a href="listing-single.html">Luxury Restourant</a></h3>
                                                <p>Sed non neque elit. Sed ut imperdie.</p>
                                                <div className="geodir-category-options fl-wrap">
                                                    <div className="listing-rating card-popup-rainingvis" data-starrating2="5">
                                                        <span>(7 reviews)</span>
                                                    </div>
                                                    <div className="geodir-category-location"><a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> 27th Brooklyn New York, NY 10065</a></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-prev sw-btn"><i className="fa fa-long-arrow-left"></i></div>
                            <div className="swiper-button-next sw-btn"><i className="fa fa-long-arrow-right"></i></div>
                        </div>
                    </section>
                    <section className="color-bg">
                        <div className="shapes-bg-big"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images-collage fl-wrap">
                                        <div className="images-collage-title">City<span>Book</span></div>
                                        <div className="images-collage-main images-collage-item"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <div className="images-collage-other images-collage-item" data-position-left="23" data-position-top="10" data-zindex="2"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <div className="images-collage-other images-collage-item" data-position-left="62" data-position-top="54" data-zindex="5"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <div className="images-collage-other images-collage-item anim-col" data-position-left="18" data-position-top="70" data-zindex="11"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <div className="images-collage-other images-collage-item" data-position-left="37" data-position-top="90" data-zindex="1"><img src="images/avatar/1.jpg" alt="" /></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="color-bg-text">
                                        <h3>Join our online community</h3>
                                        <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit, sed diam nonu mmy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</p>
                                        <a href="#" className="color-bg-link modal-open">Sign In Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="section-title">
                                <h2>How it works</h2>
                                <div className="section-subtitle">Discover & Connect </div>
                                <span className="section-separator"></span>
                                <p>Explore some of the best tips from around the world.</p>
                            </div>
                            <div className="process-wrap fl-wrap">
                                <ul>
                                    <li>
                                        <div className="process-item">
                                            <span className="process-count">01 . </span>
                                            <div className="time-line-icon"><i className="fa fa-map-o"></i></div>
                                            <h4> Find Interesting Place</h4>
                                            <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus tellus ut, convallis eros sollicitudin turpis.</p>
                                        </div>
                                        <span className="pr-dec"></span>
                                    </li>
                                    <li>
                                        <div className="process-item">
                                            <span className="process-count">02 .</span>
                                            <div className="time-line-icon"><i className="fa fa-envelope-open-o"></i></div>
                                            <h4> Contact a Few Owners</h4>
                                            <p>Faucibus ante, in porttitor tellus blandit et. Phasellus tincidunt metus lectus sollicitudin feugiat pharetra consectetur.</p>
                                        </div>
                                        <span className="pr-dec"></span>
                                    </li>
                                    <li>
                                        <div className="process-item">
                                            <span className="process-count">03 .</span>
                                            <div className="time-line-icon"><i className="fa fa-hand-peace-o"></i></div>
                                            <h4> Make a Listing</h4>
                                            <p>Maecenas pulvinar, risus in facilisis dignissim, quam nisi hendrerit nulla, id vestibulum metus nullam viverra porta.</p>
                                        </div>
                                    </li>
                                </ul>
                                <div className="process-end"><i className="fa fa-check"></i></div>
                            </div>
                        </div>
                    </section>
                    <section className="parallax-section" data-scrollax-parent="true">
                        <div className="bg" data-bg="images/bg/1.jpg" data-scrollax="properties: { translateY: '100px' }"></div>
                        <div className="overlay co lor-overlay"></div>
                        <div className="container">
                            <div className="intro-item fl-wrap">
                                <h2>Visit the Best Places In Your City</h2>
                                <h3>Find great places , hotels , restourants , shops.</h3>
                                <a className="trs-btn" href="#">Add Listing + </a>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="section-title">
                                <h2> Pricing Tables</h2>
                                <div className="section-subtitle">cost of our services</div>
                                <span className="section-separator"></span>
                                <p>Explore some of the best tips from around the city from our partners and friends.</p>
                            </div>
                            <div className="pricing-wrap fl-wrap">
                                <div className="price-item">
                                    <div className="price-head op1">
                                        <h3>Basic</h3>
                                    </div>
                                    <div className="price-content fl-wrap">
                                        <div className="price-num fl-wrap">
                                            <span className="curen">$</span>
                                            <span className="price-num-item">49</span>
                                            <div className="price-num-desc">Per month</div>
                                        </div>
                                        <div className="price-desc fl-wrap">
                                            <ul>
                                                <li>One Listing</li>
                                                <li>90 Days Availability</li>
                                                <li>Non-Featured</li>
                                                <li>Limited Support</li>
                                            </ul>
                                            <a href="#" className="price-link">Choose Basic</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="price-item best-price">
                                    <div className="price-head op2">
                                        <h3>Extended</h3>
                                    </div>
                                    <div className="price-content fl-wrap">
                                        <div className="price-num fl-wrap">
                                            <span className="curen">$</span>
                                            <span className="price-num-item">99</span>
                                            <div className="price-num-desc">Per month</div>
                                        </div>
                                        <div className="price-desc fl-wrap">
                                            <ul>
                                                <li>Ten Listings</li>
                                                <li>Lifetime Availability</li>
                                                <li>Featured In Search Results</li>
                                                <li>24/7 Support</li>
                                            </ul>
                                            <a href="#" className="price-link">Choose Extended</a>
                                            <div className="recomm-price">
                                                <i className="fa fa-check"></i>
                                                <span className="clearfix"></span>
                                                Recommended
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="price-item">
                                    <div className="price-head">
                                        <h3>Professional</h3>
                                    </div>
                                    <div className="price-content fl-wrap">
                                        <div className="price-num fl-wrap">
                                            <span className="curen">$</span>
                                            <span className="price-num-item">149</span>
                                            <div className="price-num-desc">Per month</div>
                                        </div>
                                        <div className="price-desc fl-wrap">
                                            <ul>
                                                <li>Unlimited Listings</li>
                                                <li>Lifetime Availability</li>
                                                <li>Featured In Search Results</li>
                                                <li>24/7 Support</li>
                                            </ul>
                                            <a href="#" className="price-link">Choose Professional</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="color-bg">
                        <div className="shapes-bg-big"></div>
                        <div className="container">
                            <div className=" single-facts fl-wrap">
                                <div className="inline-facts-wrap">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                <div className="num" data-content="0" data-num="254">154</div>
                                            </div>
                                        </div>
                                        <h6>New Visiters Every Week</h6>
                                    </div>
                                </div>
                                <div className="inline-facts-wrap">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                <div className="num" data-content="0" data-num="12168">12168</div>
                                            </div>
                                        </div>
                                        <h6>Happy customers every year</h6>
                                    </div>
                                </div>
                                <div className="inline-facts-wrap">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                <div className="num" data-content="0" data-num="172">172</div>
                                            </div>
                                        </div>
                                        <h6>Won Awards</h6>
                                    </div>
                                </div>
                                <div className="inline-facts-wrap">
                                    <div className="inline-facts">
                                        <div className="milestone-counter">
                                            <div className="stats animaper">
                                                <div className="num" data-content="0" data-num="732">732</div>
                                            </div>
                                        </div>
                                        <h6>New Listing Every Week</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="section-title">
                                <h2>Testimonials</h2>
                                <div className="section-subtitle">Clients Reviews</div>
                                <span className="section-separator"></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.</p>
                            </div>
                        </div>
                        <div className="carousel fl-wrap">
                            <div className="testimonials-carousel single-carousel fl-wrap">
                                <div className="slick-slide-item">
                                    <div className="testimonilas-text">
                                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5"> </div>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi arch itecto beatae vitae dicta sunt explicabo. </p>
                                    </div>
                                    <div className="testimonilas-avatar-item">
                                        <div className="testimonilas-avatar"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <h4>Lisa Noory</h4>
                                        <span>Restaurant Owner</span>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="testimonilas-text">
                                        <div className="listing-rating card-popup-rainingvis" data-starrating2="4"> </div>
                                        <p>Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</p>
                                    </div>
                                    <div className="testimonilas-avatar-item">
                                        <div className="testimonilas-avatar"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <h4>Antony Moore</h4>
                                        <span>Restaurant Owner</span>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="testimonilas-text">
                                        <div className="listing-rating card-popup-rainingvis" data-starrating2="5"> </div>
                                        <p>Feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te odio dignissim qui blandit praesent.</p>
                                    </div>
                                    <div className="testimonilas-avatar-item">
                                        <div className="testimonilas-avatar"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <h4>Austin Harisson</h4>
                                        <span>Restaurant Owner</span>
                                    </div>
                                </div>
                                <div className="slick-slide-item">
                                    <div className="testimonilas-text">
                                        <div className="listing-rating card-popup-rainingvis" data-starrating2="4"> </div>
                                        <p>Qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram seacula quarta decima et quinta decima.</p>
                                    </div>
                                    <div className="testimonilas-avatar-item">
                                        <div className="testimonilas-avatar"><img src="images/avatar/1.jpg" alt="" /></div>
                                        <h4>Garry Colonsi</h4>
                                        <span>Restaurant Owner</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-prev sw-btn"><i className="fa fa-long-arrow-left"></i></div>
                            <div className="swiper-button-next sw-btn"><i className="fa fa-long-arrow-right"></i></div>
                        </div>
                    </section>
                    <section className="gray-section">
                        <div className="container">
                            <div className="fl-wrap spons-list">
                                <ul className="client-carousel">
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                    <li><a href="#" target="_blank"><img src="images/clients/1.png" alt="" /></a></li>
                                </ul>
                                <div className="sp-cont sp-cont-prev"><i className="fa fa-angle-left"></i></div>
                                <div className="sp-cont sp-cont-next"><i className="fa fa-angle-right"></i></div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="section-title">
                                <h2>Tips & Articles</h2>
                                <div className="section-subtitle">From the blog.</div>
                                <span className="section-separator"></span>
                                <p>Browse the latest articles from our blog.</p>
                            </div>
                            <div className="row home-posts">
                                <div className="col-md-4">
                                    <article className="card-post">
                                        <div className="card-post-img fl-wrap">
                                            <a href="blog-single.html"><img src="images/all/1.jpg" alt="" /></a>
                                        </div>
                                        <div className="card-post-content fl-wrap">
                                            <h3><a href="blog-single.html">Gallery Post</a></h3>
                                            <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. </p>
                                            <div className="post-author"><a href="#"><img src="images/avatar/1.jpg" alt="" /><span>By , Alisa Noory</span></a></div>
                                            <div className="post-opt">
                                                <ul>
                                                    <li><i className="fa fa-calendar-check-o"></i> <span>25 April 2018</span></li>
                                                    <li><i className="fa fa-eye"></i> <span>264</span></li>
                                                    <li><i className="fa fa-tags"></i> <a href="#">Photography</a>  </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div className="col-md-4">
                                    <article className="card-post">
                                        <div className="card-post-img fl-wrap">
                                            <a href="blog-single.html"><img src="images/all/1.jpg" alt="" /></a>
                                        </div>
                                        <div className="card-post-content fl-wrap">
                                            <h3><a href="blog-single.html">Video and gallery post</a></h3>
                                            <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. </p>
                                            <div className="post-author"><a href="#"><img src="images/avatar/1.jpg" alt="" /><span>By , Mery Lynn</span></a></div>
                                            <div className="post-opt">
                                                <ul>
                                                    <li><i className="fa fa-calendar-check-o"></i> <span>25 April 2018</span></li>
                                                    <li><i className="fa fa-eye"></i> <span>264</span></li>
                                                    <li><i className="fa fa-tags"></i> <a href="#">Design</a>  </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div className="col-md-4">
                                    <article className="card-post">
                                        <div className="card-post-img fl-wrap">
                                            <a href="blog-single.html"><img src="images/all/1.jpg" alt="" /></a>
                                        </div>
                                        <div className="card-post-content fl-wrap">
                                            <h3><a href="blog-single.html">Post Article</a></h3>
                                            <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. </p>
                                            <div className="post-author"><a href="#"><img src="images/avatar/1.jpg" alt="" /><span>By , Garry Dee</span></a></div>
                                            <div className="post-opt">
                                                <ul>
                                                    <li><i className="fa fa-calendar-check-o"></i> <span>25 April 2018</span></li>
                                                    <li><i className="fa fa-eye"></i> <span>264</span></li>
                                                    <li><i className="fa fa-tags"></i> <a href="#">Stories</a>  </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <a href="blog.html" className="btn  big-btn circle-btn  dec-btn color-bg flat-btn">Read All<i className="fa fa-eye"></i></a>
                        </div>
                    </section>
                    <section className="gradient-bg">
                        <div className="cirle-bg">
                            <div className="bg" data-bg="images/bg/circle.png"></div>
                        </div>
                        <div className="container">
                            <div className="join-wrap fl-wrap">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h3>Do You Have Questions ?</h3>
                                        <p>Lorem ipsum dolor sit amet, harum dolor nec in, usu molestiae at no.</p>
                                    </div>
                                    <div className="col-md-4"><a href="contacts.html" className="join-wrap-btn">Get In Touch <i className="fa fa-envelope-o"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}