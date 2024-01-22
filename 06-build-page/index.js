const fs = require('fs');
const { rm, mkdir, readdir, copyFile, readFile, writeFile } = fs.promises;
const path = require('path');

async function copyDir(pathFolder, pathCopyFolder) {
  try {
    await rm(pathCopyFolder, { recursive: true, force: true });
    await mkdir(pathCopyFolder, { recursive: true });

    for (let file of await readdir(pathFolder, { withFileTypes: true })) {
      if (file.isFile()) {
        copyFile(
          path.join(pathFolder, `/${file.name}`),
          path.join(pathCopyFolder, `/${file.name}`),
        );
      } else {
        copyDir(
          path.join(pathFolder, `/${file.name}`),
          path.join(pathCopyFolder, `/${file.name}`),
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function buildStyles(pathBundleOfStyles) {
  try {
    const pathStylesFolder = path.join(__dirname, 'styles');
    const files = await readdir(pathStylesFolder, { withFileTypes: true });

    for (const file of files) {
      if (path.extname(file.name) === '.css' && file.isFile()) {
        const readStream = fs.createReadStream(
          path.join(pathStylesFolder, `/${file.name}`),
          'utf-8',
        );
        const writeStream = fs.createWriteStream(pathBundleOfStyles, {
          flags: 'a',
        });
        readStream.pipe(writeStream);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function replaceTags(templatePath, componentsPath, distPath) {
  let buildFile = await readFile(templatePath, 'utf-8');

  for (let item of await readdir(componentsPath, { withFileTypes: true })) {
    const filePath = path.join(componentsPath, item.name);

    if (path.extname(filePath) === '.html') {
      let template = await readFile(filePath);

      const regexp = new RegExp(`{{${item.name.split('.')[0]}}}`, 'gi');
      buildFile = buildFile.replace(regexp, template);
    }
  }

  await writeFile(path.join(distPath, '/index.html'), buildFile);
}

async function build() {
  const distPath = path.join(__dirname, 'project-dist');
  const assetsPath = path.join(__dirname, 'assets');
  const assetsDistPath = path.join(distPath, 'assets');
  const stylesPath = path.join(distPath, 'style.css');
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');

  await rm(distPath, { recursive: true, force: true });
  await mkdir(distPath, { recursive: true });
  await copyDir(assetsPath, assetsDistPath);
  await buildStyles(stylesPath);
  await replaceTags(templatePath, componentsPath, distPath);
}

build();
