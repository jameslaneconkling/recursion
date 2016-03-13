/*
 * TRACE
 *
 * decorate a recursive function to trace function invocation, resolution, inputs and outputs
 * trace works by wrapping a recursive function and recording its input and output for each
 * call that it makes to itself
 *
 * Usage:
 *
 * var tracedFn = trace(recursiveFn);
 * recursiveFn = tracedFn; // overwrite reference to recursiveFn
 * tracedFn(input);
 * tracedFn.printCallStack();
 */

var trace = function(fn) {
  var _callStack,
      _callId,
      _parent = -1;

  var recursiveDecorator = function() {
    // set up callstack and parent index, resetting any previous values
    if (_parent === -1) {
      _callStack = {};
      _callId = 0;
    }

    var input = Array.prototype.slice.apply(arguments),
        id = _callId++,
        parent = _parent++,
        output = fn.apply(this, input); // call recursive function

    // backtrack parent id
    _parent--;

    _callStack[id] = {
      input: input,
      output: output,
      parent: parent
    };

    return output;
  };

  recursiveDecorator.getCallStack = function() {
    return _callStack;
  };

  recursiveDecorator.printCallStack = function() {
    function formatInput(input) {
      return input.reduce(function(joined, arg, idx, input) {
        return joined + JSON.stringify(arg) + (idx === input.length ? ' ,' : '');
       }, '');
    }

    for (var id in _callStack) {
      var stack = _callStack[id],
          parent = stack.parent,
          input = formatInput(stack.input),
          output = JSON.stringify(stack.output);

      console.log('Callstack', id, '. Parent', parent, '. Input:', input, 'Output:', output);
    }
  };

  return recursiveDecorator;
};


// let trace = function(fn) {
//   let recursiveDecorator = function(...arguments, callStack={}, ) {

//   }
// };

// doesn't work, b/c while recursiveDecorator can be made to pass additional arguments to fn,
// fn won't in turn forward those back on to the next recursiveDecorator call
// var trace = function(fn, argCount) {
//   if (typeof argCount !== 'number') {
//     throw new Error('Must call trace with an argument count as the second argument');
//   }

//   var recursiveDecorator = function() {
//     var inputArgs = Array.prototype.slice.apply(arguments),
//         callStack = inputArgs[argCount] || {},
//         callId = inputArgs[argCount + 1] || 0,
//         parentId = inputArgs[argCount + 2] || null,
//         functionArgs = inputArgs.slice(0, argCount);

//     var output = fn.apply(this, functionArgs.concat(callStack, callId + 1, callId));

//     callStack[callId] = {
//       input: functionArgs,
//       output: output,
//       parent: parentId
//     };

//     // TODO - make this pure: pass in callStack, callId to recursive calls
//     //        being sure to clone input and output so it is not mutated
//     return output;
//   };

//   recursiveDecorator.getCallStack = function() {
//     return _callStack;
//   };

//   function formatInput(input) {
//     return input.reduce(function(joined, arg, idx, input){
//       return joined + JSON.stringify(arg) + (idx === input.length ? ' ,' : '');
//     }, '');
//   }
//   recursiveDecorator.printCallStack = function() {

//     for (var id in _callStack) {
//       var stack = _callStack[id],
//           input = formatInput(stack.input),
//           output = JSON.stringify(stack.output);

//       console.log('Callstack', id, '. Input:', input, 'Output:', output);
//     }
//   };

//   return recursiveDecorator;
// };




