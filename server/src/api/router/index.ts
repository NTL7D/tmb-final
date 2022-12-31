import { Router } from "express";
import { userRouter as user } from "./routes/user.routes";
import { uploadRouter as upload } from "./routes/upload.routes";
import { cateRouter as category } from "./routes/category.routes";
import { productRouter as product } from "./routes/product.routes";
import { cartRouter as cart } from "./routes/cart.routes";
import { paymentRouter as payment } from "./routes/payment.routes";
const router = Router();

router.use("/user", user);
router.use("/upload", upload);
router.use("/category", category);
router.use("/products", product);
router.use("/cart", cart);
router.use("/payment", payment);

export default router;
