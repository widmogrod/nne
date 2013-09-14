(function(exports){

    function activeteNeuron(inputs, weigths, func) {
        return m.summation(map(inputs, weights, m.multiplication), func);
    }

    function deltaForNeuron(deltas, weigths) {
        return m.summation(map(inputs, weights, m.multiplication));
    }

    function newWeights(inputs, weigths, delta, derivative) {
        var number = inputs.length;
        var descent = map(fill(delta, number), inputs, map(weigths, derivative), m.multiplication);
        return map(weigths, descent, m.addition);
    }

    inputData = [1, 2];

    inputs = curry(activeteNeuron);

    weigths = inputs(inputData);
    outputs = map(nextLayer, function(neuron) {
        activate = weigths(neuron.weights);
        return activate(neuron.activation);
    })

    weigths = inputs(outputs);
    outputs = map(nextLayer, function(neuron) {
        activate = weigths(neuron.weights);
        return activate(neuron.activation);
    })


    var topography = [
        {
            name: 'xor_input',
            number: 2,
            connections: [
                {
                    name: 'code',
                    number: 3,
                    connections: [
                        {
                            name: 'output',
                            number: 1
                        }
                    ]
                }
            ]
        }
    ];

    var options = {
        momentum : 0.4,
        learningRate : 0.2,
        bias : -1
    };

    var data = [
        {
            xor_input : [0, 0],
            output: [1]
        }, {
            xor_input : [1, 0],
            output: [0]
        }, {
            xor_input : [0, 1],
            output: [0]
        }, {
            xor_input : [1, 1],
            output: [1]
        }
    ];

    var net = build(topography, options);
    do {
        // train
        var result = net.train(data);
    } while(result.errorRate < 0.05);

    // trained

})(exports || this);