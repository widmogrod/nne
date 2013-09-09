(function(exports){
    var slice, forEach, map, partial, compose, reduce, flip;

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

    partial = function(func) {
        var values = slice(arguments, 1);
        return function() {
            return func.apply(null, values.concat(slice(arguments)));
        }
    }

    compose = function(base, func) {
        return function() {
            return base(func.apply(null, slice(arguments)));
        }
    }

    reduce = function(data, base, func) {
        forEach(data, function(item) {
            base = func(base, item);
        });
        return base;
    }

    flip = function(func) {
        return function() {
            return func.apply(null, slice(arguments).reverse());
        }
    }

    // in alphabetical order
    exports.compose = compose;
    exports.flip    = flip;
    exports.forEach = forEach;
    exports.map     = map;
    exports.partial = partial;
    exports.reduce  = reduce;
    exports.slice   = forEach;

})(exports || this);