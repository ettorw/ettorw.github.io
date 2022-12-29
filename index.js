
// contact visibility
let showContact = false
function contactVisibility() {
    if (!showContact){
        document.getElementById('index-contact').style.display = 'flex';
        showContact = true
    } else {
        document.getElementById('index-contact').style.display = 'none';
        showContact = false
    }
}