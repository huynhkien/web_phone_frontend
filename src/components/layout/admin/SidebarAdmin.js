import React, { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { FaProductHunt, FaUser, FaCartArrowDown, FaWarehouse, FaTruck, FaFileInvoice, FaComment  } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { FaUsersLine } from "react-icons/fa6";
import { useSelector } from 'react-redux';
const SidebarAdmin = () => {
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const {current} = useSelector(state => state.user);


  const toggleWarehouse = () => {
    setIsWarehouseOpen(!isWarehouseOpen);
  };

  return (
    <div className="sidebar">
        <div className="logo-name"><a href={'/admin'}><img src="/logo.png" alt="Payment Methods" width={200}/></a></div>
      <ul className="side-menu">
        <li><a href={`/admin/manager-category`}><BiCategory  /><span>Thương Hiệu</span></a></li>
        <li><a href={`/admin/manager-product`}><FaProductHunt/><span>Sản phẩm</span></a></li>
        <li><a href={`/admin/graph`}><FcStatistics/><span>Thống kê</span></a></li>
        <li><a href='/'><CiShop /><span>Shop</span></a></li>
        <li><a href={`/admin/manager-user`}><FaUser/><span>Khách hàng</span></a></li>
        <li><a href={`/admin/manager-order`}><FaCartArrowDown/><span>Đơn hàng</span></a></li>
        <li>
          <span onClick={toggleWarehouse} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaWarehouse/><span>Kho</span>
            <MdKeyboardArrowDown style={{ marginLeft: 'auto', transform: isWarehouseOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
          </span>
        </li>
        <li><a href={`/admin/manager-comment`}><FaComment/><span>Bình luận</span></a></li>
        {current?.role === '2002' &&
        <li><a href={`/admin/manager-role`}><FaUsersLine/><span>Phân quyền</span></a></li>
        }
      </ul>
      {isWarehouseOpen && (
            <ul className="side-menu-warehouse shadow" >
              <li><a href={`/admin/manager-supplier`}><FaTruck /><span>Nhà cung cấp</span></a></li>
              <li><a href={`/admin/manager-import`}><FaFileInvoice /><span>Phiếu nhập & nhập</span></a></li>
            </ul>
          )}
    </div>
  );
}

export default SidebarAdmin;