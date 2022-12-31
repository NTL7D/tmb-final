import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
//icons
import { FiMenu } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
//
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";

const Header = () => {
    const state = useContext(GlobalState);
    const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLogin;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutHandler = async () => {
        await axios.get("/api/user/signout");
        localStorage.clear();
        setIsAdmin(false);
        setIsLoggedIn(false);
        window.location.reload();
    };

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to='/create'>Tạo sản phẩm</Link>
                </li>
                <li>
                    <Link to='/category'>Danh mục</Link>
                </li>
            </>
        );
    };
    const loginRouter = () => {
        return (
            <>
                <li>
                    <Link to='/history'>Lịch sử</Link>
                </li>
                <li>
                    <Link to='/' onClick={logoutHandler}>
                        Đăng xuất
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header className='navbar'>
            <div className='menu'>
                <FiMenu size={30} />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'>{isAdmin ? "ADMIN" : "SHOP"}</Link>
                </h1>
            </div>
            <ul>
                <li>
                    <Link to='/'>{isAdmin ? "Sản phẩm" : "Shop"}</Link>
                </li>
                {isAdmin && adminRouter()}
                {isLoggedIn ? (
                    loginRouter()
                ) : (
                    <li>
                        <Link to='/signin'>Đăng nhập | Đăng ký</Link>
                    </li>
                )}

                <li>
                    <GrFormClose className='menu' size={30} />
                </li>
            </ul>
            {isAdmin ? (
                ""
            ) : (
                <div className='cart'>
                    <span>{cart?.length}</span>
                    <Link to='/cart'>
                        <FaShoppingCart size={30} />
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
