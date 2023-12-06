const snake = document.getElementById('snake');
const food = document.getElementById('food');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');

let score = 0;
let direction = 'right'; // Direção Inicial
const gridSize = 17.5; // Tamanho de cada célula do grid
const gridColumns = 20; // Número de colunas no grid
const gridRows = 20; // Número de linhas no grid
const initialSnakeLength = 2; // Comprimento inicial da cobra

let snakeArray = Array.from({ length: initialSnakeLength }, (_, index) => ({
  x: (gridColumns / 2 - index) * gridSize,
  y: (gridRows / 2) * gridSize,
}));

function getRandomPosition() {
  const x = Math.floor(Math.random() * gridColumns) * gridSize;
  const y = Math.floor(Math.random() * gridRows) * gridSize;
  return { x, y };
}

function updateFoodPosition() {
  const newPosition = getRandomPosition();
  food.style.left = `${newPosition.x}px`;
  food.style.top = `${newPosition.y}px`;
}

function updateScore() {
  score += 10;
  scoreDisplay.textContent = `Score:\n     ${score}`;
}

function checkCollision() {
  // Checa a colisão entre a cabeça da cobra e a posição da maçã
  const snakeHead = snakeArray[0];
  if (
    Math.abs(snakeHead.x - parseInt(food.style.left)) < gridSize &&
    Math.abs(snakeHead.y - parseInt(food.style.top)) < gridSize
  ) {
    // A cobra come a maçã 🌝
    updateScore();
    snakeArray.push({}); // Aumenta o tamanho da cobra
    updateFoodPosition(); // Move a maçã para uma posição aleatória
  }

  // Checa colisão com as paredes ou com ela mesma
  if (
    snakeHead.x < 0 ||
    snakeHead.x >= gridColumns * gridSize ||
    snakeHead.y < 0 ||
    snakeHead.y >= gridRows * gridSize ||
    checkSelfCollision()
  ) {
    // Lógica de fim de jogo, reinicia o jogo ou mostra uma mensagem
    alert('Se Lascou KKKKKKKKKKKK!');
    resetGame();
  }
}

function checkSelfCollision() {
  // Checa se a cobra colide com ela mesma
  const snakeHead = snakeArray[0];
  for (let i = 1; i < snakeArray.length; i++) {
    const segment = snakeArray[i];
    if (snakeHead.x === segment.x && snakeHead.y === segment.y) {
      return true;
    }
  }
  return false;
}

function moveSnake() {
  // Move os elementos da cauda da cobra
  for (let i = snakeArray.length - 1; i > 0; i--) {
    snakeArray[i].x = snakeArray[i - 1].x;
    snakeArray[i].y = snakeArray[i - 1].y;
  }

  // Move a cabeça da cobra com base na direção
  const snakeHead = snakeArray[0];
  if (direction === 'up') {
    snakeHead.y -= gridSize;
  } else if (direction === 'down') {
    snakeHead.y += gridSize;
  } else if (direction === 'left') {
    snakeHead.x -= gridSize;
  } else if (direction === 'right') {
    snakeHead.x += gridSize;
  }
}

function renderSnake() {
  // Limpa a renderização anterior da cobra
  while (snake.firstChild) {
    snake.removeChild(snake.firstChild);
  }

  // Renderiza cada segmento da cobra
  snakeArray.forEach((segment, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.className = 'snake';
    snakeElement.style.left = `${segment.x}px`;
    snakeElement.style.top = `${segment.y}px`;
    if (index === 0) {
      snakeElement.style.backgroundColor = 'white'; // Cor da cabeça da cobra
    }
    snake.appendChild(snakeElement);
  });
}

function resetGame() {
  // Reinicia o estado do jogo
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  snakeArray = Array.from({ length: initialSnakeLength }, (_, index) => ({
    x: (gridColumns / 2 - index) * gridSize,
    y: (gridRows / 2) * gridSize,
  }));
  direction = 'right';
  updateFoodPosition();
}

function gameLoop() {
  moveSnake();
  checkCollision();
  renderSnake();
  // Implemente lógica adicional do jogo aqui
  setTimeout(gameLoop, 150); // Velocidade da sua cobra recomendada de 100 a 200
}

document.addEventListener('keydown', (e) => {
  // Move a cobra usando as setas do teclado
  if (e.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (e.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  } else if (e.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (e.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }
});

// Controles de toque para celular
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Desliza horizontalmente
    if (deltaX > 0 && direction !== 'left') {
      direction = 'right';
    } else if (deltaX < 0 && direction !== 'right') {
      direction = 'left';
    }
  } else {
    // Desliza verticalmente
    if (deltaY > 0 && direction !== 'up') {
      direction = 'down';
    } else if (deltaY < 0 && direction !== 'down') {
      direction = 'up';
    }
  }
});

// Inicializa o jogo
updateFoodPosition();
gameLoop();
