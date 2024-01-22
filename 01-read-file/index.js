const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

let textContent = '';

readStream.on('error', (error) => console.log(error.message));
readStream.on('data', (chunk) => (textContent += chunk));
readStream.on('end', () => console.log(textContent));
