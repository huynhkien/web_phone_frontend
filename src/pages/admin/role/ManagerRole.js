import React from 'react'
import { useEffect, useState } from 'react';
import { apiDeleteUser, apiGetUsers} from '../../../apis';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EditRole } from '../../index';


const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchUsers = async () => {
    const response = await apiGetUsers();
    if (response.success) setUsers(response.userData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const filterRole = users
  ?.filter(el => el?.role === '2002' || el?.role === '2006')
  ?.filter(item => {
    const searchText = globalFilter.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.toLowerCase().includes(searchText) ||
      item.address.toLowerCase().includes(searchText) ||
      (item.role === '2002' && 'Quản lý'.includes(searchText)) ||
      (item.role === '2006' && 'Nhân viên'.includes(searchText))
    );
  });


  const actionBodyTemplate = (rowData) => {
    return (
      <div>
        <span className='text-primary' onClick={() => setEditUser(rowData?._id)}>
          <FaEdit style={{fontSize: "25px"}}/>
        </span>
        <span className='mx-2'></span>
        <button 
          onClick={() => handleDelete(rowData._id)} 
          className='text-danger'
        >
          <FaTrash style={{fontSize: "25px"}}/>
        </button>
      </div>
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      const response = await apiDeleteUser(id);

      if (response.success) {
        toast.success('Xóa người dùng thành công');
        setLoading(true); 
        fetchUsers();
      } else {
        toast.error('Xóa người dùng không thành công');
      }
    }
  };

  const roleBodyTemplate = (rowData) => {
    return rowData.role === '2002' ? 'Quản lý' : 'Nhân viên ';
  };
  const header = (
    <div className='p-inputgroup flex-1 my-2'>
        <InputText type='text' placeholder='Tìm kiếm' className='p-inputtext p-component p-2' onChange={(e) => setGlobalFilter(e.target.value)} />
    </div>
  );

  return (
    <div>
      {editUser && (
        <>
        <div className="modal-overlay"></div>
        <div className='dialog shadow'>
            <EditRole
            editUser={editUser}
            setEditUser={setEditUser}
            render={fetchUsers}
            />
        </div>
        </>
      )}
      <div className='header'>
        <div className='left'>
          <h1>Phân quyền</h1>
        </div>
      </div>
      <div className='bottom-data'>
        <div className='orders'>
        <a href={'/admin/manager-role/add-role'} className="btn bg-primary" style={{ marginBottom: '30px' }}>
            <i><FaPlus/></i> Thêm quyền
          </a>
          <DataTable 
            value={filterRole} 
            paginator 
            rows={10} 
            dataKey='id' 
            loading={loading} 
            emptyMessage='No users found.'
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable field='name' header='Khách hàng' />
            {!isSmallScreen && <Column sortable field='email' header='Email' />}
            {!isSmallScreen && <Column sortable field='phone' header='Số điện thoại' />}
            {!isSmallScreen && <Column sortable field='address' header='Địa chỉ' />}
            <Column sortable field='role' header='Vai trò' body={roleBodyTemplate} />
            <Column body={actionBodyTemplate} header='Action' />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Page;
