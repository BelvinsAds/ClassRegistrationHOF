/*
Need to connect the option from drop down to connect to the information give to the database
I.E. {
    if(option1 == selected){
        selected class == FirebaseOption Name
    }
}
Then is connected and will follow current steps to connect to the database and go through the program.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

//Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBwXhDZsSdu3Ls2UcnwssSHrfjvaCeU8_s",
    authDomain: "house-of-fitness-classes.firebaseapp.com",
    databaseURL: "https://house-of-fitness-classes-default-rtdb.firebaseio.com",
    projectId: "house-of-fitness-classes",
    storageBucket: "house-of-fitness-classes.appspot.com",
    messagingSenderId: "868182869541",
    appId: "1:868182869541:web:9f458be71f6db2cbf1e1cc",
    measurementId: "G-GYP0W351RH"
};
const app = initializeApp(firebaseConfig);

//Initalize DB
const database = getDatabase(app);

//Form Values

var ClassType 
var ClassName
var ClassNameType
var participants = [];
var First_Name = document.getElementById("First_Name");
var Last_Name = document.getElementById("Last_Name");
var Phone_Number = document.getElementById("Phone_Number");
//Collecting Form Data
function applyForClass(){
    var SpotNum = Math.floor(Math.random() * 25);
    set(ref(database, `/Classes/${ClassName}/${SpotNum}`),{
        FName: First_Name.value,
        LName: Last_Name.value,
        PNumber: Phone_Number.value,
        Num: SpotNum
    })
    alert('Your Spot Has Been Reserved');
    if(participants.length == 25) {
        sendEmailList();
    }
}

//Get Count
SelectClassType.addEventListener('change', async (event) => {
     ClassType = document.getElementById("SelectClassType");
     ClassName = ClassType.value;
     ClassNameType = ClassType.options[ClassType.selectedIndex].text;
    var deRef = ref(database, `/Classes/${ClassName}/`);
    let participantsCount = 0;
    let i = 0;
    onValue(deRef, (snapshot) => {
    let data = snapshot.val()
    participants = snapshotToArray(snapshot);
    //Display Number of Participants
    let CountParticipants = `<label class="SpotsCount">${participants.length}/25 Spots Taken</label>`;
    let shownum = document.getElementById('numcount');
    shownum.innerHTML = CountParticipants;
    console.log(participants.length);
    if(participants.length > 25) {
        alert('Sorry, It Looks Like This Class Is Full');
    } else {
        submit.addEventListener('click', applyForClass);
    }
    })
})

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key

        returnArr.push(item)
    });
    return returnArr;
}


// Sending Email List
function sendEmailList() {
    var myJSON = JSON.stringify(participants);
    console.log(myJSON);
    var params = {
        class_name: ClassName,
        message: myJSON,
    }
    emailjs.send("service_ngjmswq","template_8h8qpbx", params);
}

