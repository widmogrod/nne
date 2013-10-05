(function(){
    "use strict";

    console.log('forward stream');

    function mValue(state) {
        return function(func) {
            return typeof func === 'function' ? func(mValue(state)) : state;
        }
    }
    function mAddOne(mv) {
        return mValue(mv() + 1);
    }
    function mMinusOne(mv) {
        return mValue(mv() - 1);
    }

    function mDisplay(mv) {
        console.log(mv())
        return mv;
    }

    mValue(10)(mAddOne)(mAddOne)(mDisplay)(mAddOne)(mAddOne)(mDisplay);

})();

(function(){
    "use strict";
    console.log('reverse stream');

    function mValue(state) {
        return function monadic() {
            return state;
        }
    }

    function postphone(func, next) {
        if (next.name === 'monadic') {
            return func(next);
        }

        return function postphoned(forward) {
            if (forward.name === 'monadic') {
                return next(func(forward));
            } else {
                return postphone(
                    postphone(func, next),
                    forward
                );
            }
        }
    }

    function mAddOne(mv) {
        if (mv.name === 'monadic') {
            return mValue(mv() + 1) ;
        }

        return postphone(mAddOne, mv);
    }

    function mDisplay(mv) {
        if (mv.name === 'monadic') {
            console.log('mDisplay', mv());
            return mv;
        }

        return postphone(mDisplay, mv);
    }

    function A(mv) {
        console.log('A', mv());
        return mv;
    }
    function B(mv) {
        console.log('B', mv());
        return mv;
    }

    console.log(postphone(A, B)(mValue(10)));

    function C(write) {
        if (write.name === 'monadic') {
            console.log('C inside', write);
            return mValue(write() + 1);
        }

        return postphone(C, read);
    }

    // console.log('C write', C(mValue(10)));
    // console.log('C read', (C)(C)(mValue(10))());

    console.log('short');
    (mAddOne)(mDisplay)
    (mValue(10));

    console.log('long');
    (mAddOne)(mAddOne)(mDisplay)
    (mAddOne)(mAddOne)(mDisplay)
    (mValue(10));

    // Output:
    // A 10
    // B 10
    // [Function: monadic]
    // short
    // mDisplay 11
    // long
    // mDisplay 12
    // mDisplay 14

})();

var f = require('./functional.js');

(function(){
    "use strict";

    console.log('promise monad ?')

    function mValue(state) {
        return function monadic() {
            return state;
        }
    }

    function mStateValue(value) {
        return function monadic(state) {
            return {value: value, state: state};
        }
    }

    function mBindState(mState, func) {
        return function(state) {
            var v, s, r;
            r = mState(state);
            v = r.value;
            s = r.state;
            // For function aware of state
            // return func(v)(s);
            // For function un-aware of state
            return mStateValue(func(v))(s);
        }
    }

    function consume(obj, prop) {
        return function eat(func) {
            obj[prop] = obj[prop] ? postphone(obj[prop], func) : func;
            return consume(obj, prop);
        }
    }

    function mConsume(state) {
        return function eat(func) {
            state.one = state.one ? postphone(state.one, func) : func;
            return mConsume(state);
        }
    }

    function mAddOne(mv) {
        return mValue(mv() + 1) ;
    }

    function mDisplay(mv) {
        console.log('mDisplay', mv());
        return mv;
    }

    function postphone(func, next) {
        if (next.name === 'monadic') {
            return func(next);
        }

        return function postphoned(forward) {
            if (forward.name === 'monadic') {
                return next(func(forward));
            } else {
                return postphone(
                    postphone(func, next),
                    forward
                );
            }
        }
    }

    var event = {
        queue: {},
        on: function(name) {
            this.queue[name] = this.queue[name] ? this.queue[name] : [];
            return consume(this.queue[name], this.queue[name].length);
        },
        trigger: function(name, value) {
            var i = 0, length = this.queue[name].length;
            for (; i < length; i++) {
                this.queue[name][i](value);
            }
        }
    };

    event.on('click')(mAddOne)(mDisplay)(mAddOne)(mAddOne)(mDisplay);
    event.trigger('click', mValue(10));

}());