/**
 * Space Shooter Game - Classic vertical shooter
 * Arrow keys to move, space to shoot, ESC to exit
 */

export class SpaceShooterGame {
  constructor() {
    this.reset();
    this.gameRunning = false;
    this.gameOverFlag = false;
    this.isMounted = false;
    this.rafId = null;
  }

  reset() {
    this.score = 0;
    this.lives = 3;
    this.wave = 1;
    this.enemiesKilled = 0;

    // Canvas
    this.width = 400;
    this.height = 500;

    // Player ship
    this.player = {
      x: this.width / 2 - 15,
      y: this.height - 50,
      width: 30,
      height: 30,
      speed: 4
    };

    // Bullets
    this.bullets = [];
    this.bulletSpeed = 7;

    // Enemies
    this.enemies = [];
    this.enemyShots = [];
    this.spawnCounter = 0;
    this.spawnRate = 60;

    this.highScore = parseInt(localStorage.getItem('spaceshooter_highscore') || '0', 10);
  }

  spawnEnemy() {
    this.enemies.push({
      x: Math.random() * (this.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 1.5 + (this.wave * 0.5),
      shootCounter: 0,
      shootRate: Math.random() * 60 + 40
    });
  }

  render(container, onExit) {
    this.cleanup();
    this.reset();
    this.gameOverFlag = false;

    container.innerHTML = `
      <div id="spaceshooter-game" style="height: 100%; display: flex; flex-direction: column; background: #c0c0c0; color: #000; font-family: 'MS Sans Serif', Tahoma, sans-serif;">
        <div style="background: #000080; border-bottom: 1px solid #000; padding: 5px 10px; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 11px; color: #fff; font-weight: bold;">
          <img src="assets/slop-t-trans.png" alt="Slop T Logo" style="height: 18px; width: auto; image-rendering: pixelated;">
          <strong>ROTOS RAID</strong>
          <img src="assets/rotos.png" alt="Rotos Logo" style="height: 18px; width: auto; image-rendering: pixelated;">
        </div>
        <div style="background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; padding: 8px 10px; display: flex; justify-content: space-between;">
          <div>
            <span style="font-size: 12px;">SCORE: <span id="ss-score">0</span></span>
            <span style="font-size: 12px; margin-left: 20px;">LIVES: <span id="ss-lives">3</span></span>
            <span style="font-size: 12px; margin-left: 20px;">WAVE: <span id="ss-wave">1</span></span>
            <span style="font-size: 12px; margin-left: 20px;">HIGH: <span id="ss-highscore">${this.highScore}</span></span>
          </div>
          <div style="font-size: 11px; color: #000080; font-weight: bold;">
            <span id="ss-status">PRESS SPACE TO START</span>
          </div>
        </div>

        <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding: 10px; background: #808080;">
          <canvas id="spaceshooter-canvas" width="400" height="500" style="border-top: 2px solid #555; border-left: 2px solid #555; border-right: 2px solid #fff; border-bottom: 2px solid #fff; background: #001a4d; image-rendering: pixelated;"></canvas>
        </div>

        <div style="background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; padding: 6px; font-size: 11px; color: #000; text-align: center;">
          ◄ ► to move | SPACE to shoot | ESC to exit
        </div>
      </div>
    `;

    const canvas = document.getElementById('spaceshooter-canvas');
    const ctx = canvas.getContext('2d');

    this.setupControls(onExit);
    this.gameRunning = false;
    this.gameLoop(canvas, ctx, onExit);
  }

  setupControls(onExit) {
    const keys = {};

    const shouldHandleInput = () => {
      const slopcadeWindow = document.getElementById('slopcade-window');
      return Boolean(
        slopcadeWindow
        && slopcadeWindow.style.display !== 'none'
        && slopcadeWindow.classList.contains('active')
      );
    };

    const handleKeyDown = (e) => {
      if (!shouldHandleInput()) return;

      keys[e.key] = true;

      if (e.key === ' ') {
        e.preventDefault();
        if (!this.gameRunning && this.gameOverFlag) {
          this.reset();
          this.gameOverFlag = false;
          document.getElementById('ss-score').textContent = this.score;
          document.getElementById('ss-lives').textContent = this.lives;
          document.getElementById('ss-wave').textContent = this.wave;
          document.getElementById('ss-status').textContent = 'WAVE ' + this.wave;
          this.gameRunning = true;
        } else if (!this.gameRunning && !this.gameOverFlag) {
          this.gameRunning = true;
          document.getElementById('ss-status').textContent = 'WAVE ' + this.wave;
        } else if (this.gameRunning) {
          this.bullets.push({
            x: this.player.x + this.player.width / 2 - 2,
            y: this.player.y,
            width: 4,
            height: 10
          });
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        this.cleanup();
        onExit();
      }
    };

    const handleKeyUp = (e) => {
      if (!shouldHandleInput()) return;
      keys[e.key] = false;
    };

    // Update player position based on held keys
    const updatePlayer = () => {
      if (keys['ArrowLeft']) {
        this.player.x = Math.max(0, this.player.x - this.player.speed);
      }
      if (keys['ArrowRight']) {
        this.player.x = Math.min(this.width - this.player.width, this.player.x + this.player.speed);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    this._keyHandler = handleKeyDown;
    this._keyUpHandler = handleKeyUp;
    this._updatePlayer = updatePlayer;
  }

  gameLoop(canvas, ctx, onExit) {
    this.isMounted = true;

    const tick = () => {
      if (!this.isMounted) return;

      // Clear canvas
      ctx.fillStyle = '#001a4d';
      ctx.fillRect(0, 0, this.width, this.height);

      if (this.gameRunning) {
        // Update player
        if (this._updatePlayer) this._updatePlayer();

        // Spawn enemies
        this.spawnCounter++;
        if (this.spawnCounter >= this.spawnRate) {
          this.spawnCounter = 0;
          this.spawnEnemy();
          if (this.spawnRate > 20) this.spawnRate -= 1;
        }

        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
          bullet.y -= this.bulletSpeed;
          return bullet.y > 0;
        });

        // Update enemies
        this.enemies = this.enemies.filter(enemy => {
          enemy.y += enemy.speed;

          // Enemy shoots
          enemy.shootCounter++;
          if (enemy.shootCounter >= enemy.shootRate) {
            enemy.shootCounter = 0;
            this.enemyShots.push({
              x: enemy.x + enemy.width / 2 - 2,
              y: enemy.y + enemy.height,
              width: 4,
              height: 10
            });
          }

          // Bullet-enemy collision
          this.bullets = this.bullets.filter(bullet => {
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + bullet.width > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + bullet.height > enemy.y
            ) {
              this.score += 10;
              this.enemiesKilled++;
              document.getElementById('ss-score').textContent = this.score;

              // Wave progression
              if (this.enemiesKilled % (5 + this.wave * 2) === 0) {
                this.wave++;
                this.spawnRate = Math.max(20, 60 - this.wave * 5);
                document.getElementById('ss-wave').textContent = this.wave;
                document.getElementById('ss-status').textContent = 'WAVE ' + this.wave;
              }

              return false;
            }
            return true;
          });

          return enemy.y < this.height;
        });

        // Update enemy shots
        this.enemyShots = this.enemyShots.filter(shot => {
          shot.y += 4;

          // Player collision
          if (
            shot.x < this.player.x + this.player.width &&
            shot.x + shot.width > this.player.x &&
            shot.y < this.player.y + this.player.height &&
            shot.y + shot.height > this.player.y
          ) {
            this.lives--;
            document.getElementById('ss-lives').textContent = this.lives;

            if (this.lives <= 0) {
              this.gameRunning = false;
              this.gameOverFlag = true;
              document.getElementById('ss-status').textContent = 'GAME OVER - PRESS SPACE';
              if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('spaceshooter_highscore', this.highScore.toString());
                document.getElementById('ss-highscore').textContent = this.highScore;
              }
            }

            return false;
          }

          return shot.y < this.height;
        });

        // Enemy collision with player
        this.enemies.forEach(enemy => {
          if (
            this.player.x < enemy.x + enemy.width &&
            this.player.x + this.player.width > enemy.x &&
            this.player.y < enemy.y + enemy.height &&
            this.player.y + this.player.height > enemy.y
          ) {
            this.lives--;
            document.getElementById('ss-lives').textContent = this.lives;

            if (this.lives <= 0) {
              this.gameRunning = false;
              this.gameOverFlag = true;
              document.getElementById('ss-status').textContent = 'GAME OVER - PRESS SPACE';
              if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('spaceshooter_highscore', this.highScore.toString());
                document.getElementById('ss-highscore').textContent = this.highScore;
              }
            }

            enemy.x = -100; // Remove from screen
          }
        });
      }

      // Draw player ship
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      ctx.fillStyle = '#00cc00';
      ctx.fillRect(this.player.x + 10, this.player.y - 5, 10, 5);

      // Draw bullets
      ctx.fillStyle = '#ffff00';
      this.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Draw enemies
      ctx.fillStyle = '#ff3300';
      this.enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });

      // Draw enemy shots
      ctx.fillStyle = '#ff6600';
      this.enemyShots.forEach(shot => {
        ctx.fillRect(shot.x, shot.y, shot.width, shot.height);
      });

      this.rafId = requestAnimationFrame(tick);
    };

    tick();
  }

  cleanup() {
    this.isMounted = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    if (this._keyUpHandler) {
      window.removeEventListener('keyup', this._keyUpHandler);
      this._keyUpHandler = null;
    }
    this._updatePlayer = null;
    this.gameRunning = false;
  }
}
