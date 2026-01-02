# 🐻 Save Polar Bear

An interactive web-based game developed with p5.js that raises awareness about climate change and its impact on polar bear ecosystems. Players navigate a melting Arctic environment, collecting fish to survive while icebergs gradually disappear due to rising temperatures.

![Save Polar Bear](https://img.shields.io/badge/Status-Complete-success)
![p5.js](https://img.shields.io/badge/p5.js-1.11.10-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 About

**Save Polar Bear** is an educational game that combines engaging gameplay with environmental awareness. The game simulates the challenges polar bears face due to climate change, where players must collect fish to survive while navigating a dynamically changing environment where icebergs melt over time. Through interactive gameplay, players learn about the urgent need to protect polar bear habitats and the broader Arctic ecosystem.

## ✨ Features

- **Dynamic Gameplay**: Real-time environmental changes as icebergs melt progressively
- **Sprite Animations**: Smooth character and object animations using sprite sheets
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Fullscreen Mode**: Toggle fullscreen for immersive gameplay experience
- **Audio Integration**: Background music and sound effects for different game states
- **Power-up System**: Collect power-ups to restore melting icebergs
- **Score Tracking**: Track your performance as you collect fish
- **Educational Content**: Information pages explaining the importance of polar bear conservation

## 🛠️ Technologies

- **p5.js** - Creative coding library for web
- **p5.sound** - Audio library for p5.js
- **JavaScript (ES6+)** - Core programming language
- **HTML5/CSS3** - Structure and styling
- **Object-Oriented Programming** - Modular class-based architecture

## 📁 Project Structure

```
Save-Polar-Bear/
├── index.html          # Main HTML file
├── sketch.js           # Main game logic and setup
├── style.css           # Responsive styling
├── PolarBear.js        # Polar bear character class
├── Fish.js             # Fish object class
├── Iceberg.js          # Iceberg object class
├── PowerUp.js          # Power-up object class
├── GameManager.js      # Game state and object management
├── polar_bear.png      # Polar bear sprite sheet
├── fish.png            # Fish sprite sheet
├── startImage.png      # Start screen background
├── gameover.png        # Game over screen background
├── gameMusic.mp3       # In-game background music
├── menuMusic.mp3       # Menu background music
└── gameOverMusic.mp3   # Game over background music
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for audio files to work properly)

### Installation

1. Clone or download this repository:
```bash
git clone [repository-url]
cd Save-Polar-Bear
```

2. Start a local web server. You can use one of the following methods:

**Option 1: Python (Recommended)**
```bash
python3 -m http.server 8000
```

**Option 2: Node.js http-server**
```bash
npm install -g http-server
http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 🎮 How to Play

### Controls

- **↑ Arrow Key** - Move up
- **↓ Arrow Key** - Move down
- **← Arrow Key** - Move left
- **→ Arrow Key** - Move right
- **F Key** - Toggle fullscreen mode
- **ESC Key** - Exit fullscreen mode

### Gameplay

1. **Objective**: Collect as many fish as possible to score points
2. **Challenge**: Icebergs melt over time due to rising temperatures
3. **Strategy**: 
   - Navigate carefully as melted icebergs become impassable
   - Collect yellow power-ups to restore icebergs
   - Balance survival with the accelerating effects of climate change
4. **Game Over**: The game ends when the polar bear falls into the water (no iceberg to stand on)

### Game Rules

- When icebergs are melting, you can still walk over them
- Once icebergs are completely melted, you can no longer walk over them
- Yellow power-ups restore 1 iceberg when collected
- Temperature increases every 2 seconds, accelerating iceberg melting
- Fish spawn every 5 seconds
- Power-ups spawn every 7 seconds

## 🎨 Features in Detail

### Responsive Design
- Automatically adjusts to different screen sizes
- Optimized font sizes for fullscreen and windowed modes
- Touch-friendly interface for mobile devices

### Game States
- **Start Screen**: Main menu with game options
- **Instructions**: Game rules and controls
- **Information**: Educational content about polar bears
- **Game**: Active gameplay
- **Game Over**: End screen with restart option

### Audio System
- Dynamic music switching based on game state
- Volume control and seamless transitions
- Immersive sound design

## 🔧 Development

### Key Classes

- **PolarBear**: Handles player character movement, animation, and collision
- **Fish**: Manages fish spawning, display, and collection mechanics
- **Iceberg**: Controls iceberg states (solid, melting, melted) and rendering
- **PowerUp**: Handles power-up spawning and collection effects
- **GameManager**: Manages game state, score, and object coordination

## 📝 Future Enhancements

- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] High score leaderboard
- [ ] Additional power-up types
- [ ] More environmental effects
- [ ] Multiplayer mode
- [ ] Achievement system

## 🎯 Learning Outcomes

This project demonstrates:
- Object-oriented programming principles
- Game development with p5.js
- Responsive web design
- State management
- Sprite animation techniques
- Audio integration
- User interface design

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Shota Matsumoto**

## 🙏 Acknowledgments

- p5.js community for excellent documentation
- Educational resources on climate change and polar bear conservation
- VT323 font by Google Fonts

---

**Note**: This game was developed as a midterm project to combine interactive entertainment with environmental education, highlighting the critical importance of climate change awareness.

