import React, { useEffect, useState } from 'react'
import { Breadcrumb, CartItem} from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { removeProductCart, updateCart } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiGetProducts } from '../../apis/product';
import path from '../../utils/path';

const Cart = () => {
    const { currentCart, isLogin, current } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const calculateTotal = (cart) => {
      return cart.reduce((sum, el) => sum + el?.price * el?.quantity, 0);
    };

    const handleLogin = async() => {
      if(isLogin && current){
         navigate('/checkout');
      }else{
         return Swal.fire({
            text: 'Vui lòng đăng nhập',
            icon: 'info',
            cancelButtonText: 'Không phải bây giờ',
            showCancelButton: true,
            confirmButtonText: 'Chuyển đến trang đăng nhập'
         }).then((rs) => {
            if(rs.isConfirmed) navigate('/login')
         })
      }
    }

    useEffect(() => {
        const validateCartQuantity = async () => {
        const response = await apiGetProducts();
        if (response.success) {
            const invalidItems = currentCart.filter(cartItem => {
            const product = response.data.find(p => p._id === cartItem.pid);
    
            return (
                product &&
                (
                product.variants.some(variant =>
                    variant.sku === cartItem.sku && cartItem.quantity > variant.quantity
                )
                )
            );
            });
    
            if (invalidItems.length > 0) {
            const productNames = invalidItems.map(item => item.name).join(', ');
            Swal.fire({
                title: `Sản phẩm sau có số lượng vượt quá số lượng trong kho: ${productNames}`,
                text: 'Xin vui lòng kiểm tra lại giỏ hàng!',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            }
        }
        };
    
        validateCartQuantity();
    }, [currentCart]);


    return (
    <>
        <Breadcrumb title="Giỏ Hàng"/>
        <div className="cart-main-area pt-100px pb-100px">
            <div className="container">
                <h3 className="cart-page-title">Giỏ hàng</h3>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <form action="#">
                            <div className="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hình ảnh</th>
                                            <th>Tên</th>
                                            <th>Giá</th>
                                            <th>Màu sắc</th>
                                            <th>Ram</th>
                                            <th>Rom</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCart.length > 0 ?
                                        (
                                            <>
                                            {currentCart.map((el, index) => (
                                                <CartItem
                                                    name={el?.name}
                                                    addQuantity={el?.quantity}
                                                    sku={el?.sku}
                                                    thumb_variant={el?.thumb_variant}
                                                    price={el?.price}
                                                    color={el?.color}
                                                    ram={el?.ram}
                                                    rom={el?.rom}
                                                />
                                            ))}
                                        </>    
                                        )
                                        :
                                        (
                                            <div style={{padding: "10px"}}>
                                            Giỏ hàng trống
                                            </div>
                                        )
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-shiping-update-wrapper">
                                        <div className="cart-shiping-update">
                                            <a href={`/${path.HOME}`}>Tiếp tục mua sắm</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-lm-30px">
                            </div>
                            <div className="col-lg-4 col-md-6 mb-lm-30px">
                            </div>
                            <div className="col-lg-4 col-md-12 mt-md-30px">
                                <div className="grand-totall">
                                    <div className="title-wrap">
                                        <h4 className="cart-bottom-title section-bg-gary-cart">Tổng giỏ hàng</h4>
                                    </div>
                                    <h5>Tổng sản phẩm <span>{calculateTotal(currentCart).toLocaleString()} VNĐ</span></h5>
                                    <h4 className="grand-totall-title">Tổng cộng <span>{calculateTotal(currentCart).toLocaleString()} ₫</span></h4>
                                    <a href="#" onClick={handleLogin}>Tiến hành thanh toán</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Cart