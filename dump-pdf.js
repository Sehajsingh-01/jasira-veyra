const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\Sehaj\\Downloads\\jascomic\\Jas_of_Duskbloom_FULL.pdf';

let dataBuffer = fs.readFileSync(pdfPath);
pdf(dataBuffer).then(function(data) {
  fs.writeFileSync('C:\\Users\\Sehaj\\Downloads\\jascomic\\jasira-veyra\\parsed_text.txt', data.text);
});
