import app from './app.js';
import config from './config/config.js';

const PORT = process.env.PORT || 4000;

app.app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
  app.createFolderIsNotExist(config.getAvatarsPath());
  app.createFolderIsNotExist(config.getTmp());
});
