import React, { memo } from 'react'

const Quantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div className='product-quantity bg-secondary rounded d-flex align-items-center justify-content-center'>
        <span onClick={() => handleChangeQuantity('minus')} className='cart-minus'>-</span>
        <input 
           type='text'
           className='cart-input bg-secondary'
           value={quantity}
           onChange={e => handleQuantity(e.target.value)}>
            
        </input>
        <span onClick={() => handleChangeQuantity('plus')} className='cart-plus'>+</span>
    </div>
  )
}

export default memo(Quantity);