class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    colour,
    imageSrc,
    scale = 1,
    maxFrames = 1, 
    offset = {
      x: 0,
      y: 0
    },
    sprites
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
      offset, // same as `offset: offset`
      width: 100,
      height: 50,
    },
    this.colour = colour;
    this.isAttacking;
    this.health = 100;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameRate = 5;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x; // x offset for the enemy to attack towards the left
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y; // y offset to change the position of the attackBox on the sprites

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= usableCanvasHeight) {
      this.velocity.y = 0; // stops player from moving past bottom of scene
      this.position.y = background.topResetValue; // smoothens out the sprite changing
    }

    else {
      this.velocity.y += gravity; // only adds gravity value when the y position is above the canvas.height (y < value)
    }
  }

  attack() {
    this.switchSprite('attack1');
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.attack1.image && 
        this.currentFrame < this.sprites.attack1.maxFrames - 1) {
      return;
    }

    switch(sprite) {
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
    }
  }
}