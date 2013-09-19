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

    function topographyMap(topography, data) {
        var it, current, prev;

        it = i.RecursiveIterator(
            new i.Iterator(topography),
            function(item) {
                if (!f.isObject(item)) {
                    return;
                }
                return new i.Iterator(item['connections']);
            }
        );

        while(it.valid()) {
            current = it.current();
            if (it.depth === 0) {
                current.data = data[current['name']];
            }
            // how to get deepest?
            else if (it.depth < prev) {

            }

            prev = Math.max(it.depth, prev);

            it.next();
        }
    }

    // function train(data, topography) {
    //     var layer = 0;
    //     var inputsNamespaces = [];
    //     var inputs = [];
    //     var outputs = [];

    //     var queue = {};

    //     iterate(topology, function(it, next, meta) {
    //         if (meta.deep == 0) {
    //             // we have input
    //             inputsNamespaces.push(it.name);
    //             // we assume we have name
    //             inputs.push(data[it.name]);

    //             queue.add(it.name, activateNeuron)
    //         } else {
    //             queue.after(
    //                 meta.parent.it.name,
    //                 it.name,
    //                 activateNeuron
    //             )
    //         }

    //         next();
    //     });

    //     queue.execute = function() {
    //         var inputs = [[1,2,3], [1,2,3]];
    //         while(var calls = pararel.nextBatch(inputs)) {
    //             var p = runParallel(calls)
    //             while(!p.isBinish());
    //             var inputs = p.results();
    //         }
    //     }

    //     queue.add = function(name, func) {

    //     }


    // }




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