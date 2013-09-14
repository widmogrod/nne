(function(exports){
    var f = require('./functional.js');

    // in alphabetical order
    exports.equal           = function(a, b) { return a === b; };
    exports.notEqual        = function(a, b) { return a !== b; };
    exports.addition        = function(a, b) { return a + b; };
    exports.subtraction     = function(a, b) { return a - b; };
    exports.multiplication  = function(a, b) { return a * b; };
    exports.division        = function(a, b) { return a / b; };

    // ∑ - sum over data from ... to ... of func
    exports.summation = function(data, func) {
        return f.reduce(data, f.compose(exports.addition, func || f.rv, f.rv), 0);
    };

})(exports || this);