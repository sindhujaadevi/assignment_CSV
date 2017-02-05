// function to return the index based on the condition provided
let indexFind = function(lineIndex, countries) {
    this.countries = countries;
    let index = -1;
    if (lineIndex) {
        for (let i = 0; i < countries.length; i = i + 1) {
            if (lineIndex.includes(countries[i])) {
                index = i;
            }
        }
    }
    return index;
};
let main = function(input1) {
  // test to validate the input
    let input = input1;
    if (!(input instanceof Array)) {
        throw new Error('It is not an array');
    }
    if (input.length === 0) {
        throw new Error('the array does not have any value');
    }
    const fs = require('fs');
    // Creating an input stream
    let inputStream = fs.createReadStream('./inputdata/FoodFacts.csv');
    let r1 = require('readline').createInterface({
        input: inputStream,
        terminal: false
    });
    let lines = [];
    // array to hold salt and sugar content
    let part1 = [];
    let countries = input;
    // initialise the arary with size and value
    let saltContent = new Array(9).fill(0);
    let sugarContent = new Array(9).fill(0);
    // Initialise the index of various values
    let flag = true;
    let countryIndex = 0; let saltIndex = 0; let sugarIndex = 0;
    // Reading the file line by line
    // Line event called
    r1.on('line', function(line) {
        lines = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (flag) {
            // Calculating various index
            countryIndex = countryIndex + lines.indexOf('countries_en');
            saltIndex = saltIndex + lines.indexOf('salt_100g');
            sugarIndex = sugarIndex + lines.indexOf('sugars_100g');
        }
        if (countryIndex !== -1 || saltIndex !== -1 || sugarIndex !== -1) {
            let newIndex = indexFind(lines[countryIndex], countries);
            sugarContent[newIndex] = sugarContent[newIndex] + Number(lines[sugarIndex]);
            saltContent[newIndex] = saltContent[newIndex] + Number(lines[saltIndex]);
        }

        flag = false;
    });
    // close event called
    r1.on('close', function() {
        for (let i = 0; i < countries.length; i = i + 1) {
            part1.push({
                Country: countries[i],
                Salt: saltContent[i],
                Sugar: sugarContent[i]
            });
        }
        fs.writeFile('./outputdata/satackedBar.json', JSON.stringify(part1));
    });
    return countries;
};
// input data if neccessary
/* let sample = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
    'Australia', 'France', 'Germany', 'Spain', 'South Africa']; */
// Exporting the methods
exports.main = main;
exports.greet = indexFind;
