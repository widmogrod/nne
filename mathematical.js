(function(exports){
    "use strict";

    var f = require('./functional.js');

    // in alphabetical order
    function equal(a, b) {
        return a === b;
    };

    function addition(a, b) {
        return f.reduce(f.slice(arguments, 1), function(i, base) {return base + i}, a);
    };

    function subtraction(a, b) {
        return f.reduce(f.slice(arguments, 1), function(i, base) {return base - i}, a);
    };

    function multiplication(a, b) {
        return f.reduce(f.slice(arguments, 1), function(i, base) {return base * i}, a);
    };

    function division(a, b) {
        return f.reduce(f.slice(arguments, 1), function(i, base) {return base / i}, a);
    };

    // ∑ - sum over data from ... to ... of func
    function summation(data, func) {
        return f.reduce(data, f.compose(exports.addition, func || f.returnValue, f.returnValue), 0);
    };

    exports.equal           = equal;
    exports.addition        = addition;
    exports.subtraction     = subtraction;
    exports.multiplication  = multiplication;
    exports.division        = division;
    exports.summation       = summation;

})(exports || this);