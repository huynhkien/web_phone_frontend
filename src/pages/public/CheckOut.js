import React, { useEffect, useState } from 'react'
import { Breadcrumb, InputForm, Paypal } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateCurrent } from '../../apis';
import { toast } from 'react-toastify';
import { getCurrent } from '../../store/user/asyncActions';
import { useForm } from 'react-hook-form';

const CheckOut = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const  [isSuccess, setIsSuccess] = useState(false);
  const {  current, currentCart } = useSelector(state => state.user);
  console.log(currentCart);
  const calculateTotal = (cart) => {
    return cart.reduce((sum, el) => sum + el?.price * el?.quantity, 0);
  };
  const total = calculateTotal(currentCart) / 23.500;
  const round = Math.round(total);
  useEffect(() => {
    if(isSuccess) dispatch(getCurrent())
  },[])

  useEffect(() => {
      if (current) {
        setValue("name", current?.name);
        setValue("email", current?.email);
        setValue("address", current?.address);
        setValue("phone", current?.phone);
      }
    },[setValue, current]);
  const handleUpdate = async (data) => {
          const response = await apiUpdateCurrent(data);
          if (response.success) {
              toast.success(response?.updateUser);
              dispatch(getCurrent()); 
          } else {
              toast.error(response?.data?.updateUser);
          }
  };
  return (
    <>
    <Breadcrumb title="Thanh toán"/>
    <div class="checkout-area pt-100px pb-100px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5">
                        <form class="billing-info-wrap" onSubmit={handleSubmit(handleUpdate)}>
                            <h3>Thông tin chi tiết</h3>
                            <div class="row">
                                <div class="col-lg-12">
                                    <InputForm
                                        label='Tên:'
                                        placeholder='Tên'
                                        register={register}
                                        id='name'
                                        errors={errors}
                                        validate={{ required: 'Thông tin thiếu' }}
                                    />
                                </div>
                                <div class="col-lg-12">
                                    <InputForm
                                        label='Email:'
                                        placeholder='Email'
                                        register={register}
                                        id='email'
                                        errors={errors}
                                        validate={{ required: 'Thông tin thiếu' }}
                                    />
                                </div>
                                <div class="col-lg-12">
                                    <InputForm
                                        label='Địa chỉ:'
                                        placeholder='Địa chỉ'
                                        register={register}
                                        id='address'
                                        errors={errors}
                                        validate={{ required: 'Thông tin thiếu' }}
                                    />
                                </div>
                                <div class="col-lg-12">
                                    <InputForm
                                        label='Số điện thoại:'
                                        placeholder='Số điện thoại'
                                        register={register}
                                        id='phone'
                                        errors={errors}
                                        validate={{
                                            required: 'Thông tin thiếu',
                                            pattern: {
                                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                                message: 'Số điện thoại không hợp lệ'
                                            }
                                        }}
                                    />
                                </div>
                                <div class="col-lg-12 mt-4">
                                    <button type="submit" className="bg-primary w-100 p-2 text-white">Cập nhật</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-7 mt-md-30px mt-lm-30px ">
                        <div class="your-order-area">
                            <h3>Đơn hàng</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-product-info">
                                    <table class="table table-striped table-hover">
                                        <thead class="table-dark">
                                            <tr>
                                                <th class="product-name">Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Giá</th>
                                                <th class="product-total">Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCart?.map((el) => (
                                            <tr class="cart_item" key={el?._id || el?.name + el?.variant}>
                                                <td class="product-name fw-bold">
                                                    {el?.name}
                                                </td>
                                                <td class="product-quantity">
                                                    <span class="badge bg-primary rounded-pill">{el?.quantity}</span>
                                                </td>
                                                <td class="product-price">
                                                    <span class="amount">{(el?.price).toLocaleString()}</span>
                                                </td>
                                                <td class="product-total fw-bold text-success">
                                                    <span class="amount">{(el?.price * el?.quantity).toLocaleString()}</span>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                        <div class="your-order-total">
                                            <ul>
                                                <li class="order-total">Tổng tiền</li>
                                                <li>{calculateTotal(currentCart).toLocaleString()} VNĐ</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="payment-method">
                                        <div class="payment-accordion element-mrg">
                                            <div id="faq" class="panel-group">
                                                <div class="panel panel-default single-my-account m-0">
                                                <Paypal amount={round}
                                                        payload={{products: currentCart, total: total, orderBy: current?._id }}
                                                        setIsSuccess={setIsSuccess}
                                                />
                                                </div>
                                            </div>
                                        </div>
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

export default CheckOut