$(document).ready(function () {
    var userChoice, images;
    var currentQuestion = 0;
    var score = 0;
    var lost = 0;
    var unAnswered = 0;
    var count = 5;
    var intervalId;

    //If user clicks the start button, the time start at 5 seconds for user to respond or choose an answer to each question
    $(".start-button").click(function () {
        intervalId = setInterval(timer, 1000);
        function timer() {
            count--;

            if (count <= 0) {
                clearInterval(intervalId);
                lost++;
                nextQuestion();
            }
            $("#time").html("Time:" + count);
        }
    });

    // If the count is over, then go to the next question
    function nextQuestion() {
        var isQuestionOver = (spaceQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            alert("Game Is Over!!!");
            dispalyResult();
        }
        else {
            currentQuestion++;
            loadQuestion();
        }
    }

    var spaceQuestions = [
        {
            question: "How many moons are in our Solar System?",
            choices: ["200 moons", "181 moons", "50 moons", "145 moons"],
            validAnswer: "181 moons"
        },
        {
            question: "What has a gravitational pull so strong that even light cannot escape it?",
            choices: ["Milky Way", "A Black Hole", "The Constellation", "Crater"],
            validAnswer: "A Black Hole"
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
        var result = "";

        for (var i = 0; i < choices.length; i++) {
            result += "<p class = 'choice' data-answer = 'choices[i]'>" + choices[i] + "</p > ";
        }
        return result;
    }

    //Either correct/wrong choice selected, go to the next question
    $(document).on("click", ".choice", function () {
        var selectedAnswer = $(this).attr("data-answer");
        var correctAnswer = spaceQuestions[currentQuestion].correctAnswer;
        if (correctAnswer === selectedAnswer) {
            // User wins
            score++;
            nextQuestion();

        }
        else {
            lost++;
            nextQuestion();
        }
    });

    function dispalyResult() {
        var result =
            $("#scores").html("CorrectAnswers :" + "" + score);
        $("#losses").html("IncorrectAnswers" + "" + lost);
    }

    $(document).on("click", "#reset", function () {
        count = 5;
        correctQuestion = 0;
        score = 0;
        lost = 0;
        intervalId = null;
        loadQuestion();
    });
    loadQuestion();
});







    //$(this).hide();





