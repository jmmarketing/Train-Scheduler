$(document).ready(function () {

    // ----------- Initialize Firebase -------------

    var firebaseConfig = {
        apiKey: "AIzaSyCn1OdI5TCI_KQ8RbFbwGe8f_W_8Gk7h_8",
        authDomain: "ucsd-projects.firebaseapp.com",
        databaseURL: "https://ucsd-projects.firebaseio.com",
        projectId: "ucsd-projects",
        storageBucket: "",
        messagingSenderId: "452358502874",
        appId: "1:452358502874:web:3bf2863ac775700080e8e3"
    };

    firebase.initializeApp(firebaseConfig);
// ------------------------------------------------------

// ---------------- Global Variables -------------------

    var trainName;
    var trainDestination;
    var firstTime;
    var trainFrequency;

    var database = firebase.database(); 

// ------------- Submit Button (IE: Add Train Button) Function ---------------

$("#submit-button").on("click", function(event){
    event.preventDefault();
    
    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    firstTime = $("#first-train-time").val().trim();
    trainFrequency = $("#train-frequency").val().trim();

 

    console.log(trainName, trainDestination, firstTime, trainFrequency); // --- Sanity Check

    database.ref("trains/").push({
        tName: trainName,
        tDestination: trainDestination,
        fTime: firstTime,
        tFrequency: trainFrequency
    });
})

// -------------- Grabs all Childs from Database and puts into Table ------
database.ref("trains/").on("child_added", function(snapshot){ 
    console.log("Train: " + snapshot.val().tName);                // --
    console.log("Destination: " + snapshot.val().tDestination);   // --  Sanity Checks
    console.log("Start: " + snapshot.val().fTime);                // --
    console.log("Frequency: " + snapshot.val().tFrequency);       // --

var currentTime = moment();
var firstTimeConv = moment(snapshot.val().fTime, "HH:mm").subtract(1,"years");
trainFrequency = snapshot.val().tFrequency;

console.log (currentTime);      // ---
console.log(firstTimeConv);     // --- Sanity Checks
console.log(trainFrequency);    // ---

var diffInTime = moment().diff(moment(firstTimeConv), "minutes" );
var timeRemain = diffInTime % trainFrequency;
var nextTrainMin = trainFrequency - timeRemain;
var nextTrainTime = moment().add(nextTrainMin, "minutes");

console.log (diffInTime);      // ---
console.log(timeRemain);     // --- Sanity Checks
console.log(nextTrainMin);    // ---
console.log(nextTrainTime);    // ---


var newRow = $("<tr>")
newRow.append("<td>" + snapshot.val().tName)
    .append("<td>" + snapshot.val().tDestination)
    .append("<td>" + snapshot.val().tFrequency)
    .append("<td>" + moment(nextTrainTime).format("hh:mm"))
    .append("<td>" + nextTrainMin);
    

$("#listTrains").append(newRow);



})






});