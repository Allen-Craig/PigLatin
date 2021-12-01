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
  let sentence = str.split(/(?=[!?.,])|[_-\s]/).filter((x) => x); 
  let result = [];

  //iterate through sentence array and translate each word
  for (let i = 0; i < sentence.length; i++) {
    let arr = sentence[i].split(/([aeiouAEIOUyY])/).filter((x) => x);
    let firstLetter = "";

    //set switch case based on first letters
    if (/[^a-zA-Z]/.test(arr[0])) {
      firstLetter = "punc";
    } else if (/[yY]/.test(arr)) {
      firstLetter = "y";
    } else if (vowels.indexOf(arr[0]) != -1) {
      firstLetter = "vowel";
    }

    //switch statement for handling different word starts
    switch (firstLetter) {
      case "punc": 
        break;
      case "vowel": 
        if (/[aeiouAEIOU]/.test(arr)) {
          while (vowels.indexOf(arr[0].charAt(0)) == -1) {
            arr.push(arr.shift().toLowerCase());
          }
          arr.push("way");
        }
        break;
      case "y":
        if (/[yY]/.test(arr[arr.length - 1])) {
          arr.push("way");
        }
        break;
      default:
        arr.push(arr.shift().toLowerCase());
        arr.push("ay");
        break;
    }


    result.push(arr.join(""));
  }


  return result.join(" ").replace(/\s([?.!,])/gi, "$1");
}


let tButton = document.getElementById("tButton");
tButton.onclick = function () {
  var inputText = document.getElementById("inputText").value;
  var outputText = (document.getElementById("outputText").value =
    translatePigLatin(inputText));
};


function process(e) {
  let code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    //Enter keycode
    let inputText = document.getElementById("inputText").value;
    let outputText = (document.getElementById("outputText").value =
      translatePigLatin(inputText));
  }
}
