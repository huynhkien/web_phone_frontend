import React from 'react'
import { CiFacebook, CiTwitter, CiYoutube } from "react-icons/ci";
import { FaHeart, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div class="footer-area">
      <div class="footer-container">
          <div class="footer-top">
              <div class="container">
                  <div class="row">
                      <div class="col-md-6 col-lg-3 mb-md-30px mb-lm-30px">
                          <div class="single-wedge">
                              <div class="footer-logo">
                                  <a href="index.html"><img src="/logo.png" alt="logo footer"/></a>
                              </div>
                              <p class="about-text">DPhone chuyên cung cấp các dòng smartphone chính hãng với giá tốt, dịch vụ giao hàng nhanh, bảo hành rõ ràng và hỗ trợ khách hàng tận tâm.
                              </p>
                              <ul class="link-follow">
                                  <li>
                                      <a class="m-0" title="Twitter" target="_blank" rel="noopener noreferrer" href="/"><i aria-hidden="true"><CiFacebook/></i></a>
                                  </li>
                                  <li>
                                      <a title="Tumblr" target="_blank" rel="noopener noreferrer" href="/"><i aria-hidden="true"><CiTwitter /></i></a>
                                  </li>
                                  <li>
                                      <a title="Facebook" target="_blank" rel="noopener noreferrer" href="/"><i aria-hidden="true"><FaTiktok /></i></a>
                                  </li>
                                  <li>
                                      <a title="Instagram" target="_blank" rel="noopener noreferrer" href="/"><i aria-hidden="true"><CiYoutube />                                      </i></a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="col-md-6 col-lg-3 col-sm-6 mb-lm-30px pl-lg-60px">
                          <div class="single-wedge">
                              <h4 class="footer-herading">Dịch vụ</h4>
                              <div class="footer-links">
                                  <div class="footer-row">
                                      <ul class="align-items-center">
                                          <li class="li"><a class="single-link" href="my-account.html">Giới thiệu</a></li>
                                          <li class="li"><a class="single-link" href="contact.html">Liên hệ</a></li>
                                          <li class="li"><a class="single-link" href="cart.html">Giỏ hàng</a></li>
                                          <li class="li"><a class="single-link" href="login.html">Đăng nhập</a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6 col-lg-3 col-sm-6 mb-lm-30px pl-lg-40px">
                          <div class="single-wedge">
                              <h4 class="footer-herading">Chính sách</h4>
                              <div class="footer-links">
                                  <div class="footer-row">
                                      <ul class="align-items-center">
                                          <li class="li"><a class="single-link" href="my-account.html">Điều khoản</a></li>
                                          <li class="li"><a class="single-link" href="contact.html">Trợ giúp</a></li>
                                          <li class="li"><a class="single-link" href="cart.html">Chính sách bảo hành</a></li>
                                          <li class="li"><a class="single-link" href="shop-left-sidebar.html">Hỗ trợ</a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-6 col-lg-3 col-sm-12">
                          <div class="single-wedge">
                              <h4 class="footer-herading">Liên Hệ</h4>
                              <div class="footer-links">
                                  <p class="address">Địa chỉ: TP.Hồ Chí Minh.</p>
                                  <p class="phone">Điện thoại:<a href="tel:0123456789"> 0123456789</a></p>
                                  <p class="mail">Email:<a href="/"> thuyduong@gmail.com</a></p>
                                  <p class="mail"><a href="/"> thuyduong@gmail.com</a></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-bottom">
              <div class="container">
                  <div class="line-shape-top line-height-1">
                      <div class="row flex-md-row-reverse align-items-center">
                          <div class="col-md-6 text-center text-md-end">
                              <div class="payment-mth"><a href="/"><img class="img img-fluid" src="/payment.png" alt="payment-image"/></a></div>
                          </div>
                          <div class="col-md-6 text-center text-md-start">
                              <p class="copy-text"> © 2025 <strong>DPhone</strong> Thiết kế <i 
                                  aria-hidden="true"><FaHeart/></i> bởi <a class="company-name" href="/">
                                      <strong> Thùy Dương </strong></a>.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Footer