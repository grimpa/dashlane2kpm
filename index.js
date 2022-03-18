const csv = require('csv-parser');
const fs = require('fs');

const data = [];
const csvFile = './credentials.csv'; // Dashlane exported csv file

function writeCSVFile(data) {
  const outputCsvFile = 'output.csv'; // KPM csv file to import

    fs.writeFile(outputCsvFile, extractData(data), err => {
      if (err) console.log('An error occurred', err);
      else console.log(`File saved as ${filename}`);
    });
  }
  
  function extractData(data) {
    const header = ['"Website Name","Website URL","Email/Username","","","Password",""'];
    const rows = data.map(data =>
      `"${data.title}","${data.url}","${data.username}","","","${data.password}",""`
    );
    return header.concat(rows).join("\n");
  }

  fs.createReadStream(csvFile)
  .pipe(csv(['username', '', '', 'title', 'password', '', 'url']))
  .on('data', (row) => {
      data.push({
          title: row.title,
          url: row.url,
          username: row.username,
          password: row.password
      });
  })
  .on('end', () => {
      writeCSVFile(data);
  });