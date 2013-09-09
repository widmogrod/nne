var f = require('../functional.js');

var concat = function(a, b) {
    return a + '::' + b;
}

var data = ['a', 'b', 'c', 'd'];

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