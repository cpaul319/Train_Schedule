
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDU8yfZlU6JfVOdMplTGWMYvCftrp1iSrY",
    authDomain: "timesheet-d1706.firebaseapp.com",
    databaseURL: "https://timesheet-d1706.firebaseio.com",
    projectId: "timesheet-d1706",
    storageBucket: "timesheet-d1706.appspot.com",
    messagingSenderId: "1059669218531"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var trainName;         //  This variable holds the name of the train
var destination;        //  This variable holds the destination
var trainTime;   //  This variable holds first train arrival time
var currentTime;       //  This variable holds current time
var nextArrival;       //  This variable holds next arrival time
var minutesAway;       //  This variable holds how many minutes away is the next train
var frequency;  
