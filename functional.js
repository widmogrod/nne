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
            func(data[i]);
        }
    }

    function map(data, func) {
        var result = [];
        forEach(data, function(item){
            result.push(func(item));
        });
        return result;
    }

    function partial(func) {
        var args = slice(arguments, 1);
        return function() {
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

    function curry(func) {
        var count = fargsc(func);
        var args = slice(arguments, 1);
        if (args.length < count) {
            return function() {
                return curry.apply(null, [func].concat(args, slice(arguments)));
            }
        } else {
            return func.apply(null, args.concat(slice(arguments)));
        }
    }

    function reduce(data, func, result) {
        forEach(data, function(item) {
            result = func(item, result);
        });
        return result;
    }

    function fargsc(func) {
        var args = func.toString().match(/^function[^\(]*\(([^\)]*)\)/i)[1].replace(/[^,]/, '');
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

    // function next(array, def) {
    //     if (!array || !is('array', array)) {
    //         return def;
    //     }
    //     if (array.current === undefined) {
    //         array.current = -1;
    //     }
    //     return array.current < array.length ? array[++array.current] : def;
    // }

    // in alphabetical order
    exports.compose  = compose;
    exports.curry    = curry;
    exports.forEach  = forEach;
    exports.is       = is;
    exports.map      = map;
    exports.mv       = mv;
    exports.fargsc   = fargsc;
    exports.partial  = partial;
    exports.reduce   = reduce;
    exports.rfunc    = rfunc;
    exports.slice    = slice;

})(exports || this);