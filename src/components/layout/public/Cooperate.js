import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Cooperate = () => {
    const data = [
        {
          image: "logo1.jpg",
          
        },
        {
          image: "logo2.jpg",
        },
        {
          image: "logo3.jpg",
        },
        {
          image: "logo4.png",
        }
      ];      
  return (
    <div class="feature-area pt-100px pb-100px">
            <div class="container">
                <div class="feature-wrapper">
              <Swiper
                className="swiper-wrapper"
                slidesPerView={3} 
                spaceBetween={5}
                autoplay={{ delay: 3000 }}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img className="img-responsive"  src={item?.image} style={{width: "250px", height: "100px", borderRadius: "5px"}} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
            </div>
          </div>
  )
}

export default Cooperate