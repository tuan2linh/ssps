import multer from 'multer';
import { storage, fileFilter } from '../middlewares/uploadFile.js';
import uploadFile from '../models/uploadFile.model.js';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

export const uploadFileController = async (req, res) => {
  let upload = multer({ storage: storage, fileFilter: fileFilter }).array('file');

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send('Please select a file to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    const files = req.files;
    files.forEach(async (file) => {
      const dataBuffer = fs.readFileSync('uploads/' + file.originalname);
      const data = await PDFDocument.load(dataBuffer);
      const newFile = await uploadFile.create({
        user: req.user._id,
        fileName: file.originalname,
        path: file.path,
        fileType: file.mimetype,
        pageSize: file.size,
        pageCount: data.getPages().length
      });
    });
    res.json(files);
  });
};

export const getUploadedFiles = async (req, res) => {
  try {
    const files = await uploadFile.find({ user: req.user._id });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUpoadedFiles = async (req, res) => {
  try {
    const files = await uploadFile.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
