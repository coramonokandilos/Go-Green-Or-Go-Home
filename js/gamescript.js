var words = [
    ["Bottles", "Recycling"],
    ["Styrofoam Objects", "Landfill"],
    ["Cans", "Recycling"],
    ["Banana Peels", "Compost"],
    ["Candy Wrappers", "Landfill"],
    ["Chicken Bones", "Compost"],
    ["Used Napkins", "Compost"],
    ["Aluminum Objects", "Recycling"],
    ["Plastic Cups", "Recycling"],
    ["Coffee Cup Lids", "Recycling"],
    ["Flowers", "Compost"],
    ["Tea Bags", "Compost"],
    ["Paper Bowls", "Compost"],
    ["Egg Shells", "Compost"],
    ["Drink Pouches", "Landfill"],
    ["Rubber Bands", "Landfill"],
    ["Latex Gloves", "Landfill"],
    ["Water Hoses", "Landfill"],
    ["Bubble Wrap", "Landfill"],
    ["Juice Box", "Landfill"]
];
var index = 0;
var start;
var alreadyUsed = [];
var numberOfRounds = 10;
var wordsLeft = 11;

$(document).ready(function() {
    $("#restart").hide();
    $("#menu").hide();
    $("#wordBox").hide();
    $("#instructions").fadeIn();
    $("#start").click(function(){
        startGame();

        $("#start").fadeOut();
        $("#menu").fadeIn();
        $("#restart").fadeIn();
        $("#instructions").fadeOut();

    });

    $("#wordBox").keydown(function(e){
        if(e.which === 13) {
            console.log("checking for match");
            checkForMatch();
        }
    });
    $("#restart").click(function(){
        console.log(wordsLeft);
        index = 0;
        wordsLeft = 11;
        console.log(wordsLeft);
        $("#showwords").html (wordsLeft + " words left") ;
        startGame();
        $("#info").hide();
        $("#timing").hide();
    });


    function startGame() {
        alreadyUsed = [];
        $("#wordBox").fadeIn();
        start = new Date();
        $("#wordBox").focus();
        alreadyUsed = [];
        showNewWord();

    }

    /* Shows a new word for the user to type in */
    function showNewWord(){
//    document.getElementById("wordToType").innerHTML=" ";
        $("#wordBox").val("");
//    $("#wordToType").html(words[index][0]);
        if (words.length === alreadyUsed.length){
            endGame();
        }
        console.log("choosing word");
        chooseWord();
        document.getElementById("wordToType").innerHTML= words[index][0];

    }

    function chooseWord(){
        var len = words.length;
        var rand;
        console.log(alreadyUsed);

        if (alreadyUsed.length == numberOfRounds){
            endGame();
        }

        var unique = false;

        while (!unique){
            rand = Math.floor(Math.random() * len);
            unique = true;
            for(var i = 0; i < alreadyUsed.length; i++){
                if(alreadyUsed[i] == words[rand][0]){
                    unique = false;
                    break;
                }
            }
        }
		wordsLeft = wordsLeft - 1;
		$("#showwords").html (wordsLeft + " words left");

		if (wordsLeft <= 0){
			$("#wordBox").fadeOut();
			$("#showword").fadeOut();
		}

        alreadyUsed.push(words[rand][0]);
        index = rand;
    }

    /* Shows a snazzy animation with a fact about the word */
    function showAnimation() {
        //   $("#info").html(words[index][1]);
        $("info").show();
        document.getElementById("info").innerHTML = "Correct! " + words[index][0] + " belong in the " + words[index][1] + " bin";
        $("info").fadeOut();
    }

    /* Runs when game is over */
    function endGame(){
        var end = new Date();
        endTime = end.getTime();
        startTime = start.getTime();
        console.log("start Time: " + startTime + " End Time " + endTime);
        var finalTime = (end.getTime() - start.getTime())/1000;
        $("#timing").show();
        document.getElementById("timing").innerHTML = "It took you " + finalTime + " seconds! Tell your friends.";

    }

    /*function to check if the typed word matches the prompt*/
    function checkForMatch(){
        var userWord = $("#wordBox").val();
        console.log(userWord);
        if (userWord == words[index][1].toLowerCase()) {

            showAnimation();
            if (index == words.length - 1) {
                endGame();
                //         $("#wordBox").fadeOut();
                return false;
            }
            index++;

            document.getElementById("wordBox").innerHTML = "";
            showNewWord();
        }
        else{
            $("#info").text("wrong!");
            document.getElementById("wordBox").innerHTML = " ";
            $("#wordBox").focus();

        }
    }
});