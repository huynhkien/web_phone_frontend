import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { apiGetProducts } from '../../../apis';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../store/user/userSlice';

const FeaturedProduct = () => {
  const [ratingProducts, setRatingProducts] = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);
  const dispatch = useDispatch();
  const fetchProductsRating = async () => {
      const response = await apiGetProducts({ sort: 'totalRatings', limit: 1 });
      if (response?.success) setRatingProducts(response?.data);
  };
  const fetchProductsPrice = async () => {
      const response = await apiGetProducts({ sort: 'price', limit: 2 });
      if (response?.success) setCheapProducts(response?.data);
    };
  useEffect(() => {
      fetchProductsRating();
      fetchProductsPrice();
  }, []);
  const handleAddCart = (id, sku, category, color, ram, rom, thumb_variant, price, name, type ) => {
      const quantity = 1; 
      dispatch(addToCart({
              pid: id,
              sku: sku,
              category: category,
              color: color,
              quantity,
              ram: ram,
              rom: rom,
              thumb_variant: thumb_variant,
              price: price,
              name: name,
              type: type
            }));
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
    };
  return (
    <div className="feature-product-area pt-100px pb-100px">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h2 className="title">Sản Phẩm Nổi Bật</h2>
                            <p>Các sản phẩm luôn được cập nhật mới</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-md-35px mb-lm-35px" style={{height: "50vw", borderRadius: "5px"}} >
                        {ratingProducts.map((el, index) => (
                            <div className="single-feature-content" key={index}>
                                <div className="feature-image">
                                    <img src={el?.thumb?.url} alt={el?.name} style={{height: "100%", borderRadius: "5px"}}/>
                                </div>
                                <div className="top-content">
                                    <h4 className="title"><a href="single-product.html">{el?.name} </a></h4>
                                    <span className="price">
                                        <span className="new">{el?.variants[0].price.toLocaleString()} VNĐ</span>
                                    </span>
                                    
                                </div>
                                <div>
                                <div className="product-feature text-center my-3">
                                    <ul>
                                        <li>Thương hiệu : <span>{el?.category}</span></li>
                                        <li>Danh mục : <span>{el?.type}</span></li>
                                        <li>Nguồn gốc : <span>{el?.origin}</span></li>
                                        <li>Trạng thái : <span>{el?.status}</span></li>
                                        <li>Màu sắc : <span>{el?.variants[0]?.color}</span></li>
                                    </ul>
                               </div>
                                <div className="bottom-content">
                                    <div className="deal-timing">
                                        <div data-countdown="2023/09/15"></div>
                                    </div>
                                    <span onClick={() => handleAddCart(el?._id, el?.variants[0].sku, el?.category, el?.variants[0].color, el?.variants[0].ram, el?.variants[0].rom, el?.variants[0].images[0].url, el?.variants[0]?.price, el?.name, el?.type)} className="btn btn-primary  m-auto"> Mua hàng </span>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        {cheapProducts.map((el, index) => (
                            <div className="feature-right-content mb-4">
                                <div className="image-side">
                                    <img src={el?.thumb?.url} alt={el?.name} style={{height: "100%", borderRadius: "5px"}}/> 
                                    <button title="Thêm vào giỏ hàng" onClick={() => handleAddCart(el?._id, el?.variants[0].sku, el?.category, el?.variants[0].color, el?.variants[0].ram, el?.variants[0].rom, el?.variants[0].images[0].url, el?.variants[0]?.price, el?.name, el?.type)} className="action add-to-cart" data-bs-toggle="modal" data-bs-target="#exampleModal-Cart"><i
                                        ><CiShoppingCart/></i></button>
                                </div>
                                <div className="content-side">
                                    <div className="prize-content">
                                        <h5 className="title"><a href={`/detail/${el?.slug}`}>{el?.name}</a></h5>
                                        <span className="price">
                                            <span className="new">{el?.variants[0].price.toLocaleString()} VNĐ</span>
                                        </span>
                                    </div>
                                    <div className="product-feature">
                                        <ul>
                                            <li>Thương hiệu : <span>{el?.category}</span></li>
                                            <li>Danh mục : <span>{el?.type}</span></li>
                                            <li>Nguồn gốc : <span>{el?.origin}</span></li>
                                            <li>Trạng thái : <span>{el?.status}</span></li>
                                            <li>Màu sắc : <span>{el?.variants[0]?.color}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                       
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FeaturedProduct