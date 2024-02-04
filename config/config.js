import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAvatarsPath = () => {
  return path.join(__dirname, '..', 'public', 'avatars');
};

const getPath = () => {
  return path.join(__dirname, '..', 'public');
};

const getTmp = () => {
  return path.join(__dirname, '../', 'tmp');
};

export default { getAvatarsPath, getPath, getTmp };
