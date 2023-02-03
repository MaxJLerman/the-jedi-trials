const canvas = document.querySelector('canvas ');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const usableCanvasHeight = canvas.height - 97;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './assets/images/background.png',
  // topResetValue: 330,
});

const shop  = new Sprite({
  position: {
    x: 620,
    y: 128,
  },
  imageSrc: './assets/images/shop.png',
  scale: 2.75,
  maxFrames: 6,
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  colour: 'blue',
  scale: 2.5,
  offset: {
    x: 215,
    y: 155,
  },
  maxFrames: 8,
  sprites: {
    idle: {
      imageSrc: './assets/fighters/moyasu/Idle.png',
      maxFrames: 8,
    },
    running: {
      imageSrc: './assets/fighters/moyasu/Run.png',
      maxFrames: 8,
    },
    jumping: {
      imageSrc: './assets/fighters/moyasu/Jump.png',
      maxFrames: 2,
    },
    falling: {
      imageSrc: './assets/fighters/moyasu/Fall.png',
      maxFrames: 2,
    },
  }
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  colour: 'red',
  offset: {
    x: -50,
    y: 0,
  },
});

// console.log(player);

const keys = {
  W: {
    pressed: false
  },
  A: {
    pressed: false
  },
  S: {
    pressed: false
  },
  D: {
    pressed: false
  },
  Space: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  Enter: {
    pressed: false
  },
}

decreateTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update(); // calls draw image method
  shop.update();

  player.update();
  // enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.A.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('running');
  } else if (keys.D.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('running');
  } else player.switchSprite('idle'); // sets the default image of the player

  if (player.velocity.y < 0) { // jumping
    player.switchSprite('jumping');
  } else if (player.velocity.y > 0) { //falling
    player.switchSprite('falling');
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  // collision detection for player
  if (rectangularCollision({
    rectangle1: player,
    rectangle2: enemy,
  }) && player.isAttacking) {
    // console.log('player attacked');
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector('#enemyHealth').style.width = `${enemy.health}%`;
  }

  // collision detection for enemy
  if (rectangularCollision({
    rectangle1: enemy,
    rectangle2: player,
  }) && enemy.isAttacking) { 
    // console.log('enemy attacked');
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector('#playerHealth').style.width = `${player.health}%`;
  }

  // end game based on total health loss
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({player, enemy, timerID});
  }
}

animate(); // 'starts' the game

window.addEventListener('keydown', (event) => {
  // console.log(`key: ${event.key}`);

  switch (event.key) {
    case 'w':
      keys.W.pressed = true;
      player.velocity.y = -20;
      break;

    case 'a':
      keys.A.pressed = true;
      player.lastKey = 'a';
      break;

    case 's':
      keys.S.pressed = true;
      break;

    case 'd':
      keys.D.pressed = true;
      player.lastKey = 'd';
      break;

    case ' ':
      keys.Space.pressed = true;
      player.attack();
      break;

    case 'ArrowUp':
      keys.ArrowUp.pressed = true;
      enemy.velocity.y = -20;
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;

    case 'ArrowDown':
      keys.ArrowDown.pressed = true;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;

    case 'Enter':
      keys.Enter.pressed = true;
      enemy.attack();
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      keys.W.pressed = false;
      break;

    case 'a':
      keys.A.pressed = false;
      lastKey = 'a';
      break;

    case 's':
      keys.S.pressed = false;
      break;

    case 'd':
      keys.D.pressed = false;
      lastKey = 'd';
      break;

    case ' ':
      keys.Space.pressed = false;
      break;

    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;

    case 'ArrowDown':
      keys.ArrowDown.pressed = false;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;

    case 'Enter':
      keys.Enter.pressed = false;
      break;
  }
});