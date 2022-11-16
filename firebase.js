import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";             
const firebaseConfig = {
    apiKey: "AIzaSyAGM6wIqJTkPyLirl2N4t6oxjNm-uCdZKQ",
    authDomain: "ettore-veronese.firebaseapp.com",
    projectId: "ettore-veronese",
    storageBucket: "ettore-veronese.appspot.com",
    messagingSenderId: "444619157671",
    appId: "1:444619157671:web:2d3d54f4d98cdca58cab82",
    measurementId: "G-YM3KW5G5K1"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);