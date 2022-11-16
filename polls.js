let ss = false
let currentOption = 2;

document.getElementById('polls-create').style.visibility = 'hidden';
document.getElementById('polls-answer').style.visibility = 'hidden';
document.getElementById('polls-results').style.visibility = 'hidden';


// menu
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
    if (currentOption < 10){
        optionNode = document.getElementById('polls-option' + currentOption);
        currentOption++;
        option = "<input type='text' id='polls-option" + currentOption + "' name='option" + currentOption + "' placeholder='Option "+ currentOption +"'/>";
        optionNode.insertAdjacentHTML('afterend', option);
    }
}
function removeOption(){
    if (currentOption > 2){
        optionNode = document.getElementById('polls-option' + currentOption);
        optionNode.remove();
        currentOption--;
    }
}
function showSettings(){
    if (!ss){
        settingsNode = document.getElementById('polls-show-settings');
        settings = "<div id='polls-settings'> <a href = '#' onclick = 'setMax();'>Set max</a> <a href = '#' onclick = 'anonymous();'>Anonymous</a> <a href = '#' onclick = 'multipleAnswers();'>Multiple answers</a> </div>";
        settingsNode.insertAdjacentHTML('afterend', settings);
        ss = true;
    } else {
        settingsNode = document.getElementById('polls-settings')
        settingsNode.remove();
        ss = false;
    }
}

function createPoll(){

}