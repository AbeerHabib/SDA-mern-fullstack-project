import fs from 'fs';

import { dev } from '../config';

export const deleteImage = async (imagePath: string) => {
  try {
    if (imagePath !== dev.app.defaultProductImage) {
      await fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete the image file:', err);
        }
        else {
          console.log('Image is deleted from the server successfully!');
        }
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}