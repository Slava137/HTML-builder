const path = require('path');
const fs = require('fs');

const pathForFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathForFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error.message);
  } else {
    files.forEach((item) => {
      if (item.isFile()) {
        fs.stat(path.join(pathForFolder, item.name), (error, stats) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log(
              `${path.basename(item.name, path.extname(item.name))} - ${path
                .extname(item.name)
                .slice(1)} - ${stats.size / 1024}kb`,
            );
          }
        });
      }
    });
  }
});
