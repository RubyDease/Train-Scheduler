$( document ).ready(function() {

var config = {
    apiKey: "AIzaSyAG9KIl42NALblRfPoHmkhk5g_SN0fsBqc",
    authDomain: "trainschedule-48422.firebaseapp.com",
    databaseURL: "https://trainschedule-48422.firebaseio.com",
    projectId: "trainschedule-48422",
    storageBucket: "",
    messagingSenderId: "153331927000"

};

firebase.initializeApp(config);

var database = firebase.database();
 console.log("hi");
//button adding trains
 $("#add-train-info").on("submit",function() {
 	//event.preventdefault();
    console.log("hello");
 	//user inputs

 	var trainName = $("#train-name-input").val().trim();
 	var trainDest = $("#train-destination-input").val().trim();
 	var firstTrainTime = $("#first-train-time-input").val().trim();
 	var trainFreq =$("#train-frequecy-input").val().trim();

 	console.log(trainName);
 	console.log(trainDest);
 	console.log(firstTrainTime);
 	console.log(trainFreq);

 	//local temporary object for holding train data

 	var newTrain = {
 		name: trainName,
 		destination: trainDest,
 		trainTime: firstTrainTime,
 		frequency: trainFreq
 	};

 	// upload train name data tothe database

 	database.ref().push(newTrain);

 	//log everything to console

 	console.log(name.trainName);
 	console.log(destination.trainDest);
 	console.log(trainTime.firstTrainTime);
 	console.log(frequency.trainFreq);


   //clars all of the text-boxes

   $("#train-name-input").val("");
   $("#train-destination-input").val("");
   $("#first-train-time-input").val("");
   $("#train-frequecy-input").val("");

 });

 //firebase event

 database.ref().on("chield_added", function(childSnapshot,prevChildKey) {

 console.log(childSnapshot.val());

 //storing data onto a variable

 var trainName = childSnapshot.val().name;
 var trainDest = childSnapshot.val().destination;
 var firstTrainTime = childSnapshot.val().trainTime;
 var trainFreq = childSnapshot.val().frequency;

 //train information

 console.log(trainName);
 console.log(trainDest);
 console.log(firstTrainTime);
 console.log(trainFreq);

 }

// frequency 30min min
    var tFrequency = 30;

    // Time is 3:30 AM
    var firstTrainTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 //add train avlues to the table

 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain);
});

});


 
