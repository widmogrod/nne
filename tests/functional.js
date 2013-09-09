var f = require('../functional.js');
var m = require('../matematical.js')

var concat = function(a, b) {
    return a + '::' + b;
}

var data = ['a', 'b', 'c', 'd'];
var datanum = [1,12,17,13,28,9];

// One
var result = f.map(data, function(item){ return '+' + item});
console.log(result);

// Two
var concatPlus = f.partial(concat, '+');

var result = f.map(data, concatPlus);
console.log(result);

// Three
var contactUndersocre = f.partial(concat, '_');
var contactByPlusAndUndersoce = f.compose(concatPlus, contactUndersocre);

var result = f.map(data, contactByPlusAndUndersoce);
console.log(result);

// Four
var summation = function(data, func) {
    var base = f.partial(f.reduce, data);
    var reduce = f.partial(base, 0);
    return reduce(function(base, item) {
        return m.addition(base, func(item));
    });
}
var result = summation(datanum, function(item) {
    return item;
});
console.log(result);

// Five
var result = m.summation(datanum, function(item) {
    return item;
});
console.log(result);