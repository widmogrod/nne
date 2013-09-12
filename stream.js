function a(x) {
    console.log('a with x = ', x);
    return function() {
        return x;
    };
}
function b(y) {
    console.log('b with x = ', y);
    return function() {
        return x;
    };
}
function c(z) {
    console.log('c with z = ', z);
    return function() {
        return x;
    };
}

console.log('start');

a(b)(c)('1')

console.log('stop');