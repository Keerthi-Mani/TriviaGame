$(document).ready(function () {
    var currentQuestion;
    var correctAnswers;
    var incorrectAnswer;
    var intervalId;

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

    function init() {
        currentQuestion = -1;
        correctAnswers = 0;
        incorrectAnswer = 0;
        $("#choices_div").empty();
        $("#scores").empty();
        $("#losses").empty();
        $("#unanswered").empty();
        $("#time").html("Time remaining to answer: ");
        clearInterval(intervalId);
    }

    //If user clicks the start button, the time start at 5 seconds for user to respond or choose an answer to each question
    $(".start-button").click(function () {
        init();
        nextQuestion();
    });

    var count;
    function startTimer() {
        count = 9;
        intervalId = setInterval(timer, 1000);
    }

    function timer() {
        $("#time").html("Time remaining to answer: " + count);
        if (count-- <= 0) {
            clearInterval(intervalId);
            nextQuestion();
        }
    }

    // If the count is over, then go to the next question
    function nextQuestion() {
        currentQuestion++;
        if ((spaceQuestions.length) === currentQuestion) {
            dispalyResult();
        }
        else {
            loadQuestion();
        }
    }

    // Display the question and the choices to the browser
    function loadQuestion() {
        var question = spaceQuestions[currentQuestion].question;
        var choices = spaceQuestions[currentQuestion].choices;
        startTimer();
        $("#question_div").html(question);
        loadChoices(choices);
    }

    function loadChoices(choices) {
        var result = '';
        $("#choices_div").empty();
        for (var i = 0; i < choices.length; i++) {
            var result = $("<div>");
            result.addClass("choice");
            result.html(choices[i]);
            result.attr("guess", i);
            $("#choices_div").append(result);
        }

        //Either correct/wrong choice selected, go to the next question
        $(".choice").click(function () {
            var selectedAnswer = choices[$(this).attr("guess")];
            var answer = spaceQuestions[currentQuestion].correctAnswer;
            if (answer === selectedAnswer) {
                correctAnswers++;
            }
            else {
                incorrectAnswer++;
            }
            clearInterval(intervalId);
            nextQuestion();
        });
    }

    function dispalyResult() {
        $("#time").empty();
        $("#question_div").empty();
        $("#choices_div").empty();
        $("#scores").append("<h1 class = final_result>" + "Answered Correctly: " + correctAnswers + "</h1>");
        $("#losses").append("<h1 class = final_result>" + "Answered Incorrectly: " + incorrectAnswer + "</h1>");
        var unans = spaceQuestions.length - (correctAnswers + incorrectAnswer);
        $("#unanswered").append("<h1 class = final_result>" + "UnAnswered Questions: " + unans + "</h1>");
    }

    $(document).on("click", "#reset", function () {
        init();
        nextQuestion();
    });
});