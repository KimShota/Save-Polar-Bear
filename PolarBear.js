class PolarBear {
  constructor(x, y, sprites) {
    this.x = x; //x position of polar bear 
    this.y = y; //y position of polar bear 
    this.sprites = sprites;
    this.direction = 2; //default is down 
    this.step = 0; //current step in animation 
    this.speed = 3; //speed of animation 
    
    this.baseScale = 0.07; //always make the size of the polar bear 7% of the whole screen
  }

  update() {
    let moving = false;

    //control direction 
    if (keyIsDown(DOWN_ARROW)) {
      this.direction = 2;
      this.y += this.speed;
      moving = true;
    } 
    else if (keyIsDown(UP_ARROW)) {
      this.direction = 0;
      this.y -= this.speed;
      moving = true;
    } 
    else if (keyIsDown(LEFT_ARROW)) {
      this.direction = 3;
      this.x -= this.speed;
      moving = true;
    } 
    else if (keyIsDown(RIGHT_ARROW)) {
      this.direction = 1;
      this.x += this.speed;
      moving = true;
    }

    //keep polar bear in the canvas 
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    //animation 
    if (moving && frameCount % 10 === 0) {
      this.step = (this.step + 1) % 3;
    }
  }

  display() {
    imageMode(CENTER);

    //size of the bear
    let bearSize = width * this.baseScale;

    //make the bear slightly bigger in fullscreen
    if (fullscreen()) {
      bearSize *= 1.4;
    }

    //make sure that the bear does not get too small or too big
    bearSize = constrain(bearSize, 90, 300);

    image(this.sprites[this.direction][this.step], this.x, this.y, bearSize, bearSize);
  }
}
