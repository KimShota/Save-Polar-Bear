class PowerUp {
  constructor(_x, _y) {
    this.xRatio = _x / width;
    this.yRatio = _y / height;
    this.collected = false;
  }

  //function to update the position of powerups 
  updatePosition() {
    this.x = this.xRatio * width;
    this.y = this.yRatio * height;
  }

  //function to display powerups
  display() {
    //if not collected, display 
    if (!this.collected) {
      this.updatePosition();

      let size = constrain(width * 0.04, 30, 100);

      //multiply by 1.2 if fullscreen mode
      if (fullscreen()) size *= 1.2;

      //draw a yellow circle 
      fill("yellow");
      noStroke();
      circle(this.x, this.y, size);
    }
  }

  //function to check if the bear collected powerups or not
  checkCollect(bear) {
    if (!this.collected) {
      this.updatePosition();
      let distance = dist(this.x, this.y, bear.x, bear.y);
      if (distance < 50) {
        this.collected = true;
        return true;
      }
    }
    return false;
  }
}
