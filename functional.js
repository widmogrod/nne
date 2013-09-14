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

    function maybe(value, fn) {
        return value === null || value === undefined ? value : fn(value);
    }

    /**
     * Transpose array, optionally apply function on each item;
     *
     * Examples:
     * From:
     * [
     *     [a,b],
     *     [c,d]
     * ]
     * To:
     * [
     *     [a, c]
     *     [b, d]
     * ]
     *
     * From:
     * [a,b,c]
     * To:
     * [
     *     [a],
     *     [b],
     *     [c]
     * ]
     */
    function transpose(array, func) {
        var result = [],
            func = func || rv;

        forEach(array, function(value, col) {
            if (!is('array', value)) {
                result[col] = [func(value)];
            } else {
                forEach(value, function(item, idx){
                    item = func(item);
                    result[idx] = result[idx] ? result[idx] : [];
                    result[idx][col] = item;
                });
            }
        });
        return result;
    }

    /**
     * Fill with value n-times array
     *
     * Examples:
     * fill(1, 2) -> [1, 1]
     */
    function fill(withValue, nTimes, array) {
        array = is('array', array) ? array : [];
        while(nTimes--) {
            array.push(withValue);
        }
        return array;
    }

    function first(array) {
        return get(0)(array);
    }

    /**
     * Apply arguments to function
     *
     * Examples:
     * apply(addition, [1,2]) -> 3
     * apply(addition, [1,2], [2,3]) -> [3, 5]
     */
    function apply(func, args, more) {
        func = first(slice(arguments, 0, 1));
        args = slice(arguments, 1);
        var result = map(args, function(args) {
            return func.apply(null, args);
        });
        return more ? result : first(result);
    }

    /**
     * Map function
     *
     * Examples:
     * map([1, 2, 3], addOne) -> [2, 3, 4]
     * map([1, 2, 3], [2, 3, 6], addOne) -> [[2, 3, 4], [3, 4, 7]]
     *
     * @return []
     */
    function map(data, func, more) {
        data = slice(arguments, 0, -1);
        func = first(slice(arguments, -1));
        var result = [];
        forEach(data, function(item, idx){
            result[idx] = [];
            forEach(item, function(value, col) {
                result[idx][col] = func(value);
            })
        });
        return more ? result : first(result);
    }

    // (function(a, b, c, d)) -> a(b)(c)(d)
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

    /**
     * Return value function
     * Example: rv(1) -> 1
     */
    function rv(item) {
        return item;
    }

    /**
     * Return monadic value
     * Example: mv(1) -> f() -> 1
     */
    function mv(value) {
        return function() {
            return value;
        }
    }

    // in alphabetical order
    exports.apply     = apply;
    exports.compose   = compose;
    exports.curry     = curry;
    exports.fargsc    = fargsc;
    exports.fill      = fill;
    exports.filter    = filter;
    exports.forEach   = forEach;
    exports.get       = get;
    exports.is        = is;
    exports.map       = map;
    exports.maybe     = maybe;
    exports.mv        = mv;
    exports.reduce    = reduce;
    exports.transpose = transpose;
    exports.rv        = rv;
    exports.slice     = slice;

})(exports || this);