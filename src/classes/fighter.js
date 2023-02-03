class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    colour,
    attackFrame,
    imageSrc,
    scale = 1,
    maxFrames = 1, 
    offset = {
      x: 0,
      y: 0
    },
    sprites,
    attackBox = {
      offset: {},
      width: 0,
      height: 0,
    },
  }) {
    super({
      position,
      imageSrc,
      scale,
      maxFrames,
      offset,
    });
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    },
    this.colour = colour;
    this.isAttacking;
    this.attackFrame = attackFrame;
    this.health = 100;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameRate = 5;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      // console.log(`sprite: ${sprite}`);
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x; // x offset for the enemy to attack towards the left
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y; // y offset to change the position of the attackBox on the sprites

    // draws the attack boxes
    c.fillStyle = "rgba(0, 0, 0, 0.2)"; // sets opacity to 20%
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
      );
      c.fillStyle = "rgba(0, 0, 0, 1)"; // resets opacity back to 100%
      
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // applies gravity if the fighter is not at the lowest level they can get (on the background)
    if (this.position.y + this.height + this.velocity.y >= usableCanvasHeight) {
      this.velocity.y = 0; // stops player from moving past bottom of scene
      this.position.y = background.topResetValue; // smoothens out the sprite changing
    } else {
      this.velocity.y += gravity; // only adds gravity value when the y position is above the canvas.height (y < value)
    }
  }

  attack() {
    this.switchSprite('attack1');
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 20;
    
    if (this.health <= 0) {
      this.switchSprite('death');
    } else {
      this.switchSprite('takeHit');
    }
  }

  switchSprite(sprite) {
    // overriding all other animations with death animation
    if (this.image === this.sprites.death.image && 
        this.currentFrame < this.sprites.death.maxFrames - 1) {
          this.dead = true;
          return;
    }

    // overriding all subsequent animations with attack animation
    if (this.image === this.sprites.attack1.image && 
        this.currentFrame < this.sprites.attack1.maxFrames - 1) {
          return;
    }

    // override all subsequent other animations with takeHit animation
    if (this.image === this.sprites.takeHit.image &&
        this.currentFrame < this.sprites.takeHit.maxFrames - 1) {
          return;
        }

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrames = this.sprites.idle.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'running':
        if (this.image !== this.sprites.running.image) {
          this.image = this.sprites.running.image;
          this.maxFrames = this.sprites.running.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'jumping':
        if (this.image !== this.sprites.jumping.image) {
          this.image = this.sprites.jumping.image;
          this.maxFrames = this.sprites.jumping.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'falling':
        if (this.image !== this.sprites.falling.image) {
          this.image = this.sprites.falling.image;
          this.maxFrames = this.sprites.falling.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.maxFrames = this.sprites.attack1.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.maxFrames = this.sprites.takeHit.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.maxFrames = this.sprites.death.maxFrames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}