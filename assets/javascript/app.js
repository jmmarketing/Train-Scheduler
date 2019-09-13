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

    console.log(trainName, trainDestination, firstTime, trainFrequency);

    database.ref("trains/").push({
        tName: trainName,
        tDestination: trainDestination,
        fTime: firstTime,
        tFrequency: trainFrequency
    });
})








});