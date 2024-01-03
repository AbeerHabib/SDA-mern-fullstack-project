import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const productStorage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!file.mimetype.startsWith("image/")) {
    console.log('Only image files are allowed')
    return cb(new Error('Only image files are allowed'))
  }
  if (!allowedTypes.includes(file.mimetype)) {
    console.log('Only these images type are allowed (png, jpg, jpeg)')
    return cb(new Error('Only these image types are allowed (png, jpg, jpeg)'))
  }
  cb(null, true);
}

export const upload = multer({ storage: productStorage, limits: { fileSize: 1024 * 1024 * 1 }, fileFilter: fileFilter });