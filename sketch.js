//global variables
let spriteSheet;
let bear;
let fishSheet;
let manager;
let timer = 0;
let fishTimer = 0;
let powerTimer = 0;
let fishSprites;
let gameState = "start";
let startingImage;
let gameoverImage;
let temperature = 0;
let lastTempIncrease = 0;
let slider; //slider for temperature
let bgGameMusic;
let bgMenuMusic;
let bgGameOverMusic;
let currentMusic = null; 

//function to preload all the media 
function preload() {
  spriteSheet = loadImage("polar_bear.png");
  fishSheet = loadImage("fish.png");
  startingImage = loadImage("startImage.png");
  gameoverImage = loadImage("gameover.png");
  bgGameMusic = loadSound("gameMusic.mp3");
  bgMenuMusic = loadSound("menuMusic.mp3");
  bgGameOverMusic = loadSound("gameOverMusic.mp3");
}

//function to play audio
function playMusic(targetMusic) {
  //If the same music is playing, then do nothing 
  if (currentMusic === targetMusic && targetMusic.isPlaying()) return;

  //Stop all the music that is going on 
  if (bgGameMusic && bgGameMusic.isPlaying()) bgGameMusic.stop();
  if (bgMenuMusic && bgMenuMusic.isPlaying()) bgMenuMusic.stop();
  if (bgGameOverMusic && bgGameOverMusic.isPlaying()) bgGameOverMusic.stop();

  //Start playing the new music 
  if (targetMusic) {
    targetMusic.loop();
    targetMusic.setVolume(0.6);
    currentMusic = targetMusic;
  }
}

function setup() {
  // レスポンシブ対応: キャンバスサイズを適切に設定
  let canvas = createCanvas(windowWidth, windowHeight);
  // キャンバスをmain要素に配置
  let mainElement = document.querySelector('main');
  if (mainElement) {
    canvas.parent(mainElement);
  }
  
  // タッチイベントを有効化（モバイル対応）
  if (typeof touchStarted !== 'undefined') {
    // タッチイベントは後で定義
  }

  //Polar bear spritesheet has 3 rows and 4 cols
  let w = int(spriteSheet.width / 3);
  let h = int(spriteSheet.height / 4);

  //array to store polar bear sprites
  let sprites = [];

  //store each sprite image into a 2D array
  for (let j = 0; j < 4; j++) {
    sprites[j] = [];
    for (let i = 0; i < 3; i++) {
      sprites[j][i] = spriteSheet.get(i * w, j * h + 5, w, h);
    }
  }

  //Fish spritesheet has 4 rows and 2 cols 
  let fw = int(fishSheet.width / 4);
  let fh = int(fishSheet.height / 2);

  //store each sprite image into 2D array 
  fishSprites = [];
  for (let j = 0; j < 2; j++) {
    fishSprites[j] = [];
    for (let i = 0; i < 4; i++) {
      fishSprites[j][i] = fishSheet.get(i * fw + 5, j * fh, fw, fh);
    }
  }

  bear = new PolarBear(width / 2, height / 2, sprites);
  manager = new GameManager();

  manager.fillWithIcebergs();
  manager.addFish(6);

  //slider for temperature
  slider = createSlider(0, 50, 0);
  slider.position(100, 50);
  slider.style("accent-color", "red");
  slider.hide();
}

//function to resize everything for the full-screen mode
function windowResized() {
  // レスポンシブ対応: ウィンドウサイズに合わせてキャンバスをリサイズ
  resizeCanvas(windowWidth, windowHeight);
  adjustLayout();
  
  // スライダーの位置も調整
  if (slider) {
    slider.position(100, 50);
  }
}

//function to adjust the size of everything 
function adjustLayout() {
  //rebuild all the grids to match the fullscreen
  if (manager) {
    manager.fillWithIcebergs(); 
  }

  //position the bear at the center of the screen 
  if (bear) {
    bear.x = width/2;
    bear.y = height/2;
  }

  //Adjust the position of the slider and test at the top left corner
  if (manager) {
    manager.displayHUD();
  }
}


//function to do fullscreen mode
function keyTyped() {
  // $$$ For some reason on Chrome/Mac you may have to press f twice to toggle. Works correctly on Firefox/Mac
  if (key === "f" || key === "F") {
    toggleFullscreen();
    return false; // デフォルトの動作を防ぐ
  }
}

// フルスクリーン切り替えのためのキーボードショートカット（キー押下時）
function keyPressed() {
  // ESCキーでフルスクリーンを終了
  if (keyCode === ESCAPE && fullscreen()) {
    toggleFullscreen();
    return false;
  }
}

function toggleFullscreen() {
  let fs = fullscreen();
  fullscreen(!fs);

  //Wait a little longer to ensure full re-render after transition
  setTimeout(() => {
    resizeCanvas(windowWidth, windowHeight);
    adjustLayout();
  }, 500);
}

// フルスクリーン状態の変更を検知
function fullscreenchanged() {
  // フルスクリーン状態が変更されたときにレイアウトを調整
  setTimeout(() => {
    resizeCanvas(windowWidth, windowHeight);
    adjustLayout();
  }, 100);
}

//variable to track previous game state 
let lastGameState = null; 

function draw() {
  background(200, 230, 255);

  //Switch the music only when the game state changes 
  if (gameState !== lastGameState) {
    if (
      gameState === "start" ||
      gameState === "instructions" ||
      gameState === "info"
    ) {
      playMusic(bgMenuMusic);
    } else if (gameState === "game") {
      playMusic(bgGameMusic);
    } else if (gameState === "gameover") {
      playMusic(bgGameOverMusic);
    }
    lastGameState = gameState;
  }

  //Manage each page 
  if (gameState === "start") {
    startPage();
  } else if (gameState === "instructions") {
    instructionPage();
  } else if (gameState === "info") {
    informationPage();
  } else if (gameState === "game") {
    gamePage();
  } else if (gameState === "gameover") {
    gameoverPage();
  }
}

//function to render start page 
function startPage() {
  slider.hide(); //hide the slider 
  
  //background image
  imageMode(CENTER);
  // レスポンシブ対応: 画像サイズを調整
  let imgWidth = width;
  let imgHeight = height;
  let aspectRatio = startingImage.width / startingImage.height;
  let canvasAspect = width / height;
  
  if (aspectRatio > canvasAspect) {
    imgHeight = width / aspectRatio;
  } else {
    imgWidth = height * aspectRatio;
  }
  
  image(startingImage, width / 2, height / 2, imgWidth, imgHeight);

  //display buttons
  button(
    "Start Game",
    width / 2,
    height * 0.70,
    () => (gameState = "instructions")
  );
  button(
    "Why Save Polar Bear?",
    width / 2,
    height * 0.80,
    () => (gameState = "info")
  );
  
  // フルスクリーンボタンを表示（小さなボタン）
  drawFullscreenButton();
}


//function to render instruction page
function instructionPage() {
  slider.hide(); //hide the slider 
  background(200, 230, 255);
  fill(0);
  textAlign(CENTER, TOP);

  //Adjust the text size based on the fullscreen mode 
  let fs = fullscreen();
  // フォントサイズを調整：通常モードではさらに小さく
  let titleSize = min(fs ? width * 0.025 : width * 0.02, fs ? 48 : 36);
  let bodySize = min(fs ? width * 0.015 : width * 0.012, fs ? 24 : 18);

  //title 
  textSize(titleSize);
  textStyle(BOLD);
  text("Instructions", width / 2, height * 0.08);

  //body paragraph
  textSize(bodySize);
  textStyle(NORMAL);

  const instructions =
    "Your mission:\n" +
    "Eat as many fish as possible. This polar bear hasn’t been able to eat anything for 1 month due to the effects of climate change!\n\n" +

    "How to control:\n" +
    "Go Up: press ↑ key\n" +
    "Go Down: press ↓ key\n" +
    "Go Left: press ← key\n" +
    "Go Right: press → key\n\n" +

    "Rules:\n" +
    "1. When icebergs are melting, you can still walk over them. " +
    "But once they are completely melted, you can no longer walk over them.\n" +
    "2. Yellow balls are called “power-ups.” If you collect them, you get 1 iceberg back.";

  //Center text block on the screen
  const textWidthLimit = width * 0.75; //width of text block（少し広く）
  const textHeight = height * 0.65; //total text area height
  const textY = height * 0.15; //上部から開始（少し下に）

  text(instructions, width / 2, textY, textWidthLimit);

  //Centered button near bottom
  const buttonY = height * 0.9;
  button("Let's Play!", width / 2, buttonY, () => {
  reset();           //reset all variables and objects
  gameState = "game";
});

}

//function to render information page 
function informationPage() {
  slider.hide(); //hide the slider 
  background(250, 230, 200);
  textAlign(CENTER, TOP);
  fill(0);

  let fs = fullscreen();

  //change the font side accordingly（フォントサイズを調整：通常モードではさらに小さく）
  let titleSize = min(fs ? width * 0.025 : width * 0.02, fs ? 48 : 36);
  let bodySize = min(fs ? width * 0.015 : width * 0.012, fs ? 24 : 18);

  //title 
  textSize(titleSize);
  textStyle(BOLD);
  text("Why Save Polar Bears?", width / 2, height * 0.08);

  //body paragraph
  textSize(bodySize);
  textStyle(NORMAL);

  const infoText =
    "Polar bears are crucial to the ecosystem of the Arctic Ocean. " +
    "They are the top predators that help maintain a healthy balance among marine life, such as seals, fish, and penguins. " +
    "Therefore, keeping their populations stable helps preserve the health and stability of their environment.\n\n" +

    "However, due to the effects of climate change, the ice that polar bears depend on for hunting is melting rapidly. " +
    "Without sea ice, they are unable to find food or travel long distances. " +
    "Thus, we need to save polar bears not only to protect their species but also to preserve the entire ecosystem. " +
    "We, as human beings, must take responsibility for reducing the impact of our daily activities.\n\n" +

    "The mission of this game is to raise awareness about the impacts of climate change " +
    "on the polar bears’ ecosystem and contribute to tackling climate change.";

  // テキストの位置を調整
  text(infoText, width / 2, height * 0.15, width * 0.8);

  //Display button 
  const buttonY = height * 0.9;
  button("Go Back", width / 2, buttonY, () => gameState = "start");
}

//function to render game page 
function gamePage() {
  background(200, 230, 255);

  slider.show(); //show the slider 

  //melt more icebergs as temperature rises
  if (millis() - timer > 1000) {
    let numMelt = 1 + floor(temperature / 3);

    for (let i = 0; i < numMelt; i++) {
      let index = floor(random(manager.icebergs.length));
      if (manager.icebergs[index]) {
        manager.icebergs[index].startMelting();
      }
    }

    timer = millis();
  }

  //Melt the chosen iceberg while displaying other icebergs
  for (let iceberg of manager.icebergs) {
    iceberg.display();
    iceberg.melt();
  }

  //increase temp every 2 sec
  if (millis() - lastTempIncrease > 2000) {
    temperature += 1;
    lastTempIncrease = millis();
  }

  //display all the fish
  for (let fish of manager.fish) {
    fish.display();
    //increase score if polar bear collects them
    if (fish.checkCollect(bear)) {
      manager.score += 10;
    }
  }

  //generate 2 fish every 5 second
  if (millis() - fishTimer > 5000) {
    manager.addFish(2);
    fishTimer = millis();
  }

  //generate powerups every 7 sec
  if (millis() - powerTimer > 7000) {
    manager.addPowerUp(2);
    powerTimer = millis();
  }

  //Display all the powerups
  for (let power of manager.powerUps) {
    power.display();
    //restore 3 icebergs if polar bear collects it
    if (power.checkCollect(bear)) {
      manager.addIcebergs(1);
    }
  }

  //keep moving and displaying polar bear every frame
  bear.update();
  bear.display();

  //display score at the top left corner
  manager.displayHUD();

  //Check if bear is on the iceberg
  if (manager.IsOver(bear)) {
    gameOver();
  }
}

//function to render game over page 
function gameoverPage() {
  slider.hide(); //hide the slider 
  
  //background image 
  imageMode(CENTER);
  // レスポンシブ対応: 画像サイズを調整
  let imgWidth = width;
  let imgHeight = height;
  let aspectRatio = gameoverImage.width / gameoverImage.height;
  let canvasAspect = width / height;
  
  if (aspectRatio > canvasAspect) {
    imgHeight = width / aspectRatio;
  } else {
    imgWidth = height * aspectRatio;
  }
  
  image(gameoverImage, width / 2, height / 2, imgWidth, imgHeight);

  const fs = fullscreen();

  //Adjust the size of the button accordingly 
  const buttonSpacing = fs ? height * 0.08 : height * 0.09;
  const bottomMargin = fs ? height * 0.12 : height * 0.08; 

  const restartY = height - bottomMargin - buttonSpacing;
  const homeY = height - bottomMargin;

  //Display buttons
  button("Restart", width / 2, restartY, () => {
    reset();
    gameState = "game";
  });

  button("Home", width / 2, homeY, () => (gameState = "start"));
}

// フルスクリーンボタンを描画する関数
function drawFullscreenButton() {
  const btnSize = min(width, height) * 0.06;
  const margin = min(width, height) * 0.03;
  const x = width - margin - btnSize / 2;
  const y = margin + btnSize / 2;
  
  // ボタンの背景
  rectMode(CENTER);
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(2);
  rect(x, y, btnSize, btnSize, 5);
  
  // フルスクリーンアイコン（簡易版）
  fill(0);
  noStroke();
  let iconSize = btnSize * 0.4;
  let offset = btnSize * 0.15;
  
  // フルスクリーンアイコンを描画
  if (fullscreen()) {
    // フルスクリーン中: 縮小アイコン
    rect(x - iconSize/2, y - iconSize/2, iconSize * 0.6, 2);
    rect(x + iconSize/2, y - iconSize/2, 2, iconSize * 0.6);
    rect(x - iconSize/2, y + iconSize/2, 2, iconSize * 0.6);
    rect(x + iconSize/2, y + iconSize/2, iconSize * 0.6, 2);
  } else {
    // 通常モード: 拡大アイコン
    rect(x - iconSize/2 - offset, y - iconSize/2 - offset, iconSize * 0.6, 2);
    rect(x + iconSize/2 + offset, y - iconSize/2 - offset, 2, iconSize * 0.6);
    rect(x - iconSize/2 - offset, y + iconSize/2 + offset, 2, iconSize * 0.6);
    rect(x + iconSize/2 + offset, y + iconSize/2 + offset, iconSize * 0.6, 2);
  }
  
  // クリック判定
  if (mouseX > x - btnSize/2 && mouseX < x + btnSize/2 &&
      mouseY > y - btnSize/2 && mouseY < y + btnSize/2) {
    cursor(HAND);
    if (mouseIsPressed) {
      toggleFullscreen();
    }
  }
}

//fucntion to control buttons 
function button(title, xPos, yPos, action) {
  // レスポンシブ対応: ボタンサイズを調整
  const w = min(width * 0.25, 300);
  const h = min(height * 0.07, 50);
  const r = 15;

  //boolean to check if mouse is hovering over the button 
  let hovering =
    mouseX > xPos - w / 2 &&
    mouseX < xPos + w / 2 &&
    mouseY > yPos - h / 2 &&
    mouseY < yPos + h / 2;

  //draw a box
  rectMode(CENTER);
  fill(hovering ? 220 : 255);
  stroke(0);
  rect(xPos, yPos, w, h, r);

  //the title inside the box 
  fill(0);
  noStroke();
  textFont("VT323");
  textAlign(CENTER, CENTER);
  // レスポンシブ対応: テキストサイズを調整（フルスクリーンと通常モードで分ける）
  let fs = fullscreen();
  let textSizeValue = min(fs ? width * 0.02 : width * 0.016, height * 0.035, fs ? 28 : 22);
  textSize(textSizeValue);
  text(title, xPos, yPos);

  //Execute action when pressed 
  if (hovering && mouseIsPressed) {
    action();
  }
  
  // カーソルをリセット
  if (!hovering) {
    cursor(ARROW);
  }
}

// タッチイベント対応（モバイル）
function touchStarted() {
  // タッチイベントをマウスイベントとして処理
  return false; // デフォルトの動作を防ぐ
}

function touchMoved() {
  return false; // スクロールを防ぐ
}

function touchEnded() {
  return false;
}


//function to tell Game Over
function gameOver() {
  gameState = "gameover";
}

//function to reset the settings
function reset() {
  manager = new GameManager();
  manager.fillWithIcebergs();
  manager.addFish(6);
  bear = new PolarBear(width / 2, height / 2, bear.sprites);
  timer = millis();
  fishTimer = millis();
  powerTimer = millis();
  temperature = 0;
  lastTempIncrease = 0;
}
