// qArray is made containing questioni objects
var qArray = {
    questions: [
    // a question1 object is made
        q1 = {
            // question1 is given a question property
            // a trivia question is put as a string for question1.question
            question: "q1",
            // question1.answers is given 4 answers - 1 correctAnswer , 3 incorrectAnswer
            answers: [
                correct = "c1",
                incorrect1 = "i11",
                incorrect2 = "i12",
                incorrect3 ="i13",
            ],
        },
        // question2
        q2 = {
            question: "q2",
            answers: [
                correct = "c2",
                incorrect1 = "i21",
                incorrect2 = "i22",
                incorrect3 ="i23",
            ],
        },
        // question3
        q3 = {
            question: "q3",
            answers: [
                correct = "c3",
                incorrect1 = "i31",
                incorrect2 = "i32",
                incorrect3 ="i33",
            ],
        },
        // question4
        q4 = {
            question: "q4",
            answers: [
                correct = "c4",
                incorrect1 = "i41",
                incorrect2 = "i42",
                incorrect3 ="i43",
            ],
        },
        // question5
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
console.log(qArray.questions[0].answers[0])

var answeredRight = 0;
var answeredWrong = 0;
var questRandom = [];


function askQuestion(){
    if(questRandom.length > 0){
        // askQuestion writes questioni.question into #top-header
        $("#top-header").text(qArray.questions[questRandom[questRandom.length-1]].question);
        $('#game-bottom').html("")
        // aQ() creates buttons using the questioni.answers
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
            // var x = randArray[i];
            $('#game-bottom').append('<button value="' + randArray[i] + '">'+ qArray.questions[questRandom[questRandom.length-1]].answers[randArray[i]] + '</button><br>');
        }
        $('button').on('click' , function(){
            var answerVal = this.value
            if(parseInt(answerVal) === 0){
                console.log("YES")
                answeredRight++
                questRandom.pop();
                askQuestion();
            }else{
                console.log("no")
                answeredWrong++
                questRandom.pop();
                askQuestion();
            }
            // if(this.includes(qArray.questions[questRandom[0]].answers[0])){
            //     console.log("y")
            // }
            
            // console.log(qArray.questions[questRandom[0]].answers[0])
        })
    }else{
        $("#top-header").text("here are your results");
        $('#game-bottom').html("");
        $('#game-bottom').append("<h3> answered right: " + answeredRight + "</h3>");
        $('#game-bottom').append("<h3> answered wrong: " + answeredWrong + "</h3>");
        $('#game-bottom').append("<button>Play Again?</button>");
        $('button').on('click' , function(){
            newGame();
        })
    }
};
function newGame(){
    answeredRight = 0;
    answeredWrong = 0;
    //question randomizer
    do{
        var randNumb = Math.floor((Math.random() * 5))
        if (questRandom.includes(randNumb)){
            randNumb = Math.floor((Math.random() * 5))
        }else{
            questRandom.push(randNumb);
        }
    }while(questRandom.length < 5)

    // answeredRight variable is made and set to 0
    answeredRight = 0;
    // answerWrong variable is made and set to 0
    answeredRight = 0;
    // newGame function defined
    // #top-header is is given welcome please press start button text
    $("#top-header").text("Press Start to Begin");
    // #game-bottom div is given a start button that says start game
    $("#game-bottom").html('<button>Start</button>');
    // on click start button, the button empties the #top-header and #game-bottom and runs askQuestion function

    $('button').on('click' , function(){
        console.log("test");
        askQuestion();
    })
}
    // aQ() randomly puts buttons into #game-bottom
    // #answer-notify displays a countdown
    // aQ() sets a timer for 10 seconds
        // if correct answer button is clicked
            // timer is stopped
            // #answer-notify says correct
            // nextQuestion button is made
            // timer is set for 3 seconds
            // if timer reaches 0 || nextQuestion is pressed
                // question asked is removed from qArray
                // run askQuestion function
        // if incorrectAnswer is pressed or timer runs out
            // timer is stopped
            // #answer-notify says incorrect
            // correctAnswer is highlighted
            // nextQuestion button is made
            // timer is set for 3 seconds
            // if timer reaches 0 || nextQuestion is pressed
                // question asked is removed from qArray
                // run askQuestion function
// when qArray is empty
    // #top-header says heres how you did
    // #game-bottom writes answeredRight and writes answeredWrong
    // #answer-notify makes a playAgain button which runs newGame


// newGame
newGame();
