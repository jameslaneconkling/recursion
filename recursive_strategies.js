/*
 * IMPURE APPROACH
 *
 * create a recursive subroutine that modifies a
 * variable in the subroutine's containing clojure
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


/*
 * RECURSE UP
 *
 * perform calculations as function returns up from the base case,
 * arriving at a solution when the top-most recursive call returns
 *
 * this allows us to avoid modifying the function's arguments
 */
var recurseUp = function(collection){
  if(collection.length === 0){ return 0; }
  return collection[0] + recurseUp(collection.slice(1));
};


/*
 * RECURSE DOWN
 *
 * perform calculations as function recurses downwards,
 * passing subsequent steps in the calculation as an additional argument,
 * arriving at a solution when the base case is met
 *
 * this has the added benefit of being tail recursive
 */
var recurseDown = function(collection, solution){
  solution = solution || 0;
  if(collection.length === 0){ return solution; }
  return recurseDown(collection.slice(1), solution + collection[0]);
};


/*
 * DEPTH FIRST TREE RECURSE
 *
 * useful for generating permutations or combinations or
 */
var depthTreeRecurse = function(letters, length, word, words){
  // generate all possible word combinations of length 'length' using all characters in the 'letters' array,
  // using each letter any number of times (0+)
  word = word || '';
  words = words || [];

  if(word.length === length){
    return words.concat(word);
  }

  return letters.reduce(function(words, letter, idx){
    return depthTreeRecurse(letters, length, word + letter, words);
  }, words);
};

var combinations = depthTreeRecurse(['a','b','c','d'], 3);
console.log(combinations);


/*
 * BREADTH FIRST TREE RECURSE
 *
 * BFS is not traditionally a recursive algorithm, as it uses a queue (rather than a stack)
 * and the order functions are called is determined by the call stack
 * a recursive BFS algorithm can be implemented via Iterative deepening depth-first search:
 * https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search
 */
