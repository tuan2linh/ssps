import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const fileFilter = (req, file, cb) => {
  const fileTypes = /pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/;
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Only pdf/word files are allowed!';
    cb(new Error('Chỉ cho phép tải lên file PDF và Word!'), false);
  }
};
