import React from 'react'
import { Breadcrumb } from '../../components'

const Contact = () => {
  return (
    <>
        <Breadcrumb title="Liên Hệ"/>
        <div class="contact-area">
            <div class="container">
                <div class="contact-wrapper">
                    <div class="row">
                        <div class="col-12">
                            <div class="contact-form">
                                <div class="contact-title mb-30">
                                    <h2 class="title">Send A Quest</h2>
                                </div>
                                <form class="contact-form-style" id="contact-form" action="" method="post">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <input name="name" placeholder="Họ và tên*" type="text" />
                                        </div>
                                        <div class="col-lg-6">
                                            <input name="email" placeholder="Email*" type="email" />
                                        </div>
                                        <div class="col-lg-6">
                                            <input name="address" placeholder="Địa chỉ*" type="text" />
                                        </div>
                                        <div class="col-lg-6">
                                            <input name="phone" placeholder="Số điện thoại*" type="text" />
                                        </div>
                                        <div class="col-lg-12 text-center">
                                            <textarea name="message" placeholder="Your Message*"></textarea>
                                            <button class="btn btn-primary" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                                <p class="form-messege"></p>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="contact-info">
                                <div class="single-contact">
                                    <div class="icon-box">
                                        <img src="contact-1.png" alt=""/>
                                    </div>
                                    <div class="info-box">
                                        <h5 class="title">Địa chỉ</h5>
                                        <p>Hồ Chí Minh City. <br/>
                                        123 Dương Quãng Hàm, Gò Vấp</p>
                                    </div>
                                </div>
                                <div class="single-contact">
                                    <div class="icon-box">
                                        <img src="contact-2.png" alt=""/>
                                    </div>
                                    <div class="info-box">
                                        <h5 class="title">Số điện thoại</h5>
                                        <p><a href="tel:0123456789">+012 345 67 89</a></p>
                                        <p><a href="tel:0123456789">+012 345 67 89</a></p>
                                    </div>
                                </div>
                                <div class="single-contact m-0">
                                    <div class="icon-box">
                                        <img src="contact-3.png" alt=""/>
                                    </div>
                                    <div class="info-box">
                                        <h5 class="title">Email/Web</h5>
                                        <p><a href="mailto:demo@example.com">thuyduong@gmail.com</a></p>
                                        <p><a href="https://www.example.com/">www.example.com</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-map">
            <div id="mapid">
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Ho%20Chi%20Minh%20City%2C%20Vietnam&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                        <a href="https://sites.google.com/view/maps-api-v2/mapv2"></a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default Contact
