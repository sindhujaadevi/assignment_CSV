const should = require('chai').should();
const expect = require('chai').expect;
const sinon = require('sinon');
const readline = require('readline');
const fs = require('fs');
const convert = require('../js/foodFacts');
var jsonDiff = require('../js/jsondiff');
var totalObjectKeys = require('../js/totalObjectKeys');
var expectedJSON = require('../inputdata/part1.json');
var actualJSON = require('../inputdata/ff.json');

describe('Test Application as Blackbox', function() {
  it ('Test JSON is well formed', function(done) {
    /*ToDO Parse JSON*/
    done();
  });
  it('JSON has expected Number of Objects', function(done) {
    var objMatrix = totalObjectKeys.traverse(actualJSON);
    expect(objMatrix.totalNoObjects).to.not.equal(0);
    expect(objMatrix.totalNoKeys).to.not.equal(0);
    done();
  });
  it('Test JSON is as expected', function(done) {
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
    expect(compareResult.diffs).equal(0);
    done();
  });
});
describe('Test Application as WhiteBox', function() {
// **Run once before the first test case**
  before(function(){
      console.log('WhiteBox testing Started')
    });
    let i=1;
  // **Run once before each test case**
  beforeEach(function(){
   console.log('Test' + i + ' :');
   i++;
 }
);
  it('should fail if input is notprovided', function(done) {
       expect(convert).to.throw(Error, 'It is not an array');
       done();
   });
  it('should be an array', function(done) {
    expect(convert.bind('undefined', 8575)).to.throw(Error,'It is not an array');
       done();
    });
    it('should fail for string', function(done) {
      expect(convert.bind('undefined', "Netherland")).to.throw(Error,'It is not an array');
         done();
      });
  it('length check', function(done) {
    expect(convert.bind('undefined',[])).to.throw(Error,'the array does not have any value');
        done();
    });
  it('should not fail if it is an array object', function(done) {
      expect(convert.bind('undefined',['Netherlands', 'Canada', 'United Kingdom','United States',
      'Australia', 'France', 'Germany', 'Spain', 'South Africa'])).to.not.throw(Error,'the array is  well defined');
          done();
    });
    it('should output success message at last ', function(done) {
          var result = new convert(['Netherlands', 'Canada', 'United Kingdom',
         'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'])
          // console.log(result);
          result.convertWithStream(function(){
            done();
          });

    });
  });
    describe('Test createInterface method of readline', function(err) {
    it('should be called only once', function() {
                var spyCreateInterface = sinon.spy(readline, 'createInterface');
                convert(['Netherlands', 'Canada', 'United Kingdom',
               'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
                readline.createInterface.restore();
                sinon.assert.calledOnce(spyCreateInterface);
        });
      });
        describe('Test on method of Interface for line event', function(err){
        it('should be called', function() {
               var stub = sinon.stub(readline.Interface.prototype, 'on');
               convert(['Netherlands', 'Canada', 'United Kingdom',
              'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
               sinon.assert.called(stub);
               readline.Interface.prototype.on.restore();
               sinon.assert.calledWith(stub, 'line');
        });
       });
        describe('Test on method of Interface for close event', function(err) {
        it('should be called', function() {
               var stub = sinon.stub(readline.Interface.prototype,'on');
              var t = convert(['Netherlands', 'Canada', 'United Kingdom',
              'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa']);
              // console.log(t);
               readline.Interface.prototype.on.restore();
               sinon.assert.calledWith(stub, 'close');
        });
});
