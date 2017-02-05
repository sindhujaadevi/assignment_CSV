module.exports = function(input) {
    // testing the input for Array
    if (!(input instanceof Array)) {
        throw new Error('It is not an array');
    }
    if (input.length === 0) {
        throw new Error('the array does not have any value');
    }
    let len = input.length;
    /**
     * Module dependencies.
     */
    const fs = require('fs');
    const readline = require('readline');
    // Creating an input stream
    let inputStream = fs.createReadStream('./inputdata/FoodFacts.csv');
    let r1 = readline.createInterface({
        input: inputStream,
        terminal: false
    });
    // array to hold salt and sugar content
    let part1 = [];
    // array to hold fat, protein and carbohydrates content
    let part2 = [];
    let countries = input;
    // initialise the arary with size and value
    let saltContent = new Array(len).fill(0);
    let sugarContent = new Array(len).fill(0);
    let northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
    let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
    let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
    let fatcontentNorth = 0; let carbocontentNorth = 0; let proteincontentNorth = 0;
    let fatcontentCentral = 0; let carbocontentCentral = 0; let proteincontentCentral = 0;
    let fatcontentSouth = 0; let carbocontentSouth = 0; let proteincontentSouth = 0;

  let indexFind = function (lineValue) {
        let index = -1;
        if (lineValue) {
            for (let i = 0; i < countries.length; i = i + 1) {
                if (lineValue.includes(countries[i])) {
                    index = i;
                }
            }
        }
        return index;
    };
    exports.greet = indexFind;
    // Initialise the index of various values
    let countryIndex = 0;
    let saltIndex = 0;
    let sugarIndex = 0;
    let proteinIndex = 0;
    let carboIndex = 0;
    let fatIndex = 0;
    let flag = true;
    // let csvToJson = () => {
        // Reading the file line by line
        r1.on('line', function(line) {
            let lines = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (flag) {
                // Calculating various index
                countryIndex = countryIndex + lines.indexOf('countries_en');
                saltIndex = saltIndex + lines.indexOf('salt_100g');
                sugarIndex = sugarIndex + lines.indexOf('sugars_100g');
                proteinIndex = proteinIndex + lines.indexOf('proteins_100g');
                carboIndex = carboIndex + lines.indexOf('carbohydrates_100g');
                fatIndex = fatIndex + lines.indexOf('fat_100g');
            }
            if (countryIndex !== -1 || saltIndex !== -1 || sugarIndex !== -1) {
                let newIndex = indexFind(lines[countryIndex]);
                sugarContent[newIndex] = sugarContent[newIndex] + Number(lines[sugarIndex]);
                saltContent[newIndex] = saltContent[newIndex] + Number(lines[saltIndex]);
            }
            if (countryIndex !== -1 || proteinIndex !== -1 || carboIndex !== -1 || fatIndex !== -1) {
                if (northEurope.includes(lines[countryIndex])) {
                    fatcontentNorth = fatcontentNorth + Number(lines[fatIndex]);
                    carbocontentNorth = carbocontentNorth + Number(lines[carboIndex]);
                    proteincontentNorth = proteincontentNorth + Number(lines[proteinIndex]);
                }
                if (centralEurope.includes(lines[countryIndex])) {
                    fatcontentCentral = fatcontentCentral + Number(lines[fatIndex]);
                    carbocontentCentral = carbocontentCentral + Number(lines[carboIndex]);
                    proteincontentCentral = proteincontentCentral + Number(lines[proteinIndex]);
                }
                if (southEurope.includes(lines[countryIndex])) {
                    fatcontentSouth = fatcontentSouth + Number(lines[fatIndex]);
                    carbocontentSouth = carbocontentSouth + Number(lines[carboIndex]);
                    proteincontentSouth = proteincontentSouth + Number(lines[proteinIndex]);
                }
            }
            flag = false;
        });
        // close event called
        r1.on('close', function() {
            for (let i = 0; i < countries.length; i = i + 1) {
                //  Sugar and salt content pushed into part1 array
                part1.push({
                    Country: countries[i],
                    Salt: saltContent[i],
                    Sugar: sugarContent[i]
                });
            }
            // Pushing each countries content into part2
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
            });
            // writing the json object of part1 into the json file
            fs.writeFile('./outputdata/outputJsonSindhu1.json', JSON.stringify(part1));
        });
    //     return 'kkj';
    // };
    // csvToJson();
    // fs.writeFile('./outputdata/part.json', JSON.stringify(part1));
    // fs.writeFile('./outputdata/part3.json', JSON.stringify(part2));
    return countries;
};
