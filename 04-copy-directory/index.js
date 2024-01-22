const fs = require('fs');
const path = require('path');

function copyDir() {
  const pathFolder = path.join(__dirname, 'files');
  const pathCopyFolder = path.join(__dirname, 'files-copy');

  fs.rm(pathCopyFolder, { recursive: true, force: true }, (error) => {
    if (error) {
      console.error(error.message);
    }

    fs.mkdir(pathCopyFolder, { recursive: true }, (error) => {
      if (error) {
        console.error(error.message);
      }
    });

    fs.readdir(pathFolder, (error, files) => {
      if (error) {
        console.log(error.message);
      } else {
        files.forEach((file) => {
          fs.copyFile(
            path.join(pathFolder, file),
            path.join(pathCopyFolder, file),
            (error) => {
              if (error) {
                console.log(error.message);
              }
            },
          );
        });
        console.log('Copy files done');
      }
    });
  });
}

copyDir();
