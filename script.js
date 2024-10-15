let score = 0;
let multiplier = 1;
let autoClickerActive = false;
let autoClickerCost = 50;
let backgroundCost = 100; // Kostnad for første bakgrunn
let multiplierCost = 10; // Kostnad for første multiplikator
let backgroundLevels = 0;

const scoreDisplay = document.getElementById("score");
const multiplierDisplay = document.getElementById("multiplier");
const autoClickerStatus = document.getElementById("autoClickerStatus");
const clickButton = document.getElementById("clickButton");
const buyMultiplierButton = document.getElementById("buyMultiplier");
const toggleAutoClickerButton = document.getElementById("toggleAutoClicker");
const buyBackgroundButton = document.getElementById("buyBackground");
const resetGameButton = document.getElementById("resetGame");

clickButton.addEventListener("click", () => {
    score += multiplier;
    scoreDisplay.textContent = score;
});

buyMultiplierButton.addEventListener("click", () => {
    if (score >= multiplierCost) {
        multiplier *= 2;
        score -= multiplierCost;
        multiplierDisplay.textContent = multiplier;
        scoreDisplay.textContent = score;

        // Øk kostnaden for neste multiplikator
        multiplierCost *= 2; // Dobbler kostnaden
        buyMultiplierButton.textContent = `Kjøp Multiplikator (${multiplierCost} poeng)`;
    }
});

toggleAutoClickerButton.addEventListener("click", () => {
    if (score >= autoClickerCost) {
        autoClickerActive = !autoClickerActive;
        score -= autoClickerCost;
        autoClickerStatus.textContent = autoClickerActive ? "På" : "Av";
        scoreDisplay.textContent = score;

        if (autoClickerActive) {
            intervalId = setInterval(() => {
                if (autoClickerActive) {
                    score += multiplier;
                    scoreDisplay.textContent = score;
                }
            }, 0.0000000000000000001); // Oppdaterer hver sekund
        } else {
            clearInterval(intervalId); // Stopp autoklikker når det deaktiveres
        }
    }
});

buyBackgroundButton.addEventListener("click", () => {
    if (score >= backgroundCost) {
        // Reduser score med kostnaden for bakgrunn
        score -= backgroundCost; 
        if (score < 0) {
            score = 0; // Sikre at score ikke går under null
        }
        
        // Nullstill multiplikator og autoklikker
        multiplier = 1; // Nullstill multiplikator
        autoClickerActive = false; // Slå av autoklikker
        autoClickerStatus.textContent = "Av"; // Oppdater visning av autoklikkerstatus
        multiplierCost = 10; // Reset multiplikator kostnad
        multiplierDisplay.textContent = multiplier; // Oppdater visning av multiplikator
        scoreDisplay.textContent = score; // Oppdater visning av score

        backgroundLevels++;
        changeBackgroundColor();
        
        // Øk kostnaden for neste bakgrunn
        backgroundCost += 100; // Øk med 100 for neste bakgrunn
        buyBackgroundButton.textContent = `Kjøp Bakgrunnslevel (${backgroundCost} poeng)`;
    }
});

resetGameButton.addEventListener("click", () => {
    score = 0;
    multiplier = 1;
    autoClickerActive = false;
    autoClickerStatus.textContent = "Av";
    multiplierDisplay.textContent = multiplier;
    scoreDisplay.textContent = score;
});

function changeBackgroundColor() {
    const colors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff"];
    const backgroundColor = colors[backgroundLevels % colors.length];
    document.body.style.backgroundColor = backgroundColor;
}
