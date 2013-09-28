(function(){
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


(function(){
    console.log('promise monad ?')

    function mValue(state) {
        return function monadic() {
            return state;
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
        one: null,
        on: function(name) {
            if (!this.queue[name]) {
                this.queue[name] = [];
            }
            return mConsume(this);

            // this.queue[name].push(mConsume());
            // return self.one = function a(func) {
            //     if (func.name === 'monadic') {
            //         return func;
            //     }

            //     return self.one = postphone(self.one, func);
            // };

            // return this.queue[name][this.queue[name].length - 1];
        },
        trigger: function(name, value) {
            // if (!this.queue[name]) {
            //     return;
            // }

            console.log('one', this.one(value));
            return;

            for(var i = 0, length = this.queue[name].length; i < length; i++) {
                console.log('i', i, name, this.queue[name][i](value)());
            }
        }
    };

    event.on('click')(mAddOne)(mDisplay)(mAddOne)(mDisplay);
    event.trigger('click', mValue(10));

}());