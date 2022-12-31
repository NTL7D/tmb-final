import {
    HomePage,
    LoginPage,
    RegisterPage,
    DetailPage,
    CartPage,
    ErrorPage,
} from "../page";

const pageRoutes = [
    { path: "/", component: HomePage },
    { path: "/signin", component: LoginPage },
    { path: "/signup", component: RegisterPage },
    { path: "/product/:id", component: DetailPage },
    { path: "/cart", component: CartPage },
    { path: "*", component: ErrorPage },
];

export default pageRoutes;
