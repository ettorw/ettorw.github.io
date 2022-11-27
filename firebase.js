import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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

window.sendPoll = function(pollCode, pollData){
    set(ref(db, pollCode), pollData);
}
window.getPoll = function(pollCode){
    return get(ref(db, pollCode));
}
window.sendVote = function(pollCode, option){
    set(ref(db, pollCode + "/results/option" + option), pollData["results"]["option" + option] + 1);
    
}