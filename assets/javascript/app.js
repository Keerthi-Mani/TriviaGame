$(document).ready(function () {
    var userChoice, images;
    var currentQuestion = 0;
    var correctAnswers = 0;
    var incorrectAnswer = 0;
    var unAnswered = 0;
    var intervalId;
    var count;

    //If user clicks the start button, the time start at 5 seconds for user to respond or choose an answer to each question
    $(".start-button").click(function () {
        startTimer();
        loadQuestion();
    });

    function startTimer() {
        count = 30;
        intervalId = setInterval(timer, 1000);
        $("#time").html("Time:" + count);
        function timer() {
            count--;
            $("#time").html("Time:" + count);
            if (count <= 0) {
                clearInterval(intervalId);
                if (currentQuestion >= spaceQuestions.length - 1) {
                    dispalyResult();
                    clearInterval(intervalId);
                    return;
                } else {
                    unAnswered++;
                    nextQuestion();
                }
            }
        }
    }

    // If the count is over, then go to the next question
    function nextQuestion() {
        var isQuestionOver = (spaceQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            console.log("Game Is Over!!!");
            dispalyResult();
        }
        else {
            currentQuestion++;
            loadQuestion();
        }
        startTimer();
    }

    var spaceQuestions = [
        {
            question: "How many moons are in our Solar System?",
            choices: ["200 moons", "181 moons", "50 moons", "145 moons"],
            correctAnswer: "181 moons"
        },
        {
            question: "What has a gravitational pull so strong that even light cannot escape it?",
            choices: ["Milky Way", "A Black Hole", "The Constellation", "Crater"],
            correctAnswer: "A Black Hole"
        },
        {
            question: "What percent of the universe is dark matter?",
            choices: ["50%", "8%", "100%", "27%"],
            correctAnswer: "27%"
        },
        {
            question: "What is the longest continuous time a human has spent in space?",
            choices: ["100 days", "389 days", "437 days", "50 days"],
            correctAnswer: "437 days"
        },
        {
            question: "What is the coldest place in the universe?",
            choices: ["A black hole", "The Boomerang Nebula", "Galaxies", "Constellation"],
            correctAnswer: "The Boomerang Nebula"
        }

    ];
    // Display the question and the choices to the browser
    function loadQuestion() {
        var question = spaceQuestions[currentQuestion].question;
        var choices = spaceQuestions[currentQuestion].choices;

        $("#question_div").html(question);
        $("#choices_div").html(loadChoices(choices));
    }

    function loadChoices(choices) {
        let result = '';

        for (var i = 0; i < choices.length; i++) {
            result += "<p class ='choice'>" + choices[i] + "</p>";
        }
        return result;
    }

    //Either correct/wrong choice selected, go to the next question
    $(document).on("click", ".choice", function () {
        var selectedAnswer = $(this).attr(result);
        console.log(selectedAnswer);
        var correctAnswer = spaceQuestions[currentQuestion].correctAnswer;
        if (correctAnswer === selectedAnswer) {
            correctAnswers++;
        }
        else {
            incorrectAnswer++;
        }
        nextQuestion();
        clearInterval(intervalId);
    });

    function dispalyResult() {
        $("#scores").html("Answered : " + correctAnswers + " correctly");
        $("#losses").html("Answered : " + incorrectAnswer + " Incorrectly");
        $("#unanswered").html("UnAnswered : " + unAnswered);
    }

    $(document).on("click", "#reset", function () {
        count = 30;
        correctQuestion = 0;
        correctAnswers = 0;
        incorrectAnswer = 0;
        //intervalId = null;
        loadQuestion();
    });
});







    //$(this).hide();





