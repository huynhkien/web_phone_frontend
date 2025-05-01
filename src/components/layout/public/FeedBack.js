import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const FeedBack = () => {
    const data = [
        {
          name: "Nguyễn Văn A",
          review: "Dịch vụ rất tốt, đội ngũ hỗ trợ nhiệt tình và phản hồi nhanh chóng. Tôi rất hài lòng!"
        },
        {
          name: "Trần Thị B",
          review: "Sản phẩm chất lượng, đúng như mô tả. Giao hàng nhanh và đóng gói cẩn thận."
        },
        {
          name: "Lê Văn C",
          review: "Tôi đã sử dụng dịch vụ nhiều lần và lần nào cũng rất ưng ý. Sẽ tiếp tục ủng hộ."
        },
        {
          name: "Phạm Thị D",
          review: "Giá cả hợp lý, chất lượng vượt mong đợi. Nhân viên tư vấn rất dễ thương."
        }
      ];      
  return (
    <div className="trstimonial-area pt-100px pb-100px">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center m-0">
                <h2 className="title">Phản hồi từ khách hàng</h2>
                <p>Chúng tôi đã nhận được rất nhiều phản hồi tích cực từ khách hàng của mình</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="swiper-container content-top slider-nav-style-1">
              <Swiper
                className="swiper-wrapper"
                slidesPerView={2} 
                spaceBetween={5}
                autoplay={{ delay: 3000 }}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="testi-inner">
                      <div className="testi-content">
                        <p>{item.review}</p>
                      </div>
                      <div className="testi-author">
                        <div className="author-image">
                          <img className="img-responsive"  src="banner1.png" style={{width: "100px", borderRadius: "100px"}} alt="" />
                        </div>
                        <div className="author-name">
                          <h4 className="name">{item.name}<span>Client</span></h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedBack