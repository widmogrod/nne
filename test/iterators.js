var i = require('../iterators.js');

describe('Iterators', function(){
    describe('Iterator', function(){
        var data, object;

        beforeEach(function() {
            data = ['a', 'b', 'c'];
            object = new i.Iterator(data);
        })

        it('should be a object', function(){
            object.should.be.a('object');
        })
        it('should rewind to beginning', function(){
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0]);

            object.next();

            object.key().should.be.eql(1);
            object.current().should.be.eql(data[1]);

            while(object.valid()) {
                object.next();
            }

            object.valid().should.be.false;
            object.rewind();
            object.valid().should.be.true;

            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0]);
        })
        it('should have valid iteration flow', function(){
            object.valid().should.be.true;
            object.current().should.be.eql(data[0]);
            object.key().should.be.eql(0);
            object.next();
            object.current().should.be.eql(data[1]);
            object.key().should.be.eql(1);
            object.rewind();
            object.current().should.be.eql(data[0]);
            object.key().should.be.eql(0);
        })
        it('should finish iteration', function(){
            var count = 0;
            object.rewind();
            while(object.valid()) {
                ++count;
                object.current().should.be.eql(data[object.key()]);
                object.next();
            }
            object.key().should.be.eql(count);
        })
    })
    describe('IteratorIterator', function(){
        var data, object;

        beforeEach(function() {
            data = ['a', 'b', 'c'];
            object = new i.IteratorIterator(new i.Iterator(data))
        })

        it('should be a object', function(){
            object.should.be.a('object');
        })
        it('should accept only Iterators', function(){
            try {
                new i.IteratorIterator(data);
                should.fail();
            } catch(e) {
                e.should.be.a('object');
            }
        })
        it('should rewind to beginning', function(){
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0]);

            object.next();

            object.key().should.be.eql(1);
            object.current().should.be.eql(data[1]);

            while(object.valid()) {
                object.next();
            }

            object.valid().should.be.false;
            object.rewind();
            object.valid().should.be.true;

            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0]);
        })
        it('should have valid iteration flow', function(){
            object.valid().should.be.true;
            object.current().should.be.eql(data[0]);
            object.key().should.be.eql(0);
            object.next();
            object.current().should.be.eql(data[1]);
            object.key().should.be.eql(1);
            object.rewind();
            object.current().should.be.eql(data[0]);
            object.key().should.be.eql(0);
        })
        it('should finish iteration', function(){
            var count = 0;
            object.rewind();
            while(object.valid()) {
                ++count;
                object.current().should.be.eql(data[object.key()]);
                object.next();
            }
            object.key().should.be.eql(count);
        })
    })
    describe('RecursiveIterator', function(){
        var data, func, object;

        beforeEach(function() {
            data = [['a','aa', 'aaa'], ['b','bb','bbb'], ['c','cc','ccc']]
            func = function(value) {
                if (Array.isArray(value)) {
                    return new i.Iterator(value);
                }
            }
            object = new i.RecursiveIterator(new i.Iterator(data), func)
        })

        it('should be a object', function(){
            object.should.be.a('object');
        })
        it('should accept only Iterators', function(){
            try {
                new i.IteratorIterator(data);
                should.fail();
            } catch(e) {
                e.should.be.a('object');
            }
        })
        it('second argument should be function', function(){
            try {
                new i.IteratorIterator(new i.Iterator(), data);
                should.fail();
            } catch(e) {
                e.should.be.a('object');
            }
        })
        it('should rewind to beginning', function(){
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0][0]);

            object.next();

            object.key().should.be.eql(1);
            object.current().should.be.eql(data[0][1]);

            while(object.valid()) {
                object.next();
            }

            object.valid().should.be.false;
            object.rewind();
            object.valid().should.be.true;

            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0][0]);
        })
        it('should have valid iteration flow', function(){
            object.valid().should.be.true;
            object.current().should.be.eql(data[0][0]);
            object.key().should.be.eql(0);
            object.next();
            object.current().should.be.eql(data[0][1]);
            object.key().should.be.eql(1);
        })
        it('should iterate to the end', function(){
            // a
            object.rewind();
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[0][0]);

            // aa
            object.next();
            object.key().should.be.eql(1);
            object.current().should.be.eql(data[0][1]);

            // aaa
            object.next();
            object.key().should.be.eql(2);
            object.current().should.be.eql(data[0][2]);

            // b
            object.next();
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[1][0]);

            // bb
            object.next();
            object.key().should.be.eql(1);
            object.current().should.be.eql(data[1][1]);

            // bbb
            object.next();
            object.key().should.be.eql(2);
            object.current().should.be.eql(data[1][2]);

            // c
            object.next();
            object.key().should.be.eql(0);
            object.current().should.be.eql(data[2][0]);

            // cc
            object.next();
            object.key().should.be.eql(1);
            object.current().should.be.eql(data[2][1]);

            // ccc
            object.next();
            object.key().should.be.eql(2);
            object.current().should.be.eql(data[2][2]);

            // end
            object.next();
            object.key().should.be.eql(3);
            object.valid().should.be.false;
        })

        it('should iterate to the end', function(){
            var count = 0;
            object.rewind();
            while(object.valid()) {
                ++count;
                object.next();
            }
            count.should.be.eql(9);
        })
        it('should return valid current value after calling only next()', function(){
            object.next(); object.next(); object.next();
            object.next(); object.next(); object.next();
            object.next(); object.next();

            object.current().should.be.eql('ccc');
        })
    })
});