const fs = require('fs');
const path = require('path');

const pathBundleOfStyles = path.join(__dirname, 'project-dist', 'bundle.css');

fs.rm(pathBundleOfStyles, { recursive: true, force: true }, (error) => {
  if (error) {
    console.error(error.message);
  }

  const pathStylesFolder = path.join(__dirname, 'styles');

  fs.readdir(pathStylesFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error.message);
    } else {
      const filterFiles = files.filter(
        (file) => path.extname(file.name) === '.css' && file.isFile(),
      );

      filterFiles.forEach((item) => {
        const readStream = fs.createReadStream(
          path.join(pathStylesFolder, item.name),
          'utf-8',
        );
        const writeStream = fs.createWriteStream(pathBundleOfStyles, {
          flags: 'a',
        });
        readStream.pipe(writeStream);
      })
    }
  });
});