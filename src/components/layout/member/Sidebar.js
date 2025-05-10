import { useState, useEffect } from 'react';
import { CiBoxList, CiUser } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import path from '../../../utils/path';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const {current} = useSelector(state => state.user);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="h-100" style={{ height: "100vh" }}>
      <button 
        className="d-md-none position-fixed"
        style={{ top: '15px', left: '15px', zIndex: 1100 }}
        onClick={toggleSidebar}
      >
        <CiBoxList />
      </button>
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 900 }}
          onClick={toggleSidebar}
        ></div>
      )}
      <div 
        className={`sidebar position-fixed h-100 d-flex flex-column ${isOpen ? 'sidebar-active' : ''}`}
        style={{ 
          width: '280px', 
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          background: "linear-gradient(to bottom, #266bf9, black)",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="m-0 text-white">Thông tin</h5>
          <button 
            className="d-md-none"
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="sidebar-menu mt-3 flex-grow-1">
          <a href={`/${path.PROFILE}`} className="menu-item d-flex align-items-center text-decoration-none p-3 text-white">
            <span>Thông tin cá nhân</span>
          </a>
          
          <a href={`/${path.WISHLIST}`} className="menu-item d-flex align-items-center text-decoration-none p-3 text-white">
            <span>Sản phẩm yêu thích</span>
          </a>
          
          <a href={`/${path.ORDER}`} className="menu-item d-flex align-items-center text-decoration-none p-3 text-white">
            <span>Thông tin đơn hàng</span>
          </a>
          <a href="/" className="menu-item d-flex align-items-center text-decoration-none p-3 text-white">
            <span>Trang chủ</span>
          </a>
          {current?.role === "2002" && (
            <a href={`/${path.ADMIN}`} className="menu-item d-flex align-items-center text-decoration-none p-3 text-white">
            <span>Trang quản lý</span>
          </a>
          )}
        </div>
        <div className="mt-auto border-top p-3 text-white">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center bg-blue bg-opacity-10 rounded-circle" style={{ width: '40px', height: '40px' }}>
              <FaUser/>
            </div>
            <div className="ms-3">
              <div className="fw-medium">{current?.role === "2004" ? "Người dùng" : "Quản lý"}</div>
              <div className="small">{current?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}