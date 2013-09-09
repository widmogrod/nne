(function(exports){
    var slice, forEach, map, partial, compose;

    slice = function(args, begin, end) {
        return Array.prototype.slice.call(args, begin, end);
    }

    forEach = function(data, func) {
        var length = data.length,
            i = 0;
        for (; i < length; i++) {
            func(data[i]);
        }
    }

    map = function(data, func) {
        var result = [];
        forEach(data, function(item){
            result.push(func(item));
        });
        return result;
    }

    partial = function(func, value) {
        var values = slice(arguments, 1);
        return function() {
            return func.apply(null, values.concat(slice(arguments)));
        }
    }

    compose = function(base, func) {
        return function() {
            return base(func.call(null, slice(arguments)));
        }
    }

    // in alphabetical order
    exports.compose = compose;
    exports.forEach = forEach;
    exports.map     = map;
    exports.partial = partial;
    exports.slice   = forEach;

})(exports || this);