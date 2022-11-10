let currentOption = 2;
function addOption(){
    if (currentOption < 10){
        optionNode = document.getElementById('polls-option' + currentOption);
        currentOption++;
        option = "<input type='text' id='polls-option" + currentOption + "' name='option" + currentOption + "' placeholder='Option "+ currentOption +"'/>" 
        optionNode.insertAdjacentHTML('afterend', option);
    }
}
function removeOption(){
    if (currentOption > 2){
        optionNode = document.getElementById('polls-option' + currentOption);
        optionNode.remove()
        currentOption--
    }
}

function createPoll(){

}