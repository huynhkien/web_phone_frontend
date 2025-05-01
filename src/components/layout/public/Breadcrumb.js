import React from 'react'

const Breadcrumb = ({title}) => {
  return (
    <div class="breadcrumb-area" style={{backgroundImage: 'url("/Background1.jpg")'}}>
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-12 text-center">
                    <h2 class="breadcrumb-title text-white">{title}</h2>
                    <ul class="breadcrumb-list">
                        <li class="breadcrumb-item" ><a href="/" style={{color: "white"}}>Trang chủ</a></li>
                        <li class="breadcrumb-item active">{title}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Breadcrumb