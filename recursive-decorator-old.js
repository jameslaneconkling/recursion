// doesn't work, b/c while recursiveDecorator can be made to pass additional arguments to fn,
// fn won't in turn forward those back on to the next recursiveDecorator call
var trace = function(fn, argCount) {
  if (typeof argCount !== 'number') {
    throw new Error('Must call trace with an argument count as the second argument');
  }

  var recursiveDecorator = function() {
    var inputArgs = Array.prototype.slice.apply(arguments),
        callStack = inputArgs[argCount] || {},
        callId = inputArgs[argCount + 1] || 0,
        parentId = inputArgs[argCount + 2] || null,
        functionArgs = inputArgs.slice(0, argCount);

    var output = fn.apply(this, functionArgs.concat(callStack, callId + 1, callId));

    callStack[callId] = {
      input: functionArgs,
      output: output,
      parent: parentId
    };

    // TODO - make this pure: pass in callStack, callId to recursive calls
    //        being sure to clone input and output so it is not mutated
    return output;
  };

  recursiveDecorator.getCallStack = function() {
    return _callStack;
  };

  function formatInput(input) {
    return input.reduce(function(joined, arg, idx, input){
      return joined + JSON.stringify(arg) + (idx === input.length ? ' ,' : '');
    }, '');
  }
  recursiveDecorator.printCallStack = function() {

    for (var id in _callStack) {
      var stack = _callStack[id],
          input = formatInput(stack.input),
          output = JSON.stringify(stack.output);

      console.log('Callstack', id, '. Input:', input, 'Output:', output);
    }
  };

  return recursiveDecorator;
};
