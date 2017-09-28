/*
 * IMPURE APPROACH
 *
 * create a recursive subroutine that modifies a
 * variable in the subroutine's containing clojure
 */
var impureRecurse = function(collection){
  var sum = 0;

  function recurse([head, ...rest]){
    if (!head) {
      return;
    }
    sum += head;
    recurse(rest);
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
var recurseUp = function([head, ...rest]){
  if (!head) {
    return 0;
  }

  return head + recurseUp(rest);
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
var recurseDown = function([head, ...rest], solution = 0){
  if (!head) {
    return solution;
  }

  return recurseDown(rest, solution + head);
};

/*
 * RECURSE VIA CPS [continuation passing style]
 *
 * build a nested function to perform calculations as function recurses downwards.
 * like RECURSE UP, does not compute on the way down, but has the benefit of being tail recursive
 */

var recurseCPS = function([head, ...rest], cont = x => x) {
  if (!head) {
    return cont(0);
  }
  
  return recurseCPS(rest, x => cont(x + head));
}

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
