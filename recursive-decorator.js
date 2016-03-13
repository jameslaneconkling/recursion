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

module.exports = trace;
