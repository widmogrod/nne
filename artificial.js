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

    function isTraversable(item, key) {
        if (f.isArray(item)) {
            return true;
        }
        if (f.isObject(item) && f.has('connections')(item)){
            return f.get('connections')(item)
        }
    }

    /**
     * Create full topography graph
     */
    function topography(topography) {
        var queue = {};
        var todoTo = {};
        var todoFrom = {};

        var inQueue = function (key) {
            return f.has(key)(queue);
        };
        var notInQueue = function (key) {
            return ! f.has(key)(queue);
        };
        var getQueued = function(key) {
            return f.get(key)(queue);
        };
        var inTodoTo = function (key) {
            return f.has(key)(todoTo);
        };
        var getTodoTo = function (key) {
            return f.get(key)(todoTo);
        };
        var inTodoFrom = function (key) {
            return f.has(key)(todoFrom);
        };
        var getTodoFrom = function (key) {
            return f.get(key)(todoFrom);
        };

        var getReferencesFrom = f.get('@from');
        var getReferencesTo   = f.get('@to');

        function forEach (item) {
            var referenceFrom, referenceTo, reference;

            if (inQueue(item.name)) {
                throw Error(item.nam + ' name should be unique');
            };

            queue[item.name] = item;

            if (referenceFrom = getReferencesFrom(item)) {
                // For each item found set reference otherwise
                f.forEach(f.filter(referenceFrom, inQueue), function(value) {
                    reference = getQueued(value);
                    if (referenceTo = getReferencesTo(reference)) {
                        referenceTo.push(value);
                    } else {
                        reference['@to'] = [item.name];
                    }
                });

                // For each reference not found in queue to it
                f.forEach(f.filter(referenceFrom, notInQueue), function(value) {
                    todoFrom[value] = todoFrom[value] || [];
                    todoFrom[value].push(item.name);
                })
                // todoFrom[item.name] = f.filter(referenceFrom, notInQueue);
            }

            if (referenceTo = getReferencesTo(item)) {
                // For each item found set reference otherwise
                f.forEach(f.filter(referenceTo, inQueue), function(value) {
                    // value - merging
                    reference = getQueued(value);
                    if (referenceFrom = getReferencesFrom(reference)) {
                        referenceFrom.push(value);
                    } else {
                        reference['@from'] = [item.name];
                    }
                });

                // For each reference not found in queue to it
                f.forEach(f.filter(referenceTo, notInQueue), function(value) {
                    todoTo[value] = todoTo[value] || [];
                    todoTo[value].push(item.name);
                })
            }

            if (inTodoFrom(item.name)) {
                f.forEach(getTodoFrom(item.name), function(value){
                    reference = getQueued(value);
                    if (referenceTo = getReferencesTo(reference)) {
                        referenceTo.push(value);
                    } else {
                        reference['@to'] = [value];
                    }
                });
            }
            if (inTodoTo(item.name)) {
                f.forEach(getTodoTo(item.name), function(value){
                    reference = getQueued(value);
                    if (referenceFrom = getReferencesFrom(reference)) {
                        referenceFrom.push(value);
                    } else {
                        referenceFrom['@from'] = [value];
                    }
                });
            }
        }

        f.traverse(topography, forEach, isTraversable);

        return topography;
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

    exports.topography     = topography;
    exports.topographyMap  = topographyMap;

})(exports || this);