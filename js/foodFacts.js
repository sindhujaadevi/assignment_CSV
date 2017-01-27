module.exports = (input) => {
    if (!(input instanceof Array)) {
        throw new Error('It is not an array');
    }
    if (input.length === 0) {
        throw new Error(' the array does not have any value');
    }
    const fs = require('fs');
    let inputStream = fs.createReadStream('./inputdata/FoodFacts.csv');
    let r1 = require('readline').createInterface({
        input: inputStream,
        terminal: false
    });
    let lines = [];
    let part1 = [];

    let countries = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
        'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
    let saltContent = new Array(9).fill(0);
    let sugarContent = new Array(9).fill(0);

    function indexFind(lineIndex) {
        let index = -1;
        if (lineIndex) {
            for (let i = 0; i < countries.length; i = i + 1) {
                if (lineIndex.includes(countries[i])) {
                    index = i;
                }
            }
        }
        return index;
    }
    let countryIndex = 0;
    let saltIndex = 0;
    let sugarIndex = 0;
    let flag = true;
    r1.on('line', function(line) {
        lines = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        if (flag) {
            countryIndex = countryIndex + lines.indexOf('countries_en');
            saltIndex = saltIndex + lines.indexOf('salt_100g');
            sugarIndex = sugarIndex + lines.indexOf('sugars_100g');
        }
        if (countryIndex !== -1 || saltIndex !== -1 || sugarIndex !== -1) {
            let newIndex = indexFind(lines[countryIndex]);
            sugarContent[newIndex] = sugarContent[newIndex] + Number(lines[sugarIndex]);
            saltContent[newIndex] = saltContent[newIndex] + Number(lines[saltIndex]);
        }
        flag = false;
    });
    r1.on('close', function() {
        for (let i = 0; i < countries.length; i = i + 1) {
            part1.push({
                Country: countries[i],
                Salt: saltContent[i],
                Sugar: sugarContent[i]
            });
        }
        fs.writeFile('./outputdata/part.json', JSON.stringify(part1));
    });
    return 'JSON written successfully';
};
