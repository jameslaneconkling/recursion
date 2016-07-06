//////////////////////////////////////////
var capitalize = function(collection) {
  if(collection.length === 0) {
    return [];
  }

  var first = collection[0],
      rest = collection.slice(1,collection.length);

  return [first.toUpperCase()].concat(capitalize(rest));
};

// var tCapitalize = trace(capitalize);
// capitalize = tCapitalize;

// capitalize(['a', 'c', 'd', 'f']);


//////////////////////////////////////////
var zip = function(arr1, arr2) {
  if (arr1.length === 0) {
    return [];
  }

  var first = [[arr1[0], arr2[0]]],
      restArr1 = arr1.slice(1, arr1.length),
      restArr2 = arr2.slice(1,arr2.length);

  return first.concat(zip(restArr1, restArr2));
};

// var tZip = trace(zip);
// zip = tZip;

// zip([1,2,3], ['a', 'b', 'c']);


//////////////////////////////////////////
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

// var tCartesianProd = trace(cartesianProduct);
// cartesianProduct = tCartesianProd;

// cartesianProduct(['a','b','c','d'], 3);


//////////////////////////////////////////
function curry(fn, ...curriedArgs) {
  return (...args) => {
    return fn.length > curriedArgs.length + args.length ?
      curry(fn, ...curriedArgs, ...args) :
      fn(...curriedArgs, ...args);
  }
}

// log(curry((a,b,c) => a + b + c, 1)(2,3));
// log(curry((a,b,c) => a + b + c)(1,2,3));
// log(curry((a,b,c) => a + b + c)(1)(2,3));
// log(curry((a,b,c) => a + b + c)(1,2)(3));
// log(curry((a,b,c) => a + b + c)(1)(2)(3));


exports.capitalize = capitalize;
exports.zip = zip;
exports.cartesianProduct = cartesianProduct;
exports.curry = curry;
