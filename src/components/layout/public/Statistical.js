import React from 'react'
import CountUp from "react-countup";

const Statistical = () => {
  const data = [
      { value: 15425, label: "Đơn Hàng" },
      { value: 950, label: "Khách Thân Thiết" },
      { value: 120, label: "Nhân Viên" },
      { value: 15, label: "Kinh Nghiệm" },
  ];
  return (
    <div 
        className="bg-dark w-100" 
        style={{
          minHeight: '500px',
          height: 'auto',
          backgroundImage: 'url("Background2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div 
          className="position-absolute w-100 h-100" 
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            top: 0,
            left: 0
          }}
        ></div>
        
        <div className="container position-relative text-light py-4 py-md-5 h-100 d-flex flex-column justify-content-between">
          <div className="mt-2 mt-md-4">
            <h1 className="display-6 display-md-5 fw-bold mb-3 mb-md-4 text-white">
              Chúng tôi cung cấp cho khách hàng<br className="d-none d-md-block"/>
              nhiều dòng điện thoại cao cấp<br className="d-none d-md-block"/>
              phục vụ cho mọi nhu cầu.
            </h1>
          </div>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 g-md-4 mb-3 mb-md-4">
            {data.map((el) => (
                <div className="col">
                <div className="bg-dark bg-opacity-75 p-3 p-md-4 text-center rounded h-100">
                <h2 className="text-success fw-bold fs-2"><CountUp start={0} end={el?.value} duration={2.5} separator="," /></h2>
                <p className="mb-0">{el?.label}</p>
                </div>
            </div>
            ))} 
          </div>
        </div>
    </div>
  )
}

export default Statistical