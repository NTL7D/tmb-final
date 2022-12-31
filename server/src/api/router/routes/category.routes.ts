import { Router } from "express";
import cateCtrl from "../../controllers/cateCtrl";
import auth from "../../middleware/auth";
import adminAuth from "../../middleware/admin";

export const cateRouter = Router();

cateRouter
    .route("/")
    .get(cateCtrl.allCate)
    .post(auth, adminAuth, cateCtrl.createCate);
cateRouter
    .route("/:id")
    .get(cateCtrl.getById)
    .put(auth, adminAuth, cateCtrl.updateCate)
    .delete(auth, adminAuth, cateCtrl.deleteCate);
