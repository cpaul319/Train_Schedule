

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
    //grabs the user inforomation from the form
    var trainName = $("#train_name").val().trim();
    var destination = $("#train_destination").val().trim();
    var firstTrain = $("#train_time").val().trim();
    var frequency = $("#train_frequency").val().trim();
    recordCount = 0;
    console.log(recordCount);
    //add a new document key for each line of data added and pushes that line to a set of data
    //doesnt overwrite the data that is there
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

    // console.log(document.key);
    // console.log(document.val());

    var name = document.val().name;
    var destination = document.val().destination;
    var frequency = document.val().frequency;
    var firstTrainTimeData = document.val().firstTrain;
    var arrivalMinutes;
    var arrivalTime;

    var firstTrainTime = moment(firstTrainTimeData, "hh:mm");

    // var timeArr = firstTrainTimeData.split(" : ")
    // var firstTrainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    console.log(firstTrainTime);
    var maxMoment = moment.max(moment(), firstTrainTime);
    console.log(maxMoment);
    if (maxMoment === firstTrainTime) {
        console.log("Train has not arrived for the day");

    } else {
        console.log("Train has came ast least one time today");
    }


    var minuteDifference = moment().diff(moment(firstTrainTime), "minutes");
    var remainder = minuteDifference % frequency;
    arrivalMinutes = frequency - remainder;

    var nextTrain = moment().add(arrivalMinutes, "minutes");
    arrivalTime = moment(nextTrain).format("hh:mm");

    var anchor = "<a href=# onclick=deleteDocument('" + document.key + "');>X</a>";

    $("#train-table > tbody").append(
        $("<tr>").append(

            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(arrivalMinutes),
            $("<td>").html(anchor)
        )
    );

    console.log("Record:" + recordCount);
});
function deleteDocument(documentId) {
    database.ref().child(documentId).set(null);
    alert("Train successfully deleted!");
    location.reload();
}



