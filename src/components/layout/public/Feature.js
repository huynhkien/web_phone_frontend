import React from 'react'

const Feature = () => {
    const data = [
        {image: "1.png", title: "Miễn phí ship", text: "Miễn phí ship trong phạm vi 10km"},
        {image: "2.png", title: "Thanh toán", text: "Hỗ trợ trả góp trong vòng 12 tháng"},
        {image: "3.png", title: "Hỗ trợ đổi trả", text: "Đổi trả với các sản phẩm lỗi"},
    ]
  return (
    <div class="feature-area pt-100px ">
            <div class="container">
                <div class="feature-wrapper">
                    {data.map((el, index) => (
                        <div class="single-feture-col mb-md-30px mb-lm-30px" key={index}>
                            <div class="single-feature">
                                <div class="feature-icon">
                                    <img src={el?.image} alt=""/>
                                </div>
                                <div class="feature-content">
                                    <h4 class="title">{el?.title}</h4>
                                    <span class="sub-title">{el?.text}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Feature