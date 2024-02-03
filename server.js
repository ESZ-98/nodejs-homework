import { app } from './app.js';
import fs from 'node:fs.promises';
import config from './config/config.js'

const PORT = process.env.PORT || 4000;

const isAccessible = async folder => {
  try {
    await fs.access(folder);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, {
      recursive: true,
    });
  } else {
    console.log('Directories are already created');
  }
};

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
    createFolderIsNotExist(config.getAvatarsPath);
    createFolderIsNotExist(config.getTmp);
});
