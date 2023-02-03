class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = {
      x: 0,
      y: 0
    },
    topResetValue = 330, // y value to reset the position of the fighter sprites to
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameRate = 11;
    this.offset = offset;
    this.topResetValue = topResetValue;
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.maxFrames), // start cropping [x position]
      0, // start cropping [y position]
      this.image.width / this.maxFrames, // width of 1 sprite frame
      this.image.height, // sprint height
      this.position.x - this.offset.x, // offsets the image [x position]
      this.position.y - this.offset.y, // offsets the image [y position]
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale,
    );
  }

  animateFrames() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameRate === 0) {
      if (this.currentFrame < this.maxFrames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}