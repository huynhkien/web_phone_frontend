import { useEffect, useState } from 'react';
import { apiGetCategory, apiDeleteCategory } from "../../../apis";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import {EditCategory} from '../../index';


const ManagerCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  const fetchCategories = async () => {
    const response = await apiGetCategory();
    if (response.success) setCategories(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image?.url} alt={rowData.name} style={{width: "100px", height: "50px"}} />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <span onClick={() => setEditCategory(rowData._id)} className="text-primary">
          <FaEdit style={{fontSize: "25px"}}/>
        </span>
        <span className='mx-2'></span>
        <span
          onClick={() => handleDelete(rowData._id)} 
          className="text-danger"
        >
          <FaTrash style={{fontSize: "25px"}}/>
        </span>
      </div>
    );
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      const response = await apiDeleteCategory(categoryId);

      if (response.success) {
        toast.success('Xóa danh mục thành công');
        setLoading(true); 
        fetchCategories(); 
      } else {
        toast.error('Xóa danh mục không thành công');
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
      {editCategory && (
        <>
          <div className="modal-overlay"></div>
          <div className='dialog shadow'>
              <EditCategory  
                editCategory={editCategory}
                setEditCategory={setEditCategory}
                fetchCategories={fetchCategories}
              />
          </div>
        </>
            )}
      <div className="header">
        <div className="left">
          <h1>Danh mục</h1>
        </div>
      </div>
      <div className="bottom-data">
        <div className="orders">
          <a href={`/admin/manager-category/add-category`} className="btn bg-primary" style={{ marginBottom: '20px' }}>
            <i ><FaPlus/></i> Thêm danh mục
          </a>
          <DataTable
            value={categories} 
            paginator 
            rows={10} 
            dataKey="id" 
            loading={loading} 
            emptyMessage="Không có danh mục."
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable field="name" header="Tên" />
            {!isSmallScreen && <Column sortable body={imageBodyTemplate} header="Hình ảnh" />}
            <Column sortable field="description" header="Mô tả" />
            <Column body={actionBodyTemplate} header="Thao tác" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ManagerCategory;
