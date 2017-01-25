const should = require("chai").should();
const expect = require("chai").expect;
convert= require("../js/food");

csv = require ("../inputdata/part1.json");
//var csv = [{"country":"Netherlands","salt":43.34,"sugar":186.20000000000002},{"country":"Canada","salt":27.470923999999997,"sugar":731.4200000000001},{"country":"United Kingdom","salt":247.41090259999987,"sugar":6567.887000000004},{"country":"United States","salt":1603.7165899999989,"sugar":16595.249000000003},{"country":"Australia","salt":169.58522600000012,"sugar":1926.7999999999995},{"country":"France","salt":4310.533399159998,"sugar":52153.31649999991},{"country":"Germany","salt":572.7114457999995,"sugar":3009.127999999998},{"country":"Spain","salt":257.0573826200001,"sugar":2722.3900000000017},{"country":"South Africa","salt":0.15610000000000002,"sugar":3.52}];
describe("csv json", function(err){
//   it("should output json for part1", function(done){
// //   	   var result=convert(['Netherlands']);
// // //convert should throw Argument if not array
//     expect(convert).to.throw(Error,'not a number');
//        done();
//     });
//     it("should output json for part1", function(done){
//   //   	   var result=convert(['Netherlands']);
//   // //convert should throw Argument if not array
//       expect(convert.bind('undefined','55.6')).to.throw(Error,' number');
//          done();
//       });
      it("should be an array", function(done){
        expect(convert.bind('undefined',57)).to.throw(Error,'It is not an array');
           done();
        });
      it("length check", function(done){
        expect(convert.bind('undefined',[])).to.throw(Error,'the array does not have any value');
            done();
        });
      it("array values check", function(done){
          expect(convert.bind('undefined',['Netherlands', 'Canada', 'United Kingdom',
           'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'])).to.not.throw(Error,'the array is well defined');
              done();
        });
      //   it("should output json for part1", function(done){
      // var result=convert(['Netherlands', 'Canada', 'United Kingdom',
      //  'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
      //   // //convert should throw Argument if not array
      //     result.should.be.equal(csv);
      //          done();
      //       });
  });
