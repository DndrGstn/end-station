// Array containing all quiz questions
// Each question has multiple clues and one correct answer
const questions = [
    {
        clues: [
            "This capital city has a famous literary pub called The Temple Bar.",
            "A river flows through it sharing its name with an old Viking settlement.",
            "It is home to the oldest university in Ireland outside of Dublin city center.",
            "A giant Guinness brewery dominates the skyline.",
            "This city is the capital of Ireland."
        ],
        answer: "dublin"
    },
    {
        clues: [
            "This northern European capital is spread across 14 islands.",
            "It hosts a world-famous music festival in its old town during summer.",
            "The Nobel Prize banquet is held annually in its City Hall.",
            "It has a historic palace called the Royal Palace on the island of Gamla Stan.",
            "This city is the capital of Sweden."
        ],
        answer: "stockholm"
    },
    {
        clues: [
            "This capital city is famous for its ancient temples and shrines.",
            "It lies on a river with a name that also belongs to a famous bridge.",
            "It was heavily bombed during WWII and later rebuilt with a modern city center.",
            "It is known for its beer gardens and Oktoberfest celebrations.",
            "This city is the capital of Germany."
        ],
        answer: "berlin"
    }
];

// Game state variables
let currentQuestion = 0;     // Tracks current question index
let currentClueIndex = 0;    // Tracks which clue is currently shown
let currentPoints = 10;      // Points available for current question
let totalScore = 0;          // Player's total score
let gameinterval = undefined; // Stores interval ID for clue timer

// Starts or restarts the game
function startGame() {
    // Reset all game state values
    currentQuestion = 0;
    currentClueIndex = 0;
    currentPoints = 10;
    totalScore = 0;

    // Clear previous results and input
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = "";
    document.getElementById("guessInput").value = "";

    // Show first clue
    showClue();

    // Start background music
    toggleMusic();

    // Automatically show next clue every 10 seconds
    gameinterval = setInterval(nextClue, 10000);
    console.log(gameinterval);
}

// Displays the current clue on screen
function showClue() {
    document.getElementById("clueText").textContent =
        questions[currentQuestion].clues[currentClueIndex];
}

// Moves to the next clue
function nextClue() {
    // Only continue if there are clues left
    if (currentClueIndex < questions[currentQuestion].clues.length - 1) {
        currentClueIndex++;
        currentPoints -= 2; // Reduce points for each additional clue
        showClue();
    }

    // Restart music and timer logic
    toggleMusic();
    hidecountdown();
    gameinterval = setInterval(nextClue, 10000);
}

// Checks if the player's guess is correct
function checkAnswer() {
    const guess = document.getElementById("guessInput").value
        .toLowerCase()
        .trim();

    const correctAnswer = questions[currentQuestion].answer;

    if (guess === correctAnswer) {
        // Add points if correct
        totalScore += currentPoints;

        document.getElementById("result").textContent =
            "Correct! You earned " + currentPoints + " points.";

        document.getElementById("score").textContent =
            "Total Score: " + totalScore;

        // Move to next question
        moveToNextQuestion();
    } else {
        document.getElementById("result").textContent =
            "Wrong answer. Try again!";
    }

    hidecountdown();
    toggleMusic();
    gameinterval = setInterval(nextClue, 10000);
}

// Moves to the next question in the array
function moveToNextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        // Reset clue index and points for next question
        currentClueIndex = 0;
        currentPoints = 10;
        document.getElementById("guessInput").value = "";
        showClue();
    } else {
        // End of game
        document.getElementById("clueText").textContent = "Game Over!";
    }
}

// Plays or resumes train background music
function toggleMusic() {
    const audio = document.querySelector("#train");
    console.log(audio);

    audio.play();
    audiovolume = 0.5; // Set volume level
    audio.volume = audiovolume;
}

// Stops train sound and enables answer input
function stopanswer() {
    const audio = document.querySelector("#train");
    audio.pause(); // Pause train sound

    playHorn(); // Play horn sound

    clearInterval(gameinterval); // Stop clue interval

    enableguessinput(); // Allow player to type

    countdown(); // Start countdown timer
    showcountdown(); // Show countdown on screen
}

// Plays horn sound effect
function playHorn() {
    const horn = document.querySelector("#horn");
    console.log(horn);

    horn.play();
    audiovolume = 0.2;
    horn.volume = audiovolume;
}

// Enables input field for player guess
function enableguessinput() {
    document.getElementById("guessInput").disabled = false;
}

// Countdown timer when STOP is pressed
function countdown() {
    let timeleft = 10;
    const countdownElement = document.getElementById("countdown");

    setInterval(
        function minusonesecond() {
            if (timeleft > 1) {
                timeleft = timeleft - 1;
                countdownElement.textContent =
                    "Time left: " + timeleft + " seconds";
            }
        },
        1000
    );
}

// Hides countdown element
function hidecountdown() {
    const countdownElement = document.getElementById("countdown");
    countdownElement.style.display = 'none';
}

// Shows countdown element
function showcountdown() {
    const countdownElement = document.getElementById("countdown");
    countdownElement.style.display = 'block';
}

// Fully resets the game manually
function resetGame() {
    clearInterval(gameinterval);

    currentQuestion = 0;
    currentClueIndex = 0;
    currentPoints = 10;
    totalScore = 0;

    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = "";
    document.getElementById("guessInput").value = "";

    showClue();
}

// Modal (rules popup) functionality
const rulesBtn = document.getElementById("rulesBtn");
const rulesModal = document.getElementById("rulesModal");
const closeRules = document.getElementById("closeRules");

// Open rules modal
rulesBtn.addEventListener("click", () => {
    rulesModal.style.display = "block";
});

// Close rules modal when clicking X
closeRules.addEventListener("click", () => {
    rulesModal.style.display = "none";
});

// Close modal if clicking outside the content area
window.addEventListener("click", (event) => {
    if (event.target === rulesModal) {
        rulesModal.style.display = "none";
    }
});