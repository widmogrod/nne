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
var concatPlus = f.curry(concat, '+');

var result = f.map(data, concatPlus);
console.log(result);

// Three
var contactUndersocre = f.curry(concat, '_');
var contactByPlusAndUndersoce = f.compose(concatPlus, contactUndersocre);

var result = f.map(data, contactByPlusAndUndersoce);
console.log(result);

// Four
var abc = function(a, b, c) {
    return "$a = " + a + " $b = " + b + " $c = " + c;
}

var result = f.curry(abc);
console.log(result);
result = result(1);
console.log(result);
result = result(2);
console.log(result);
result = result(3);
console.log(result);

// Five
function z(func) {
    return function() {
        return func.apply(null, f.slice(arguments));
    }
};

var summation = function(data, func) {
    return f.reduce(
        data,
        f.compose(m.addition, func, f.rfunc),
        0
    );
}
var result = summation(datanum, function(item) {
    return ++item;
});
console.log(result);


// Five
var result = m.summation(datanum, function(item) {
    return item;
});
console.log(result);

// Six













