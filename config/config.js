import path from 'node:path';

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
