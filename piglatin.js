// var userInput = prompt("Please enter word or phrase")
// this is to locate array index for vowels

//**TO DO:  Y as a consonant and a vowel, .html windows to emulate google translate, punctuation regex, sourceArray.join is not a function error in live

const vowels = ["a", "e", "i", "o", "u"]
var digits = /\d+/
// var  userInput = prompt('Enter words')


function fromWebPage(){
  var userInput = document.getElementById('phrase').value;
  userInputLowerCase = userInput.toLowerCase()
  console.log(userInput);
  return userInputLowerCase.split(/\W+/)
}

function prepWord(str){
  let strArr = str.split('')
  return strArr
}

function vowelPosition(str){
  // let lowerCaseStr = str.toLowerCase()
  // let strArr = lowerCaseStr.split('')
  let strArr =  prepWord(str)
  // If the first letter in our array include vowel array
  if (vowels.includes(strArr[0])){
    //If true return string(covert!) plus add way to the end
    return strArr.join("") + "way"
  }
}

function testConsonants(str){
  let regex = /[a,e,i,o,u]/gi;
  var match = regex.exec(str);
if (match) {
  var x = match.index;
}
var cons = str.substr(0,x)
var vow = str.substr(x)
var finalWord = vow + cons + "ay"
return finalWord
}

function quTest(str){
  var begin = str.substr(2)
  return begin + "quay"
}

function mapString(sourceArray){
  var sentaceArray = sourceArray.map(value => wordFilter(value))
  return restoreToString(sentaceArray)
}

function wordFilter(str){
    if (str.startsWith("qu")){
      return quTest(str)
    }else if(digits.test(str)){
        return str
    }else if (!str.startsWith("qu") && !vowels.includes(str.substr(0,1))){
      return testConsonants(str)
    }else if(vowels.includes(str.substr(0,1))){
      return vowelPosition(str)
    }
}

function restoreToString(sourceArray){
  var split = sourceArray.join(" ");
  return document.getElementById("answer").innerHTML = split
}

function mainProgramme(){
  var userIn = fromWebPage()
  var pigArray = mapString(userIn)
  restoreToString(pigArray)
}


// mapString(fromWebPage())
