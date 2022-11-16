
// contact visibility
let showContact = false
document.getElementById('index-contact').style.visibility = 'hidden';
function contactVisibility() {
    if (!showContact){
        document.getElementById('index-contact').style.visibility = 'visible';
        showContact = true
    } else {
        document.getElementById('index-contact').style.visibility = 'hidden';
        showContact = false
    }
}