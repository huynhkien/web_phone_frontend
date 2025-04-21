import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
  const data = [
    {
        image: "banner1.png",
        tittle: "Cung cấp các dòng sản phẩm mới trên thị trường",
        text: "Sở hữu các dòng điện thoại mới nhất trên thị trường"
    },
    {
        image: "banner2.png",
        tittle: "HDuong cam kết cung cấp các sản phẩm chính hãng",
        text: "Chính sách bảo hành với các sản phẩm chính hãng"
    },
    {
        image: "banner3.png",
        tittle: "Hỗ trợ giao hàng nhanh chóng trên toàn quốc",
        text: "Miễn phí giao hàng trong bán kính 10km"
    }
  ] 
  return (
    <section className='slider-area tpslider-delay secondary-sliderbg'>
      <Swiper
          navigation
          pagination={{clickable: true}}
          autoplay={true}
          loop={true}
          modules={[Autoplay, Navigation, Pagination]} 
         className='swiper-wrapper'>
            {data.map((el, index) => (
                <SwiperSlide className='swiper-slide' key={index}>
                    <div className='tpslider'>
                        <div className='container'>
                            <div className='row align-items-center'>
                                <div className='col-xxl-5 col-xl-6 col-lg-6 col-md-6 col-sm-7'>
                                    <div className='tpslider__content'>
                                    <span className='tpslider__sub-title'>Chào mừng khách hàng đến với HDuong</span>
                                    <h2 className='tpslider__title'>{el?.tittle}</h2>
                                    <p>{el?.text}</p>
                                    <div className='tpslider__btn'>
                                        <a className='btn btn-primary blog-btn' href={'/contact'}>Liên hệ</a>
                                    </div>
                                    </div>
                                </div>
                                <div className='col-xxl-7 col-xl-6 col-lg-6 col-md-6 col-sm-5'>
                                    <div className='tpslider__thumb p-relative'>
                                    <img className='tpslider__thumb-img' src={el?.image} width={600} height={500} alt='slider-bg'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
             </SwiperSlide>
            ))}
      </Swiper>
    </section>
  )
}

export default Slider