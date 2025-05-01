import React, { useEffect, useState } from 'react';
import { apiGetOrderByUser, apiUpdateStatus } from "../../apis";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FaList } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { toast } from 'react-toastify';
import moment from 'moment';
import { Badge } from 'primereact/badge';
import { FaCheckCircle } from "react-icons/fa";
import { OrderDetailUser } from '../index';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [orderId, setOrderId] = useState(null);
 
  const fetchOrders = async () => {
    const response = await apiGetOrderByUser();
    if (response.success) {
      setOrders(response.message);
    } else {
      toast.error('Không thể lấy danh sách đơn hàng');
    }
    setLoading(false);
  };

  const updateOrderStatus = async (oid, status) => {
    if (status === 'Cancelled' && window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này?')) {
      const response = await apiUpdateStatus(oid, {status: status});
      if (response.success) {
        toast.success(response.message);
        fetchOrders();
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await apiUpdateStatus(oid, {status: status});
      if (response.success) {
        toast.success(response.message);
        fetchOrders();
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='position-relative'>
        <button onClick={() => setOrderId(rowData?._id)} className="text-primary my-2">
          <BiDetail />
        </button>
        <span className='mx-2'></span>
        <button
          onClick={() => setShowOption(prev => prev === rowData?._id ? null : rowData?._id)}
          className="text-primary"
        >
          <FaList/>
        </button>
        {showOption === rowData?._id && (rowData?.status === 'Processing' || rowData?.status === 'Confirm') &&
        (
          <div className='show--item__order shadow'>
           { 
           rowData?.status === 'Processing' && 
             <button
              onClick={() => updateOrderStatus(rowData?._id, 'Cancelled')}
              className="text-danger"
              >
              Hủy đơn hàng
            </button> 
           }
            {rowData?.status === 'Confirm' &&
              <button
                onClick={() => updateOrderStatus(rowData?._id, 'Succeed')}
                className="btn btn-xs btn-success"
                >
                <FaCheckCircle />
              </button>
             }
          </div>
        ) }
      </div>
    );
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
  };

  const format = (money) => {
    return (
      <div>
        {(money * 23500).toLocaleString()} VNĐ
      </div>
    );
  };

  const formatStatus = (status) => {
    const statusConfig = {
      'Cancelled': { value: 'Đã hủy đơn', severity: 'danger' },
      'Processing': { value: 'Đang xử lý', severity: 'warning' },
      'Delivering': { value: 'Đang giao', severity: 'info' },
      'Succeed': { value: 'Đã nhận hàng', severity: 'success' },
      'Confirm': { value: 'Xác nhận đơn', severity: 'info' },
      'Received': { value: 'Đã nhận hàng', severity: 'success' }
    };
  
    const config = statusConfig[status] || { value: 'Không xác định', severity: 'secondary' };
  
    return <Badge value={config.value} severity={config.severity}></Badge>;
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
    <div>
        {orderId && (
                <>
                  <div className="modal-overlay"></div>
                  <div className='dialog shadow'>
                      <OrderDetailUser  
                        orderId={orderId}
                        setOrderId={setOrderId}
                      />
                  </div>
                </>
      )}
      <div className="user-order__bottom">
        <div className="bottom--table">
          <DataTable
            value={orders}
            paginator
            rows={10}
            dataKey="_id"
            loading={loading}
            emptyMessage="Không có đơn hàng nào."
            header={header}
            globalFilter={globalFilter}
          >
            <Column sortable field="_id" header="Mã đơn hàng" />
            <Column sortable body={(rowData) => formatStatus(rowData.status)} header="Trạng thái" />
            <Column body={(rowData) => formatDate(rowData.createdAt)} header="Ngày tạo" />
            <Column sortable body={(rowData) => format(rowData.total)} header="Tổng tiền" />
            <Column body={actionBodyTemplate} header="Thao tác"/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Order;