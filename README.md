fk
===

A tiny curry library.


Curry: `fk()`
---

A special kind of function currying.

If fewer than the expected number of arguments are supplied, then the
function is partialled and re-curried.

If the exact number of arguments are supplied, then the curried function is
applied with all the appropriate arguments and the result returned.

If more that the expected number of arguments are supplied, then the curried
function is applied with the number of arguments it expects.  The result of
which is then expected to be a function and is applied the rest of the
arguments.

Accepts an optional expected argument count - defaults to function.length.

```
@param f :: Function
@param _n :: Optional Nat
```

Example:

```js
var f = fk(function (a, b) {
  return fk(function (c, d) {
    return [a, b, c, d]
  })
})

[1, 2, 3, 4]
= f(1, 2, 3, 4)
= f(1)(2, 3, 4)
= f(1, 2)(3, 4)
= f(1, 2, 3)(4)
= f(1, 2)(3)(4)
= f(1)(2, 3)(4)
= f(1)(2)(3, 4)
= f(1)(2)(3)(4)
```


Varargs: `fk.vargs(f)`
---

Convert a function that accepts an array to a variadic function.

Given a function `f`, produce a function that when applied, apply `f` with
an array of all the arguments supplied.

```
@param f :: [*] -> a
@returns :: (...) -> a
```


Variadic Apply: `fk.vapply(f, args)`
---

Apply a function given an array of arguments.

```
@param f :: (...) -> a
@param args :: [*]
@returns a
```


Partial Apply: `fk.papply(f, args)`
---

Given a function `f`, and an array of arguments `args`; produce a function
that when applied with `nargs` will apply `f` with the `args` prepended to
`nargs`.

```
@param f :: (...) -> a
@param args :: [*]
@returns :: (...) -> a
```
