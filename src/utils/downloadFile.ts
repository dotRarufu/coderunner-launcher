import fs from 'fs';
import https from 'https';

export const downloadFile = (url: string, path: string) => {
  // URL of the image
  // const url = 'GFG.jpeg';
  console.log('url:', url);
  console.log('path:', path);
  https.get(url, res => {
    // Image will be stored at this path
    // const path = `${__dirname}/files/img.jpeg`;
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      console.log('Download Completed');
    });
  });
};
