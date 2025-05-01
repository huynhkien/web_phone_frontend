import { memo, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Quantity } from "../../../components/index";
import { updateCart, removeProductCart } from "../../../store/user/userSlice";
import withBaseComponents from "../../../hocs/withBaseComponents";


const CartItem = ({ dispatch, addQuantity = 1, name, pid, thumb_variant, ram, rom, color, sku, price }) => {
  const [quantity, setQuantity] = useState(addQuantity);


  const handleQuantity = (number) => {
    if (+number >= 1) setQuantity(number);
  };

  const handleChangeQuantity = (flag) => {
    if (flag === 'minus' && quantity === 1) return;
    if (flag === 'minus') setQuantity((prev) => +prev - 1);
    if (flag === 'plus') setQuantity((prev) => +prev + 1);
  };

  useEffect(() => {
    dispatch(updateCart({ pid: pid, quantity, sku }));
  }, [quantity, dispatch, pid, sku]);
  const handleRemoveCart = async(id, sku) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      dispatch(removeProductCart({
        pid: id,
        sku: sku
      }
      ))
  }
 }
  return (
    <tr>
      <td className="product-thumbnail">
          <a href="/"><img className="img-responsive ml-15px" src={thumb_variant} alt="logo" style={{width: "10vw"}} /></a>
      </td>
      <td className="product-name"><a href="/">{name}</a></td>
      <td className="product-price-cart"><span className="amount">{price?.toLocaleString()} ₫</span></td>
      <td className="product-color">{color}</td>
      <td className="product-color">{ram ? ram : "Không"}</td>
      <td className="product-color">{rom ? rom : "Không"}</td>
      <td className="product-quantity">
      <Quantity
        quantity={quantity}
        handleQuantity={handleQuantity}
        handleChangeQuantity={handleChangeQuantity}
      />
      </td>
      <td className="product-subtotal">{(price * addQuantity).toLocaleString()} ₫</td>
      <td className="product-remove">
          <span onClick={() => handleRemoveCart(pid, sku)}><i><FaTrash style={{color: "red", cursor: "pointer"}}/></i></span>
      </td>
    </tr>
  );
};

export default withBaseComponents(memo(CartItem));