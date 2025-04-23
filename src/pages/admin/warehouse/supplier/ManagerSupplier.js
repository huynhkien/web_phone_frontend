import { useEffect, useState } from 'react';
import { apiGetSuppliers, apiDeleteCategory, apiDeleteSupplier } from "../../../../apis";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import {AddSupplier, EditCategory, EditSupplier} from '../../../index';


const Page = () => {
  const [editSupplier, setEditSupplier] = useState(null);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchSuppliers = async () => {
    const response = await apiGetSuppliers();
    if (response.success) setSuppliers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);
  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <button onClick={() => setEditSupplier(rowData._id)} className="text-primary">
          <FaEdit style={{fontSize: "25px"}}/>
        </button>
        <span className='mx-2'></span>
        <button 
          onClick={() => handleDelete(rowData._id)} 
          className="text-danger"
        >
          <FaTrash style={{fontSize: "25px"}}/>
        </button>
      </div>
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn vị này?')) {
      const response = await apiDeleteSupplier(id);
      if (response.success) {
        toast.success(response.message);
        setLoading(true); 
        fetchSuppliers();
      } else {
        toast.error(response.message);
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
      {editSupplier && (
                <>
                <div className="modal-overlay"></div>
                <div className='dialog shadow'>
                    <EditSupplier
                      editSupplier={editSupplier}
                      setEditSupplier={setEditSupplier}
                      onUpdateSuccess={fetchSuppliers}
                    />
                </div>
                </>
            )}
            {
              showAddSupplier && 
              <>
              <div className="modal-overlay"></div>
              <div className='dialog shadow'>
                <AddSupplier
                  showSupplier={showAddSupplier}
                  setShowSupplier={setShowAddSupplier}
                  onSuccessAdd={fetchSuppliers}
                />
              </div>
              </>
            }
      <div className="header">
        <div className="left">
          <h1>Đơn vị cung cấp</h1>
        </div>
      </div>
      <div className="bottom-data">
        <div className="orders">
          <span  className="btn bg-primary" style={{ marginBottom: '20px' }} onClick={() => setShowAddSupplier(true)}>
            <i><FaPlus/></i> Thêm đơn vị cung cấp
          </span>
          <DataTable 
            value={suppliers} 
            paginator 
            rows={10} 
            dataKey="id" 
            loading={loading} 
            emptyMessage="No suppliers found."
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable field="name" header="Tên công ty" />
            {!isSmallScreen && <Column sortable field="email" header="Email" />}
            <Column sortable field="address" header="Địa chỉ" />
            {!isSmallScreen && <Column sortable field="phone" header="Số điện thại" />}
            <Column body={actionBodyTemplate} header="Action" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Page;
