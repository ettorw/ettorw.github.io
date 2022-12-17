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
function searchPoll(){
    pollCode = document.getElementById('polls-enter-code').value;
    if (/\s/.test(pollCode) || /^ *$/.test(pollCode)) {
        document.getElementById("polls-search-error").innerHTML = "ERROR";
        return 1;
    }
    pollData = getPoll(pollCode);
    pollData.then( snapshot => {
        pollData = snapshot.val();
        if (snapshot.exists()){
            showMenuAr();
            document.getElementById("polls-answer-title").innerHTML = pollData.title;
            document.getElementById("polls-answer-message").innerHTML = pollData.message;
            if (pollData.settings.textField){
                document.getElementById("polls-text-field").style.display = 'block';
            }
            for (let i = 1; i <= pollData.options.num; i++) {
                op = "<a href = '#' id='polls-option-" + i + "' onclick = 'optionClick(event);'>" + pollData["options"]["option" + i] + "</a>";
                optionHtml["option" + i] = pollData["options"]["option" + i];
                document.getElementById("polls-answer-message").insertAdjacentHTML('afterend', op);
            } 
            document.getElementById("polls-results-title").innerHTML = pollData.title;
            for (let i = 1; i <= pollData.options.num; i++) {
                op = "<a href = '#' id='polls-result-" + i + "' onclick = 'resultClick(id);'>" + pollData["options"]["option" + i] +  " - " + pollData.results["option" + i]["val"] + "</a>";
                optionHtml["option" + i] = pollData["options"]["option" + i];
                document.getElementById("polls-idk").insertAdjacentHTML('beforeend', op);
                op = "<div id='polls-text-field-" + i + "' class='polls-results-text-field'> <span class='polls-gdkjsagnk' id='polls-text-field-" + i + "-title'>" + pollData["options"]["option" + i] +  " - " + pollData.results["option" + i]["val"] + "</span></div>";
                document.getElementById("polls-results-title").insertAdjacentHTML('afterend', op);
                for (let answer in pollData["results"]["option" + i]["names"]){
                    op = "<span>" + pollData["results"]["option" + i]["names"][answer] + "</span>";
                    document.getElementById("polls-text-field-" + i + "-title").insertAdjacentHTML('afterend', op);
                }
            }
        } else {
            return 1;
        }
    });   
}

function showMenuAr(){
    document.getElementById('polls-menu-ar').style.display = 'flex';
    document.getElementById('polls-menu').style.display = 'none';
    document.getElementById('polls-back-home').style.visibility = 'hidden'; 
    document.getElementById('polls-back-menu').style.visibility = 'visible';
}
function showCreate(){
    document.getElementById('polls-create').style.display = 'flex';
    document.getElementById('polls-menu').style.display = 'none';
    document.getElementById('polls-back-home').style.visibility = 'hidden'; 
    document.getElementById('polls-back-menu').style.visibility = 'visible';
}
function showAnswer(){
    document.getElementById('polls-answer').style.display = 'flex';
    document.getElementById('polls-menu-ar').style.display = 'none';
    
}
function showResults(){
    document.getElementById('polls-results').style.display = 'flex';
    document.getElementById('polls-menu-ar').style.display = 'none';
}

// create 
function addOption(){
    if (optionIndex < maxOptions){
        optionNode = document.getElementById('polls-option' + optionIndex);
        optionIndex++;
        option = "<input type='text' id='polls-option" + optionIndex + "' placeholder='Option "+ optionIndex +"'/>";
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
            "option1": {
                "val": 0,
                "names": ""
            },
            "option2": {
                "val": 0,
                "names": ""
            },
        }
    }

    if (selected.setMax){
        let mVal = document.getElementById("polls-set-max-val").value;
        if((/^[0-9]*$/.test(mVal))){
            if(mVal > 0){
                pollData.settings.setMaxVal = mVal;
            } else {
                document.getElementById("polls-create-error").innerHTML = "ERROR";
                return 1;
            }
        } else {
            document.getElementById("polls-create-error").innerHTML = "ERROR";
            return 1;
        }
    }
    if (selected.multipleAnswers){
        let maVal = document.getElementById("polls-multiple-answers-val").value;
        if((/^[0-9]*$/.test(maVal))){
            if(maVal > 0 && maVal <= 10){
                pollData.settings.multipleAnswersVal = maVal;
            } else {
                document.getElementById("polls-create-error").innerHTML = "ERROR";
                return 1;
            }
        } else {
            document.getElementById("polls-create-error").innerHTML = "ERROR";
            return 1;
        }
    }

    pollData.options.num = 2;
    for (let i = 3; i <= optionIndex; i++){
        console.log("it's working")
        pollData["options"]["option" + i] = document.getElementById("polls-option" + i).value;
        pollData["results"]["option" + i] = {
            "val": 0,
            "names": ""
        }
        if (/^ *$/.test(pollData.options["option" + i])) {
            document.getElementById("polls-create-error").innerHTML = "ERROR";
            return 1;
        }
        pollData.options.num = i;
    }
    
    if (/^ *$/.test(pollData.options.option1) || /^ *$/.test(pollData.options.option2)) {
        document.getElementById("polls-create-error").innerHTML = "ERROR";
        return 1;
    }

    if (/^ *$/.test(pollData.title)) {
        document.getElementById("polls-create-error").innerHTML = "ERROR";
        return 1;
    }

    if (/^ *$/.test(pollData.message)) {
        document.getElementById("polls-create-error").innerHTML = "ERROR";
        return 1;
    }

    if (/\s/.test(pollCode) || /^ *$/.test(pollCode)) {
        document.getElementById("polls-create-error").innerHTML = "ERROR";
        return 1;
    }
    
    sendPoll(pollCode, pollData);
    document.getElementById("polls-create-error").innerHTML = "POLL CREATED SUCCESFULLY";
    document.getElementById("polls-create-error").style.color = "#33CC00";
}

// answer
function optionClick(e){
    switch (e.target.id){
        case "polls-option-1": 
            selected.options.option1 = !selected.options.option1;
            if(!selected.options.option1){
                document.getElementById(e.target.id).innerHTML = optionHtml["option1"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option1"];
            }
            break;
        case "polls-option-2": 
            selected.options.option2 = !selected.options.option2;
            if(!selected.options.option2){
                document.getElementById(e.target.id).innerHTML = optionHtml["option2"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option2"];
            }
            break;
        case "polls-option-3": 
            selected.options.option3 = !selected.options.option3;
            if(!selected.options.option3){
                document.getElementById(e.target.id).innerHTML = optionHtml["option3"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option3"];
            }
            break;
        case "polls-option-4":
            selected.options.option4 = !selected.options.option4;
            if(!selected.options.option4){
                document.getElementById(e.target.id).innerHTML = optionHtml["option4"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option4"];
            }
            break;
        case "polls-option-5": 
            selected.options.option5 = !selected.options.option5;
            if(!selected.options.option5){
                document.getElementById(e.target.id).innerHTML = optionHtml["option5"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option5"];
            }
            break;
        case "polls-option-6": 
            selected.options.option6 = !selected.options.option6;
            if(!selected.options.option6){
                document.getElementById(e.target.id).innerHTML = optionHtml["option6"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option6"];
            }
            break;
        case "polls-option-7": 
            selected.options.option7 = !selected.options.option7;
            if(!selected.options.option7){
                document.getElementById(e.target.id).innerHTML = optionHtml["option7"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option7"];
            }
            break;
        case "polls-option-8":
            selected.options.option8 = !selected.options.option8;
            if(!selected.options.option8){
                document.getElementById(e.target.id).innerHTML = optionHtml["option8"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option8"];
            }
            break;
        case "polls-option-9": 
            selected.options.option9 = !selected.options.option9;
            if(!selected.options.option9){
                document.getElementById(e.target.id).innerHTML = optionHtml["option9"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option9"];
            }
            break;
        case "polls-option-10": 
            selected.options.option10 = !selected.options.option10;
            if(!selected.options.option10){
                document.getElementById(e.target.id).innerHTML = optionHtml["option10"];
            } else {
                document.getElementById(e.target.id).innerHTML = "! " + optionHtml["option10"];
            }
            break;
    }
}

function sendAnswer(){
    let n = 1;
    let namee = null;
    if (pollData.settings.textField){
        namee = document.getElementById("polls-text-field").value;
        if (/^ *$/.test(namee)){
            document.getElementById("polls-answer-error").innerHTML = "ERROR";
            return 1;
        }
    }
    
    for (let i = 1; i <= 10; i++){
        if (selected.options["option" + i]){
        selected.optionNum += 1;
        }
    }

    if (pollData.settings.multipleAnswers){
        if(selected.optionNum > pollData.settings.multipleAnswersVal){
            return 1;
        }
    } else if(selected.optionNum > 1){
        document.getElementById("polls-answer-error").innerHTML = "ERROR";
        return 1;
    }
    if (selected.optionNum < 1){
        document.getElementById("polls-answer-error").innerHTML = "ERROR";
        return 1;
    }
    if(selected.options.option1){
        sendVote(pollCode, 1, namee);
    }
    if(selected.options.option2){
        sendVote(pollCode, 2, namee);
    }
    if(selected.options.option3){
        sendVote(pollCode, 3, namee);
    }
    if(selected.options.option4){
        sendVote(pollCode, 4, namee);
    }
    if(selected.options.option5){
        sendVote(pollCode, 5, namee);
    }
    if(selected.options.option6){
        sendVote(pollCode, 6, namee);
    }
    if(selected.options.option7){
        sendVote(pollCode, 7, namee);
    }
    if(selected.options.option8){
        sendVote(pollCode, 8, namee);
    }
    if(selected.options.option9){
        sendVote(pollCode, 9, namee);
    }
    if(selected.options.option10){
        sendVote(pollCode, 10, namee);
    }

    document.getElementById("polls-answer-error").innerHTML = "ANSWER SENT";
    document.getElementById("polls-answer-error").style.color = "#33CC00";
}

// results

let esrsajgrkfalseaflsfnmaslfnldkasavnsfkjsacnasdds
function resultClick(e){
    esrsajgrkfalseaflsfnmaslfnldkasavnsfkjsacnasdds = e.substring(e.length - 1);

    document.getElementById("polls-text-field-" + esrsajgrkfalseaflsfnmaslfnldkasavnsfkjsacnasdds).style.display = "flex";
    document.getElementById("polls-results-title").style.display = "none";
    document.getElementById("polls-results-contnent").style.display = "none";
    document.getElementById("polls-back-results").style.visibility = "visible";
}

function resultsBack(){
    document.getElementById("polls-text-field-" + esrsajgrkfalseaflsfnmaslfnldkasavnsfkjsacnasdds).style.display = "none";
    document.getElementById("polls-results-title").style.display = "block";
    document.getElementById("polls-results-contnent").style.display = "flex";
    document.getElementById("polls-back-results").style.visibility = "hidden";

}