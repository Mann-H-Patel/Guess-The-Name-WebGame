const selectedCategoryIndex = localStorage.getItem('selectedCategory');
console.log(selectedCategoryIndex)
let randomHeroTuple;

// Choose the correct list based on the selected category
switch (parseInt(selectedCategoryIndex)) {
    case 0:
        randomHeroTuple = marvel_Heroes_With_Hints[Math.floor(Math.random() * marvel_Heroes_With_Hints.length)];
        break;
    case 1:
        randomHeroTuple = cricketers_with_hints[Math.floor(Math.random() * cricketers_with_hints.length)];
        break;
    case 2:
        randomHeroTuple = bollywood_Heroes_With_Hints[Math.floor(Math.random() * bollywood_Heroes_With_Hints.length)];
        break;
    case 3:
        randomHeroTuple = indian_cities_with_hints[Math.floor(Math.random() * indian_cities_with_hints.length)];
        break;
    case 4:
        randomHeroTuple = indian_historical_places_with_hints[Math.floor(Math.random() * indian_historical_places_with_hints.length)];
        break;
    case 5:
        randomHeroTuple = indian_cuisines_with_hints[Math.floor(Math.random() * indian_cuisines_with_hints.length)];
        break;
    case 6:
        randomHeroTuple = bollywood_movies_with_hints[Math.floor(Math.random() * bollywood_movies_with_hints.length)];
        break;
    case 7:
        randomHeroTuple = youtubers_with_hints[Math.floor(Math.random() * youtubers_with_hints.length)];
        break;
    default:
        alert("Invalid category selected");
}

let randomHero = randomHeroTuple[0].toLowerCase(); // Ensure randomHero is lowercase
let hint = randomHeroTuple[1];
let lives = 6;
let correctLetters = [];
let gameStatus = false;

console.log(randomHero);
console.log(hint);

function updateDisplay() {
    document.getElementById("hint-text").innerText = `Hint = ${hint}`;
    document.getElementById("lives").innerHTML = `Lives = ${lives}`;
    let displayLetter = "";

    for (let letter of randomHero) { // Iterate through each letter of randomHero
        if (correctLetters.includes(letter)) {
            displayLetter += letter; // Display correct letters
        } else {
            displayLetter += "_"; // Display underscores for missing letters
        }
    }
    
    document.getElementById("Answer").innerHTML = displayLetter;

    // Check for win condition
    if (!displayLetter.includes("_")) {
        alert("Congratulations! You've guessed the word!");
        gameStatus = true;
    }

    document.getElementById("guess-input").querySelector("input").focus();
}

function handleGuess(event){
    if (event.key === "Enter") {
        const guessInput = document.getElementById("guess-input").querySelector("input"); // Access the input element directly
        const guess = guessInput.value.toLowerCase(); // Convert to lowercase
        guessInput.value = "";  // Clear input

        if (correctLetters.includes(guess)) {
            alert(`You guessed that letter ("${guess}") already.`);
            return; // Exit the function to avoid further processing
        }

        if (!gameStatus && guess.length === 1 && !correctLetters.includes(guess)) {
            if (randomHero.includes(guess)) {
                correctLetters.push(guess);
            } else {
                lives--;
            }

            if (lives <= 0) {
                if (confirm(`Game Over! The correct word was: ${randomHero}. Click OK to return to the home page.`)) {
                    window.location.href = "index.html"; // Redirect to index.html
                }
                gameStatus = true; // Set the game status to true to prevent further guesses
            }            

            updateDisplay();
        }

        if (!document.getElementById("Answer").innerText.includes("_")) {
            // If no underscores are left, the user has won
            if (confirm(`Congratulations! You've guessed the word! Click OK to return to the home page.`)) {
                window.location.href = "index.html"; // Redirect to index.html
            }
            gameStatus = true; // Set the game status to true
        }
    }
}

function resetGame() {
    // Reload the game page to start a new game
    window.location.href = "index.html";
}

// Initialize the game display
updateDisplay();

document.getElementById("check-guess-btn").addEventListener("click", handleButtonClick);

function handleButtonClick() {
    const guessInput = document.getElementById("guess-input").querySelector("input"); // Access the input element directly
    const guess = guessInput.value.toLowerCase(); // Convert to lowercase
    guessInput.value = "";  // Clear input


    if (guess.length === 0) return; // Exit if input is empty

    if (correctLetters.includes(guess)) {
        alert(`You guessed that letter ("${guess}") already.`);
        return; // Exit the function to avoid further processing
    }

    if (!gameStatus && guess.length === 1 && !correctLetters.includes(guess)) {
        if (randomHero.includes(guess)) {
            correctLetters.push(guess);
        } else {
            lives--;
        }

        if (lives <= 0) {
            if (confirm(`Game Over! The correct word was: ${randomHero}. Click OK to return to the home page.`)) {
                window.location.href = "index.html"; // Redirect to index.html
            }
            gameStatus = true; // Set the game status to true to prevent further guesses
        }

        updateDisplay();
    }

    if (!document.getElementById("Answer").innerText.includes("_")) {
        // If no underscores are left, the user has won
        if (confirm(`Congratulations! You've guessed the word! Click OK to return to the home page.`)) {
            window.location.href = "index.html"; // Redirect to index.html
        }
        gameStatus = true; // Set the game status to true
    }
}

function newGame(){
    window.location.href = "index.html";
}
