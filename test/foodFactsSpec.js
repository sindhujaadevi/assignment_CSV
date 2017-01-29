/**
 * Module dependencies.
 */
const should = require('chai').should();
const expect = require('chai').expect;
const sinon = require('sinon');
const readline = require('readline');
const convert = require('../js/foodFacts1');
let jsonDiff = require('../js/jsondiff');
let totalObjectKeys = require('../js/totalObjectKeys');
let expectedJSON = require('../inputdata/part1.json');
let actualJSON = require('../inputdata/ff.json');

describe('Test Application as Blackbox', function() {
    it('Test JSON is well formed', function(done) {
        /*ToDO Parse JSON*/
        done();
    });
    it('JSON has expected Number of Objects', function(done) {
        let objMatrix = totalObjectKeys.traverse(actualJSON);
        expect(objMatrix.totalNoObjects).to.not.equal(0);
        expect(objMatrix.totalNoKeys).to.not.equal(0);
        done();
    });
    it('Test JSON is as expected', function(done) {
        let compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
        expect(compareResult.diffs).equal(0);
        done();
    });
});
describe('Test Application as WhiteBox', function() {
  let countries = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
      'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
    // **Run once before the first test case**
    before(function() {
        console.log('WhiteBox testing Started')
    });
    let i = 1;
    // **Run once before each test case**
    beforeEach(function() {
        console.log('Test' + i + ' :');
        i++;
    });
    it('should fail if input is notprovided', function(done) {
        expect(convert.method3).to.throw(Error, 'It is not an array');
        done();
    });
    it('should be an array', function(done) {
        expect(convert.method3.bind('undefined', 8575)).to.throw(Error, 'It is not an array');
        done();
    });

    it('should fail for string', function(done) {
        expect(convert.method3.bind('undefined', 'Netherlands')).to.throw(Error, 'It is not an array');
        done();
    });
    it('should fail if the length of array is null', function(done) {
        expect(convert.method3.bind('undefined', [])).to.throw(Error, 'the array does not have any value');
        done();
    });
    it('should not fail if it is an array object', function(done) {
        expect(convert.method3.bind('undefined', countries)).to.not.throw(Error, 'the array is  well defined');
        done();
    });
    it.skip('should output success message at last ', function(done) {
        let input = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
        let result = convert(input);
        result.should.be.equal(input);
        done();
    });
    it('should be uuu an array', function(done) {
      let input = 'Canada';
      let result = convert.greet(input);
      result.should.be.equal(Number);
      done();
    });
    it.skip('should be uuu an array', function(done) {
      let input = 'Canada';
      let result = convert.method3();
      result.should.be.equal('success1');
      done();
    });
});
describe('Test createInterface method of readline', function(err) {
    it('should be called only once', function() {
        let spyCreateInterface = sinon.spy(readline, 'createInterface');
        convert(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        readline.createInterface.restore();
        sinon.assert.calledOnce(spyCreateInterface);
    });
});
describe('Test on method of Interface for line event', function(err) {
    it('should be called', function() {
        let stub = sinon.stub(readline.Interface.prototype, 'on');
        convert(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        sinon.assert.called(stub);
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, 'line');
    });
});
describe('Test on method of Interface for close event', function(err) {
    it('should be called', function() {
        let stub = sinon.stub(readline.Interface.prototype, 'on');
        convert(['Netherlands', 'Canada', 'United Kingdom',
            'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ]);
        readline.Interface.prototype.on.restore();
        sinon.assert.calledWith(stub, 'close');
    });
});
