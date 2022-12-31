import { Router } from "express";
import auth from "../../middleware/auth";
import adminAuth from "../../middleware/admin";
import productCtrl from "../../controllers/productCtrl";

export const productRouter = Router();

productRouter
    .route("/")
    .get(productCtrl.getProduct)
    .post(auth, adminAuth, productCtrl.createProduct);
productRouter
    .route("/:id")
    .get(productCtrl.getById)
    .put(auth, adminAuth, productCtrl.updateProduct)
    .delete(auth, adminAuth, productCtrl.deleteProduct);
