var timer = new easytimer.Timer();
let alphabetArray = 'abcdefghijkLmnopqrstuvwxyz'.split('');

document.addEventListener('DOMContentLoaded', function () {
    const start = document.querySelector('.RunBtn'); 
    const restart = document.getElementById('tryAgainButton');

    const stop = document.querySelector('.stopButton');
    const timeDisplay = document.querySelector('.values');
    const obstacle = document.getElementById('obstacle');
    let new_obstacle_pos = 80; // Starting position in viewport width (vw)
    let updateInterval;
    let i = 1.1; // Initial speed (higher than 0.001 to make movement visible)
    let faster = 0;
    let gameRunning = false; // Track if game is running
    let color_check = 0;

    // Start button functionality
    start.addEventListener('click', function () {
        if (gameRunning) return; // Prevent multiple intervals
        gameRunning = true;
        timer.start();

        updateInterval = setInterval(function () {
            new_obstacle_pos -= i; // Move obstacle left

            obstacle.style.left = new_obstacle_pos + 'vw'; // Use vw for better positioning

            if (new_obstacle_pos <= 3) {
                stopGame();
            }
            if( color_check % 10 === 0 ){
                obstacle.style.color = getRandomColor();
            }
        }, 30); // Reduced interval time to make movement smoother
    });

    function getRandomColor() {
        let r = Math.floor(Math.random() * 256); // Random Red (0-255)
        let g = Math.floor(Math.random() * 256); // Random Green (0-255)
        let b = Math.floor(Math.random() * 256); // Random Blue (0-255)
        return `rgb(${r},${g},${b})`; // Return as CSS color
    }

    // Stop button functionality
    stop.addEventListener('click', function () {
        stopGame();
    });

    function stopGame() {
        clearInterval(updateInterval);
        gameRunning = false;
        timer.stop();
        console.log("Game Over: " + timer.getTimeValues().toString());
        document.getElementById("rectangle").style.visibility = "visible"; // Show
        restart.addEventListener('click', function () {
            location.reload(); 
        });
    }

    // Listen for key presses
    document.addEventListener('keydown', function (event) {
        if (!gameRunning) return;

        let pressedKey = event.key.toLowerCase(); // Convert to lowercase
        let obstacleLetter = obstacle.textContent.toLowerCase(); // Ensure case-insensitive comparison
        if (pressedKey === obstacleLetter) {
            console.log("Correct key pressed! The game continues.");
            obstacle.textContent = alphabetArray[Math.floor(Math.random() * 26)]; // Generate new letter
            new_obstacle_pos = 80; // Reset obstacle position
            i = i + 0.05
            color_check = color_check + 1
        } else {
            console.log("Wrong key pressed! Game over.");
            stopGame(); // Stop game if incorrect key is pressed
        }
    });

    // Timer update event listener (for displaying time)
    timer.addEventListener('secondsUpdated', function () {
        timeDisplay.textContent = timer.getTimeValues().toString();
    });
});
