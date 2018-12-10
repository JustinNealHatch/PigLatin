const vowels = ["a", "e", "i", "o", "u",]
//Define a class to contain data from words inputted by user
class Word{
  constructor(word, punctuationCharacter, capital){
    this.sourceWord = word
    this.wordTidied = word.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()
    this.punctuation = punctuationCharacter
    this.capitalLetter = capital
    this.piglatinword = null
    this.finalWord = null
  }correctPuncAndCapital(){
    var finalWord = this.piglatinword
    if (this.capitalLetter){
      finalWord = this.piglatinword.charAt(0).toUpperCase()
                  + this.piglatinword.slice(1)
    }
    if(this.punctuation !== false){
      finalWord += this.punctuation
    } return  this.finalWord = finalWord
  }
}

// Use split to create an array of all the word entered by the user, split
//by white space
function createWordArray(){
  var userInput = document.getElementById('phrase').value;
  return userInput.split(/\s/i)
}

//Create of word object for each word. Update values depending on capital letter
// and punctuation
function createWordObject(wordsArray){
  var arrayOfWordObjects = []
  for(let word of wordsArray){
  var capital = false
  var pun = false
  let regexList = [/[A-Z]/g, /[!,?,,,.,:,;]/i]
  if (regexList[0].exec(word)){
    var capital = true
  }
  if (regexList[1].exec(word.slice(-1))){
    var pun = word.match(regexList[1])
  }
  arrayOfWordObjects.push(new Word(word, pun, capital))
}
return arrayOfWordObjects
}

//Loop through objects and call the wordFilter to update piglatin value in object
function mapString(wordObjectArray){
  for(let wordObj of wordObjectArray){
    wordObj.piglatinword = wordFilter(wordObj.wordTidied)
}
return wordObjectArray
}

//Logic to decide how to name piglatin words
function wordFilter(str){
  var digits = /\d+/
    if (str.startsWith("qu")){
      return `${str.substr(2)}quay`
    }else if(str.includes("y")){
      return yTests(str)
    }else if(digits.test(str)){
        return str
    }else if (!str.startsWith("qu") && !vowels.includes(str.substr(0,1))){
      return testConsonants(str)
    }else if(vowels.includes(str.substr(0,1))){
      return `${str}yay`
    }
}

// Finds position of first vowel and substrings the constanants out the joins the words together
function testConsonants(str){
  let regex = /[a,e,i,o,u]/gi;
  var match = regex.exec(str);
if (match) {
  var x = match.index;
}
return `${str.substr(x)}${str.substr(0,x)}ay`
}
//Used for input words that contain the letter Y
function yTests(str){
  if (str.startsWith('y')){
      return `${str.substr(1)}yay`
  }else if (str.length === 2){
    return  `y${str.substr(0,1)}ay`
  }else if(vowels.includes(str.substr(0,1))){
    return `${str}way`
  }else{
    let regex = /y/gi;
    var match = regex.exec(str);
    var x = match.index
    return `${str.substr(x)}${str.substr(0,x)}ay`
  }
}

//To hide an element on a HTML page
function hideDiv(div){
    var x = document.getElementById(div);
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

//Loop through objects, create final word based off of punctuation and
//capitalisaton. Then create a string to output to the HTML page
function restoreToString(array){
  var arrayOfFinalWords = []
  for(let word of array){
    word.correctPuncAndCapital()
    arrayOfFinalWords.push(word.finalWord)
  }
  let finalString = arrayOfFinalWords.join(" ")
  hideDiv("show")
  return document.getElementById("answer").innerHTML = finalString
}

//Main programme that contains the sub functions
function mainProgramme(){
let array = createWordArray()
let arrayOfObjects = createWordObject(array)
let arrayOfPigLatinObjects = mapString(arrayOfObjects)
restoreToString(arrayOfPigLatinObjects)
}
