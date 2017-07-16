$(document).ready(function() {
     //*Firebase personal link*
    var config = {
        apiKey: "AIzaSyAG9KIl42NALblRfPoHmkhk5g_SN0fsBqc",
        authDomain: "trainschedule-48422.firebaseapp.com",
        databaseURL: "https://trainschedule-48422.firebaseio.com",
        projectId: "trainschedule-48422",
        storageBucket: "trainschedule-48422.appspot.com",
        messagingSenderId: "153331927000"

    };

        firebase.initializeApp(config);

        var database = firebase.database();
         
         //global variable
         var trainName;
         var trainDest;
         var firstTrainTime;
         var trainFreq;

        //*Create button for adding trains to schedule*/

    $("#add-train-btn").on("click",function(event) {
    event.preventDefault();
   
         	//*These variables will grab the data that the user inputs*/


            trainName = $("#train-name-input").val().trim();
         	trainDest = $("#train-destination-input").val().trim();
         	firstTrainTime = $("#first-train-time-input").val().trim();
         	trainFreq = $("#train-frequency-input").val().trim();

         	console.log(trainName);
            console.log(trainDest);
            console.log(firstTrainTime);
            console.log(trainFreq);


         	//*local temporary object for storing train data*/

         	var newTrain = {
         		name: trainName,
         		destination: trainDest,
         		trainTime: firstTrainTime,
         		frequency: trainFreq
         	};


         	// *Use the newtrain and push it to Firebase using config/database variable*/

         	database.ref().push(newTrain);
            //database.ref()

         	//*Console.log newTrain object*//

         	console.log(newTrain.name);
         	console.log(newTrain.destination);
         	console.log(newTrain.trainTime);
         	console.log(newTrain.frequency);


           //*clars all of the text-boxes*/

           trainName = $("#train-name-input").val("");
           trainDest = $("#train-destination-input").val("");
           firstTrainTime = $("#first-train-time-input").val("");
           trainFreq = $("#train-frequency-input").val("");

        //*Closes out addTrainBtn onclick function*/
    });

 //Create an event that adds the train data to the database, and to the html*
    //function trainTable(){

        database.ref().on("child_added", function(childSnapshot,prevChildKey) {

         //console.log(childSnapshot.val());
         ///create a loop for each var- note
         //storing data onto a variable

         var trainName = childSnapshot.val().name;
         var trainDest = childSnapshot.val().destination;
         var firstTrainTime = childSnapshot.val().trainTime;
         var trainFreq = childSnapshot.val().frequency;

         //train information-check point in console only

         console.log(trainName);
         console.log(trainDest);
         console.log(firstTrainTime);
         console.log(trainFreq);

        //CLOSING FUNCTION DATABASE .ON TRYNG BELOW

         // frequency 30min min
            var tFrequency = 30;

            // Time is 00:00 AM
            var firstTrainTime = "00:00";

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("Current Time: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
            console.log("Time Difference: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTilTrain = tFrequency - tRemainder;
            console.log("Minutes Til Train: " + moment(tMinutesTilTrain).format("minutes"));

            // Next Train
            var nextTrain = moment().add(tMinutesTilTrain,"minutes");
            console.log("Arrival Time: " + moment(nextTrain).format("minutes"));

         //add train values to the table

         $("#train-table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
          trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTilTrain);

        }); //closing database function
    //};//closing train table function



}); //end of document.ready 

 
