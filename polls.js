// variables
let maxOptions = 10;

// don't change
let ss = false;
let optionIndex = 2;
let selected = {
    setMax: false,
    textField: false,
    multipleAnswers: false
}
let codeHasSpaces = 0;
let optionIsMissing = 0;

// menu
document.getElementById('polls-create').style.visibility = 'hidden';
document.getElementById('polls-answer').style.visibility = 'hidden';
document.getElementById('polls-results').style.visibility = 'hidden';

function searchPoll(){

}

function showCreate(){
    document.getElementById('polls-create').style.visibility = 'visible';
    document.getElementById('polls-menu').style.visibility = 'hidden';
}
function showAnswer(){
    document.getElementById('polls-answer').style.visibility = 'visible';
    document.getElementById('polls-menu').style.visibility = 'hidden';
}
function showResults(){
    document.getElementById('polls-results').style.visibility = 'visible';
    document.getElementById('polls-menu').style.visibility = 'hidden';
}


// create 
function addOption(){
    if (optionIndex < maxOptions){
        optionNode = document.getElementById('polls-option' + optionIndex);
        optionIndex++;
        option = "<input type='text' id='polls-option" + optionIndex + "' name='option" + optionIndex + "' placeholder='Option "+ optionIndex +"'/>";
        optionNode.insertAdjacentHTML('afterend', option);
    }
}
function removeOption(){
    if (optionIndex > 2){
        optionNode = document.getElementById('polls-option' + optionIndex);
        optionNode.remove();
        optionIndex--;
    }
}
function showSettings(){
    if (!ss){
        settingsNode = document.getElementById('polls-show-settings');
        settings = "<div id='polls-settings'> <a href = '#' id='polls-set-max' onclick = 'setMax();'>Set max</a> <a href = '#' id='polls-textField' onclick = 'textField();'>Text field</a> <a href = '#' id='polls-multiple-answers' onclick = 'multipleAnswers();'>Select multiple answers</a> </div>";
        settingsNode.insertAdjacentHTML('afterend', settings);
        ss = true;
    } else {
        settingsNode = document.getElementById('polls-settings');
        settingsNode.remove();
        ss = false;
    }
}

function setMax(){
    
    selected.setMax = !selected.setMax;
    if (selected.setMax == true){
        document.getElementById("polls-set-max").innerHTML = "Set max !";
    } else {
        document.getElementById("polls-set-max").innerHTML = "Set max";
    }
}
function textField(){
    selected.textField = !selected.textField;
    if (selected.textField == true){
        document.getElementById("polls-textField").innerHTML = "Text field !";
    } else {
        document.getElementById("polls-textField").innerHTML = "Text field";
    }
}
function multipleAnswers(){
    selected.multipleAnswers = !selected.multipleAnswers;
    if (selected.multipleAnswers == true){
        document.getElementById("polls-multiple-answers").innerHTML = "Select multiple answers !";
    } else {
        document.getElementById("polls-multiple-answers").innerHTML = "Select multiple answers";
    }
}


function createPoll(){
    let pollCode =  document.getElementById("polls-code").value;
    let pollData = {
        "title": document.getElementById("polls-title").value,
        "options": {
            "option1":  document.getElementById("polls-option1").value,
            "option2":  document.getElementById("polls-option2").value,
        },
        "settings": {
            "setMax": selected.setMax,
            "textField": selected.textField,
            "multiple-answers": selected.multipleAnswers
        }
    }
    for (let i = 3; i <= optionIndex; i++){
        console.log("it's working")
        pollData["options"]["option" + i] = document.getElementById("polls-option" + i).value;
    }
    
    if (/^ *$/.test(pollData.options.option1) || /^ *$/.test(pollData.options.option2)) {
        if (optionIsMissing == 0){
            optionIsMissing++
            document.getElementById('polls-options-container').insertAdjacentHTML('afterend', "<span id='polls-option-missing'> <-- Error: insert at least 2 options</span>");
        } else if (optionIsMissing == 1){
            optionIsMissing++
            document.getElementById("polls-option-missing").innerHTML = "<-- Error: insert at least 2 options !"
        } 
        return 1;
    }

    if (/\s/.test(pollCode) || /^ *$/.test(pollCode)) {
        if (codeHasSpaces == 0){
            codeHasSpaces++
            document.getElementById('polls-code').insertAdjacentHTML('afterend', "<span id='polls-code-spaces'> <-- Error: don't use spaces in the code</span>");
        } else if (codeHasSpaces == 1){
            codeHasSpaces++
            document.getElementById("polls-code-spaces").innerHTML = "<-- Error: don't use spaces in the code !"
        }
        return 1;
    }
    
    window.sendPoll(pollCode, pollData);
}
