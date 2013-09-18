(function(exports) {
    "use strict";

    function IteratorMock() {}
    IteratorMock.constructor = IteratorMock;
    IteratorMock.prototype.key = function() {}
    IteratorMock.prototype.valid = function() {}
    IteratorMock.prototype.current = function() {}
    IteratorMock.prototype.rewind = function() {}
    IteratorMock.prototype.next = function() {}

    /**
     * Basic iterator implementation
     * @param Array data
     */
    function Iterator(data) {
        this.position = 0;
        this.count = data.length;
        this.data = data;
    }
    Iterator.constructor = Iterator;
    Iterator.prototype = new IteratorMock();
    Iterator.prototype.key = function() {
        return this.position;
    }
    Iterator.prototype.valid = function() {
        return this.position < this.count;
    }
    Iterator.prototype.current = function() {
        return this.data[this.position];
    }
    Iterator.prototype.rewind = function() {
        this.position = 0;
    }
    Iterator.prototype.next = function() {
        ++this.position;
    }

    /**
     * Allow iterate over iterator
     * @param IteratorMock it
     */
    function IteratorIterator(it) {
        if (!(it instanceof IteratorMock)) {
            throw new Error('Given iterator is not instance of "IteratorMock"');
        }

        this.it = it;
    }
    IteratorIterator.constructor = IteratorIterator;
    IteratorIterator.prototype = new IteratorMock();
    IteratorIterator.prototype.key = function() {
        return this.it.key();
    }
    IteratorIterator.prototype.valid = function() {
        return this.it.valid();
    }
    IteratorIterator.prototype.current = function() {
        return this.it.current();
    }
    IteratorIterator.prototype.rewind = function() {
        this.it.rewind();
    }
    IteratorIterator.prototype.next = function() {
        this.it.next();
    }

    /**
     * Recursive iterator
     * @param IteratorMock it
     * @param Function func
     */
    function RecursiveIterator(it, func) {
        if (!(it instanceof IteratorMock)) {
            throw new Error('Given iterator is not instance of "Iterator"');
        }
        if (typeof func !== 'function') {
            throw new Error('Given value is not a function but: ' + typeof func);
        }

        this.its = [it];
        this.func = func;
        this.depth = 0;

    }
    RecursiveIterator.constructor = IteratorIterator;
    RecursiveIterator.prototype = new IteratorMock();
    RecursiveIterator.prototype.key = function() {
        return this.its[this.depth].key();
    }
    RecursiveIterator.prototype.valid = function() {
        return this.its[this.depth].valid();
    }
    RecursiveIterator.prototype.current = function() {
        var current, nested, isNested;
        do {
            current = this.its[this.depth].current();
            nested = this.func(current);
            isNested = nested instanceof IteratorMock;
            if (isNested) {
                this.its[++this.depth] = nested;
            }
        } while(isNested);

        return current;
    }
    RecursiveIterator.prototype.rewind = function() {
        this.its = [this.its[0]];
        this.depth = 0;
    }
    RecursiveIterator.prototype.next = function() {
        do
        {
            this.its[this.depth].next();
            this.current();
        } while(!this.its[this.depth].valid() && --this.depth >= 0);

        this.depth = this.depth < 0 ? 0 : this.depth
    }

    exports.IteratorMock        = IteratorMock;
    exports.Iterator            = Iterator;
    exports.IteratorIterator    = IteratorIterator;
    exports.RecursiveIterator   = RecursiveIterator;

})(exports || this);