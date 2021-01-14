const fs = require('fs');
const request = require('request');
const args = process.argv.slice(2);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = function() {
  let url = args[0];
  let filePath = args[1];
  request(url, (error, response, body) => {
    // console.log('error', error); // => print the error if one occurred
    fs.exists(filePath, function (exists) {
      if (exists) {
        rl.question("File already exists! If you wish to overwrite, type 'y' then enter ", (answer) => {
          if (answer !== 'y') {
            console.log("GOODBYE");
            rl.close();
            return;
          } else {
            console.log("overwriting....")
            rl.close();
            fs.writeFile(filePath, body, function (err) {
              if (err) throw err;     
              console.log(`Downloaded and saved ${body.length} bytes to ${filePath}.`);
              return;
            });
          }
        });
      } else {
        fs.writeFile(filePath, body, function (err) {
          if (err) throw err;     
          console.log(`Downloaded and saved ${body.length} bytes to ${filePath}.`);
          rl.close();
          return;
        });
      }
    })
  });
};

fetcher();