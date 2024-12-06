const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');


const collectSound = document.getElementById('collectSound');
const gameOverSound = document.getElementById('gameOverSound');

let player = { x: 50, y: 180, width: 30, height: 30, color: '#0f0', speed: 5 };
let energies = [];
let dangers = [];
let score = 0;
let gameRunning = false;
let gameOver = false; 

let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => keys[e.key] = false);

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObjects(objects, color) {
    objects.forEach(obj => {
        ctx.fillStyle = color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        obj.x -= 2;
    });
}

function generateObjects() {
    if (Math.random() < 0.02) {
        energies.push({ x: canvas.width, y: Math.random() * canvas.height, width: 20, height: 20 });
    }
    if (Math.random() < 0.02) {
        dangers.push({ x: canvas.width, y: Math.random() * canvas.height, width: 20, height: 20 });
    }
}

function detectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function updateGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObjects(energies, '#ff0');
    drawObjects(dangers, '#f00');
    generateObjects();

    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;

    energies.forEach((energy, index) => {
        if (detectCollision(player, energy)) {
            score += 10;
            energies.splice(index, 1);
            collectSound.currentTime = 0;
            collectSound.play(); 
            console.log(`Score: ${score}`);
        }
    });

    dangers.forEach((danger, index) => {
        if (detectCollision(player, danger) && !gameOver) {
            gameOver = true; 
            gameOverSound.play(); 
            alert(`Game Over! Score: ${score}`);
            document.location.reload(); 
        }
    });

    requestAnimationFrame(updateGame);
}
startButton.addEventListener('click', () => {
    gameRunning = true;
    gameOver = false; 
    score = 0; 
    startButton.style.display = 'none'; 
    updateGame();
});

function showContinent(continent) {
    const infoPanel = document.getElementById('continent-info');
    const data = {
        europe: "L'Europe se concentre sur la transition énergétique, avec des initiatives pour réduire les émissions de gaz à effet de serre.",
        asie: "L'Asie est un acteur clé dans la lutte contre le réchauffement climatique, mais elle fait face à des défis considérables comme les catastrophes naturelles.",
        afrique: "L'Afrique est particulièrement vulnérable aux changements climatiques, avec des impacts sur l'agriculture et les ressources en eau."
    };
    infoPanel.innerHTML = `<p>${data[continent]}</p>`;
}
