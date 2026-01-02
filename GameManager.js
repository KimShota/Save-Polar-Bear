class GameManager {
  constructor() {
    this.score = 0; //score starts with 0
    this.icebergs = [];
    this.fish = [];
    this.powerUps = [];
  }

  //function to fill up the canvas with 15 X 15 grids
  fillWithIcebergs() {
    let cols = 10;
    let rows = 10;
    let x_width = width / cols; //how wide each grid is
    let y_height = height / rows; //how tall each grid is

    this.icebergs = [];

    //create 15 X 15 grids
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        //push all the icebergs into an array called icebergs to display them
        this.icebergs.push(
          new Iceberg(
            i * x_width + x_width / 2,
            j * y_height + y_height / 2,
            x_width,
            y_height
          )
        );
      }
    }
  }

  //function to restore 3 icebergs
  addIcebergs(num) {
    let restored = 0;
    for (let iceberg of this.icebergs) {
      if (iceberg.melted && restored < num) {
        iceberg.restore();
        restored++;
      }
    }
  }

  //function to add more fish
  addFish(num) {
    for (let i = 0; i < num; i++) {
      let x = random(width);
      let y = random(height);
      this.fish.push(new Fish(x, y, fishSprites));
    }
  }

  //function to add more powerups
  addPowerUp(num = 1) {
    for (let i = 0; i < num; i++) {
      let x = random(width);
      let y = random(height);
      this.powerUps.push(new PowerUp(x, y));
    }
  }

  //function to display the score and the temp slider
  displayHUD() {
    fill(0);
    textAlign(LEFT);

    //Adjust the text size accordingly
    let hudSize = width * 0.02;
    textSize(hudSize);

    const paddingX = width * 0.02;
    const scoreY = height * 0.05;
    const tempY = height * 0.1;

    //display both text and score at paddingX and scoreY
    text(`Score: ${this.score}`, paddingX, scoreY);
    const temperatureLabel = `Temp: ${temperature}°C`;
    text(temperatureLabel, paddingX, tempY);

    const labelWidth = textWidth(temperatureLabel);

    // Slider placement relative to text
    const sliderX = paddingX + labelWidth + width * 0.015;
    const sliderY = tempY - hudSize * 0.5;

    //position and color of the slider
    slider.position(sliderX, sliderY);
    slider.style("width", `${width * 0.25}px`);
    slider.style("height", `${hudSize * 1.2}px`);
    slider.style("accent-color", "red");

    slider.value(temperature);
  }

  //function to check if bear went into melted icebergs
  IsOver(bear) {
    //adjust the size of polar bear accordingly
    let bearSize = width * bear.baseScale;
    if (fullscreen()) {
      bearSize *= 1.6;
    }
    //don't make it too big or too small
    bearSize = constrain(bearSize, 90, 300);

    const bearHitbox = bearSize * 0.5;
    const bearHalf = bearHitbox / 2;

    for (let iceberg of this.icebergs) {
      if (iceberg.melted) {
        const overlapX = abs(bear.x - iceberg.x) < bearHalf + iceberg.w / 2;
        const overlapY = abs(bear.y - iceberg.y) < bearHalf + iceberg.h / 2;

        if (overlapX && overlapY) {
          return true;
        }
      }
    }

    return false;
  }
}
