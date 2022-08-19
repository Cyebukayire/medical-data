
const excelToJson = require('convert-excel-to-json');
import fs from 'fs'
import path from 'path'
 
/**
 * @param {string} file name
 * @return {Array} converted data into array
 */
export const medicalInfo = () => excelToJson({
    source: fs.readFileSync(path.join(__dirname, 'MedicalData.xlsx')) 
});




