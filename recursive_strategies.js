/*
 * An exploration and visualization of recursive strategies
 *
 *
 *
 */

/*  IMPURE APPROACH

    create a recursive subroutine that modifies a
    variable in the subroutine's containing clojure
 */
var impureRecurse = function(collection){
  var sum = 0;

  function recurse(collection){
    if(collection.length === 0){ return; }
    sum += collection[0];
    recurse(collection.slice(1));
  }
  recurse(collection);

  return sum;
};


/*  RECURSE UP

    perform calculations as function returns up from the base case,
    arriving at a solution when the top-most recursive call returns

    this allows us to avoid modifying the function's arguments
 */
var recurseUp = function(collection){
  if(collection.length === 0){ return 0; }
  return collection[0] + recurseUp(collection.slice(1));
}


/*  RECURSE DOWN

    perform calculations as function recurses downwards,
    passing subsequent steps in the calculation as an additional argument,
    arriving at a solution when the base case is met

    this has the added benefit of being tail recursive
 */
var recurseDown = function(collection, solution){
  var solution = solution || 0;
  if(collection.length === 0){ return solution; }
  return recurseDown(collection.slice(1), solution + collection[0]);
}

// var data = [1,5,4,7,8];
// var impure = impureRecurse(data);
// var up = recurseUp(data);
// var down = recurseDown(data);

// console.log('impure recurse: ', impure);
// console.log('recurse up: ', up);
// console.log('recurse down: ', down);


// tag function invocation, resolution, inputs and outputs to map recursive structure
var tag = function(fn){
  var _callStack = {};

  var stackCount = 0;

  var counter = function(){
    return ++stackCount;
  };

  var wrappedFn = function(){
    var input = Array.prototype.slice.apply(arguments),
        callId = counter(),
        output = fn.apply(null, input);


    _callStack[callId] = {
      input: input,
      output: output,
      parent: null // TODO: how to pass parent id
    };

    return output;
  };

  wrappedFn.getCallStack = function(){
    return _callStack;
  };

  return wrappedFn;
}


// down
var taggedRecurseDown = tag(recurseDown);
recurseDown = taggedRecurseDown;

taggedRecurseDown([1,5,4,7,8]);


// up
var taggedRecurseUp = tag(recurseUp);
recurseUp = taggedRecurseUp;

taggedRecurseUp([1,5,4,7,8]);
