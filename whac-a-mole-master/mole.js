let currMoleTile;
let currPlantTile;
let score = 0;
let highScore = 0;
let gameOver = false;
let moleIntervalId;
let plantIntervalId;
let moleInterval = 1000;
let plantInterval = 2000;

window.onload = function () {
    setGame();
};

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    moleIntervalId = setInterval(setMole, moleInterval);
    plantIntervalId = setInterval(setPlant, plantInterval);

    document.getElementById("restartButton").style.display = "none"; // Hide restart button initially
    document.getElementById("restartButton").addEventListener("click", restartGame);
    document.getElementById("highScore").innerText = "High Score: " + highScore.toString();
}

function restartGame() {
    currMoleTile = null;
    currPlantTile = null;
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = "Score: 0";
    removeMoleAndPlant();
    setMole();
    setPlant();
    document.getElementById("restartButton").style.display = "none"; // Hide restart button after restarting
}

function removeMoleAndPlant() {
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    removeMoleAndPlant();
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    removeMoleAndPlant();
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString();
        adjustSpeed();
    } else if (this == currPlantTile) {
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = "High Score: " + highScore.toString();
        }
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        document.getElementById("restartButton").style.display = "block"; // Show restart button when the game is over
    }
}

function adjustSpeed() {
    if (score >= 50) {
        moleInterval = 800;
        plantInterval = 1600;
    } else if (score >= 100) {
        moleInterval = 600;
        plantInterval = 1200;
    }
    clearInterval(moleIntervalId);
    clearInterval(plantIntervalId);
    moleIntervalId = setInterval(setMole, moleInterval);
    plantIntervalId = setInterval(setPlant, plantInterval);
}
