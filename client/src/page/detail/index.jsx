import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../../utils/item/item";
import { FacebookShareButton, FacebookIcon } from "react-share";
import "./style.scss";

function DetailPage() {
    const params = useParams();
    const [detail, setDetail] = useState([]);
    const state = useContext(GlobalState);
    const [products] = state.productAPI.product;
    const addCart = state.productAPI.addCart;
    const getProduct = async () => {
        if (params.id) {
            const res = await axios.get(`/api/products/${params.id}`);
            setDetail(res.data);
        }
    };

    useEffect(() => {
        getProduct();
    }, [params]);

    return (
        <>
            <Helmet>
                <title>{`Sản phẩm - ${detail.name}`}</title>
                <meta name='description' content={detail.desc} />
                <meta name='keywords' content={`shop, ${detail.name}`} />
                <meta
                    property='og:url'
                    content={`http:localhost:3000/product/${detail.id}`}
                />
                <meta property='og:title' content={detail.name} />
                <meta property='og:description' content={detail.desc} />
                <meta property='og:image' content={detail.image?.url} />
            </Helmet>
            <div className='detail' key={detail.id}>
                <img src={detail.image?.url} alt='' />
                <div className='box'>
                    <div className='row'>
                        <h2>{detail.name}</h2>
                    </div>
                    <h4>id: {detail.id}</h4>
                    <p>Danh mục: {detail.Category?.name}</p>
                    <p>Mô tả: {detail.desc}</p>
                    <span>Giá: {detail.price} đồng</span>
                    <p>Đã bán: {detail.sold}</p>
                    <div className='button-row'>
                        <Link
                            to='/cart'
                            className='cart'
                            onClick={() => addCart(detail)}>
                            Mua ngay
                        </Link>
                        <FacebookShareButton
                            className='facebook-share'
                            url={`http://trustmebro.site/product/${detail.id}`}
                            quote={`Share trên facebook`}>
                            {" "}
                            <FacebookIcon size={32} round />
                            <span>Chia sẻ</span>
                        </FacebookShareButton>
                    </div>
                </div>
            </div>
            <div>
                <h2>Sản phẩm liên quan:</h2>
                <div className='products'>
                    {products.map((product) => {
                        return detail.category?.name ? (
                            <ProductItem key={product.id} product={product} />
                        ) : null;
                    })}
                </div>
            </div>
        </>
    );
}

export default DetailPage;
