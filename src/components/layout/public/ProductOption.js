import React, { useEffect, useState } from 'react'
import { Product } from '../..'
import { apiGetProducts } from '../../../apis';

const ProductOption = () => {
   // Data
  const tabs = [
      { id: 1, name: 'Mới cập nhật' },
      { id: 2, name: 'Đánh giá cao' },
      { id: 3, name: 'Lượt mua cao' },
      { id: 4, name: 'Giá rẻ' }
  ];
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const [ratingProducts, setRatingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const fetchProductsRating = async () => {
    const response = await apiGetProducts({ sort: 'totalRatings', limit: 6 });
    if (response?.success) setRatingProducts(response?.data);
  };

  const fetchProductsNew = async () => {
    const response = await apiGetProducts({ sort: '-createdAt', limit: 6 });
    if (response?.success) setNewProducts(response?.data);
  };

  const fetchProductsPrice = async () => {
    const response = await apiGetProducts({ sort: 'variants.price', limit: 6 });
    if (response?.success) setCheapProducts(response?.data);
  };
  const fetchProductsSold = async () => {
    const response = await apiGetProducts({ sort: 'sold', limit: 6 });
    if (response?.success) setSoldProducts(response?.data);
  };

  useEffect(() => {
    fetchProductsRating();
    fetchProductsSold();
    fetchProductsNew();
    fetchProductsPrice();
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case 1:
        setProducts(newProducts);
        break;
      case 2:
        setProducts(ratingProducts);
        break;
      case 3:
        setProducts(soldProducts);
        break;
      case 4:
        setProducts(cheapProducts);
        break;
      default:
        setProducts(newProducts);
    }
  }, [activeTab, ratingProducts, newProducts, cheapProducts, soldProducts]);
  return (
    <div class="product-area pb-100px">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="tab-slider d-md-flex justify-content-md-between align-items-md-center">
                            <ul class="product-tab-nav nav justify-content-start align-items-center">
                                {tabs.map((el, index) => (
                                    <li key={index} class="nav-item"><button  style={{ 
                                        backgroundColor: activeTab === el.id ? '#266bf9' : '',
                                        color: activeTab === el.id ? 'white' : ''
                                     }} class="nav-link" onClick={() => setActiveTab(el?.id)}>{el?.name}</button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="tab-content mt-60px">
                            <div class="tab-pane fade show active" id="newarrivals">
                                <div class="row mb-n-30px">
                                    {products.map((el, index) => (
                                        <div class="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
                                            <Product
                                            key={index}
                                            data={{
                                                id: el?._id,
                                                thumb: el?.thumb?.url,
                                                thumb_variant: el?.variants[0]?.images[0]?.url,
                                                sku: el?.variants[0]?.sku,
                                                color:  el?.variants[0]?.color,
                                                ram: el?.variants[0]?.ram,
                                                rom: el?.variants[0]?.rom,
                                                type: el?.type,
                                                name: el?.name,
                                                category: el?.category,
                                                price: el?.variants[0]?.price,
                                                slug: el?.slug
                                            }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProductOption