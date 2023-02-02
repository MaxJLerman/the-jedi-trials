const canvas = document.querySelector('canvas ');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, colour, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset, // same as `offset: offset`
      width: 100,
      height: 50,
    },
    this.colour = colour;
    this.isAttacking;
  }

  draw() {
    // player, enemy
    c.fillStyle = this.colour;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box
    if (this.isAttacking) {
      c.fillStyle = 'yellow';
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x; // x offset for the enemy to attack towards the left
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y; // y offset to change the position of the attackBox on the sprites

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0; // stops player from moving past bottom of canvas
    }

    else {
      this.velocity.y += gravity; // only adds gravity value when the y position is above the canvas.height (y < value)
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  colour: 'blue',
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
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

console.log(player);

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

// collision detection
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && // rectangle1's right-side box colliding with left of rectangle2
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && // rectangle1's right-side box is on the left of the rectangle2 ONLY
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && //
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height //
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.A.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  }

  else if (keys.D.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  }

  else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  // collision detection for player
  if (rectangularCollision(player, enemy) && player.isAttacking) {
    console.log('player attacked');
    player.isAttacking = false;
  }

  // collision detection for enemy
  if (rectangularCollision(enemy, player) && enemy.isAttacking) { 
    console.log('enemy attacked');
    enemy.isAttacking = false;
  }
}

animate();

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