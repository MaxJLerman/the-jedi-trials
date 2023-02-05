const canvas = document.querySelector('canvas');
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
  topResetValue: 330,
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
  imageSrc: './assets/fighters/moyasu/Idle.png',
  attackFrame: 4,
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
    attack1: {
      imageSrc: './assets/fighters/moyasu/Attack1.png',
      maxFrames: 6,
    },
    takeHit: {
      imageSrc: './assets/fighters/moyasu/Take_Hit.png',
      maxFrames: 4,
    },
    death: {
      imageSrc: './assets/fighters/moyasu/Death.png',
      maxFrames: 6,
    }
  },
  attackBox: {
    offset: {
      x: -10,
      y: -23,
    },
    width: 268,
    height: 164,
  },
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
  scale: 2.5,
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: './assets/fighters/hikari/Idle.png',
  attackFrame: 2,
  maxFrames: 4,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './assets/fighters/hikari/Idle.png',
      maxFrames: 4,
    },
    running: {
      imageSrc: './assets/fighters/hikari/Run.png',
      maxFrames: 8,
    },
    jumping: {
      imageSrc: './assets/fighters/hikari/Jump.png',
      maxFrames: 2,
    },
    falling: {
      imageSrc: './assets/fighters/hikari/Fall.png',
      maxFrames: 2,
    },
    attack1: {
      imageSrc: './assets/fighters/hikari/Attack1.png',
      maxFrames: 4,
    },
    takeHit: {
      imageSrc: './assets/fighters/hikari/Take_Hit.png',
      maxFrames: 3,
    },
    death: {
      imageSrc: './assets/fighters/hikari/Death.png',
      maxFrames: 7,
    },
  },
  attackBox: {
    offset: {
      x: -175,
      y: 2,
    },
    width: 213,
    height: 150,
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

  c.fillStyle = 'rgba(255, 255, 255, 0.15)'; // adds a white overlay with 15% opacity
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'rgba(0, 0, 0, 1)';

  player.update();
  enemy.update();

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
    enemy.switchSprite('running');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('running');
  } else enemy.switchSprite('idle');

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jumping');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('falling');
  }

  // collision detection for player & enemy gets hit
  if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
      player.isAttacking &&
      player.currentFrame === player.attackFrame
   ) {
    // console.log('player attacked');
    enemy.takeHit();
    player.isAttacking = false;

    // document.querySelector('#enemyHealth').style.width = `${enemy.health}%`;
    gsap.to('#enemyHealth', { // animates the health loss instead of taking a chunk off in one frame
      width: `${enemy.health}%`,
    });
  }

  // if player misses
  if (player.isAttacking && player.currentFrame === player.attackFrame) {
    player.isAttacking = false;
  }

  // collision detection for enemy & player  gets hit
  if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
      enemy.isAttacking &&
      enemy.currentFrame === enemy.attackFrame
  ) { 
    // console.log('enemy attacked');
    player.takeHit();
    enemy.isAttacking = false;

    // document.querySelector('#playerHealth').style.width = `${player.health}%`;
    gsap.to('#playerHealth', { // animates the health loss instead of taking a chunk off in one frame
      width: `${player.health}%`,
    });
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.currentFrame === enemy.attackFrame) {
    enemy.isAttacking = false;
  }

  // end game based on total health loss
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({player, enemy, timerID});
  }
}

animate(); // 'starts' the game

window.addEventListener('keydown', (event) => {
  // console.log(`key: ${event.key}`);
  if (!player.dead) {
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
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
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