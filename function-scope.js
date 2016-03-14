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


/////////////////////////////////////////////////
// closures maintain references to objects even after the pointer has been reassigned
/////////////////////////////////////////////////
var x = {i: 'am object one'};

function close(obj) {
  setTimeout(function() {
    console.log('input points to', obj);
  }, 100);
}

close(x);
x = {i: 'am object two'};
