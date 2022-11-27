// variables
let maxOptions = 10;

// don't change
let ss = false;
let optionIndex = 2;
const selected = {
    setMax: false,
    textField: false,
    multipleAnswers: false,
    options: {
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
        option7: false,
        option8: false,
        option9: false,
        option10: false
    },
    optionNum: 0,
    settings: 0
}
let errorDisplayed = {
    search: false,
    create: false
}
let optionHtml = {
    option1: "something",
    option2: "something",
    option3: "something",
    option4: "something",
    option5: "something",
    option6: "something",
    option7: "something",
    option8: "something",
    option9: "something",
    option10: "something"
}
let pollData;
let pollCode;


// menu
document.getElementById('polls-create').style.visibility = 'hidden';
document.getElementById('polls-answer').style.visibility = 'hidden';
document.getElementById('polls-results').style.visibility = 'hidden';
document.getElementById('polls-menu-ar').style.visibility = 'hidden';

function searchPoll(){
    pollCode = document.getElementById('polls-enter-code').value;
    if (/\s/.test(pollCode) || /^ *$/.test(pollCode)) {
        if(!errorDisplayed.search){
            document.getElementById('polls-search-button').insertAdjacentHTML('afterend', "<span>Error: fill in all fields</span>");
            errorDisplayed.search = true;
        }
        return 1;
    }
    pollData = getPoll(pollCode);
    pollData.then( snapshot => {
        pollData = snapshot.val();
        if (snapshot.exists()){
            showMenuAr();
            document.getElementById("polls-answer-title").innerHTML = pollData.title;
            document.getElementById("polls-answer-message").innerHTML = pollData.message;
            for (let i = 1; i <= pollData.options.num; i++) {
                op = "<a href = '#' id='polls-option-" + i + "' onclick = 'optionClick(event);'>" + pollData["options"]["option" + i] + "</a>";
                optionHtml["option" + i] = pollData["options"]["option" + i];
                document.getElementById("polls-lalala").insertAdjacentHTML('beforeend', op);
            } 
            document.getElementById("polls-results-title").innerHTML = pollData.title;
            for (let i = 1; i <= pollData.options.num; i++) {
                op = "<a href = '#' id='polls-result-" + i + "' onclick = 'resultClick(event);'>" + pollData["options"]["option" + i] +  " - " + pollData.results["option" + i] + "</a>";
                optionHtml["option" + i] = pollData["options"]["option" + i];
                document.getElementById("polls-idk").insertAdjacentHTML('beforeend', op);
            }
        } else {
            return 1;
        }
    });   
}

function showMenuAr(){
    document.getElementById('polls-menu-ar').style.visibility = 'visible';
    document.getElementById('polls-menu').style.visibility = 'hidden';
    document.getElementById('polls-back-home').style.visibility = 'hidden'; 
    document.getElementById('polls-back-menu').style.visibility = 'visible';
}
function showCreate(){
    document.getElementById('polls-create').style.visibility = 'visible';
    document.getElementById('polls-menu').style.visibility = 'hidden';
    document.getElementById('polls-back-home').style.visibility = 'hidden'; 
    document.getElementById('polls-back-menu').style.visibility = 'visible';
}
function showAnswer(){
    document.getElementById('polls-answer').style.visibility = 'visible';
    document.getElementById('polls-menu-ar').style.visibility = 'hidden';
    
}
function showResults(){
    document.getElementById('polls-results').style.visibility = 'visible';
    document.getElementById('polls-menu-ar').style.visibility = 'hidden';
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
    selected.settings = !selected.settings;
    if (selected.settings){
        document.getElementById("polls-settings").style.display = 'block';

    } else {
        document.getElementById("polls-settings").style.display = 'none';
    }
}

function setMax(){
    selected.setMax = !selected.setMax;
    if (selected.setMax == true){
        document.getElementById("polls-set-max").innerHTML = "! Set max";
        document.getElementById("polls-set-max-val").style.display = 'block';
    } else {
        document.getElementById("polls-set-max").innerHTML = "Set max";
        document.getElementById("polls-set-max-val").style.display = 'none';
    }
    
}
function textField(){
    selected.textField = !selected.textField;
    if (selected.textField == true){
        document.getElementById("polls-textField").innerHTML = "! Text field";
    } else {
        document.getElementById("polls-textField").innerHTML = "Text field";
    }
}
function multipleAnswers(){
    selected.multipleAnswers = !selected.multipleAnswers;
    if (selected.multipleAnswers == true){
        document.getElementById("polls-multiple-answers").innerHTML = "! Select multiple answers";
        document.getElementById("polls-multiple-answers-val").style.display = 'block';
    } else {
        document.getElementById("polls-multiple-answers").innerHTML = "Select multiple answers";
        document.getElementById("polls-multiple-answers-val").style.display = 'none';
    }
}


function createPoll(){
    pollCode =  document.getElementById("polls-code").value;
    pollData = {
        "title": document.getElementById("polls-title").value,
        "message": document.getElementById("polls-message").value,
        "options": {
            "option1":  document.getElementById("polls-option1").value,
            "option2":  document.getElementById("polls-option2").value,
        },
        "settings": {
            "setMax": selected.setMax,
            "textField": selected.textField,
            "multipleAnswers": selected.multipleAnswers
        },
        "results": {
            "option1": 0,
            "option2": 0
        }
    }

    if (selected.setMax){
        let mVal = document.getElementById("polls-set-max-val").value;
        if((/^[0-9]*$/.test(mVal))){
            if(mVal > 0){
                pollData.settings.setMaxVal = mVal;
            } else {
                if(!errorDisplayed.create){
                    document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
                    errorDisplayed.create = true;
                }
                return 1;
            }
        } else {
            if(!errorDisplayed.create){
                document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
                errorDisplayed.create = true;
            }
            return 1;
        }
    }
    if (selected.multipleAnswers){
        let maVal = document.getElementById("polls-multiple-answers-val").value;
        if((/^[0-9]*$/.test(maVal))){
            if(maVal > 0 && maVal <= 10){
                pollData.settings.multipleAnswersVal = maVal;
            } else {
                if(!errorDisplayed.create){
                    document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
                    errorDisplayed.create = true;
                }
                return 1;
            }
        } else {
            if(!errorDisplayed.create){
                document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
                errorDisplayed.create = true;
            }
            return 1;
        }
        
    }

    pollData.options.num = 2;
    for (let i = 3; i <= optionIndex; i++){
        console.log("it's working")
        pollData["options"]["option" + i] = document.getElementById("polls-option" + i).value;
        pollData["results"]["option" + i] = 0;
        pollData.options.num = i;
    }
    
    if (/^ *$/.test(pollData.options.option1) || /^ *$/.test(pollData.options.option2)) {
        if(!errorDisplayed.create){
            document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
            errorDisplayed.create = true;
        }
        return 1;
    }

    if (/\s/.test(pollCode) || /^ *$/.test(pollCode)) {
        if(!errorDisplayed.create){
            document.getElementById('polls-create-button').insertAdjacentHTML('afterend', "<span>Error</span>");
            errorDisplayed.create = true;
        }
        return 1;
    }
    
    sendPoll(pollCode, pollData);
}

// answer
function optionClick(e){
    switch (e.target.id){
        case "polls-option-1": 
            selected.options.option1 = !selected.options.option1;
            if(!selected.options.option1){
                document.getElementById(e.target.id).innerHTML = optionHtml["option1"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option1"];
            }
            break;
        case "polls-option-2": 
            selected.options.option2 = !selected.options.option2;
            if(!selected.options.option2){
                document.getElementById(e.target.id).innerHTML = optionHtml["option2"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option2"];
            }
            break;
        case "polls-option-3": 
            selected.options.option3 = !selected.options.option3;
            if(!selected.options.option3){
                document.getElementById(e.target.id).innerHTML = optionHtml["option3"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option3"];
            }
            break;
        case "polls-option-4":
            selected.options.option4 = !selected.options.option4;
            if(!selected.options.option4){
                document.getElementById(e.target.id).innerHTML = optionHtml["option4"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option4"];
            }
            break;
        case "polls-option-5": 
            selected.options.option5 = !selected.options.option5;
            if(!selected.options.option5){
                document.getElementById(e.target.id).innerHTML = optionHtml["option5"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option5"];
            }
            break;
        case "polls-option-6": 
            selected.options.option6 = !selected.options.option6;
            if(!selected.options.option6){
                document.getElementById(e.target.id).innerHTML = optionHtml["option6"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option6"];
            }
            break;
        case "polls-option-7": 
            selected.options.option7 = !selected.options.option7;
            if(!selected.options.option7){
                document.getElementById(e.target.id).innerHTML = optionHtml["option7"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option7"];
            }
            break;
        case "polls-option-8":
            selected.options.option8 = !selected.options.option8;
            if(!selected.options.option8){
                document.getElementById(e.target.id).innerHTML = optionHtml["option8"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option8"];
            }
            break;
        case "polls-option-9": 
            selected.options.option9 = !selected.options.option9;
            if(!selected.options.optio91){
                document.getElementById(e.target.id).innerHTML = optionHtml["option9"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option9"];
            }
            break;
        case "polls-option-10": 
            selected.options.option10 = !selected.options.option10;
            if(!selected.options.option10){
                document.getElementById(e.target.id).innerHTML = optionHtml["option10"];
                selected.optionNum -= 1;
            } else {
                selected.optionNum += 1;
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option10"];
            }
            break;
    }
}

function sendAnswer(){
    let n = 1;
    if(pollData.settings.multipleAnswers){
        n = pollData.settings.multipleAnswersVal;
    }
    if(selected.optionNum > n){
        console.log("lalal")
        return 1;
    }

    if(selected.options.option1){
        sendVote(pollCode, 1);
    }
    if(selected.options.option2){
        sendVote(pollCode, 2);
    }
    if(selected.options.option3){
        sendVote(pollCode, 3);
    }
    if(selected.options.option4){
        sendVote(pollCode, 4);
    }
    if(selected.options.option5){
        sendVote(pollCode, 5);
    }
    if(selected.options.option6){
        sendVote(pollCode, 6);
    }
    if(selected.options.option7){
        sendVote(pollCode, 7);
    }
    if(selected.options.option8){
        sendVote(pollCode, 8);
    }
    if(selected.options.option9){
        sendVote(pollCode, 9);
    }
    if(selected.options.option10){
        sendVote(pollCode, 10);
    }
}

// results
function resultClick(e){
    
}