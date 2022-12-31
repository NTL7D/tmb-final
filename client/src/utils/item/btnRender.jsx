import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
function BtnRender({ product }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;
    return (
        <div className='group-btn'>
            {isAdmin ? (
                <>
                    <Link id='buy-btn' to='#!'>
                        Xoá
                    </Link>
                    <Link id='view-btn' to={`/edit/${product.id}`}>
                        Chỉnh sửa
                    </Link>
                </>
            ) : (
                <>
                    <Link id='buy-btn' to='#!' onClick={() => addCart(product)}>
                        Mua
                    </Link>
                    <Link id='view-btn' to={`/product/${product.id}`}>
                        Xem thêm
                    </Link>
                </>
            )}
        </div>
    );
}

export default BtnRender;
