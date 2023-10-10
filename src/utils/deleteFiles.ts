import fs from 'fs';
import path from 'path';

export const deleteFiles = (folderPath: string) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    // Iterate through the list of files and delete each one
    files.forEach(file => {
      const filePath = path.join(folderPath, file);

      // Use fs.unlink to delete the file
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          console.log(`File ${file} deleted successfully.`);
        }
      });
    });
  });
};
