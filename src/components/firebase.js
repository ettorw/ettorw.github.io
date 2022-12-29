import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, get, set, push } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBISAeynb6H86lVNasCqhMHkGU1IiTvACM",
    authDomain: "polls-ae0ad.firebaseapp.com",
    databaseURL: "https://polls-ae0ad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "polls-ae0ad",
    storageBucket: "polls-ae0ad.appspot.com",
    messagingSenderId: "487020374449",
    appId: "1:487020374449:web:4ef091d7f260612b353590",
    databaseURL: "https://polls-ae0ad-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

window.sendPoll = function(pollData){
    window.key = push(ref(db, "polls")).key;
    set(ref(db, window.key), pollData);
}
window.getPoll = function(pollCode){
    return get(ref(db, pollCode));
}
window.sendVote = function(pollCode, option, name){
    set(ref(db, pollCode + "/results/option" + option + "/val"), pollData["results"]["option" + option]["val"] + 1);
    if (pollData.settings.textField){
        push(ref(db, pollCode + "/results/option" + option + "/names"),  name);
    }
}
