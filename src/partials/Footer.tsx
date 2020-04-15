import React, { useEffect, useState } from 'react';


export const Footer = () => {
    return (
        <>
            <footer className="main-footer dark-footer  ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-widget fl-wrap">
                                <h3>About Us</h3>
                                <div className="footer-contacts-widget fl-wrap">
                                    <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam. </p>
                                    <ul className="footer-contacts fl-wrap">
                                        <li><span><i className="fa fa-envelope-o"></i> Mail :</span><a href="#" target="_blank">yourmail@domain.com</a></li>
                                        <li> <span><i className="fa fa-map-marker"></i> Adress :</span><a href="#" target="_blank">USA 27TH Brooklyn NY</a></li>
                                        <li><span><i className="fa fa-phone"></i> Phone :</span><a href="#">+7(111)123456789</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-widget fl-wrap">
                                <h3>Our Last News</h3>
                                <div className="widget-posts fl-wrap">
                                    <ul>
                                        <li className="clearfix">
                                            <a href="#" className="widget-posts-img"><img src="images/all/1.jpg" className="respimg" alt="" /></a>
                                            <div className="widget-posts-descr">
                                                <a href="#" title="">Vivamus dapibus rutrum</a>
                                                <span className="widget-posts-date"> 21 Mar 09.05 </span>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="widget-posts-img"><img src="images/all/1.jpg" className="respimg" alt="" /></a>
                                            <div className="widget-posts-descr">
                                                <a href="#" title=""> In hac habitasse platea</a>
                                                <span className="widget-posts-date"> 7 Mar 18.21 </span>
                                            </div>
                                        </li>
                                        <li className="clearfix">
                                            <a href="#" className="widget-posts-img"><img src="images/all/1.jpg" className="respimg" alt="" /></a>
                                            <div className="widget-posts-descr">
                                                <a href="#" title="">Tortor tempor in porta</a>
                                                <span className="widget-posts-date"> 7 Mar 16.42 </span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-widget fl-wrap">
                                <h3>Our  Twitter</h3>
                                <div id="footer-twiit"></div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-widget fl-wrap">
                                <h3>Subscribe</h3>
                                <div className="subscribe-widget fl-wrap">
                                    <p>Want to be notified when we launch a new template or an udpate. Just sign up and we'll send you a notification by email.</p>
                                    <div className="subcribe-form">
                                        <form id="subscribe">
                                            <input className="enteremail" name="email" id="subscribe-email" placeholder="Email" type="text" />
                                            <button type="submit" id="subscribe-button" className="subscribe-button"><i className="fa fa-rss"></i> Subscribe</button>
                                            <label htmlFor="subscribe-email" className="subscribe-message"></label>
                                        </form>
                                    </div>
                                </div>
                                <div className="footer-widget fl-wrap">
                                    <div className="footer-menu fl-wrap">
                                        <ul>
                                            <li><a href="#">Home </a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#">Listing</a></li>
                                            <li><a href="#">Contacts</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub-footer fl-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="about-widget">
                                    <img src="images/logo.png" alt="" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="copyright"> &#169; CityBook 2018 .  All rights reserved.</div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-social">
                                    <ul>
                                        <li><a href="#" target="_blank" ><i className="fa fa-facebook-official"></i></a></li>
                                        <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#" target="_blank" ><i className="fa fa-chrome"></i></a></li>
                                        <li><a href="#" target="_blank" ><i className="fa fa-vk"></i></a></li>
                                        <li><a href="#" target="_blank" ><i className="fa fa-whatsapp"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="main-register-wrap modal">
                <div className="main-overlay"></div>
                <div className="main-register-holder">
                    <div className="main-register fl-wrap">
                        <div className="close-reg"><i className="fa fa-times"></i></div>
                        <h3>Sign In <span>City<strong>Book</strong></span></h3>
                        <div className="soc-log fl-wrap">
                            <p>For faster login or register use your social account.</p>
                            <a href="#" className="facebook-log"><i className="fa fa-facebook-official"></i>Log in with Facebook</a>
                            <a href="#" className="twitter-log"><i className="fa fa-twitter"></i> Log in with Twitter</a>
                        </div>
                        <div className="log-separator fl-wrap"><span>or</span></div>
                        <div id="tabs-container">
                            <ul className="tabs-menu">
                                <li className="current"><a href="#tab-1">Login</a></li>
                                <li><a href="#tab-2">Register</a></li>
                            </ul>
                            <div className="tab">
                                <div id="tab-1" className="tab-content">
                                    <div className="custom-form">
                                        <form method="post" name="registerform">
                                            <label>Username or Email Address * </label>
                                            <input name="email" type="text" onChange={() => console.log(0)} value="" />
                                            <label >Password * </label>
                                            <input name="password" type="password" onChange={() => console.log(0)} value="" />
                                            <button type="submit" className="log-submit-btn"><span>Log In</span></button>
                                            <div className="clearfix"></div>
                                            <div className="filter-tags">
                                                <input id="check-a" type="checkbox" name="check" />
                                                <label htmlFor="check-a">Remember me</label>
                                            </div>
                                        </form>
                                        <div className="lost_password">
                                            <a href="#">Lost Your Password?</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab">
                                    <div id="tab-2" className="tab-content">
                                        <div className="custom-form">
                                            <form method="post" name="registerform" className="main-register-form" id="main-register-form2">
                                                <label >First Name * </label>
                                                <input name="name" type="text" onChange={() => console.log(0)} value="" />
                                                <label>Second Name *</label>
                                                <input name="name2" type="text" onChange={() => console.log(0)} value="" />
                                                <label>Email Address *</label>
                                                <input name="email" type="text" onChange={() => console.log(0)} value="" />
                                                <label >Password *</label>
                                                <input name="password" type="password" onChange={() => console.log(0)} value="" />
                                                <button type="submit" className="log-submit-btn"  ><span>Register</span></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a className="to-top"><i className="fa fa-angle-up"></i></a>
        </>
    );
}