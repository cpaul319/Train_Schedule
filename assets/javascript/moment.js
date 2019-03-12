
 
  var recordCount = 0;
  var config = {
    apiKey: "AIzaSyABTQoxl_fHMHFLQOusalMaPdeeyflTPc8",
    authDomain: "train-schedule-b67e0.firebaseapp.com",
    databaseURL: "https://train-schedule-b67e0.firebaseio.com",
 
    storageBucket: "train-schedule-b67e0.appspot.com",
    
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add_train").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train_name").val().trim();
    var destination = $("#train_destination").val().trim();
    var firstTrain = $("#train_time").val().trim();
    var frequency = $("#train_frequency").val().trim();
    recordCount = 0;
    console.log(recordCount);

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

  
    alert("Train Added");

    // resets the form
    $("#train_name").val("");
    $("#train_destination").val("");
    $("#train_time").val("");
    $("#train_frequency").val("");
     
});
 

database.ref().on("child_added", function (document) {
    recordCount += 1;

    console.log(document.key);
    console.log(document.val());

    var name = document.val().name;
    var destination = document.val().destination;
    var frequency = document.val().frequency;
    var firstTrain = document.val().firstTrain;
    var arrivalMinutes;
    var arrivalTime;

    
    var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");

    //number of minutes between first train and now
    var minuteDifference = moment().diff(moment(trainTime), "minutes");
    var remainder = minuteDifference % frequency;
    arrivalMinutes = frequency - remainder;

    var nextTrain = moment().add(arrivalMinutes, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");


    $("#train-table > tbody").append(
        $("<tr>").append(
          
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(arrivalMinutes)
        )
    );

    console.log("Record:" + recordCount);
});
 


