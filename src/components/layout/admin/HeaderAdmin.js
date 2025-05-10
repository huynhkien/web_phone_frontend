import React from 'react';
import { logout } from '../../../store/user/userSlice';
import withBaseComponents from '../../../hocs/withBaseComponents';
import { IoIosLogOut } from "react-icons/io";

const HeaderAdmin = ({dispatch, navigate}) => {
  const handleLogout = () => {
    dispatch(logout());  
    navigate('/'); 
  };
  return (
    <nav>
      <span style={{cursor: 'pointer'}} onClick={() => handleLogout()}><IoIosLogOut /></span>
    </nav>
    
  );
}

export default withBaseComponents(HeaderAdmin);
