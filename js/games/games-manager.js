export class GamesManager {
  constructor(options = {}) {
    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};
    this.showBotAssistant = typeof options.showBotAssistant === 'function' ? options.showBotAssistant : () => {};

    this.initialized = false;
    this.state = {
      meaninglessClicks: 0,
      guessTarget: this.randomTarget(),
      guessAttempts: 0,
      dodgeScore: 0
    };
  }

  randomTarget() {
    return Math.floor(Math.random() * 9) + 1;
  }

  setup() {
    const app = document.getElementById('games-app');
    if (!app) return;

    if (!this.initialized) {
      this.app = app;
      this.render();
      this.bindEvents();
      this.initialized = true;
    }

    this.positionDodgeButton();
  }

  render() {
    this.app.innerHTML = `
      <div style="padding: 10px; font-size: 12px; height: 100%; box-sizing: border-box; overflow-y: auto;">
        <h2 style="margin: 0 0 10px 0;">Pointless Games Pack</h2>
        <p style="margin: 0 0 12px 0; color: #555;">Three games with zero purpose, no progression, and immediate forgettability.</p>

        <div class="fieldset" style="margin-bottom: 10px;">
          <div class="fieldset-legend">1) Meaningless Click Counter</div>
          <p style="margin: 8px 0;">Clicks recorded: <strong id="game-clicks-value">0</strong></p>
          <button class="win95-button" id="game-clicks-btn">Click For No Reason</button>
          <button class="win95-button" id="game-clicks-reset" style="margin-left: 6px;">Reset Nothing</button>
        </div>

        <div class="fieldset" style="margin-bottom: 10px;">
          <div class="fieldset-legend">2) Guess The Number (1-9)</div>
          <p style="margin: 8px 0;">Attempts: <strong id="game-guess-attempts">0</strong></p>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <input id="game-guess-input" type="number" min="1" max="9" style="width: 70px;" />
            <button class="win95-button" id="game-guess-submit">Guess</button>
            <button class="win95-button" id="game-guess-new">New Number</button>
          </div>
          <p id="game-guess-result" style="margin: 8px 0 0 0; color: #333; min-height: 16px;">The machine already knows the answer.</p>
        </div>

        <div class="fieldset" style="margin-bottom: 10px;">
          <div class="fieldset-legend">3) Catch The Escaping Button</div>
          <p style="margin: 8px 0;">Successful catches: <strong id="game-dodge-score">0</strong></p>
          <div id="game-dodge-area" style="position: relative; height: 140px; background: #e8e8e8; border: 1px solid #9a9a9a; overflow: hidden;">
            <button class="win95-button" id="game-dodge-btn" style="position: absolute;">catch me</button>
          </div>
          <p style="margin: 8px 0 0 0; color: #666;">Hint: there is no prize.</p>
        </div>
      </div>
    `;

    this.syncStats();
  }

  bindEvents() {
    const clicksBtn = document.getElementById('game-clicks-btn');
    const clicksReset = document.getElementById('game-clicks-reset');
    const guessSubmit = document.getElementById('game-guess-submit');
    const guessNew = document.getElementById('game-guess-new');
    const dodgeBtn = document.getElementById('game-dodge-btn');

    if (clicksBtn) {
      clicksBtn.addEventListener('click', () => {
        this.playClickSound();
        this.state.meaninglessClicks += 1;
        this.syncStats();
      });
    }

    if (clicksReset) {
      clicksReset.addEventListener('click', () => {
        this.playClickSound();
        this.state.meaninglessClicks = 0;
        this.syncStats();
      });
    }

    if (guessSubmit) {
      guessSubmit.addEventListener('click', () => {
        this.playClickSound();
        this.checkGuess();
      });
    }

    if (guessNew) {
      guessNew.addEventListener('click', () => {
        this.playClickSound();
        this.state.guessTarget = this.randomTarget();
        this.state.guessAttempts = 0;
        const result = document.getElementById('game-guess-result');
        if (result) {
          result.textContent = 'New number selected. Your odds are still bad.';
        }
        this.syncStats();
      });
    }

    if (dodgeBtn) {
      dodgeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.playClickSound();
        this.state.dodgeScore += 1;
        this.syncStats();
        this.positionDodgeButton();

        if (this.state.dodgeScore === 7) {
          this.showBotAssistant('you caught it 7 times. still no reward. impressive commitment to pointless activity.');
        }
      });
    }
  }

  checkGuess() {
    const input = document.getElementById('game-guess-input');
    const result = document.getElementById('game-guess-result');
    if (!input || !result) return;

    const guess = Number(input.value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 9) {
      result.textContent = 'Enter a whole number from 1 to 9.';
      return;
    }

    this.state.guessAttempts += 1;

    if (guess === this.state.guessTarget) {
      result.textContent = `Correct. You won exactly nothing in ${this.state.guessAttempts} attempts.`;
      this.state.guessTarget = this.randomTarget();
      this.state.guessAttempts = 0;
    } else if (guess < this.state.guessTarget) {
      result.textContent = 'Too low. Confidence still admirable.';
    } else {
      result.textContent = 'Too high. Ambition detected.';
    }

    this.syncStats();
    input.select();
  }

  positionDodgeButton() {
    const area = document.getElementById('game-dodge-area');
    const btn = document.getElementById('game-dodge-btn');
    if (!area || !btn) return;

    const maxLeft = Math.max(0, area.clientWidth - btn.offsetWidth - 6);
    const maxTop = Math.max(0, area.clientHeight - btn.offsetHeight - 6);
    const left = Math.floor(Math.random() * (maxLeft + 1));
    const top = Math.floor(Math.random() * (maxTop + 1));

    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
  }

  syncStats() {
    const clicks = document.getElementById('game-clicks-value');
    const attempts = document.getElementById('game-guess-attempts');
    const dodge = document.getElementById('game-dodge-score');

    if (clicks) clicks.textContent = String(this.state.meaninglessClicks);
    if (attempts) attempts.textContent = String(this.state.guessAttempts);
    if (dodge) dodge.textContent = String(this.state.dodgeScore);
  }
}
