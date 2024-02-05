import multer from 'multer';
import config from '../config/config.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.getTmp());
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

export { upload };
