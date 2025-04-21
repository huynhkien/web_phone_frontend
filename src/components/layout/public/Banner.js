import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const Banner = () => {
  return (
    <div class="banner-area style-one pt-100px pb-100px">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="single-banner nth-child-1">
                        <img src="banner7.png" alt=""/>
                        <div class="banner-content nth-child-1">
                            <h3 class="title">Đồng Hồ Thông Minh</h3>
                            <span class="category">Giá chỉ từ 550.000 VNĐ</span>
                            <a href="/" class="shop-link"><i aria-hidden="true"><FaArrowRight />
                            </i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="single-banner nth-child-2 mb-30px mb-lm-30px mt-lm-30px ">
                        <img src="banner5.png" alt=""/>
                        <div class="banner-content nth-child-2">
                            <h3 class="title">Tai Nghe</h3>
                            <span class="category">Giá chỉ từ 150.000 VNĐ</span>
                            <a href="/" class="shop-link"><i aria-hidden="true"><FaArrowRight />
                            </i></a>
                        </div>
                    </div>
                    <div class="single-banner nth-child-2">
                        <img src="banner6.png" alt=""/>
                        <div class="banner-content nth-child-3">
                            <h3 class="title">Điện thoại thông minh</h3>
                            <span class="category">Giá chỉ từ 2.500.000 VNĐ</span>
                            <a href="/" class="shop-link"><i aria-hidden="true"><FaArrowRight />
                            </i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner