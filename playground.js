// var trace = require('./recursive-decorator');
// var functions = require('./functions');
var trace = require('/Users/james/Documents/Projects/recursion/recursive-decorator');
var functions = require('/Users/james/Documents/Projects/recursion/functions');

// can't import? importing must change lexical scoping of function
// var zip = functions.zip;
// var cartesianProduct = functions.cartesianProduct;

// var zip = function(arr1, arr2) {
//   if (arr1.length === 0) {
//     return [];
//   }

//   var first = [[arr1[0], arr2[0]]],
//       restArr1 = arr1.slice(1, arr1.length),
//       restArr2 = arr2.slice(1,arr2.length);

//   return first.concat(zip(restArr1, restArr2));
// };

// var tZip = trace(zip);
// zip = tZip;
// var result = zip([1,2,3], ['a', 'b', 'c']);

// console.log(result);
// tZip.printCallStack()
// tZip.callStack2GraphJSON();


var cartesianProduct = function(letters, length, word, words){
  // generate all possible word combinations of length 'length' using all characters in the 'letters' array,
  // using each letter any number of times (0+)
  word = word || '';
  words = words || [];

  if(word.length === length){
    return words.concat(word);
  }

  return letters.reduce(function(words, letter, idx){
    return cartesianProduct(letters, length, word + letter, words);
  }, words);
};

var tCartesianProd = trace(cartesianProduct);
cartesianProduct = tCartesianProd;
var result = cartesianProduct(['a','b','c'], 3);

tCartesianProd.printCallStack()
tCartesianProd.callStack2GraphJSON();


