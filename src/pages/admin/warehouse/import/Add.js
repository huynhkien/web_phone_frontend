import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {  apiGetProducts} from '../../../../apis';
import {InputForm, Select} from "../../../../components/index"
import { useDispatch } from 'react-redux';
import {addWaveHouse} from '../../../../store/user/userSlice';
import FormProduct from './FormProduct';
const Add = ({editReceipt}) => {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await apiGetProducts();
    if(response?.success) setProducts(response?.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  // Xử lý phía sản phẩm
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find(item => item?._id === productId);
    setSelectedProduct(product);
    
    let variantsArray = [];
    if (product?.variants && product?.variants.length > 0) {
      variantsArray = product.variants;
    }
    setVariants(variantsArray);
  }

  const handleVariantChange = (event) => {
    const variantSku = event.target.value;
    const variant = variants.find(v => v.sku === variantSku);
    setSelectedVariant(variant);
    console.log(selectedVariant);
    setValue('price', variant?.price);
  }

  const handleCreate = async (data) => {
    const quantity = Number(data.quantity);
    const price = Number(data.price);
    const totalPrice = quantity * price;
    dispatch(addWaveHouse(
       {
        product: data.product,
        name: selectedProduct.name,
        thumb: selectedVariant?.images[0],
        color: selectedVariant?.color,
        ram: selectedVariant?.ram,
        rom: selectedVariant?.rom,
        sku: selectedVariant.sku,
        price: price,
        quantity: quantity,
        totalPrice: totalPrice,
       }
    ));
  
    
    fetchProducts(); 
    setVariants([]); 
    setSelectedProduct(null);
    setSelectedVariant(null);
    
    // Thông báo thành công
    toast.success("Thêm đơn hàng thành công!");
  
    // Reset form sau khi lưu trữ
    reset();
  };
  

  const quantity = watch('quantity') || 0;
  const price = watch('price') || 0;
  const totalPrice = quantity * price;
  // Lưu trạng thái kho hàng
  

  return (
    <div>
      {editReceipt ? null :
      (
        <div className="header">
        <div className="left">
          <h1>Phiếu nhập & xuất</h1>
        </div>
      </div>
      )
}
      <div className="bottom-data">
        <div className="orders">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Select
                      label='Sản phẩm'
                      options={products?.map(el => ({ code: el._id, value: el.name }))}
                      register={register}
                      id='product'
                      name='Chọn sản phẩm'
                      errors={errors}
                      validate={{ required: 'Vui lòng chọn sản phẩm' }}
                      onChange={handleProductChange}
                      className="form-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <Select
                      label='Mã sản phẩm'
                      options={variants.map(v => ({ code: v.sku, value: v.sku }))}
                      register={register}
                      id='sku'
                      name='Chọn mã sản phẩm'
                      errors={errors}
                      validate={{ required: 'Vui lòng chọn mã sản phẩm' }}
                      onChange={handleVariantChange}
                      className="form-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputForm
                      label='Giá'
                      placeholder='Giá'
                      register={register}
                      errors={errors}
                      id='price'
                      validate={{ required: 'Thông tin thiếu' }}
                      readOnly={true}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <InputForm
                      label='Số lượng'
                      type='number'
                      placeholder='Số lượng'
                      register={register}
                      errors={errors}
                      id='quantity'
                      validate={{ required: 'Thông tin thiếu' }}
                      onChange={(e) => setValue('quantity', e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <h5 className="text-end">Thành tiền: <span className="text-primary">{totalPrice.toLocaleString()} VNĐ</span></h5>
                  </div>
                  <div className="col-md-6 text-end">
                    <button type="submit" className="btn bg-primary">Thêm</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {editReceipt ?
          null
          :
          (
            <div className=' card shadow-sm my-3'>
            <div className="card-body">
              <FormProduct/>
            </div>
          </div>
          )
          }
    </div>
    </div>
    </div>
  )
}

export default Add;