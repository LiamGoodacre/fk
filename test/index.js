var should = require('should')

var fk = require('../index')


describe('vargs', function () {
  it('passes arguments as an array', function () {
    var fn = fk.vargs(function (args) { return args })
    should.deepEqual(fn(1, 2, 3), [1, 2, 3])
  })
})


describe('vapply', function () {
  it('apply a function with an array of arguments', function () {
    var fn = function (a, b, c) { return [a, b, c] }
    var out = fk.vapply(fn, [1, 2, 3])
    should.deepEqual(out, [1, 2, 3])
  })
})


describe('papply', function () {
  it('partially apply a function with arguments', function () {
    var ofn = function (a, b, c, d) { return [a, b, c, d] }
    var pfn = fk.papply(ofn, [1, 2])
    var out = pfn(3, 4)
    should.deepEqual(out, [1, 2, 3, 4])
  })
})


describe('fk', function () {
  it('allows different combinations of application', function () {
    var fn = fk(function (a, b) {
      return fk(function (c) {
        return fk(function(d, e, f) {
          return [6, 5, 4, 3, 2, 1]
        })
      })
    })

    var out = [
      fn(1, 2, 3, 4, 5, 6),
      fn(1)(2, 3, 4, 5, 6),
      fn(1, 2)(3, 4, 5, 6),
      fn(1, 2, 3)(4, 5, 6),
      fn(1, 2, 3, 4)(5, 6),
      fn(1, 2, 3, 4, 5)(6),
      fn(1, 2)(3, 4)(5, 6),
      fn(1)(2, 3, 4, 5)(6),
      fn(1)(2, 3)(4, 5)(6),
      fn(1, 2, 3, 4, 5, 6),
      fn(1)(2)(3)(4)(5)(6)
    ]

    out.forEach(function (o) {
      should.deepEqual(o, [6, 5, 4, 3, 2, 1])
    })
  })

  it('pass undefined if no argument is given', function () {
    var fn = fk(function (a, b, c) {
      return [a, b, c]
    }, 3)
    var out = fn()(1, 2)
    should.deepEqual(out, [undefined, 1, 2])
  })

  it('skips functions with no arguments', function () {
    var fn = fk(function (a, b, c) {
      return function (d, e, f) {
        return [a, b, c, d, e, f]
      }
    }, 0)
    var out = fn(1, 2, 3)
    should.deepEqual(out, [undefined, undefined, undefined, 1, 2, 3])
  })
})
