(function(exports){
    var f = require('./functional.js');
    var m = require('./mathematical.js');

    function activeteNeuron(inputsVector, weightsVector, func) {
        var matrix = [inputsVector, weightsVector];
        var matrixT = f.transpose(matrix);

        var multiplyRows = f.curry(f.invoke, m.multiplication);

        var set = f.map(matrixT, multiplyRows);
        return m.summation(set, func);
        // return m.summation(map(inputs, weights, m.multiplication), func);
    }

    function deltaForNeuron(deltaVector, weightsVector) {
        var matrix = [deltaVector, weightsVector];
        var matrixT = f.transpose(matrix);

        var multiplyRows = f.curry(f.invoke, m.multiplication);
        var set = f.map(matrixT, multiplyRows);

        return m.summation(set);
        // return m.summation(map(inputs, weights, m.multiplication));
    }

    function newWeights(inputsVector, weightsVector, delta, learningReate, derivative) {
        var number = inputsVector.length;

        var deltaVector = f.fill(delta, number);
        var learningVector = f.fill(learningReate, number);

        var derivativeOfActivation = activeteNeuron(inputsVector, weightsVector, derivative);
        var derivativeVector = f.fill(derivativeOfActivation, number);

        var matrix = [deltaVector, learningVector, derivativeVector, inputsVector];
        var multiplicationMatrix = f.transpose(matrix);

        var multiplyRows = f.curry(f.invoke, m.multiplication)
        var gradientVector = f.map(multiplicationMatrix, multiplyRows);
        // var multiplicationResult = multiplicateEach.apply(null, multiplicationMatrix);

        var addRows = f.curry(f.invoke, m.addition);
        return f.map(
            f.transpose([weightsVector, gradientVector]),
            addRows
        );
        // var descent = map(fill(delta, number), inputs, map(weights, derivative), m.multiplication);
        // return map(weights, descent, m.addition);
    }

    // inputData = [1, 2];

    // inputs = curry(activeteNeuron);

    // weights = inputs(inputData);
    // outputs = map(nextLayer, function(neuron) {
    //     activate = weights(neuron.weights);
    //     return activate(neuron.activation);
    // })

    // weights = inputs(outputs);
    // outputs = map(nextLayer, function(neuron) {
    //     activate = weights(neuron.weights);
    //     return activate(neuron.activation);
    // })

    // var topography = [
    //     {
    //         name: 'xor_input',
    //         number: 2,
    //         connections: [
    //             {
    //                 name: 'code',
    //                 number: 3,
    //                 connections: [
    //                     {
    //                         name: 'output',
    //                         number: 1
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ];

    // var options = {
    //     momentum : 0.4,
    //     learningRate : 0.2,
    //     bias : -1
    // };

    // var data = [
    //     {
    //         xor_input : [0, 0],
    //         output: [1]
    //     }, {
    //         xor_input : [1, 0],
    //         output: [0]
    //     }, {
    //         xor_input : [0, 1],
    //         output: [0]
    //     }, {
    //         xor_input : [1, 1],
    //         output: [1]
    //     }
    // ];

    // var net = build(topography, options);
    // do {
    //     // train
    //     var result = net.train(data);
    // } while(result.errorRate < 0.05);

    // trained

    exports.activeteNeuron = activeteNeuron;
    exports.deltaForNeuron = deltaForNeuron;
    exports.newWeights = newWeights;

})(exports || this);