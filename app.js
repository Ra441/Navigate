
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

const firebaseConfig = {
apiKey: "AIzaSyChBUjIEyysGvZVZYTAlAzHsuCkrQEHbqc",
authDomain: "loginform-db050.firebaseapp.com",
projectId: "loginform-db050",
storageBucket: "loginform-db050.appspot.com",
messagingSenderId: "679380654294",
appId: "1:679380654294:web:ef76e7e818cf91a54b9177",
measurementId: "G-Z6BRX4EGNV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


