var a = require('../artificial.js');

describe('Artificial', function(){
    describe('#activeteNeuron()', function(){
        var inputs = [1,2];
        var weights = [3,3];
        var activationFunction = function(x) {
            return x;
        };
        it('should return result of operation if argument are passed', function(){
            a.activeteNeuron(inputs, weights, activationFunction).should.be.eql(9);
        })
    })
});