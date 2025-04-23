import React from 'react'
import  {Navigate, Outlet} from 'react-router-dom';
import {SideBarAdmin, HeaderAdmin, HeaderList} from '../../components';
import { useSelector } from 'react-redux';
import '../../assets/admin.css';

const Admin = () => {
  const {current} = useSelector(state => state.user);
  if (!current) {
    return <Navigate to="/login" replace />;
  }else if(current && current?.role === 2004){
    return <Navigate to="/login" replace />;
  }
  return (
    <div className='admin-layout'>
        <HeaderList />
        <SideBarAdmin />
        <div className='layout-body'>
          <HeaderAdmin />
          <main>
            <Outlet/>
          </main>
        </div>
    </div>
  )
}

export default Admin