// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getFirestore, collection, setDoc, doc, onSnapshot, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMp1aTdEKLqF7XYd8QPh308BOqA4zbgIs",
    authDomain: "boroom-88600.firebaseapp.com",
    projectId: "boroom-88600",
    storageBucket: "boroom-88600.appspot.com",
    messagingSenderId: "921577561418",
    appId: "1:921577561418:web:c168beff2fcd40df0635b3",
    measurementId: "G-KSE3BE2K5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

console.log(db)
let unsubscribe = null;

let userName = " ";
let roomId = " ";
let Mess = " ";

let inputName = document.getElementById("inputName");
let inputRoomId = document.getElementById("inputId");
let btnGo = document.getElementById("btnGo");
let inputMess = document.getElementById("inputMess");
let btnSend = document.getElementById("btnSend");
let messList = document.getElementById("messList");

btnGo.onclick = function() {
    userName = inputName.value;
    roomId = inputRoomId.value;
    if (userName == "" || roomId == "") {
        alert("Please Fill Name And RoomID")
        return;
    }
    Listenmessroom();
}

function send() {
    sendMess({ name: userName, text: inputMess.value });
    inputMess.value = "";
}

btnSend.onclick = send;

inputMess.onkeydown = function(a) {
    if (a.code == "Enter") {
        send();
    }
    // a.preventDefault();
}

function addMess(time, message) {
    let elem = document.createElement("div");
    if (message.name == userName) {
        elem.innerHTML = `
        
<div class="msg right-msg">
<div class="msg-img" style="background-image: url(https://preview.pixlr.com/images/800wm/100/1/1001171911.jpg)"></div>

<div class="msg-bubble">
    <div class="msg-info">
        <div class="msg-info-name">${message.name}</div>
        <div class="msg-info-time">${time.getHours()}:${time.getMinutes()}</div>
    </div>

    <div class="msg-text">
    ${message.text}
    </div>
</div>
</div>
        `
    } else {
        elem.innerHTML = `
         <div class="msg left-msg">
         <div class="msg-img" style="background-image: url(https://images.cdn1.stockunlimited.net/preview1300/astronaut-avatar_1408751.jpg)"></div>
     
         <div class="msg-bubble">
             <div class="msg-info">
                 <div class="msg-info-name">${message.name}</div>
                 <div class="msg-info-time">${time.getHours()}:${time.getMinutes()}</div>
             </div>
     
             <div class="msg-text">
             ${message.text}
             </div>
         </div>
     </div>
        `
    }
    messList.appendChild(elem)
}

function deleteMess(message) {
    for (let message of[...messList.children]) {
        message.remove();
    }
}

function sendMess(message) {
    setDoc(doc(db, "room-" + roomId, Date.now().toString()), message)
}

function Listenmessroom() {
    let q = query(collection(db, "room-" + roomId))
    unsubscribe = onSnapshot(q, function(snapshot) {
        deleteMess();
        snapshot.forEach((message) => {
            addMess(new Date(parseInt(message.id)), message.data());
        })
    })
}
// emoji js
/*! EmojioneArea v3.4.1 | MIT license */