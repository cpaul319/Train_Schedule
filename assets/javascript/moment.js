
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyABTQoxl_fHMHFLQOusalMaPdeeyflTPc8",
    authDomain: "train-schedule-b67e0.firebaseapp.com",
    databaseURL: "https://train-schedule-b67e0.firebaseio.com",
    projectId: "train-schedule-b67e0",
    storageBucket: "train-schedule-b67e0.appspot.com",
    messagingSenderId: "848220802901"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#train-destination").val().trim();
    var firstTrain = $("#train-time").val().trim();
    var frequency = $("#train_frequency").val().trim();
    recordCount = 0;

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

  
    alert("Train Added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train_frequency").val("");
});
// var trainTime;   //  This variable holds first train arrival time
// var currentTime;       //  This variable holds current time
// var nextArrival;       //  This variable holds next arrival time
// var minutesAway;       //  This variable holds how many minutes away is the next train
 


