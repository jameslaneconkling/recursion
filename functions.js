//////////////////////////////////////////
var capitalize = function(collection) {
  if(collection.length === 0) {
    return [];
  }

  var first = collection[0],
      rest = collection.slice(1,collection.length);

  return [first.toUpperCase()].concat(capitalize(rest));
};

var tCapitalize = tag(capitalize, 1);
capitalize = tCapitalize;

capitalize(['a', 'c', 'd', 'f']);


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

var tZip = tag(zip, 2);
zip = tZip;

zip([1,2,3], ['a', 'b', 'c']);


//////////////////////////////////////////
var treeRecurse = function() {

};
