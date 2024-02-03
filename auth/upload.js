import multer from 'multer';
import config from '../config/config';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, config.getTmp);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalName);
  },
});

const upload = multer({
  storage,
});

export { upload };
