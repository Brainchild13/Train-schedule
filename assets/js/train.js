// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the train frequency. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate when the next train will arrive

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCnQXO06SRmimjBzz1-XIT8C2A8iqqPIMU",
  authDomain: "train-schedule-106a7.firebaseapp.com",
  databaseURL: "https://train-schedule-106a7.firebaseio.com",
  projectId: "train-schedule-106a7",
  storageBucket: "train-schedule-106a7.appspot.com",
  messagingSenderId: "787420069950"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //first time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  //current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + momnet(currentTime).format("hh:mm"));

  //difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //time apart (remainder)
  var tRemainder = (diffTime % frequency) - tRemainder;
  console.log(tRemainder);

  //minutes until train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //Next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time: " + momnet(nextTrain).format("hh:mm"));

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrainTime = moment(
    $("#first-train-time-input")
      .val()
      .trim(),
    "hh:mm"
  );
  var frequency = moment(
    $("#start-input")
      .val()
      .trim(),
    "mm"
  ).format("x");

  //test for the variables
  console.log(trainName);
  Console.log(Destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.Trainame);
  console.log(newTrain.Destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  //firstTrainTime converted to moment js format
  var trainStartPretty = moment.HTML5_FMT.TIME(firstTrainTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(Start, "X"), "months");
  console.log(empMonths);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
  //need to calculate next arrival time. time started and add a count to start time with frequency in minutes to calculate next arrival.
  var nextArrival = firstTrainTime;
  console.log(nextArrival);

  //calculate next arrival time minus frequency
  var minutesAway = nextArrival % frequency;
  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#trains-table > tbody").append(newRow);
});
