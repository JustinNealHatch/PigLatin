//**TO DO:
//Y as a consonant and a vowel
//html windows to emulate google translate
//punctuation regex,
//sourceArray.join is not a function error in live

const vowels = ["a", "e", "i", "o", "u",]
var digits = /\d+/

//Takes user input from the webpage and creates an array of each letter
function fromWebPage(){
  var userInput = document.getElementById('phrase').value;
  userInputLowerCase = userInput.toLowerCase()
  return userInputLowerCase.split(/\W+/)
}


//This makes a decision on what word function to use
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

// Creates an array using map. Map is using the wordFilter function
function mapString(sourceArray){
  var sentaceArray = sourceArray.map(value => wordFilter(value))
  return restoreToString(sentaceArray)
}

// Creates string and joins "way" to the string
function vowelPosition(str){
  let strArr = str.split('')
  // If the first letter in our array include vowel array
  if (vowels.includes(strArr[0])){
    //If true return string(covert!) plus add way to the end
    return strArr.join("") + "way"
  }
}

// Finds position of first vowel and substrings the constanants out the joins the words together
function testConsonants(str){
  let regex = /[a,e,i,o,u,y]/gi;
  var match = regex.exec(str);
if (match) {
  var x = match.index;
}
var cons = str.substr(0,x)
var vow = str.substr(x)
var finalWord = vow + cons + "ay"
return finalWord
}

//Gets rid of QU and adds quay to the end of the string
function quTest(str){
  var begin = str.substr(2)
  return begin + "quay"
}

function hideDiv(div){
    var x = document.getElementById(div);
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
}

//converts array with all words to a string and returns to the webpage
function restoreToString(sourceArray){
  var joinedString = sourceArray.join(" ");
  hideDiv("show")
  return document.getElementById("answer").innerHTML = joinedString
}

function mainProgramme(){
  var userIn = fromWebPage()
  var pigArray = mapString(userIn)
  restoreToString(pigArray)
}
