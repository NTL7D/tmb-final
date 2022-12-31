import { Router } from "express";
import uploadCtrl from "../../controllers/uploadCtrl";
import { upload } from "../../libs/multer";
import auth from "../../middleware/auth";
import adminAuth from "../../middleware/admin";

export const uploadRouter = Router();

uploadRouter.post(
    "/",
    auth,
    adminAuth,
    upload.single("image"),
    uploadCtrl.uploadImg
);

uploadRouter.delete("/:id", auth, adminAuth, uploadCtrl.deleteImg);
