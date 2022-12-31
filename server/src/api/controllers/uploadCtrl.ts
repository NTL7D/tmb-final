import { Request, Response } from "express";
import prisma from "../libs/prisma";
import path from "path";
import fs from "fs-extra";
import {
    v2 as cloudinary,
    UploadApiResponse,
    DeleteApiResponse,
} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
});

const uploadCtrl = {
    uploadImg: async (req: Request, res: Response) => {
        const img = req.file;
        try {
            if (!img) {
                return res.status(400).json("No file were uploaded");
            }
            let uploadedFile!: UploadApiResponse;
            try {
                uploadedFile = await cloudinary.uploader.upload(img.path, {
                    folder: "upload",
                    resource_type: "auto",
                });
                await fs.unlink(path.resolve(img.path));
            } catch (err: any) {
                res.status(500).json({
                    msg: err.message,
                });
            }
            const { public_id, secure_url, bytes, format } = uploadedFile;
            const upload = await prisma.image.create({
                data: {
                    publicId: String(public_id),
                    url: String(secure_url),
                    name: String(img.filename),
                    size: Number(bytes),
                    format: String(format),
                },
            });
            res.json({ upload });
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
    deleteImg: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            //find image by id
            const find = await prisma.image.findUnique({
                where: {
                    id: Number(id),
                },
            });
            let deleteImg!: DeleteApiResponse;
            try {
                deleteImg = await cloudinary.uploader.destroy(find!.publicId);
            } catch (err: any) {
                res.status(500).json({
                    msg: err.message,
                });
            }
            const deleteImg1 = await prisma.image.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json("deleted");
        } catch (err: any) {
            res.status(500).json({
                msg: err.message,
            });
        }
    },
};

export default uploadCtrl;
