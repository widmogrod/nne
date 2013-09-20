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
    RecursiveIterator.constructor = RecursiveIterator;
    RecursiveIterator.prototype = new IteratorMock();
    RecursiveIterator.prototype.key = function() {
        // Because, current calculate children nodes
        this.current();
        return this.its[this.depth].key();
    }
    RecursiveIterator.prototype.valid = function() {
        // Because, current calculate children nodes
        this.current();
        return this.its[this.depth].valid();
    }
    RecursiveIterator.prototype.current = function() {
        var childs;
        while (this.hasChildrens()) {
            childs = this.getChildrens();
            this.its[++this.depth] = childs;
        }
        return this.its[this.depth].current();
    }
    RecursiveIterator.prototype.rewind = function() {
        this.depth = 0;
        this.its = [this.its[this.depth]];
        this.its[this.depth].rewind();
    }
    RecursiveIterator.prototype.next = function() {
        // Because, current calculate children nodes
        this.current();
        do
        {
            this.its[this.depth].next();
        } while(!this.its[this.depth].valid() && this.depth-- > 0);

        this.depth = this.depth < 0 ? 0 : this.depth
    }
    RecursiveIterator.prototype.getChildrens = function() {
        return this.func(this.its[this.depth].current());
    }
    RecursiveIterator.prototype.hasChildrens = function() {
        return this.getChildrens() instanceof IteratorMock;
    }

    exports.IteratorMock        = IteratorMock;
    exports.Iterator            = Iterator;
    exports.IteratorIterator    = IteratorIterator;
    exports.RecursiveIterator   = RecursiveIterator;

})(exports || this);