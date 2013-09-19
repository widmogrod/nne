(function(exports, undefined){
    "use strict";

    /**
     * Check if object is given type
     */
    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas.toLowerCase() === type.toLowerCase();
    }

    /**
     * Slice arguments
     */
    function slice(args, begin, end) {
        return Array.prototype.slice.call(args, begin, end);
    }

    /**
     * Apply function on each data element
     */
    function forEach(data, func) {
        var i, length = data.length;
        for (i = 0; i < length; i++) {
            func(data[i], i);
        }
    }

    /**
     * Retrieve key on a object
     *
     * Example:
     * get(1)(['a','b','c']) -> 'b'
     * get('length')(['a','b','c']) -> 3
     */
    function get(key) {
        return function (obj) {
            return obj[key];
        }
    }

    /**
     * Return first element from array
     */
    function first(array) {
        return get(0)(array);
    }

    /**
     * Evaluate function only when value is defined
     */
    function maybe(value, fn) {
        return value === null || value === undefined ? value : fn(value);
    }

    /**
     * Check if value is array
     */
    function isArray(value) {
        return is('array', value);
    }

    /**
     * Check if value is object
     */
    function isObject(value) {
        return is('object', value);
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
        func = func || returnValue;

        if (!isArray(array)) {
            return [func(array)];
        }

        var result = [];
        forEach(array, function(value, col) {
            if (isArray(value)) {
                forEach(value, function(item, idx){
                    item = func(item);
                    result[idx] = result[idx] ? result[idx] : [];
                    result[idx][col] = item;
                });
            } else {
                result[col] = [func(value)];
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
        array = isArray(array) ? array : [];
        while(nTimes--) {
            array.push(withValue);
        }
        return array;
    }

    /**
     * Apply arguments to function
     *
     * Examples:
     * invoke(addition, [1,2]) -> 3
     * invoke(addition, [1,2], [2,3]) -> [3, 5]
     */
    function apply(func, args) {
        func = first(slice(arguments, 0, 1));
        args = slice(arguments, 1);
        var result = map(args, function(args) {
            switch(args && args.length) {
                case 0:  return func();
                case 1:  return func(args[0]);
                case 2:  return func(args[0], args[1]);
                default: return func.apply(null, args);
            }
        });
        return args.length > 1 ? result : first(result);
    }

    /**
     * Apply on list of arguments function but
     * arguments passed to function are each element from
     *
     * Example:
     * applyColumns(multiply, [2,3], [4,5]) -> [8, 15]
     *
     * @param  Function func
     * @param  Array args
     * @return Array
     */
    function applyColumns(func, args) {
        func = first(slice(arguments, 0, 1));
        args = slice(arguments, 1);
        return map(
            transpose(args),
            curry(apply, func)
        );
    }

    /**
     * Apply arguments to function
     *
     * Examples:
     * invoke(addition, [1,2]) -> 3
     * invoke(addition, [1,2], [2,3]) -> [3, 5]
     */
    function invoke(list, method, args) {
        list = first(slice(arguments, 0, 1));
        method = slice(arguments, 1, 2);
        args = slice(arguments, 2);
        return map(list, function(item) {
            return args ? item[method].apply(item, args) : item[method]();
        });
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
    function map(data, func) {
        data = slice(arguments, 0, -1);
        func = first(slice(arguments, -1));
        var result = [];
        forEach(data, function(item, idx){
            result[idx] = [];
            forEach(item, function(value, col) {
                result[idx][col] = func(value);
            })
        });
        return data.length > 1 ? result : first(result);
    }

    /**
     * Curry function
     *
     * Example:
     * curry(function(a, b, c, d)) -> a(b)(c)(d)
     */
    function curry(func) {
        var count = func.length;
        var args = slice(arguments, 1);
        if (!count)  {
            return func;
        }
        if (args.length < count) {
            return function carried() {
                var newArgs = [func];
                newArgs.push.apply(newArgs, args);
                newArgs.push.apply(newArgs, slice(arguments));
                return curry.apply(null, newArgs);
            }
        } else {
            return func.apply(null, args);
        }
    }

    /**
     * Composer function argument via another functions
     */
    function compose(base, first) {
        var more = arguments.length > 2;
        var functions = slice(arguments, 1);
        return function() {
            var args = slice(arguments);
            return base.apply(null, map(functions, function(func){
                return func.call(null, more ? args.shift() : args);
            }));
        }
    }

    /**
     * Reduce array to base using function
     */
    function reduce(data, func, base) {
        forEach(data, function(item) {
            base = func(item, base);
        });
        return base;
    }

    /**
     * Return new array containing values validated by function
     */
    function filter(data, func) {
        var result = [];
        forEach(data, function(item, i) {
            if (func(item, i)) {
                result.push(item);
            }
        });
        return result;
    }

    /**
     * Return value function
     * Example: returnValue(1) -> 1
     */
    function returnValue(item) {
        return item;
    }

    /**
     * Return monadic value
     * Example: mv(1) -> f() -> 1
     */
    function mValue(value) {
        return function() {
            return value;
        }
    }

    // in alphabetical order
    exports.apply       = apply;
    exports.applyColumns= applyColumns;
    exports.compose     = compose;
    exports.curry       = curry;
    exports.fill        = fill;
    exports.filter      = filter;
    exports.forEach     = forEach;
    exports.get         = get;
    exports.invoke      = invoke;
    exports.is          = is;
    exports.isArray     = isArray;
    exports.isObject    = isObject;
    exports.map         = map;
    exports.maybe       = maybe;
    exports.mValue      = mValue;
    exports.reduce      = reduce;
    exports.transpose   = transpose;
    exports.returnValue = returnValue;
    exports.slice       = slice;

})(exports || this);