const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreCanvas = document.getElementById("beer-score");
const ctxScore = scoreCanvas.getContext("2d");

const lastLife = document.getElementById("last-life");
const ctxLastLife = lastLife.getContext("2d");

const secondLife = document.getElementById("second-life");
const ctxSecondLife = secondLife.getContext("2d");

const firstLife = document.getElementById("first-life");
const ctxFirstLife = firstLife.getContext("2d");

document.querySelector('#start-button').addEventListener('click', startGame);


let game_flag = false;

if (game_flag) {
    startGame();
}

function startGame() {
    const screen_width = 300;
    let crate_x = (screen_width / 2) - 20;
    const crate_y = 130; //crate on the ground
    let crate_velocity = 0;

    let beer_x = screen_width / 2;
    let beer_y = 150;
    let beer_velocity = 3;

    let beer_catched_counter = 0;
    let beer_missed_counter = 0;

    function drawGameOverMessage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Algerian";
        ctx.fillText("Game Over", 100, 85, 100);
    }

    function isGameOver() {
        if (beer_missed_counter == 3) {
            writeResult();
            ctxLastLife.clearRect(0, 0, lastLife.width, lastLife.height);
            beer_missed_counter = 0;
            beer_catched_counter = 0;
            drawGameOverMessage();
            setTimeout();
            setTimeout(window.location.reload, 3000);
        }
    }

    function update() {
        ctxFirstLife.clearRect(0, 0, firstLife.width, firstLife.height);
        ctxSecondLife.clearRect(0, 0, secondLife.width, secondLife.height);
        ctxLastLife.clearRect(0, 0, lastLife.width, lastLife.height);
        if (beer_missed_counter == 0) {
            drawLastLife();
            drawSecondLife();
            drawFirstLife();
        }
        else if (beer_missed_counter == 1) {
            drawLastLife();
            drawSecondLife();
        }
        else if (beer_missed_counter == 2) {
            drawLastLife();
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        crate_x += crate_velocity;
        ctx.fillRect(crate_x, crate_y, 40, 20);
        writeResult();
        beerFalling();
        checkCollision();
        requestAnimationFrame(update);
    }

    function drawBeer() {
        ctx.beginPath();
        ctx.moveTo(beer_x + 2, beer_y);
        ctx.lineTo(beer_x + 6, beer_y);
        ctx.lineTo(beer_x + 6, beer_y + 5);
        ctx.arc(beer_x + 4, beer_y + 7, 4, 5, 0, false);
        ctx.lineTo(beer_x + 8, beer_y + 5);
        ctx.lineTo(beer_x + 8, beer_y + 20);
        ctx.lineTo(beer_x, beer_y + 20);
        ctx.lineTo(beer_x, beer_y + 5);
        ctx.arc(beer_x + 2, beer_y + 7, 4, 5, 0, false);
        ctx.lineTo(beer_x + 2, beer_y + 5);
        ctx.closePath();
        ctx.fill();
    }

    function beerFalling() {
        beer_y += beer_velocity;
        if (beer_y >= 150) {
            beer_y = 0;
            beer_x = Math.floor(Math.random() * 280);
        }
        drawBeer();
    }

    function drawLastLife() {
        ctxLastLife.beginPath();
        ctxLastLife.moveTo(60, 60);
        ctxLastLife.lineTo(120, 60);
        ctxLastLife.lineTo(120, 90);
        ctxLastLife.lineTo(160, 90);
        ctxLastLife.lineTo(160, 290);
        ctxLastLife.lineTo(20, 290);
        ctxLastLife.lineTo(20, 90);
        ctxLastLife.lineTo(60, 90);
        ctxLastLife.closePath();
        ctxLastLife.fill();
    }

    function drawSecondLife() {
        ctxSecondLife.beginPath();
        ctxSecondLife.moveTo(60, 60);
        ctxSecondLife.lineTo(120, 60);
        ctxSecondLife.lineTo(120, 90);
        ctxSecondLife.lineTo(160, 90);
        ctxSecondLife.lineTo(160, 290);
        ctxSecondLife.lineTo(20, 290);
        ctxSecondLife.lineTo(20, 90);
        ctxSecondLife.lineTo(60, 90);
        ctxSecondLife.closePath();
        ctxSecondLife.fill();
    }

    function drawFirstLife() {
        ctxFirstLife.beginPath();
        ctxFirstLife.moveTo(60, 60);
        ctxFirstLife.lineTo(120, 60);
        ctxFirstLife.lineTo(120, 90);
        ctxFirstLife.lineTo(160, 90);
        ctxFirstLife.lineTo(160, 290);
        ctxFirstLife.lineTo(20, 290);
        ctxFirstLife.lineTo(20, 90);
        ctxFirstLife.lineTo(60, 90);
        ctxFirstLife.closePath();
        ctxFirstLife.fill();
    }

    function writeResult() {
        ctxScore.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        ctxScore.font = "140px Algerian";
        ctxScore.fillText(beer_catched_counter.toString(), 0, 150, 100);
    }

    function checkCollision() {
        if (beer_x >= crate_x && beer_x <= crate_x + 40) {
            if (beer_y >= 130 && beer_y <= 132) {
                beer_catched_counter++;
            }
        }
        else {
            if (beer_y + 4 >= 150 && beer_y <= 151) {
                if (beer_missed_counter <= 2) {
                    beer_missed_counter++;
                    isGameOver();
                }
                else {
                    beer_missed_counter = 0;
                    beer_catched_counter = 0;
                }
            }
        }
    }
    
    update();

    //when the user is holding left or right key
    addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                checkCollision();
                if (crate_x <= 1) {
                    crate_x = 0;
                }
                crate_velocity = -5;
                break;
            case 'ArrowRight':
                checkCollision();

                if (crate_x >= 260) {
                    crate_x = 260;
                    break;
                }
                crate_velocity = 5;
                break;
        }
    })
    //when the user lifts his finger off off left or right key
    addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                checkCollision();

                if (crate_x <= 0) {
                    crate_x = 0;
                }
                crate_velocity = 0;
                break;
            case 'ArrowRight':
                checkCollision();

                if (crate_x >= 260) {
                    crate_x = 260;
                }
                crate_velocity = 0;
                break;
        }
    })
}