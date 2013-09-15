var a = require('../artificial.js');

describe('Artificial', function(){
    describe('#activeteNeuron()', function(){
        var inputVector = [1,2];
        var weightVector = [3,3];
        var activationFunction = function(x) {
            return x;
        };
        it('should return neuron output', function(){
            a.activeteNeuron(inputVector, weightVector, activationFunction).should.be.eql(9);
        })
    })
    describe('#deltaForNeuron()', function(){
        it('should return delta error for given neuron with one connection', function(){
            var deltasVector = [1];
            var weightsVector = [3];
            a.deltaForNeuron(deltasVector, weightsVector).should.be.eql(3);
        })
        it('should return delta error for given neuron with two connections', function(){
            var deltasVector = [1,2];
            var weightsVector = [3,2];
            a.deltaForNeuron(deltasVector, weightsVector).should.be.eql(7);
        })
    })
});