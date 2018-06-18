// questions and their answers
var qArray = {
    questions: [
        q1 = {
            question: "q1",
            answers: [
                correct = "c1",
                incorrect1 = "i11",
                incorrect2 = "i12",
                incorrect3 ="i13",
            ],
        },
        q2 = {
            question: "q2",
            answers: [
                correct = "c2",
                incorrect1 = "i21",
                incorrect2 = "i22",
                incorrect3 ="i23",
            ],
        },
        q3 = {
            question: "q3",
            answers: [
                correct = "c3",
                incorrect1 = "i31",
                incorrect2 = "i32",
                incorrect3 ="i33",
            ],
        },
        q4 = {
            question: "q4",
            answers: [
                correct = "c4",
                incorrect1 = "i41",
                incorrect2 = "i42",
                incorrect3 ="i43",
            ],
        },
        q5 = {
            question: "q5",
            answers: [
                correct = "c5",
                incorrect1 = "i51",
                incorrect2 = "i52",
                incorrect3 ="i53",
            ],
        },
    ],
};
// status tracking variables
var answeredRight = 0;
var answeredWrong = 0;
// array used to randomize questions
var questRandom = [];
// question timer variables and functions
var timeSet = 20;
var intervalId;
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
function decrement() {
    $("#answer-notify").text(timeSet);
    timeSet--;
    if(timeSet < 1){
        clearInterval(intervalId);
        $('button').prop("disabled" , true);
        answeredWrong++
        $('#answer-notify').text("Times Up! the correct answer is " + qArray.questions[questRandom[questRandom.length-1]].answers[0]);
        questRandom.pop();
        timeSet = 20;
        setTimeout(askQuestion,3000);
    }
}
// question asking function
function askQuestion(){
    // timer
    run();
    // prints question and answers onto page
    if(questRandom.length > 0){
        $('#answer-notify').text("")
        $("#top-header").text(qArray.questions[questRandom[questRandom.length-1]].question);
        $('#game-buttons').html("")
        // array and function used to put answers on to random buttons
        var randArray = [];
        do{
            var randNumb = Math.floor((Math.random() * 4))
            if (randArray.includes(randNumb)){
                randNumb = Math.floor((Math.random() * 4))
            }else{
                randArray.push(randNumb);
            }
        }while(randArray.length < 4)
        for(i = 0; i < 4; i++){
            $('#game-buttons').append('<button value="' + randArray[i] + '" id = "button'+i+'">'+ qArray.questions[questRandom[questRandom.length-1]].answers[randArray[i]] + '</button><br>');
        }
        // answer button functions
        $('button').on('click' , function(){
            $('button').prop("disabled" , true);
            var answerVal = this.value
            if(parseInt(answerVal) === 0){
                clearInterval(intervalId);
                answeredRight++
                questRandom.pop();
                timeSet = 20;
                $('#answer-notify').text("Correct!")
                setTimeout(askQuestion,3000)
            }else{
                clearInterval(intervalId);
                answeredWrong++
                $('#answer-notify').text("Inorrect! the correct answer is " + qArray.questions[questRandom[questRandom.length-1]].answers[0])
                questRandom.pop();
                timeSet = 20;
                setTimeout(askQuestion,3000)
            }
        })
    // final results printed and play again button presented
    }else{
        clearInterval(intervalId);
        $("#top-header").text("Results:");
        $('#game-buttons').html("");
        $('#game-buttons').append("<h3> answered right: " + answeredRight + "</h3>");
        $('#game-buttons').append("<h3> answered wrong: " + answeredWrong + "</h3>");
        $('#answer-notify').html("<button>Play Again?</button>");
        $('button').on('click' , function(){
            newGame();
        })
    }
};
// function for starting and restarting the game
function newGame(){
    answeredRight = 0;
    answeredWrong = 0;
    // adds values to array for question order randomization
    do{
        var randNumb = Math.floor((Math.random() * 5))
        if (questRandom.includes(randNumb)){
            randNumb = Math.floor((Math.random() * 5))
        }else{
            questRandom.push(randNumb);
        }
    }while(questRandom.length < 5);
    // prints text and button for the start of the game
    $('#answer-notify').html("");
    $("#top-header").text("Press Start to Begin");
    $("#game-buttons").html('<button>Start</button>');
    $('button').on('click' , function(){
        askQuestion();
    })
}
newGame();
