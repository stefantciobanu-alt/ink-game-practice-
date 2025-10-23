// DOM ELEMENTS
const loginDiv = document.getElementById('login');
const gameSelectDiv = document.getElementById('gameSelect');
const gameContainer = document.getElementById('gameContainer');
const gameTitle = document.getElementById('gameTitle');
const gameArea = document.getElementById('gameArea');
const backBtn = document.getElementById('backBtn');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');

let gameInterval = null;
let keyListener = null;

// LOGIN
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Enter your Roblox username!');
    return;
  }
  loginDiv.style.display = 'none';
  gameSelectDiv.style.display = 'block';
});

// GAME SELECTION
document.querySelectorAll('.gameBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const game = btn.dataset.game;
    gameSelectDiv.style.display = 'none';
    gameContainer.style.display = 'block';
    gameTitle.textContent = btn.textContent;
    loadGame(game);
  });
});

// BACK BUTTON
backBtn.addEventListener('click', () => {
  endGame();
  gameContainer.style.display = 'none';
  gameArea.innerHTML = '';
  gameSelectDiv.style.display = 'block';
});

// LOAD GAME
function loadGame(game) {
  if (game === 'greenlight') {
    gameArea.innerHTML = `
      <div id="map">
        <img src="https://i.imgur.com/8mQZ6Ul.png" alt="Squid Game Map" id="mapImg">
        <img src="file:///C:/Users/40742/Downloads/Doll_facing_away.webp" alt="Doll Front" id="doll">
        <div id="lightIndicator"></div>
      </div>
      <p>Press SPACE to move!</p>
      <p id="score">Score: 0</p>
      <button id="restartBtn">Restart</button>
      <p id="gameMessage"></p>
    `;
    document.getElementById('restartBtn').addEventListener('click', () => {
      endGame();
      loadGame('greenlight');
    });
    startGreenLightGame();
  } else {
    gameArea.innerHTML = '<p>Coming Soon!</p>';
  }
}

// GREEN LIGHT / RED LIGHT GAME
function startGreenLightGame() {
  const scoreEl = document.getElementById('score');
  const light = document.getElementById('lightIndicator');
  const title = document.getElementById('gameTitle');
  const doll = document.getElementById('doll');
  const message = document.getElementById('gameMessage');

  let score = 0;
  let moving = true;

  // change light every 3s
  gameInterval = setInterval(() => {
    moving = !moving;
    if (moving) {
      title.textContent = "Green Light!";
      light.style.backgroundColor = "green";
      doll.style.transform = "translateX(-50%) rotateY(0deg)";
    } else {
      title.textContent = "Red Light!";
      light.style.backgroundColor = "red";
      doll.style.transform = "translateX(-50%) rotateY(180deg)";
    }
  }, 3000);

  // key listener
  keyListener = (e) => {
    if (e.code === 'Space') {
      if (moving) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
      } else {
        // End game
        message.textContent = `You moved on Red Light! Final Score: ${score}`;
        endGame();
      }
    }
  };

  document.addEventListener('keydown', keyListener);
}

// END GAME: clear interval & remove key listener
function endGame() {
  if (gameInterval) clearInterval(gameInterval);
  if (keyListener) document.removeEventListener('keydown', keyListener);
  gameInterval = null;
  keyListener = null;
}
