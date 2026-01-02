class Fish {
  constructor(_x, _y, fishSprites) {
    this.xRatio = _x / width;
    this.yRatio = _y / height;
    this.collected = false;
    this.sprite = random(random(fishSprites));

    this.baseScale = 0.06;
  }

  //function to update the position of fish
  updatePosition() {
    this.x = this.xRatio * width;
    this.y = this.yRatio * height;
  }

  //function to display fish
  display() {
    if (!this.collected) {
      this.updatePosition();

      let fishSize = constrain(width * this.baseScale, 60, 160);

      if (fullscreen()) fishSize *= 1.2;

      imageMode(CENTER);
      image(this.sprite, this.x, this.y, fishSize, fishSize);
    }
  }

  //function to check if the bear collected it or not
  checkCollect(bear) {
    if (!this.collected) {
      this.updatePosition();
      let distance = dist(this.x, this.y, bear.x, bear.y);
      
      //if the distance is less than 50, then mark it as collected 
      if (distance < 70) { 
        this.collected = true;
        return true;
      }
    }
    return false;
  }
}
