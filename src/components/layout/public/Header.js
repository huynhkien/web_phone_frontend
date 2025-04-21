import React from 'react';
import { CiSearch, CiHeart, CiShoppingCart, CiMenuBurger  } from "react-icons/ci";


const Header = () => {
  return (
    <header>
        <div class="header-top">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col">
                        <div class="welcome-text">
                            <p>Miễn phí hoàn trả và vận chuyển trên toàn quốc</p>
                        </div>
                    </div>
                    <div class="col d-none d-lg-block">
                        <div class="top-nav">
                            <ul>
                                <li><a href="tel:0123456789"><i class="fa fa-phone"></i> +012 3456 789</a></li>
                                <li><a href="mailto:demo@example.com"><i class="fa fa-envelope-o"></i> thuyduong@gmail.com</a></li>
                                <li><a href="my-account.html"><i class="fa fa-user"></i> Tài khoản</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom  d-none d-lg-block">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-3 col">
                        <div class="header-logo">
                            <a href="index.html"><img src="logo.png"alt="Logo" /></a>
                        </div>
                    </div>
                    <div class="col-lg-6 d-none d-lg-block">
                        <div class="search-element">
                            <form action="#">
                                <input type="text" placeholder="Tìm kiếm..." />
                                <button><i><CiSearch/></i></button>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-3 col">
                        <div class="header-actions">
                            <a href="#offcanvas-wishlist" class="header-action-btn offcanvas-toggle">
                                <i><CiHeart/></i>
                            </a>
                            <a href="#offcanvas-cart" class="header-action-btn header-action-btn-cart offcanvas-toggle pr-0">
                                <i><CiShoppingCart/></i>
                                <span class="header-action-num">01</span>
                            </a>
                            <a href="#offcanvas-mobile-menu" class="header-action-btn header-action-btn-menu offcanvas-toggle d-lg-none">
                                <i><CiMenuBurger/></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bottom d-lg-none sticky-nav style-1">
            <div class="container">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-3 col">
                        <div class="header-logo">
                            <a href="/"><img src="logo.png" alt="Site Logo" /></a>
                        </div>
                    </div>
                    <div class="col-lg-6 d-none d-lg-block">
                        <div class="search-element">
                            <form action="#">
                                <input type="text" placeholder="Search" />
                                <button><i><CiSearch/></i></button>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-3 col">
                        <div class="header-actions">
                            <a href="#offcanvas-wishlist" class="header-action-btn offcanvas-toggle">
                                <i><CiHeart/></i>
                            </a>
                            <a href="#offcanvas-cart" class="header-action-btn header-action-btn-cart offcanvas-toggle pr-0">
                                <i><CiShoppingCart/></i>
                                <span class="header-action-num">01</span>
                            </a>
                            <a href="#offcanvas-mobile-menu" class="header-action-btn header-action-btn-menu offcanvas-toggle d-lg-none">
                                <i><CiMenuBurger/></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-nav-area d-none d-lg-block sticky-nav">
                <div class="header-nav">
                    <div class="main-menu position-relative">
                        <ul>
                            <li class="dropdown"><a href="/">Trang Chủ <i class="fa fa-angle-down"></i></a></li>
                            <li class="dropdown position-static"><a href="#">Danh mục <i
                                class="fa fa-angle-down"></i></a>
                                <ul class="mega-menu d-block">
                                    <li class="d-flex">
                                        <ul class="d-block">
                                            <li class="title"><a href="#">Điện thoại</a></li>
                                            <li><a href="shop-3-column.html">Shop 3 Column</a></li>
                                            <li><a href="shop-4-column.html">Shop 4 Column</a></li>
                                            <li><a href="shop-left-sidebar.html">Shop Left Sidebar</a></li>
                                            <li><a href="shop-right-sidebar.html">Shop Right Sidebar</a></li>
                                            <li><a href="shop-list-left-sidebar.html">Shop List Left Sidebar</a>
                                            </li>
                                            <li><a href="shop-list-right-sidebar.html">Shop List Right Sidebar</a>
                                            </li>
                                        </ul>
                                        <ul class="d-block">
                                            <li class="title"><a href="#">Linh kiện điện tử</a></li>
                                            <li><a href="single-product.html">Product Single</a></li>
                                            <li><a href="single-product-variable.html">Product Variable</a></li>
                                            <li><a href="single-product-affiliate.html">Product Affiliate</a></li>
                                            <li><a href="single-product-group.html">Product Group</a></li>
                                            <li><a href="single-product-tabstyle-2.html">Product Tab 2</a></li>
                                            <li><a href="single-product-tabstyle-3.html">Product Tab 3</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="/">Bài Viết</a></li>
                            <li><a href="/">Giới Thiệu</a></li>
                            <li><a href="/">Liên Hệ</a></li>
                        </ul>
                    </div>
                </div>
        </div>
        <div class="mobile-search-box d-lg-none">
            <div class="container">
                <div class="search-element max-width-100">
                    <form action="#">
                        <input type="text" placeholder="Search" />
                        <button><i><CiSearch/></i></button>
                    </form>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header