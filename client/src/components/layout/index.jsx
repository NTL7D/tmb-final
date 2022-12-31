import React from "react";
import Header from "../header";
import { LiveChatWidget } from "@livechat/widget-react";

function DefaultLayout({ children }) {
    return (
        <div className='App'>
            <Header />
            {children}
            <LiveChatWidget license='14884422' />
        </div>
    );
}

export default DefaultLayout;
