/**
 * Slopcade - Classic Arcade Gaming for the Slop Era
 * Standalone desktop application with retro mini-games
 */

import { SnakeGame } from './games/snake-game.js';
import { BreakoutGame } from './games/breakout-game.js';
import { SpaceShooterGame } from './games/space-shooter-game.js';

export class SlopcadeManager {
  constructor() {
    this.games = {
      snake: new SnakeGame(),
      breakout: new BreakoutGame(),
      spaceshooter: new SpaceShooterGame()
    };

    this.currentGame = null;
    this.appContainer = null;
  }

  init() {
    this.appContainer = document.getElementById('slopcade-app');
    if (!this.appContainer) return;

    this.renderMenu();
  }

  renderMenu() {
    if (!this.appContainer) return;

    this.appContainer.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; background: linear-gradient(135deg, #440044 0%, #000000 100%); color: #00ff00; font-family: 'Courier New', monospace; padding: 0;">
        <div style="background: #222; border-bottom: 2px solid #00ff00; padding: 12px; text-align: center; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);">
          <h2 style="margin: 0; font-size: 24px; text-shadow: 0 0 10px #00ff00; letter-spacing: 2px;">SLOPCADE</h2>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #00cc00;">WHERE SLOP MEETS ARCADE | EST. 2026</p>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px;">
          <div style="background: rgba(0, 0, 0, 0.5); border: 2px solid #00ff00; padding: 20px; border-radius: 8px; max-width: 300px; box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);">
            <p style="margin: 0 0 20px 0; font-size: 14px; text-align: center; color: #00ff00;">SELECT YOUR GAME</p>
            
            <div style="display: grid; gap: 10px;">
              <button class="slopcade-game-btn" data-game="snake" style="padding: 12px; background: #003300; border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 12px;">
                ▶ SNAKE - Classic Arcade
              </button>
              <button class="slopcade-game-btn" data-game="breakout" style="padding: 12px; background: #003300; border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 12px;">
                ▶ BREAKOUT - Brick Breaker
              </button>
              <button class="slopcade-game-btn" data-game="spaceshooter" style="padding: 12px; background: #003300; border: 2px solid #00ff00; color: #00ff00; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 12px;">
                ▶ SPACE SHOOTER - Arcade
              </button>
            </div>

            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(0, 255, 0, 0.3); font-size: 11px; color: #00aa00; line-height: 1.6; text-align: center;">
              <p style="margin: 0 0 6px 0;"><strong>CONTROLS</strong></p>
              <p style="margin: 0;">Arrow Keys: Move / Use Space to start</p>
              <p style="margin: 0;">ESC: Return to Menu</p>
            </div>
          </div>
        </div>

        <div style="background: #222; border-top: 1px solid #00ff00; padding: 8px; font-size: 10px; color: #00aa00; text-align: center;">
          SLOPCADE v1.0 | PURE SLOP ARCADE ACTION
        </div>
      </div>
    `;

    // Attach event listeners
    document.querySelectorAll('.slopcade-game-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.startGame(btn.dataset.game);
      });
      btn.addEventListener('mouseover', () => {
        btn.style.background = '#006600';
        btn.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
      });
      btn.addEventListener('mouseout', () => {
        btn.style.background = '#003300';
        btn.style.boxShadow = 'none';
      });
    });
  }

  startGame(gameName) {
    const game = this.games[gameName];
    if (!game && !this.appContainer) return;

    this.currentGame = gameName;
    game.render(this.appContainer, () => this.returnToMenu());
  }

  returnToMenu() {
    if (this.currentGame && this.games[this.currentGame]) {
      this.games[this.currentGame].cleanup();
    }
    this.currentGame = null;
    this.renderMenu();
  }
}
