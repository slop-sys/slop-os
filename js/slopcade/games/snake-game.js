/**
 * Snake Game - Classic arcade snake game
 * Arrow keys to move, space to start, ESC to exit
 */

export class SnakeGame {
  constructor() {
    this.reset();
    this.keys = {};
    this.gameRunning = false;
    this.gamePaused = false;
    this.gameOverFlag = false;
  }

  reset() {
    this.gridSize = 20;
    this.tileCount = 20;
    this.score = 0;
    this.speed = 6; // ticks per move
    this.speedCounter = 0;

    // Snake as array of {x, y} positions
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];

    this.direction = { x: 1, y: 0 }; // moving right
    this.nextDirection = { x: 1, y: 0 };

    // Food
    this.food = this.generateFood();

    // High score stored in localStorage
    this.highScore = parseInt(localStorage.getItem('snake_highscore') || '0', 10);
  }

  generateFood() {
    let food;
    let collision = true;
    while (collision) {
      food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount)
      };
      collision = this.snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
    return food;
  }

  render(container, onExit) {
    this.cleanup();
    this.reset();
    this.gameOverFlag = false;

    container.innerHTML = `
      <div id="snake-game" style="height: 100%; display: flex; flex-direction: column; background: #000; color: #0f0; font-family: 'Courier New', monospace;">
        <div style="background: #111; border-bottom: 2px solid #0f0; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 12px;">SCORE: <span id="snake-score">0</span></span>
            <span style="font-size: 12px; margin-left: 20px;">HIGH: <span id="snake-highscore">${this.highScore}</span></span>
          </div>
          <div style="font-size: 11px; color: #0a0;">
            <span id="snake-status">PRESS SPACE TO START</span>
          </div>
        </div>

        <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
          <canvas id="snake-canvas" width="400" height="400" style="border: 3px solid #0f0; background: #000; image-rendering: pixelated; box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);"></canvas>
        </div>

        <div style="background: #111; border-top: 2px solid #0f0; padding: 8px; font-size: 10px; color: #0a0; text-align: center;">
          ▲ ▼ ◄ ► to move | SPACE to start/pause | ESC to exit
        </div>
      </div>
    `;

    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');

    this.setupControls(onExit);
    this.gameRunning = false;
    this.gameLoop(canvas, ctx, onExit);
  }

  setupControls(onExit) {
    const handleKeyDown = (e) => {
      this.keys[e.key] = true;

      if (e.key === ' ') {
        e.preventDefault();
        if (!this.gameRunning && !this.gameOverFlag) {
          this.gameRunning = true;
          document.getElementById('snake-status').textContent = 'GAME RUNNING';
        } else if (this.gameRunning) {
          this.gamePaused = !this.gamePaused;
          document.getElementById('snake-status').textContent = this.gamePaused ? 'PAUSED' : 'GAME RUNNING';
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        this.cleanup();
        onExit();
      }

      // Arrow key handling
      if (e.key === 'ArrowUp' && this.direction.y === 0) {
        this.nextDirection = { x: 0, y: -1 };
      } else if (e.key === 'ArrowDown' && this.direction.y === 0) {
        this.nextDirection = { x: 0, y: 1 };
      } else if (e.key === 'ArrowLeft' && this.direction.x === 0) {
        this.nextDirection = { x: -1, y: 0 };
      } else if (e.key === 'ArrowRight' && this.direction.x === 0) {
        this.nextDirection = { x: 1, y: 0 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    this._keyHandler = handleKeyDown;
  }

  gameLoop(canvas, ctx, onExit) {
    const tick = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (this.gameRunning && !this.gamePaused) {
        this.speedCounter++;
        if (this.speedCounter >= this.speed) {
          this.speedCounter = 0;

          // Update direction
          this.direction = { ...this.nextDirection };

          // Calculate new head
          const head = this.snake[0];
          const newHead = {
            x: (head.x + this.direction.x + this.tileCount) % this.tileCount,
            y: (head.y + this.direction.y + this.tileCount) % this.tileCount
          };

          // Check self collision
          if (this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            this.gameRunning = false;
            this.gameOverFlag = true;
            document.getElementById('snake-status').textContent = 'GAME OVER - PRESS SPACE';
            if (this.score > this.highScore) {
              this.highScore = this.score;
              localStorage.setItem('snake_highscore', this.highScore.toString());
              document.getElementById('snake-highscore').textContent = this.highScore;
            }
          } else {
            // Add new head
            this.snake.unshift(newHead);

            // Check food collision
            if (newHead.x === this.food.x && newHead.y === this.food.y) {
              this.score += 10;
              document.getElementById('snake-score').textContent = this.score;
              this.speed = Math.max(2, this.speed - 0.05);
              this.food = this.generateFood();
            } else {
              // Remove tail
              this.snake.pop();
            }
          }
        }
      }

      // Draw food
      ctx.fillStyle = '#f0f';
      const foodSize = canvas.width / this.tileCount;
      ctx.fillRect(this.food.x * foodSize, this.food.y * foodSize, foodSize - 1, foodSize - 1);

      // Draw snake
      this.snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#0ff';
        } else {
          ctx.fillStyle = '#0f0';
        }
        ctx.fillRect(segment.x * foodSize, segment.y * foodSize, foodSize - 1, foodSize - 1);
      });

      if (this.gameRunning || this.gameOverFlag) {
        requestAnimationFrame(tick);
      }
    };

    tick();
  }

  cleanup() {
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
    }
    this.gameRunning = false;
  }
}
