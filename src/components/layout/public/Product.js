import React, { useState } from 'react'
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, addToWishList, removeFromWishList } from '../../../store/user/userSlice';
import Swal from 'sweetalert2';
import { apiUpdateWishList } from '../../../apis';


const Product = ({data}) => {
  const {current, currentCart} = useSelector(state => state.user);
  console.log(currentCart);
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(false);
  const handleAddCart = () => {
    const quantity = 1; 
    dispatch(addToCart({
            pid: data.id,
            sku: data?.sku,
            category: data?.category,
            color: data.color,
            quantity,
            ram: data?.ram,
            rom: data?.rom,
            thumb_variant: data.thumb_variant,
            price: data.price,
            name: data.name,
            type: data.type
          }));
          toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
  };
  const handleAddWishList = async () => {
    if (!current) {
      return Swal.fire({
        text: 'Vui lòng đăng nhập',
        icon: 'info',
        cancelButtonText: 'Không phải bây giờ!',
        showCancelButton: true,
        confirmButtonText: 'Chuyển đến trang đăng nhập'
      }).then((rs) => {
        if (rs.isConfirmed) navigate('/login');
      });
    }

    try {
      const response = await apiUpdateWishList(data.id, heart ? 'remove' : 'add');
      if (response.success) {
        setHeart(!heart);
        if (heart) {
          dispatch(removeFromWishList(data.id));
          toast.success(response.mes);
        } else {
          dispatch(addToWishList(data.id));
          toast.success(response.mes);
        }
      } else {
        toast.error(response.mes);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };
  return (
    <div class="product">
        <div class="thumb">
            <a href={`/detail/${data?.slug}`} class="image">
                <img src={data?.thumb} alt="Product" />
                <img class="hover-image" src={data?.thumb_variant} alt="Product" />
            </a>
        </div>
        <div class="content">
            <span class="category mt-2"><a href={`/categories/${data?.category}`}>{data?.category}</a></span>
            <h5 class="title text-center"><a href={`/detail/${data?.slug}`}>{data?.name}
                </a>
            </h5>
            <span class="price">
                <span class="new">{data?.price?.toLocaleString()} VNĐ</span>
            </span>
        </div>
        <div class="actions">
            <button onClick={handleAddCart} title="Thêm vào giỏ hàng" class="action add-to-cart" data-bs-toggle="modal" data-bs-target="#exampleModal-Cart"><i
                ><CiShoppingCart/></i></button>
            <button onClick={handleAddWishList}  class="action wishlist" title="Thêm yêu thích" data-bs-toggle="modal" data-bs-target="#exampleModal-Wishlist"><i
                    ><CiHeart/></i></button>
            <button class="action quickview" title="Xem chi tiết" data-bs-toggle="modal" data-bs-target="#exampleModal"><i><FaEye/></i></button>
        </div>
    </div>
  )
}

export default Product