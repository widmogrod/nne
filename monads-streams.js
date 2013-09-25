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

// var nn = (mFeedForward)(mCalculateDelta)(mUpdateWeights);

// mValue(20)(nn);