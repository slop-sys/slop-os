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

    this.cleanupActiveGame();

    this.appContainer.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; background: #008080; color: #000; font-family: 'MS Sans Serif', Tahoma, sans-serif; padding: 0;">
        <div style="background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; padding: 10px; text-align: center;">
          <div style="display: flex; justify-content: center; gap: 12px; align-items: center; margin-bottom: 8px;">
            <img src="assets/slop-t-trans.png" alt="Slop T Logo" style="height: 26px; width: auto; image-rendering: pixelated;">
            <img src="assets/rotos.png" alt="Rotos Logo" style="height: 26px; width: auto; image-rendering: pixelated;">
          </div>
          <h2 style="margin: 0; font-size: 44px; font-weight: bold; font-family: 'Times New Roman', serif; font-style: italic; letter-spacing: 1px; color: #003300;">SLOPCADE</h2>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #003300; font-weight: bold;">WHERE SLOP MEETS ARCADE | EST. 2026</p>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 14px; background: #400040;">
          <div style="background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; padding: 18px; max-width: 320px; width: 100%;">
            <p style="margin: 0 0 16px 0; font-size: 20px; text-align: center; color: #000; font-family: 'Times New Roman', serif; font-weight: bold;">SELECT YOUR GAME</p>
            
            <div style="display: grid; gap: 10px;">
              <button class="slopcade-game-btn" data-game="snake" style="padding: 9px 12px; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; color: #000; font-family: 'MS Sans Serif', Tahoma, sans-serif; font-weight: bold; cursor: pointer; font-size: 18px; text-align: left;">
                ▶ SLOP SERPENT - Grid Gobbler
              </button>
              <button class="slopcade-game-btn" data-game="breakout" style="padding: 9px 12px; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; color: #000; font-family: 'MS Sans Serif', Tahoma, sans-serif; font-weight: bold; cursor: pointer; font-size: 18px; text-align: left;">
                ▶ BRICKS OF SLOP - Wall Smacker
              </button>
              <button class="slopcade-game-btn" data-game="spaceshooter" style="padding: 9px 12px; background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; color: #000; font-family: 'MS Sans Serif', Tahoma, sans-serif; font-weight: bold; cursor: pointer; font-size: 18px; text-align: left;">
                ▶ ROTOS RAID - Void Shooter
              </button>
            </div>

            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #808080; font-size: 12px; color: #000; line-height: 1.6; text-align: center;">
              <p style="margin: 0 0 4px 0;"><strong>CONTROLS</strong></p>
              <p style="margin: 0;">Arrow Keys: Move / Space: Start</p>
              <p style="margin: 0;">ESC: Return to Menu</p>
            </div>
          </div>
        </div>

        <div style="background: #c0c0c0; border-top: 2px solid #fff; border-left: 2px solid #fff; border-right: 2px solid #555; border-bottom: 2px solid #555; padding: 7px; font-size: 10px; color: #000; text-align: center; font-weight: bold;">
          SLOPCADE v1.0 | PURE SLOP ARCADE ACTION
        </div>
      </div>
    `;

    // Attach event listeners
    this.appContainer.querySelectorAll('.slopcade-game-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.startGame(btn.dataset.game);
      });
      btn.addEventListener('mouseover', () => {
        btn.style.background = '#000080';
        btn.style.color = '#fff';
      });
      btn.addEventListener('mouseout', () => {
        btn.style.background = '#c0c0c0';
        btn.style.color = '#000';
      });
    });
  }

  startGame(gameName) {
    const game = this.games[gameName];
    if (!game || !this.appContainer) return;

    this.cleanupActiveGame();
    this.currentGame = gameName;
    game.render(this.appContainer, () => this.returnToMenu());
  }

  cleanupActiveGame() {
    if (this.currentGame && this.games[this.currentGame]) {
      this.games[this.currentGame].cleanup();
    }
    this.currentGame = null;
  }

  returnToMenu() {
    this.cleanupActiveGame();
    this.renderMenu();
  }
}
