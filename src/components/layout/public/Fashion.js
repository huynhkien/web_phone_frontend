import React from 'react';

const Fashion = () => {
  return (
    <div
      className="fashion-area"
      style={{ backgroundImage: 'url("Background1.jpg")' }}
    >
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 text-center">
            <h2 className="title">
              <span>HDuong</span> Chuyên Cung Cấp Các Dòng sản phẩm chất lượng
            </h2>
            <a
              href="shop-left-sidebar.html"
              className="btn btn-primary text-capitalize m-auto"
            >
              Liên Hệ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion;
