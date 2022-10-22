// Making sure speech is supported
try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'nl';

    var SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance
    var speechSynthesis = window.speechSynthesis || window.webkitspeechSynthesis
    //voices = speechSynthesis.getVoices();
    speech = new SpeechSynthesisUtterance();
    //speech.void = voices[0];
    speech.lang ='nl';
    }
catch(e) {
    console.error(e);
}

// UI sounds
var tap = new Audio('../static/sound/tap.wav');

// Voice recognition variables
var noteTextarea = $("#fWord");
var instructionContext;
if(localStorage.getItem("context") == NaN || localStorage.getItem("context") == null){
    localStorage.setItem("context", 2);
    console.log('init')
    instructionContext = 2;
}else{
    instructionContext = localStorage.getItem("context");
}
var noteContent ='';

// HTML and rhyme related variables
var rhymes = document.querySelector("#embed").textContent;
var resultDiv = document.querySelector("#resultDiv");
var resultH = document.querySelector('#resultH');
var userInput1 = localStorage.getItem("firstWord");
var userInput2 = localStorage.getItem("secondWord");
var result = localStorage.getItem("result");
var form1 =document.querySelector("#userData");
var form2 =document.querySelector("#userData2");
var continueBtn1 = document.getElementById('nonPoster1');
var continueBtn2 = document.getElementById('nonPoster2');
var continueBtn3 = document.getElementById('poster');
var rcdBtns = document.getElementsByClassName('start-record-btn');
var compared = true;

var responseArray = ['Welk bestaand woord rijmt op ', 'Welk echt woord rijmt op '];
var randomResponse;


// Voice recognition 
// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds), don't need that with a single word
recognition.continuous = false;

// This block is called every time the `Speech` APi captures a line. 
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

// text to speech function, just feed it a phrase and it should talk
function speak(phrase){
    speech.rate = .7;
    // speech.volume = ;
    speech.pitch = 1.1;
    speech.text = phrase;
    speechSynthesis.speak(speech);
}


recognition.onstart = function() { 
    tap.play();
    if((Number(instructionContext)%2) == 1 && Number(instructionContext) !=='1'){
        randomResponse = Math.floor(Math.random() * responseArray.length);
        speak(responseArray[randomResponse] + localStorage.getItem('firstWord') +'?');
        //speak('Welk woord rijmt op ' + localStorage.getItem('firstWord') +'?');
    }else{
        switch(Number(instructionContext)){
            case 1:
                speak('Zeg een woord');
            break;
        
            case 2:
                speak('Wat is dit?');
            break;

            case 4:
                speak('En deze draak heeft zin in eten, wat rijmt daar op?');
            break;
			
            case 6:
                speak('De draak maakte een fout! Welk woord rijmt er op fout?');
            break;
			
            case 8:
                speak('Help het codewoord zoeken zodat de draak weer weg kan. Noem een woord!');
            break;
			
            case 10:
                speak('We hebben het eerste stuk van de code, nog een keer! Geef me een woord');
            break;
			
            case 12:
                speak('Goed zo! Kom maar met die code! We zijn er bijna. Geef me een laatste woord!');
            break;
			
        // error case
            default:
                speak('Zeg een woord');
            break;
        }
    }
}

recognition.onspeechend = function() {
    speak('Ik heb je gehoord!');
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
        speak('Ik hoorde je niet goed, probeer het nog eens');
    };
}

// Speechs related app buttons and input 
$('.start-record-btn').on('click', function(e) {
    if(e.target.id == "rcrd1"){
        noteTextarea = $("#fWord");
    }else if(e.target.id == "rcrd2"){
        noteTextarea = $("#sWord");
    }else{
        console.log("Error " + e.target.value);
    }

recognition.start();
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
    noteContent = $(this).val();
})

// Rhyme checker code: checks the second userInput against the invisible embed to check if it rhymes according to the API, if it's not the same word and has a place in the array of the embed; it does.
function comparison(){
    if(rhymes.indexOf(userInput2) >= 0 && userInput1 !== userInput2){
        return 1;
    }else{
        return 2;
    }
}
// check that there's userinput, and display the result page
if (userInput2 != null || NaN){
    if(window.location.href.includes("result")){
    for(i=0; i< document.querySelectorAll("form").length; i++){
        document.querySelectorAll("form")[i].style="display:none;";
    }
    document.querySelector("a").style="display: block;"
    resultDiv.style="height: 70%;"
}
// empty cookies so it doesnt always open the results aftwards
    localStorage.removeItem("result")
    localStorage.removeItem("firstWord")
    localStorage.removeItem("secondWord")


// switch case for displaying 'succesful' or not
switch(comparison()){
    case 1:
        tap.play();
        resultH.style='display: block;';
        localStorage.setItem("result", 'yes')
        document.body.style.backgroundColor = "#a500ba";
        document.getElementById('dragon').style='display: none;';
        speak('Goed zo! Dat rijmt!');
        compared = true;
    break;

    case 2:
        tap.play();
        resultH.style='display: block;   transform: scale(1, -1);' ;
        localStorage.setItem("context", (Number(instructionContext))-2);
        localStorage.setItem("result", 'no')
        document.body.style.backgroundColor = "#C27342";
        document.querySelector("a").style="transform: rotate(180deg), display: block;";
        document.getElementById('dragon').style='display: none;';
        speak('Dat rijmt niet, jammer! Heb je toevallig een letter of een niet bestaand woord gebruikt?');
        compared = true;
    break;

// error case
    default:
        speak('Error, er ging iets mis');
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

//Event listeners for the form steps, to make sure they work gradually. They also make sure with the value of document form checkers that there has been input
continueBtn1.addEventListener("click", function(){ 
    if(document.forms['userData'].elements['fWord'].value !==''){
        localStorage.setItem('firstWord', wordCleanup(document.forms['userData'].elements['fWord'].value)); 
        document.getElementById('resultH').innerHTML = 'Welk woord rijmt op ' + localStorage.getItem('firstWord') + '?';
        document.getElementById('userData').style='display: none;';
        document.getElementById('userData2').style='display: block;';
        document.getElementById('dragon').style='display: none;';
        instructionContext++;
        localStorage.setItem("context", instructionContext);
        tap.play();
    }else{
        speak('Om dit te laten werken hebben we een woord nodig!');
    }
});

continueBtn2.addEventListener("click", function(){ 
    if(document.forms['userData2'].elements['sWord'].value !==''){
        localStorage.setItem('secondWord', wordCleanup(document.forms['userData2'].elements['sWord'].value)); 
        document.getElementById('userData2').style='display: none'; 
        document.getElementById('userData3').style='display: block'; 
        document.getElementById('dragon').style='display: none;';
        document.getElementById('resultH').innerHTML = 'Controleer nu of ' + localStorage.getItem('firstWord') + ' en ' + localStorage.getItem('secondWord') + ' rijmen!';
        document.forms['userData3'].elements['fWord'].value=localStorage.getItem('firstWord'); 
        instructionContext++;
        localStorage.setItem("context", instructionContext);
        tap.play();
    }else{
        speak('Om dit te laten werken hebben we een rijmwoord nodig voor' + localStorage.getItem('firstWord') + '!');
    }
});

continueBtn3.addEventListener("click", function(){ 
    tap.play();
});


