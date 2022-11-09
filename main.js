
// contact visibility
let contactHidden = true
document.getElementById('index-contact').style.visibility = 'hidden';
function contactVisibility() {
    if (contactHidden){
        document.getElementById('index-contact').style.visibility = 'visible';
        contactHidden = false
    } else {
        document.getElementById('index-contact').style.visibility = 'hidden';
        contactHidden = true
    }
}