import { useEffect, useState } from 'react';
import { apiGetProduct, apiUpdateWishList } from "../../apis";  
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux'; 
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';  
import { addToCart, removeFromWishList } from '../../store/user/userSlice';  
import {  CiSquarePlus } from 'react-icons/ci';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');

  const { current } = useSelector(state => state.user);
  const dispatch = useDispatch(); 

  const fetchProduct = async (id) => {
    const response = await apiGetProduct(id);
    return response.success ? response.data : null;
  };
  const handleAddCart = (rowData) => {
      const quantity = 1; 
      dispatch(addToCart({
              pid: rowData._id,
              sku: rowData?.sku,
              category: rowData?.category,
              color: rowData.variants[0]?.color,
              quantity,
              ram: rowData?.variants[0]?.ram,
              rom: rowData?.variants[0]?.rom,
              thumb_variant: rowData?.variants[0]?.images[0].url,
              price: rowData.variants[0]?.price,
              name: rowData.name,
              type: rowData.type
            }));
            toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
    };

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (current?.wishlist?.length) {
        const productPromises = current.wishlist.map(id => fetchProduct(id));
        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter(product => product !== null));
      }
      setLoading(false);
    };

    fetchWishlistProducts();
  }, [current?.wishlist]);

  const handleDelete = async (productId) => {
    const response = await apiUpdateWishList(productId, 'remove');
    if (response.success) {
      dispatch(removeFromWishList(productId));
      setProducts(products.filter(product => product._id !== productId));
      toast.success(response.mes);
    } else {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <button 
          onClick={() => handleDelete(rowData._id)} 
          className="text-danger"
        >
          <FaTrash style={{fontSize: "20px"}}/>
        </button>
      </div>
    );
  };
  const actionAddCart = (rowData) => {
    return (
      <div>
        <button 
          onClick={() => handleAddCart(rowData)} 
          className="text-primary"
        >
          <CiSquarePlus  style={{fontSize: "25px"}}/>
        </button>
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return <a href={`/detail/${rowData?.slug}`}><img src={rowData?.variants[0]?.images[0]?.url} alt={rowData?.name} width={50} height={50} /></a>;
  };
  const colorBodyTemplate = (rowData) => {
    return rowData?.variants?.[0]?.color || 'Không có';
  };
  const nameBodyTemplate = (rowData) => {
    return <a style={{color:'black'}} href={`/detail/${rowData?.slug}`}>{rowData?.name}</a>;
  };

  const header = (
    <div className="p-inputgroup flex-1 my-2">
      <InputText
        type="text"
        placeholder="Tìm kiếm"
        className="p-inputtext p-component p-2"
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );

  return (
      <div className="bottom-data">
        <div className="orders">
          <DataTable
            value={products}
            paginator
            rows={10}
            dataKey="_id"
            loading={loading}
            emptyMessage="Không có sản phẩm nào."
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable body={nameBodyTemplate} header="Tên" />
            <Column sortable body={imageBodyTemplate} header="Hình ảnh" />
            <Column sortable field="category" header="Danh mục" />
            <Column sortable field="origin" header="Nguồn gốc" />
            <Column sortable body={colorBodyTemplate} header="Màu sắc" />
            <Column sortable body={actionAddCart} header="Thêm vào giỏ hàng" />
            <Column sortable body={actionBodyTemplate} header="Hủy yêu thích" />
          </DataTable>
        </div>
      </div>
  );
};

export default Wishlist;