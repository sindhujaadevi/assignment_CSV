let main = function(input1) {
  let input = input1;
  if (!(input instanceof Array)) {
      throw new Error('It is not an array');
  }
  if (input.length === 0) {
      throw new Error('the array does not have any value');
  }
    const fs = require('fs');
    let inputStream = fs.createReadStream('./inputdata/FoodFacts.csv');
    let r1 = require('readline').createInterface({
        input: inputStream,
        terminal: false
    });
    let lines = [];
    let part2 = [];
    let countries = input;
    let northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
    let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
    let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
    let fatcontentNorth = 0; let carbocontentNorth = 0; let proteincontentNorth = 0;
    let fatcontentCentral = 0; let carbocontentCentral = 0; let proteincontentCentral = 0;
    let fatcontentSouth = 0; let carbocontentSouth = 0; let proteincontentSouth = 0;
    let countryIndex = 0;
    let proteinIndex = 0; let carboIndex = 0; let fatIndex = 0;
    let flag = true;
    r1.on('line', function(line) {
        lines = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (flag) {
            countryIndex = countryIndex + lines.indexOf('countries_en');
            proteinIndex = proteinIndex + lines.indexOf('proteins_100g');
            carboIndex = carboIndex + lines.indexOf('carbohydrates_100g');
            fatIndex = fatIndex + lines.indexOf('fat_100g');
        }
        if (countryIndex !== -1 || proteinIndex !== -1 || carboIndex !== -1 || fatIndex !== -1) {
        if(northEurope.includes(lines[countryIndex]))
        {
          fatcontentNorth = fatcontentNorth + Number(lines[fatIndex]);
          carbocontentNorth = carbocontentNorth + Number(lines[carboIndex]);
          proteincontentNorth = proteincontentNorth + Number(lines[proteinIndex]);
        }
        if(centralEurope.includes(lines[countryIndex]))
        {
          fatcontentCentral = fatcontentCentral + Number(lines[fatIndex]);
          carbocontentCentral = carbocontentCentral + Number(lines[carboIndex]);
          proteincontentCentral = proteincontentCentral + Number(lines[proteinIndex]);
        }
        if(southEurope.includes(lines[countryIndex]))
        {
          fatcontentSouth = fatcontentSouth + Number(lines[fatIndex]);
          carbocontentSouth = carbocontentSouth + Number(lines[carboIndex]);
          proteincontentSouth = proteincontentSouth + Number(lines[proteinIndex]);
        }
        }
        flag = false;
          });
    r1.on('close', function() {
            part2.push({
                Country: 'North Europe',
                Fat: fatcontentNorth,
                carbohydrates: carbocontentNorth,
                Protein: proteincontentNorth
            }, {
                Country: 'Central Europe',
                Fat: fatcontentCentral,
                carbohydrates: carbocontentCentral,
                Protein: proteincontentCentral
            }, {
                Country: 'South Europe',
                Fat: fatcontentSouth,
                carbohydrates: carbocontentSouth,
                Protein: proteincontentSouth
            }
          );
       fs.writeFile('./outputdata/multiLineChart.json', JSON.stringify(part2));
    });
return countries;
};
exports.main = main;
