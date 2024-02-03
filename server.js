import { app } from './app.js';
import config from './config/config.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
  createFolderIsNotExist(config.getAvatarsPath);
  createFolderIsNotExist(config.getTmp);
});
