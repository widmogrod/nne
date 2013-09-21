var a = require('../artificial.js');

describe('Artificial', function(){
    describe('#activeteNeuron()', function(){
        var inputsVector = [1,2];
        var weightsVector = [3,3];
        var activationFunction = function(x) {
            return x;
        };
        it('should return neuron output', function(){
            a.activeteNeuron(inputsVector, weightsVector, activationFunction).should.be.eql(9);
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
    describe('#newWeights()', function(){
        it('should return delta error for given neuron with one connection', function(){
            var inputsVector = [1];
            var weightsVector = [3];
            var deltas = 2;
            var learningReate = 3;
            var activationFunction = function(x) { return x; };
            var derivative = function(x) { return x; }

            a.newWeights(inputsVector, weightsVector, deltas, learningReate, derivative).should.be.eql([
                3 + (2 * 3 * derivative(
                                    a.activeteNeuron(
                                        inputsVector,
                                        weightsVector,
                                        activationFunction
                                    )
                                )
                    )
            ]);
        })
    })
    describe('#topographyMap()', function(){
        var topography, data;
        beforeEach(function() {
            topography = [
                {
                    name: 'persons',
                    neurons: 24,
                    type: 'input',
                    // data: [0,0,0,0,0,1,0,0,0,0,0,0,0],
                    // weights: [],
                    connections: [
                        {
                            name: 'distributed_person',
                            neurons: 6,
                            type: 'hidden',
                            connections: [
                                {
                                    name: 'merging',
                                    neurons: 6,
                                    type: 'hidden',
                                    data: [
                                        {'@ref': 'distriuted_relation'}
                                    ],
                                    connections: [
                                        {
                                            name: 'output',
                                            neurons: 24,
                                            type: 'output',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'relation',
                    neurons: 12,
                    type: 'input',
                    connections: [
                        {
                            name: 'distriuted_relation',
                            neurons: 4,
                            type: 'hidden',
                        }
                    ]
                }
            ];

            data = {
                persons: [0,0,0,0,0,1,0,0,0,0,0,0,0],
                relation: [0,0,0,1,0],
                output: [0,1]
            };
        })
        it('should return delta error for given neuron with one connection', function(){
            a.topographyMap(topography, data)
        })
    })
});