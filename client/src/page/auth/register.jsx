import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "./style.scss";

function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        name: "",
        password: "",
    });

    const onChangeSubmit = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/user/signup", { ...user });

            localStorage.setItem("firstlogin", true);

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg);
        }
    };
    return (
        <>
            <Helmet>
                <title>TrustMeBro - đăng ký</title>
            </Helmet>
            <div className='page'>
                <h2>Đăng ký</h2>
                <form onSubmit={submitHandler}>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='email'
                        value={user.email}
                        onChange={onChangeSubmit}
                    />
                    <input
                        type='text'
                        name='name'
                        required
                        placeholder='name'
                        value={user.name}
                        onChange={onChangeSubmit}
                    />
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='mật khẩu'
                        value={user.password}
                        onChange={onChangeSubmit}
                        autoComplete='current password'
                    />
                    <div className='row'>
                        <button type='submit'>Đăng ký</button>
                        <Link to='/signin'>Đăng nhập</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
