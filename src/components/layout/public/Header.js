import React, { useEffect, useState } from 'react';
import { CiSearch, CiShoppingCart, CiMenuBurger  } from "react-icons/ci";
import path from '../../../utils/path';
import { apiGetCategory } from '../../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { logout } from '../../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { SearchItem } from '../../index';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const {current, currentCart} = useSelector(state => state.user);
  const fetchCategories = async () => {
    const response = await apiGetCategory();
    if(response?.success) setCategories(response?.data)
  }
  useEffect(() => {
    fetchCategories();
  },[]);
  const handleLogout = () => {
    dispatch(logout());  
    navigate('/'); 
  };

  return (
    <header>
        <div className="header-top">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col">
                        <div className="welcome-text">
                            <p>Miễn phí hoàn trả và vận chuyển trên toàn quốc</p>
                        </div>
                    </div>
                    <div className="col d-none d-lg-block">
                        <div className="top-nav">
                            <ul>
                                <li><a href="/"><i className="fa fa-phone"></i> +012 3456 789</a></li>
                                <li><a href="/"><i className="fa fa-envelope-o"></i> thuyduong@gmail.com</a></li>
                                <li><a href={path.LOGIN}><i className="fa fa-user"></i> Tài khoản</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-bottom  d-none d-lg-block">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-3 col">
                        <div className="header-logo">
                            <a href="/"><img src="/logo.png"alt="Logo" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="search-element">
                           <SearchItem/>
                        </div>
                    </div>
                    <div className="col-lg-3 col">
                        <div className="header-actions">
                            <a href={`/${path.CART}`} className="header-action-btn header-action-btn-cart offcanvas-toggle pr-0">
                                <i><CiShoppingCart/></i>
                                <span className="header-action-num">{currentCart?.length > 0 ? currentCart?.length : '0' }</span>
                            </a>
                            {current && (
                                <>
                                <a href={`/${path.PROFILE}`} className="header-action-btn offcanvas-toggle">
                                    <i><FaRegUserCircle />
                                    </i>
                                </a>
                                <span onClick={handleLogout} className="header-action-btn offcanvas-toggle">
                                    <i><IoIosLogOut /></i>
                                </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-bottom d-lg-none sticky-nav style-1">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-3 col">
                        <div className="header-logo">
                            <a href="/"><img src="logo.png" alt="Site Logo" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="search-element">
                            <SearchItem/>
                        </div>
                    </div>
                    <div className="col-lg-3 col">
                        <div className="header-actions">
                        <a href={`/${path.CART}`} className="header-action-btn header-action-btn-cart offcanvas-toggle pr-0">
                                <i><CiShoppingCart/></i>
                                <span className="header-action-num">{currentCart?.length > 0 ? currentCart?.length : '0' }</span>
                            </a>
                            {current && (
                                <>
                                <a href={`/${path.PROFILE}`} className="header-action-btn offcanvas-toggle">
                                    <i><FaRegUserCircle />
                                    </i>
                                </a>
                                <span onClick={handleLogout} className="header-action-btn offcanvas-toggle">
                                    <i><IoIosLogOut /></i>
                                </span>
                                </>
                            )}
                            <a href="#offcanvas-mobile-menu" className="header-action-btn header-action-btn-menu offcanvas-toggle d-lg-none">
                                <i><CiMenuBurger/></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-nav-area d-none d-lg-block sticky-nav">
                <div className="header-nav">
                    <div className="main-menu position-relative">
                        <ul>
                            <li className="dropdown"><a href="/">Trang Chủ <i className="fa fa-angle-down"></i></a></li>
                            <li className="dropdown position-static"><a href="#">Danh mục <i
                                className="fa fa-angle-down"></i></a>
                                <ul className="mega-menu d-block">
                                    <li className="d-flex">
                                        <ul>
                                            {categories?.map((el, index) => (
                                                <li key={index} className="title">
                                                  <a href={`/categories/${el?.name}`}>
                                                    {el?.name}
                                                  </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href={`/${path.ABOUT}`}>Giới Thiệu</a></li>
                            <li><a href={`/${path.CONTACT}`}>Liên Hệ</a></li>
                        </ul>
                    </div>
                </div>
        </div>
        <div className="mobile-search-box d-lg-none">
            <div className="container">
                <div className="search-element max-width-100">
                    <SearchItem/>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header