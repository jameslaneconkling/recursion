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
 *                         // this funny trick only works if recursiveFn is defined in the same scope as this
 *                         // assignment that overwrites it.  I.e. if it is imported as a module, recursiveFn's internal
 *                         // calls to itself will continue to point to the original function, rather than to
 *                         // the decorated function
 *                         // Note: the same outcome could be achieved, more or less, with the Y combinator
 *                         // http://matt.might.net/articles/implementation-of-recursive-fixed-point-y-combinator-in-javascript-for-memoization/
 * tracedFn(input);
 * tracedFn.printCallStack();
 */

module.exports = function(fn) {
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
    for (var id in _callStack) {
      var stack = _callStack[id],
          parent = stack.parent,
          input = JSON.stringify(stack.input),
          output = JSON.stringify(stack.output);

      console.log('Callstack', id, 'Parent', parent, '\n\tInput:', input, '\n\tOutput:', output);
    }
  };

  recursiveDecorator.callStack2GraphJSON = function() {
    return Object.keys(_callStack).reduce(function(graph, key, idx) {
      graph.nodes.push({
        id: +key,
        input: _callStack[key].input,
        output: _callStack[key].output
      });

      if (_callStack[key].parent !== -1) {
        graph.edges.push({
          source: _callStack[key].parent,
          target: +key
        });
      }
      return graph;
    }, {nodes: [], edges: []});
  };

  return recursiveDecorator;
};


// // doesn't work, b/c while recursiveDecorator can be made to pass additional arguments to fn,
// // fn won't in turn forward those back on to the next recursiveDecorator call
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
