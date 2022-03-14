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
var resultP = document.querySelector("#resultP");
var userInput = localStorage.getItem("secondWord");
var compared = true;

// Feature variables
var mode;
/* Mode code; WIP
console.log(document.getElementById("title"));
if (document.getElementById("title").indexOf('Praat en rijm') >= 0){
    mode = 1;
}else if(document.getElementById("title").indexOf('Computer rijm') >= 0){
    mode = 2;
}else if(document.getElementById("title").indexOf('Gebruiker rijm') >= 0){
    mode = 3;
}else{
    console.log('title error')
}
  */


console.log(document.getElementById("title"));
console.log(mode);
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
    instructions.text('Stem herkenning staat aan. Spreek in de microfoon.');
}

recognition.onspeechend = function() {
    instructions.text('Je was een tijdje stil dus de stem herkenning zette zichzelf uit.');
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
        instructions.text('Ik hoorde niks, probeer het nog eens.');  
    };
}

// Speechs related app buttons and input 
$('.start-record-btn').on('click', function(e) {
    if(event.target.id == "rcrd1"){
        noteTextarea = $("#fWord");
    }else if(event.target.id == "rcrd2"){
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
    if(rhymes.indexOf(userInput) >= 0){
        return 1;
    }else{
        return 2;
    }
    console.log("comparison ran!")
}
if (userInput){
    wordEq =  userInput.trim().split(' ');
    userInput =wordEq[wordEq.length-1];
    switch(comparison()){
        case 1:
        resultDiv.style = "display: inline-flex;align-items: center;"
        resultP.innerHTML += "!"
        compared = true;
        break;

        case 2:
        resultDiv.style = "display: inline-flex;align-items: center;"
        resultP.innerHTML += "&nbsp;niet!"
        compared = true;
        break;

        default:
        resultDiv.style = "display: inline-flex;align-items: center;"
        resultP += "&nbsp;error! Er is mogelijk iets fout gegaan"
        break;
    }
    localStorage.removeItem("secondWord")
}
