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
                                    <h2 class="title">Gửi tin nhắn</h2>
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
                                            <button class="btn btn-primary" type="submit">Gửi tin nhắn</button>
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
                                        <p>236B Đ. Lê Văn Sỹ, Phường 1, Tân Bình, <br/>
                                        Hồ Chí Minh 700000, Việt Nam</p>
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
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1942409058915!2d106.66182677596588!3d10.79643023139953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292dd806cde3%3A0xeecc14dc4e208ec0!2zMjM2QiDEkC4gTMOqIFbEg24gU-G7uSwgUGjGsOG7nW5nIDEsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1746103485188!5m2!1svi!2s"
                        width="600"
                        height="450"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default Contact
