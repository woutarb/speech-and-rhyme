// Making sure speech is supported
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL';
    }
catch(e) {
    console.error(e);
}
// Voice recognition variables
var noteTextarea = $("#fWord");
var instructions = $("#instructions");
var noteContent ='';

// HTML and rhyme related variables
var rhymes = document.querySelector("#embed").textContent;
var resultDiv = document.querySelector("#resultDiv");
var resultH = document.querySelector('#resultH');
var resultP = document.querySelector("#resultP");
var userInput1 = localStorage.getItem("firstWord");
var userInput2 = localStorage.getItem("secondWord");
var result = localStorage.getItem("result");
var form1 =document.querySelector("#userData");
var form2 =document.querySelector("#userData2");
var compared = true;


// Voice recognition 

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds), don't need that with a single word
recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
        noteContent = transcript;
        noteTextarea.val(noteContent);
    }
};

recognition.onstart = function() { 
    instructions.text('Ik hoor je');
}

recognition.onspeechend = function() {
    instructions.text('Te lang stil, microfoon staat uit');
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
        instructions.text('Ik hoorde je niet, probeer het nog eens');  
    };
}

// Speechs related app buttons and input 
$('.start-record-btn').on('click', function(e) {
    if(e.target.id == "rcrd1"){
        noteTextarea = $("#fWord");
    }else if(e.target.id == "rcrd2"){
        noteTextarea = $("#sWord");
    }else{
        console.log("Error " + event.target.value);
    }

recognition.start();
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
    noteContent = $(this).val();
})


// Rhyme checker code
function comparison(){
    if(rhymes.indexOf(userInput2) >= 0 && userInput1 !== userInput2){
        return 1;
    }else{
        return 2;
    }
    console.log("comparison ran!")
}
// check that there's userINput, and display the result page
if (userInput2 != null || NaN){
    if(window.location.href.includes("result")){
    instructions[0].innerText ="Nog een keer!";
    for(i=0; i< document.querySelectorAll("form").length; i++){
        document.querySelectorAll("form")[i].style="display:none;";
    }
    document.querySelector("a").style="display: block;"
    resultDiv.style="height: 70%;"
}
// empty cookies so it doesnt always open the results aftwards
    localStorage.removeItem("result")
    userInput1 = wordCleanup(userInput1);
    userInput2 = wordCleanup(userInput2);

// switch case for displaying succesfull or not
switch(comparison()){
    case 1:
        resultH.innerHTML = "Bravo!"
        resultP.innerHTML = userInput2 + ' rijmt op ' + userInput1;
        localStorage.setItem("result", 'yes')
        document.body.style.backgroundColor = "#a500ba";
        compared = true;
    break;

    case 2:
        resultH.innerHTML = "Helaas!"
        resultP.innerHTML = userInput2 + ' rijmt niet op ' + userInput1;
        localStorage.setItem("result", 'no')
        document.body.style.backgroundColor = "#ed0707";
        document.querySelector("a").style="background-color: #a500ba; display: block;";
        compared = true;
    break;

// error case
    default:
        resultH = "Error!"
        resultP.innerHTML ="Er ging iets mis";
        localStorage.setItem("result", 'error')
        document.body.style.backgroundColor = "#FFDA00";
    break;
    }
// emptying out the storage 
    localStorage.removeItem('firstWord');
    localStorage.removeItem('secondWord');
}
// Making sure the last word is grabbed, no spaces, et cetera
function wordCleanup(input){
    wordEq =  input.trim().split(' ');
    return wordEq[wordEq.length-1]
}
