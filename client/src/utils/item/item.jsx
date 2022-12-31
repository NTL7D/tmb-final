import React from "react";
import { Helmet } from "react-helmet-async";
import BtnRender from "./btnRender";
import "./style.scss";
const ProductItem = ({ product, isadmin }) => {
    return (
        <div className='card' key={product.id}>
            {isadmin && <input type='checkbox' checked={product.checked} />}
            <img src={product.image.url} alt='' />
            <div className='card-box'>
                <h2 title={product.name}>{product.name}</h2>
                <span>{product.price} đồng</span>
                <p>{product.desc}</p>
            </div>
            <BtnRender product={product} />
        </div>
    );
};

export default ProductItem;
