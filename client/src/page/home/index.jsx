import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Helmet } from "react-helmet-async";
import ProductItem from "../../utils/item/item";
import Loading from "../../utils/loading";

import "./style.scss";
const HomePage = () => {
    const state = useContext(GlobalState);
    const [products] = state.productAPI.product;
    const [isAdmin] = state.userAPI.isAdmin;
    console.log(state);
    return (
        <>
            <Helmet>
                <title>TrustMeBro - Trang chủ</title>
            </Helmet>

            <div className='products'>
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product.id}
                            product={product}
                            isadmin={isAdmin}
                        />
                    );
                })}
            </div>
            {products.length === 0 && <Loading />}
        </>
    );
};

export default HomePage;
