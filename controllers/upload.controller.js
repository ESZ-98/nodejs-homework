import fs from 'fs/promises';
import path from 'node:path';
import config from '../config/config.js';

const uploadFile = async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalName } = req.file;
  const fileName = path.join(config.getAvatarsPath, originalName);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: 'Plik załadowany pomyślnie', status: 200 });
};

export { uploadFile };
