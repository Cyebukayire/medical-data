/* @author Peace
   created: 19th Aug 2022*/

const fs = require("fs");
const path = require("path");

// Convert Data from Excel to json
const converter = require("convert-excel-to-json");
const data = () =>
  converter({
    source: fs.readFileSync(path.join(__dirname, "../MedicalData.xlsx")),
  });

module.exports.data = data;
