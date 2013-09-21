(function(exports){
    "use strict";

    var f = require('./functional.js');
    var m = require('./mathematical.js');
    var i = require('./iterators.js');

    function activeteNeuron(inputsVector, weightsVector, func) {
        return m.summation(
            f.applyc(m.multiplication, inputsVector, weightsVector),
            func
        );
    }

    function deltaForNeuron(deltaVector, weightsVector) {
        return m.summation(
            f.applyc(m.multiplication, deltaVector, weightsVector)
        );
    }

    function newWeights(inputsVector, weightsVector, delta, learningReate, derivative) {
        var number = inputsVector.length;

        var deltaVector = f.fill(delta, number);
        var learningVector = f.fill(learningReate, number);

        var derivativeOfActivation = activeteNeuron(inputsVector, weightsVector, derivative);
        var derivativeVector = f.fill(derivativeOfActivation, number);

        var gradientVector = f.applyc(m.multiplication, deltaVector, learningVector, derivativeVector, inputsVector);

        return f.applyc(m.addition, weightsVector, gradientVector);
    }

    /**
     * Create full topography graph
     */
    function topography(topography) {

    }

    /**
     * Merge topography with input - output data
     */
    function topographyMap(topography, data) {
        var it, current, prev;
    }

    function topographyInitWeigths(topography) {

    }

    function train(topography) {

    }

    exports.activeteNeuron = activeteNeuron;
    exports.deltaForNeuron = deltaForNeuron;
    exports.newWeights     = newWeights;
    exports.topographyMap  = topographyMap;

})(exports || this);