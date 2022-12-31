import React, { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    async function getUser() {
        try {
            const res = await axios.get("/api/user/info", {
                headers: {
                    Authorization: token,
                },
            });
            setIsLoggedIn(true);
            if (res.data.user.role === "ADMIN") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            const cart = await axios.get(`/api/cart/${res.data.user.id}`, {
                headers: { Authorization: token },
            });
            setCart(cart.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLoggedIn) {
            return alert("Đăng nhập rồi hẳn mua, nha");
        }

        const check = cart.every((item) => {
            return item.id !== product.id;
        });

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);
            await axios.post(
                "/api/cart",
                {
                    cart: [...cart, { ...product, quantity: 1 }],
                },
                { headers: { Authorization: token } }
            );
            const res = await axios.get(`/api/cart/`);
        } else {
            alert("Hàng mua rồi, quên hả má?");
        }
    };

    return {
        isLogin: [isLoggedIn, setIsLoggedIn],
        isAdmin: [isAdmin, setIsAdmin],
        addCart: addCart,
        cart: [cart, setCart],
    };
}

export default UserAPI;
