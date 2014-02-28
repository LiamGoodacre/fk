var should = require('should')

var _f = require('../index')


describe('vargs', function () {
  it('passes arguments as an array', function () {
    var fn = _f.vargs(function (args) { return args })
    should.deepEqual(fn(1, 2, 3), [1, 2, 3])
  })
})


describe('vapply', function () {
  it('apply a function with an array of arguments', function () {
    var fn = function (a, b, c) { return [a, b, c] }
    var out = _f.vapply(fn, [1, 2, 3])
    should.deepEqual(out, [1, 2, 3])
  })
})


describe('papply', function () {
  it('partially apply a function with arguments', function () {
    var ofn = function (a, b, c, d) { return [a, b, c, d] }
    var pfn = _f.papply(ofn, [1, 2])
    var out = pfn(3, 4)
    should.deepEqual(out, [1, 2, 3, 4])
  })
})


describe('_f', function () {
  it('allows different combinations of application', function () {
    var fn = _f(function (a, b) {
      return _f(function (c) {
        return _f(function(d, e, f) {
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
    var fn = _f(function (a, b, c) {
      return [a, b, c]
    }, 3)
    var out = fn()(1, 2)
    should.deepEqual(out, [undefined, 1, 2])
  })

  it('skips functions with no arguments', function () {
    var fn = _f(function (a, b, c) {
      return function (d, e, f) {
        return [a, b, c, d, e, f]
      }
    }, 0)
    var out = fn(1, 2, 3)
    should.deepEqual(out, [undefined, undefined, undefined, 1, 2, 3])
  })
})
