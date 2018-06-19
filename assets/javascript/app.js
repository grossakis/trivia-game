// questions and their answers
var qArray = {
    questions: [
        q1 = {
            question: "What is Leela's pet named?",
            answers: [
                correct = "Nibbler",
                incorrect1 = "Muncher",
                incorrect2 = "Biter",
                incorrect3 ="Chewy",
            ],
        },
        q2 = {
            question: "What is the Secret Ingredient for the Popular Slurm Beverage?",
            answers: [
                correct = "Space worm excrement",
                incorrect1 = "Humans",
                incorrect2 = "Intergalactic waste",
                incorrect3 = "Radioactive cockroaches",
            ],
        },
        q3 = {
            question: "What is Professor Farnsworth's First Name?",
            answers: [
                correct = "Hubert",
                incorrect1 = "Frankfurt",
                incorrect2 = "Sherman",
                incorrect3 = "Phillip",
            ],
        },
        q4 = {
            question: "Where Do Fry and Bender First Meet Eachother?",
            answers: [
                correct = "In line for a suicide booth",
                incorrect1 = "In a robot strip club",
                incorrect2 = "At the edge of the universe",
                incorrect3 = "On the Planet Express ship",
            ],
        },
        q5 = {
            question: "Why is Fry Immune to the Stupefying Rays of the Giant Brains?",
            answers: [
                correct = "He is his own grandfather",
                incorrect1 = "He is too stupid to be affected",
                incorrect2 = "He is from the past",
                incorrect3 = "He wears a tin foil helmet",
            ],
        },
        q6 = {
            question: "What is the Name of Bender's Less Evil Bending Unit Counterpart?",
            answers: [
                correct = "Flexo",
                incorrect1 = "Bendo",
                incorrect2 = "Folder",
                incorrect3 = "Anglo",
            ],
        },
        q7 = {
            question: "What Olympic Sport Did Hermes Compete In?",
            answers: [
                correct = "Limbo",
                incorrect1 = "Bobsledding",
                incorrect2 = "Blernsball",
                incorrect3 = "Solar surfing",
            ],
        },
        q8 = {
            question: "What Lost City Did the Planet Express Crew Travel to the Bottom of the Ocean to Visit?",
            answers: [
                correct = "Atlanta",
                incorrect1 = "Atlantis",
                incorrect2 = "San Francisco",
                incorrect3 = "Asguard",
            ],
        },
        q9 = {
            question: "How Does Fry Temporarily Become Emperor of a Planet?",
            answers: [
                correct = "He drinks the current emperor",
                incorrect1 = "He steals the crown",
                incorrect2 = "He is elected emperor",
                incorrect3 = "He saves the planet's population from extinction",
            ],
        },
        q10 = {
            question: "What Happens to Bender When a Magnet is Put to His Head?",
            answers: [
                correct = "He starts singing folk music",
                incorrect1 = "He goes on a murderous rampage",
                incorrect2 = "His memory is erased",
                incorrect3 = "He starts uncontrollably breakdancing",
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
    $("#answer-notify").text("Time left to answer: " + timeSet);
    timeSet--;
    if(timeSet < 0){
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
    $("#answer-notify").text("Time left to answer: ")
    // timer
    run();
    // prints question and answer buttons onto page
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
        $('button[value=0]').addClass('highlight');
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
        $("#top-header").text("Here are Your Results:");
        $('#game-buttons').html("");
        $('#game-results').append("<h3> Correct Answers: " + answeredRight + "</h3>");
        $('#game-results').append("<h3> Incorrect/Missed Answers: " + answeredWrong + "</h3>");
        $('#answer-notify').html("<button>Play Again?</button>");
        $('button').on('click' , function(){
            $('#game-results').html("");
            $("#top-header").text("");
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
        var randNumb = Math.floor((Math.random() * qArray.questions.length))
        if (questRandom.includes(randNumb)){
            randNumb = Math.floor((Math.random() * qArray.questions.length))
        }else{
            questRandom.push(randNumb);
        }
    }while(questRandom.length < 5);
    // prints text and button for the start of the game
    $('#answer-notify').html("");
    $("#trivia-start").html("<h1>Trivia Game</h1>");
    $("#answer-notify").text("Press Start to Begin");
    $("#game-buttons").html('<button>Start</button>');
    $('button').on('click' , function(){
        $("#trivia-start").html("");
        askQuestion();
    })
}
newGame();