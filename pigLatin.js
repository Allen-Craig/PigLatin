//Pig Latin function with arg
function translatePigLatin(str) {
  //error if empty field
  if (str == "") {
    return "Error: please enter a word to translate.";
  }

  //create array for tracking vowels
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  //create array for tracking punctuation
  const punc = [".", "?", "!", ",", '"', "'"];

  //split the sentence into an array of words
  let sentence = str.split(/(?=[!?.,])|[_-\s]/).filter((x) => x); //.split divides int ordered list of substrings, .filter creates a new array from the elements
  let result = [];

  //iterate through sentence array and translate each word
  for (let i = 0; i < sentence.length; i++) {
    //split the current word by first vowel
    let arr = sentence[i].split(/([aeiouAEIOUyY])/).filter((x) => x); //.split divides int ordered list of substrings, .filter creates a new array from the elements
    let firstLetter = "";

    //set switch case based on first letters
    if (/[^a-zA-Z]/.test(arr[0])) {
      firstLetter = "punc";
    } else if (/[yY]/.test(arr)) {
      //Regex testing Y and y
      firstLetter = "y";
    } else if (vowels.indexOf(arr[0]) != -1) {
      //checking for vowels
      firstLetter = "vowel";
    }

    //switch statement for handling different word starts
    switch (firstLetter) {
      case "punc": //do nothing to avoid appending suffix to special characters
        break;
      case "vowel": //"vowel" case if string begins with vowel push "way"
        if (/[aeiouAEIOU]/.test(arr)) {
          //keeps vowel in same index if word begins with a vowel
          while (vowels.indexOf(arr[0].charAt(0)) == -1) {
            arr.push(arr.shift().toLowerCase());
          }
          arr.push("way");
        }
        break;
      case "y": //"y" case, if y or Y push "way"
        if (/[yY]/.test(arr[arr.length - 1])) {
          arr.push("way");
        }
        break;
      default:
        //default is shift string, use lowercase and push ay
        arr.push(arr.shift().toLowerCase());
        arr.push("ay");
        break;
    }

    //output arr of strings
    result.push(arr.join(""));
  }

  //return final string with spaces before punctuation removed
  return result.join(" ").replace(/\s([?.!,])/gi, "$1");
}

//Button Control
let tButton = document.getElementById("tButton");
tButton.onclick = function () {
  var inputText = document.getElementById("inputText").value;
  var outputText = (document.getElementById("outputText").value =
    translatePigLatin(inputText));
};

//Translate on enter press of button
function process(e) {
  let code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    //Enter keycode
    let inputText = document.getElementById("inputText").value;
    let outputText = (document.getElementById("outputText").value =
      translatePigLatin(inputText));
  }
}
