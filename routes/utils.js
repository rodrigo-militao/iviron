const fs = require('fs');
const csv = require('csv-parser')
const path = require('path');
const GENERAL_CONFIG_PATH = path.join(__dirname, '../general_config.json');


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
  getAllConfig: () => {
    return new Promise((resolve, reject) => {
        fs.readFile(GENERAL_CONFIG_PATH, 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            const parsedData = JSON.parse(data);
            const returnConfig = {
              tag: parsedData.tag,
              localizacao: parsedData.localizacao,
              cliente: parsedData.cliente,
            }
            resolve(returnConfig);
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
  },
  GENERAL_CONFIG_PATH: GENERAL_CONFIG_PATH,
}