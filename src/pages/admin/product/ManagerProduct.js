import React from 'react'
import { useEffect, useState } from 'react';
import { apiGetProducts, apiDeleteProduct } from "../../../apis";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { toast } from 'react-toastify';
import { EditProduct, Variant } from '../../index';
const ManagerProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [updateProduct, setUpdateProduct] =useState(null);
  const [addVariant, setAddVariant] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchProducts = async () => {
    const response = await apiGetProducts();
    if (response?.success) setProducts(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.thumb?.url} alt={rowData.name} width={50} height={50} />;
  };
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <span onClick={() => setUpdateProduct(rowData._id)} className="text-primary">
          <FaEdit style={{fontSize: "25px"}}/>
        </span>
        <span className='mx-1'></span>
        <span 
          onClick={() => handleDelete(rowData._id)} 
          className="text-danger"
        >
          <FaTrash style={{fontSize: "25px"}}/>
        </span>
      </div>
    );
  };
  const variantBodyTemplate = (rowData) => {
    return (
      <div>
        <span onClick={() => setAddVariant(rowData._id)} className="text-primary">
          <AiFillFileAdd style={{fontSize: "25px"}}/>
        </span>
      </div>
    );
  };
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const response = await apiDeleteProduct(id);

      if (response.success) {
        toast.success(response.mes);
        setLoading(true); 
        fetchProducts();
      } else {
        toast.error(response.mes);
      }
    }
  };

  const header = (
    <div className="p-inputgroup flex-1 my-2">
        <InputText type="text" placeholder="Tìm kiếm" className="p-inputtext p-component p-2" onChange={(e) => setGlobalFilter(e.target.value)} />
    </div>
  );

  return (
    <div>
        {
          updateProduct && 
          <>
            <div className="modal-overlay"></div>
            <div className='dialog shadow'>
              <EditProduct
                updateProduct={updateProduct}
                setUpdateProduct={setUpdateProduct}
                fetchProducts={fetchProducts}
              />
            </div>
          </>
        }
        {
          addVariant && 
          <>
            <div className="modal-overlay"></div>
            <div className='dialog shadow'>
              <Variant
                addVariant={addVariant}
                setAddVariant={setAddVariant}
                render={fetchProducts}
              />
            </div>
          </>
        }
      <div className="header">
        <div className="left">
          <h1>Sản phẩm</h1>
        </div>
      </div>
      <div className="bottom-data">
        <div className="orders">
          <a href={'/admin/manager-product/add-product'} className="btn bg-primary" style={{ marginBottom: '20px' }}>
            <i><FaPlus/> </i>Thêm sản phẩm
          </a>
          <DataTable 
            value={products} 
            paginator 
            rows={5} 
            dataKey="id" 
            loading={loading} 
            emptyMessage="Không có sản phẩm."
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable field="name" header="Tên" />
            {!isSmallScreen && <Column body={imageBodyTemplate} header="Hình ảnh" sortable />}
            <Column sortable field="category" header="Thương Hiệu" />
            {!isSmallScreen && <Column sortable field="origin" header="Nguồn gốc" />}
            {!isSmallScreen && <Column sortable field="status" header="Tình trạng" />}
            {!isSmallScreen && <Column sortable field="warranty" header="Bảo hành" />}
            <Column body={variantBodyTemplate} header="Thêm biến thể" />
            <Column body={actionBodyTemplate} header="Action" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ManagerProduct;
