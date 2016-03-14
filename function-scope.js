/////////////////////////////////////////////////
// lexical scope of a function is determined by where a function defined, not where it is called
/////////////////////////////////////////////////
var x = 2;
function logX() { console.log(x); }

logX()
// > 2

(function() {
  var x = 3;
  logX();
}());
// > 2


/////////////////////////////////////////////////
// closures maintain references to objects even after the pointer has been reassigned
/////////////////////////////////////////////////

// e.g. a wrapper
var x = {i: 'am object one'};

function close(obj) {
  return function print() {
    console.log('input points to', obj);
  };
}

var closedX = close(x);
x = {i: 'am object two'};

closedX();
// > "input points to { i: 'am object one' }"

// e.g. an asynchronous function
var x = {i: 'am object one'};

function close(obj) {
  setTimeout(function() {
    console.log('input points to', obj);
  }, 100);
}

close(x);
x = {i: 'am object two'};
// > "input points to { i: 'am object one' }"

///////////////////////////////////////////////
// closures maintain references for local variables and argument variables,
// but not variables defined in parent scopes
///////////////////////////////////////////////

// No closure over logX()
var logX = function() { console.log('x'); };

function callGlobalLogX() { logX(); }

var logX = function() { console.log('y'); };

callGlobalLogX();
// > 'y'


// No Closure over logX()
var logX = function() { console.log('x'); };

function callGlobalLogX() {
  setTimeout(function() {
    logX();
  }, 100);
}

var logX = function() { console.log('y'); };

callGlobalLogX();
// > 'y'


// Closure over logX()
var logX = function() { console.log('x'); };

function callGlobalFn(fn) {
  return function() {
    fn();
  };
}

var logXClosure = callGlobalFn(logX);
var logX = function() { console.log('y'); };

logXClosure();
// > 'x'
