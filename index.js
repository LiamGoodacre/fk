
/** Varargs
  * Convert a function that accepts an array to a variadic function.
  * 
  * Given a function `f`, produce a function that when applied, apply `f` with
  * an array of all the arguments supplied.
  * 
  * @param f :: [*] -> a
  * @returns :: (...) -> a
  */
var vargs = function (f) {
  return function () {
    return f.call(this, [].slice.call(arguments))
  }
}


/** Variadic Apply
  * Apply a function given an array of arguments.
  * 
  * @param f :: (...) -> a
  * @param args :: [*]
  * @returns a
  */
var vapply = function (f, args) {
  return f.apply(this, args)
}


/** Partial Apply
  * Given a function `f`, and an array of arguments `args`; produce a function
  * that when applied with `nargs` with apply `f` with the `args` prepended to
  * `nargs`.
  * 
  * @param f :: (...) -> a
  * @param args :: [*]
  * @returns :: (...) -> a
  */
var papply = function (f, args) {
  return vargs(function (nargs) {
    return f.apply(this, args.concat(nargs))
  })
}


/** Curry
  * A special kind of function currying.
  * 
  * If fewer than the expected number of arguments are supplied, then the
  * function is partialled and re-curried.
  * 
  * If the exact number of arguments are supplied, then the curried function is
  * applied with all the appropriate arguments and the result returned.
  * 
  * If more that the expected number of arguments are supplied, then the curried
  * function is applied with the number of arguments it expects.  The result of
  * which is then expected to be a function and is applied the rest of the
  * arguments.
  * 
  * Accepts an optional expected argument count - defaults to function.length.
  * 
  * @param f :: Function
  * @param _n :: Optional Nat
  */
var fk = module.exports = function recur(f, _n) {
  var n = (!(_n > -1) || arguments.length === 1) ? f.length : _n
  return vargs(function (_args) {
    var args = (_args.length === 0) ? [undefined] : _args
    var len = args.length

    //  not enough args passed
    if (!(len >= n)) return recur(papply(f, args), n - args.length)
    else {

      //  compute result with exact args
      var out = vapply(f, args.slice(0, n))
      return (len > n) ? vapply(out, args.slice(n)) : out
    }
  })
}

//  Expose utility functions
fk.vargs = vargs
fk.vapply = vapply
fk.papply = papply
