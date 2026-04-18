/**
 * Breakout Game - Classic brick breaker
 * Arrow keys or mouse to move paddle, space to launch ball, ESC to exit
 */

export class BreakoutGame {
  constructor() {
    this.reset();
    this.mouseX = 0;
    this.gameRunning = false;
    this.gameOverFlag = false;
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.brickRows = 3;
    this.brickCols = 8;
    this.bricksDestroyed = 0;

    // Canvas dimensions
    this.width = 400;
    this.height = 500;

    // Paddle
    this.paddleWidth = 60;
    this.paddleHeight = 12;
    this.paddleX = (this.width - this.paddleWidth) / 2;
    this.paddleSpeed = 6;

    // Ball
    this.ballRadius = 5;
    this.ballX = this.width / 2;
    this.ballY = this.height - 50;
    this.ballVelX = 0;
    this.ballVelY = 0;
    this.ballLaunched = false;
    this.ballSpeed = 3;

    // Bricks
    this.brickWidth = (this.width - 20) / this.brickCols;
    this.brickHeight = 20;
    this.bricks = [];
    this.createBricks();

    this.highScore = parseInt(localStorage.getItem('breakout_highscore') || '0', 10);
  }

  createBricks() {
    this.bricks = [];
    for (let row = 0; row < this.brickRows; row++) {
      for (let col = 0; col < this.brickCols; col++) {
        this.bricks.push({
          x: 10 + col * this.brickWidth,
          y: 30 + row * this.brickHeight,
          width: this.brickWidth - 2,
          height: this.brickHeight - 2,
          active: true,
          color: ['#ff0000', '#ff6600', '#ffff00'][row]
        });
      }
    }
  }

  render(container, onExit) {
    this.cleanup();
    this.reset();
    this.gameOverFlag = false;

    container.innerHTML = `
      <div id="breakout-game" style="height: 100%; display: flex; flex-direction: column; background: #000; color: #fff; font-family: Arial, sans-serif;">
        <div style="background: #222; border-bottom: 2px solid #ff6600; padding: 10px; display: flex; justify-content: space-between;">
          <div>
            <span style="font-size: 12px;">SCORE: <span id="breakout-score">0</span></span>
            <span style="font-size: 12px; margin-left: 20px;">LIVES: <span id="breakout-lives">3</span></span>
            <span style="font-size: 12px; margin-left: 20px;">HIGH: <span id="breakout-highscore">${this.highScore}</span></span>
          </div>
          <div style="font-size: 11px; color: #ff6600;">
            <span id="breakout-status">SPACE TO LAUNCH</span>
          </div>
        </div>

        <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px;">
          <canvas id="breakout-canvas" width="400" height="500" style="border: 3px solid #ff6600; background: #000; image-rendering: pixelated; box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);"></canvas>
        </div>

        <div style="background: #222; border-top: 2px solid #ff6600; padding: 8px; font-size: 10px; color: #ff6600; text-align: center;">
          ◄ ► or MOUSE to move | SPACE to launch | ESC to exit
        </div>
      </div>
    `;

    const canvas = document.getElementById('breakout-canvas');
    const ctx = canvas.getContext('2d');

    this.setupControls(canvas, onExit);
    this.gameRunning = false;
    this.gameLoop(canvas, ctx, onExit);
  }

  setupControls(canvas, onExit) {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (!this.ballLaunched) {
          this.ballLaunched = true;
          this.ballVelX = (Math.random() - 0.5) * 4;
          this.ballVelY = -this.ballSpeed;
          this.gameRunning = true;
          document.getElementById('breakout-status').textContent = 'GAME RUNNING';
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        this.cleanup();
        onExit();
      }

      if (e.key === 'ArrowLeft') {
        this.paddleX = Math.max(0, this.paddleX - this.paddleSpeed);
      } else if (e.key === 'ArrowRight') {
        this.paddleX = Math.min(this.width - this.paddleWidth, this.paddleX + this.paddleSpeed);
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      const targetX = this.mouseX - this.paddleWidth / 2;
      this.paddleX = Math.max(0, Math.min(this.width - this.paddleWidth, targetX));
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    this._keyHandler = handleKeyDown;
    this._mouseHandler = handleMouseMove;
  }

  gameLoop(canvas, ctx, onExit) {
    const tick = () => {
      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, this.width, this.height);

      if (this.gameRunning) {
        // Update ball
        this.ballX += this.ballVelX;
        this.ballY += this.ballVelY;

        // Ball collision with walls
        if (this.ballX - this.ballRadius < 0 || this.ballX + this.ballRadius > this.width) {
          this.ballVelX = -this.ballVelX;
          this.ballX = Math.max(this.ballRadius, Math.min(this.width - this.ballRadius, this.ballX));
        }

        if (this.ballY - this.ballRadius < 0) {
          this.ballVelY = -this.ballVelY;
          this.ballY = this.ballRadius;
        }

        // Ball lost
        if (this.ballY - this.ballRadius > this.height) {
          this.lives--;
          document.getElementById('breakout-lives').textContent = this.lives;

          if (this.lives <= 0) {
            this.gameRunning = false;
            this.gameOverFlag = true;
            document.getElementById('breakout-status').textContent = 'GAME OVER - PRESS SPACE';
            if (this.score > this.highScore) {
              this.highScore = this.score;
              localStorage.setItem('breakout_highscore', this.highScore.toString());
              document.getElementById('breakout-highscore').textContent = this.highScore;
            }
          } else {
            this.ballX = this.width / 2;
            this.ballY = this.height - 50;
            this.ballVelX = 0;
            this.ballVelY = 0;
            this.ballLaunched = false;
            document.getElementById('breakout-status').textContent = 'SPACE TO LAUNCH';
          }
        }

        // Ball collision with paddle
        if (
          this.ballY + this.ballRadius >= this.height - this.paddleHeight - 20 &&
          this.ballY - this.ballRadius <= this.height - this.paddleHeight - 20 + this.paddleHeight &&
          this.ballX >= this.paddleX &&
          this.ballX <= this.paddleX + this.paddleWidth
        ) {
          this.ballVelY = -Math.abs(this.ballVelY);
          const hitPos = (this.ballX - this.paddleX) / this.paddleWidth;
          this.ballVelX = (hitPos - 0.5) * 6;
          this.ballY = this.height - this.paddleHeight - 20 - this.ballRadius;
        }

        // Ball collision with bricks
        this.bricks.forEach(brick => {
          if (!brick.active) return;

          if (
            this.ballX + this.ballRadius >= brick.x &&
            this.ballX - this.ballRadius <= brick.x + brick.width &&
            this.ballY + this.ballRadius >= brick.y &&
            this.ballY - this.ballRadius <= brick.y + brick.height
          ) {
            brick.active = false;
            this.bricksDestroyed++;
            this.score += 10;
            document.getElementById('breakout-score').textContent = this.score;

            // Simple collision response
            const overlapLeft = this.ballX - (brick.x - this.ballRadius);
            const overlapRight = (brick.x + brick.width + this.ballRadius) - this.ballX;
            const overlapTop = this.ballY - (brick.y - this.ballRadius);
            const overlapBottom = (brick.y + brick.height + this.ballRadius) - this.ballY;

            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapLeft || minOverlap === overlapRight) {
              this.ballVelX = -this.ballVelX;
            } else {
              this.ballVelY = -this.ballVelY;
            }
          }
        });

        // Check win condition
        if (this.bricksDestroyed === this.brickCols * this.brickRows) {
          this.gameRunning = false;
          this.gameOverFlag = true;
          document.getElementById('breakout-status').textContent = 'YOU WIN! PRESS SPACE';
          if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('breakout_highscore', this.highScore.toString());
            document.getElementById('breakout-highscore').textContent = this.highScore;
          }
        }
      }

      // Draw bricks
      this.bricks.forEach(brick => {
        if (brick.active) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
      });

      // Draw paddle
      ctx.fillStyle = '#0ff';
      ctx.fillRect(this.paddleX, this.height - this.paddleHeight - 20, this.paddleWidth, this.paddleHeight);

      // Draw ball
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
      ctx.fill();

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
    if (this._mouseHandler) {
      const canvas = document.getElementById('breakout-canvas');
      if (canvas) canvas.removeEventListener('mousemove', this._mouseHandler);
    }
    this.gameRunning = false;
  }
}
