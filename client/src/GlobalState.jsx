import React, { useState, useEffect, createContext } from "react";
import ProductAPI from "./api/productAPI";
import UserAPI from "./api/userAPI";
import axios from "axios";

export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);
    const refreshToken = async () => {
        const res = await axios.get("/api/user/refreshtoken");
        setToken(res.data?.accesstoken);
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstlogin");
        if (firstLogin) {
            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
    };
    return (
        <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
    );
};
