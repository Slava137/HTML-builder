const { stdin, exit } = require('process');
const fs = require('fs');
const path = require('path');

fs.appendFile(path.join(__dirname, 'text.txt'), '', (error) => {
  if (error) {
    console.log(error.message);
  }
});

console.log('Enter the text to be written to the file!');

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    writeByeMessage();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), chunk, (error) => {
      if (error) {
        console.log(error.message);
      }
    });
  }
});

process.on('SIGINT', writeByeMessage);

function writeByeMessage() {
  console.log('Text input is complete!');
  exit();
}
