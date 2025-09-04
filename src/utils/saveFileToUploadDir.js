import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  const destinationDir = path.join(UPLOAD_DIR, 'thumb');

  await fs.mkdir(destinationDir, { recursive: true });

  const destinationPath = path.join(destinationDir, file.filename);

  await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), destinationPath);

  return destinationPath;
};
