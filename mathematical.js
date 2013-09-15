(function(exports){
    var f = require('./functional.js');

    // in alphabetical order
    exports.equal           = function(a, b) { return a === b; };
    exports.addition        = function(a, b) { return f.reduce(f.slice(arguments, 1), function(i, base) {return base + i}, a); };
    exports.subtraction     = function(a, b) { return f.reduce(f.slice(arguments, 1), function(i, base) {return base - i}, a); };
    exports.multiplication  = function(a, b) { return f.reduce(f.slice(arguments, 1), function(i, base) {return base * i}, a); };
    exports.division        = function(a, b) { return f.reduce(f.slice(arguments, 1), function(i, base) {return base / i}, a); };

    // ∑ - sum over data from ... to ... of func
    exports.summation = function(data, func) {
        return f.reduce(data, f.compose(exports.addition, func || f.returnValue, f.returnValue), 0);
    };

})(exports || this);