/**
 * Idea, how we can build complex connections between neurons
 */
(function(){

    var output = output('o');

    var middle1 = neuron('m1')->connect(output);
    var middle2 = neuron('m2')->connect(output);
    var middle3 = neuron('m3')->connect(output);

    var distributedA1 = neuron('dA1')->connect(middle1)->connect(middle2)->connect(middle3);
    var distributedA2 = neuron('dA2')->connect(middle1)->connect(middle2)->connect(middle3);

    var distributedB1 = neuron('dB1')->connect(middle1)->connect(middle2)->connect(middle3);
    var distributedB2 = neuron('dB2')->connect(middle1)->connect(middle2)->connect(middle3);

    var inputA1 = input('iA1')->connect(distributedA1, distributedA2);
    var inputA2 = input('iA2')->connect(distributedA1, distributedA2);
    var inputA3 = input('iA3')->connect(distributedA1, distributedA2);

    var inputB1 = input('iB1')->connect(distributedB1, distributedB2);
    var inputB2 = input('iB2')->connect(distributedB1, distributedB2);
    var inputB3 = input('iB3')->connect(distributedB1, distributedB2);

})();

(function() {
    var topography = [
        {
            name: 'persons',
            number: 24,
            layer: [
                {
                    name: 'distributed_person',
                    number: 6,
                    layer: [
                        {
                            name: 'merging',
                            number: 6,
                            layer: [
                                {
                                    name: 'output',
                                    number: 24
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'relation',
            number: 12,
            layer: [
                {
                    name: 'distriuted_relation',
                    number: 24,
                    layer: [
                        {@ref: 'merging'}
                    ]
                }
            ]
        }
    ];

    var options = {
        'momentum' : 0.4,
        'bias' : -1
    };

    var data = {
        'persons' : [0,0,0,0,0,0,0,0,0,0,0,0,1],
        'relation' : [0,0,0,0,0,1],
        'output': [0,1,0,0,0,0,0,0,0,0,0,0,0]
    };

    var net = build(topography, options);
    var result = net.train(data);
    result.error
})();