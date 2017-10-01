// return max number in array
function max_max(arr){
  var max = arr.sort(function(a,b){return b-a});
  return max[0];
}

max_max([55,1,100000,900,12320000,9000000]);
/*
expected result : 12320000
function result: 12320000
*/


//return the numbers of vowel of string
function vowel_count(str){
  var vowel = ['a','e','i','o','u','y'];
  var countVowel = 0;
  for(var i=0;i<str.length;i++){
    for(var j=0;j<vowel.length;j++){
      if(str[i] === vowel[j]){
        countVowel += 1;
      }
    }
  }
  return countVowel;
}


vowel_count("superfragilisticexpialadocious");
/*
expected result : 14
function result: 14
*/





//return reverse string
function reverse(ustr){
  var newStr = ustr.split("");
  var reverseStr = "";
  for(var i=newStr.length - 1;i>=0;i--){
    reverseStr += newStr[i];
  }
  
  return reverseStr;
}


reverse("this is a string"); 
/*
expected result : 'gnirts a si siht'
function result: 'gnirts a si siht'

*/



