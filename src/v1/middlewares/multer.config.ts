import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";
import { MulterParams } from "../interfaces/multer-param.interface";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    if (!req['multerParams']) {
      return cb(new Error(), '')
    }
    const {folder} = (req as any).multerParams as MulterParams;
    req.body.folder = folder(file);
    if (!fs.existsSync(req.body.folder)) {
      fs.mkdirSync(req.body.folder, {
        recursive: true
      });
    }
    cb(null, req.body.folder);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    req.body.file = ((req as any).multerParams as MulterParams)?.file(file);
    req.body.path = path.join(req.body.folder, req.body.file);
    cb(null, req.body.file);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file) {
    return cb(null, false);
  }  
  if (!req['multerParams']) {
    return cb(null, false);
  }
  const {filter} = (req as any).multerParams as MulterParams;
  if (filter) {
    const { allow, error } = filter(file); 
    if (allow) {
      cb(null, true);
    } else {
      cb(error);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
