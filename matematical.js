(function(exports){
    var f = require('./functional.js');

    // in alphabetical order
    exports.addition        = function(a, b) { return a + b; };
    exports.subtraction     = function(a, b) { return a - b; };
    exports.multiplication  = function(a, b) { return a * b; };
    exports.division        = function(a, b) { return a / b; };

    // ∑ - sum over data from ... to ... of
    exports.summation = function(data, func) {
        var base = f.partial(f.reduce, data);
        var reduce = f.partial(base, 0);
        return reduce(function(base, item) {
            return exports.addition(base, func(item));
        });
    };

})(exports || this);