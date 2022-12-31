import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

import "./style.scss";
function CartPage() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    console.log(state);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((total, item) => {
                return total + item.item[0].price * item.item[0].quantity;
            }, 0);

            setTotal(total);
        };
        getTotal();
    }, [cart]);

    const increment = async (id) => {
        cart.forEach(async (item) => {
            if (item.item[0].id === id) {
                item.item[0].quantity++;
            }
        });
        setCart([...cart]);
    };

    const decrement = (id) => {
        cart.forEach(async (item) => {
            if (item.item[0].id === id) {
                item.item[0].quantity--;
            }
        });
        setCart([...cart]);
        CartAmount();
    };

    const removeProduct = (id) => {
        if (window.confirm("Bạn chắc chưa?")) {
            cart.forEach((item, index) => {
                if (item.item[0].id === id) {
                    cart.splice(index, 1);
                }
            });

            setCart([...cart]);
            CartAmount();
        }
    };

    if (cart.length === 0) {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 3fr)",
                    gridTemplateRows: "repeat(5, 3fr)",
                }}>
                <div style={{ gridArea: "2 / 2 / 4 / 5" }}>
                    <h2 style={{ fontSize: "3rem", textAlign: "center" }}>
                        Cái giỏ trống trơn
                    </h2>
                    <Link
                        to='/'
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                        }}>
                        <h3
                            style={{
                                textAlign: "center",
                                background: "#555",
                                padding: "5px",
                                maxWidth: "400px",
                                width: "100%",
                                textDecoration: "none",
                                color: "#fff",
                            }}>
                            Quay lại
                        </h3>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Helmet>
                <title>TrustMeBro - giỏ hàng</title>
            </Helmet>
            {cart.map((c, index) => {
                return (
                    <div className='cart-box' key={index}>
                        <img
                            src={c.item[0].product?.image.url}
                            alt=''
                            className='img-container'
                        />
                        <div className='box-detail'>
                            <h2>{c.item[0].product.name}</h2>
                            <h3>{c.item[0].price * c.item[0].quantity} đồng</h3>
                            <p>{c.item[0].product.desc}</p>
                            <div className='cart-amount'>
                                <button onClick={() => increment(c.item[0].id)}>
                                    +
                                </button>
                                <span>{c.item[0].quantity}</span>
                                <button onClick={() => decrement(c.item[0].id)}>
                                    -
                                </button>
                            </div>
                            <div
                                className='cart-delete'
                                onClick={() => removeProduct(c.item[0].id)}>
                                x
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='cart-total'>
                <h3>Tổng: {total} đồng</h3>
                <div className='paypal'>
                    <PayPalScriptProvider
                        options={{
                            "client-id":
                                "ATDoxYaYdI3gx_hdLLzRG5zA0UMTbbVfgQ4o8TB2aduKtx1jxxkQ-bi47Wyr-JGU0dD_7CAk8-pzctkT",
                        }}>
                        <PayPalButtons
                            createOrder={(_data, action) => {
                                return action.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "2000.00",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (_data, action) => {
                                const details = await action.order.capture();
                                // This function shows a transaction success message to your buyer.
                                console.log(details);
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
