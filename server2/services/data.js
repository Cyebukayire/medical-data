const fs = require('fs')
const path = require('path')
 
const excelToJson = require('convert-excel-to-json');
const data = () => excelToJson({
    source: fs.readFileSync(path.join(__dirname, '../data/MedicalData.xlsx')) 
});

module.exports.data = data;


