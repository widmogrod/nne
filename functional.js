(function(exports, undefined){

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas.toLowerCase() === type.toLowerCase();
    }

    function slice(args, begin, end) {
        return Array.prototype.slice.call(args, begin, end);
    }

    function forEach(data, func) {
        var i, length = data.length;
        for (i = 0; i < length; i++) {
            func(data[i], i);
        }
    }

    function get(key) {
        return function (obj) {
            return obj[key];
        }
    }

    // ([1, 2, 3], +1) -> [2, 3, 4]
    // ([1, 2, 3], [3, 4, 6], +) -> [4, 6, 9]
    function map(data, func) {
        data = slice(arguments, 0, -1);
        func = slice(arguments, -1)[0];
        var result = [];
        forEach(data, function(item){
            forEach(item, function(value, idx) {
                result[idx] = result[idx] ? result[idx](value) : curry(func, value);
            })
        });
        return result;
    }

    // (function(a, b, c, d)) -> (a)(b)(c)(d)
    function curry(func) {
        var count = fargsc(func);
        var args = slice(arguments, 1);
        if (!count)  {
            return func;
        }
        if (args.length < count) {
            return function() {
                return curry.apply(null, [func].concat(args, slice(arguments)));
            }
        } else {
            return func.apply(null, args.concat(slice(arguments)));
        }
    }

    function compose(base, first, more) {
        var functions = slice(arguments, 1);
        return function() {
            var args = slice(arguments);
            return base.apply(null, map(functions, function(func){
                return func.call(null, more ? args.shift() : args);
            }));
        }
    }

    function reduce(data, func, result) {
        forEach(data, function(item) {
            result = func(item, result);
        });
        return result;
    }

    function filter(data, func) {
        var result = [];
        forEach(data, function(item, i) {
            if (func(item, i)) {
                result.push(item);
            }
        });
        return result;
    }

    function fargsc(func) {
        var args = func.toString().match(/^function[^\(]*\(([^\)]*)\)/i)[1];
        return args.length ? args.split(',').length : 0;
    }

    function rfunc(item) {
        return item;
    }

    function mv(value) {
        return function() {
            return value;
        }
    }

    // in alphabetical order
    exports.compose  = compose;
    exports.curry    = curry;
    exports.fargsc   = fargsc;
    exports.filter   = filter;
    exports.forEach  = forEach;
    exports.get      = get;
    exports.is       = is;
    exports.map      = map;
    exports.mv       = mv;
    exports.reduce   = reduce;
    exports.rfunc    = rfunc;
    exports.slice    = slice;

})(exports || this);