let fs = require('fs');
let readfile = fs.createReadStream('./inputdata/FoodFacts.csv', 'utf-8');
module.exports = (function(obj) {
// if((typeof saltv)!=="object"){
//   throw new Error('not a number');
// }
var len = obj.length;
if (!(obj instanceof Array)) {
throw new Error('It is not an array');
}
else if(obj.length==0)
{
  throw new Error(' the array does not have any value');
}
var allContent = [];
let data = '';
readfile.on('data', function(chunk) {
  data = data + chunk;
});

readfile.on('end', function() {
  let line = data.split('\n');
  let head = line[0].split(',');

  let saltcontent = new Array(len).fill(0);
  let sugarcontent = new Array(len).fill(0);
  let countries = obj;
  let countryIndex = head.indexOf('countries_en');
  let saltIndex = head.indexOf('salt_100g');
  let sugarIndex = head.indexOf('sugars_100g');
  for(let i = 1; i < line.length; i = i + 1)
  {
    let content = line[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    let flag1 = countries.includes(content[countryIndex]);
    if(flag1) {
      let index = countries.indexOf(content[countryIndex]);
      let saltvalue = content[saltIndex];
      let sugarvalue = content[sugarIndex];

if(saltvalue === '')
{
saltvalue = 0;
}

if(sugarvalue === '')
{
sugarvalue = 0;
}
saltcontent[index] = saltcontent[index] + parseFloat(saltvalue);
sugarcontent[index] = sugarcontent[index] + parseFloat(sugarvalue);
    }
  }
  for(let j = 0; j < countries.length; j = j + 1) {
    let obj = {};
    obj['country'] = countries[j];
    obj['salt'] = saltcontent[j];
    obj['sugar'] = sugarcontent[j];
    allContent.push(obj);
  }

  console.log(JSON.stringify(allContent));
  fs.writeFile('./outputdata/part1.json', JSON.stringify(allContent), 'utf-8');

});
console.log(obj);
console.log("kjrhjv");
  return ("success");
});
