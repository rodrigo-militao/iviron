const fs = require('fs');
const csv = require('csv-parser')
const path = require('path');
const GENERAL_CONFIG_PATH = path.join(__dirname, '../public/general_config.json');


module.exports = {
  getGeneralConfig: key => {
    return new Promise((resolve, reject) => {
        fs.readFile(GENERAL_CONFIG_PATH, 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            const parsedData = JSON.parse(data);
            resolve(parsedData[key]);
        }
        });
    });
  },
  readCSV: (filePath) => {
    const csv_data = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', function (row){
        csv_data.push(row);
      })
      .on('end', function () {
        resolve(csv_data);
      }
      );
    });
  }
}