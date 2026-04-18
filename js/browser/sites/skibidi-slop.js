/**
 * Skibidi Slop - GifCities chaos themed around skibidi memetics
 * Rotating text, cascading GIFs, glitch effects, pure chaos
 */

export class SkibidiSlop {
  constructor() {
    this.state = {
      view: 'home'
    };
    this.stylesInjected = false;
  }

  injectStyles() {
    if (this.stylesInjected) return;
    this.stylesInjected = true;
    const style = document.createElement('style');
    style.id = 'skibidislop-keyframes';
    style.textContent = `
      @keyframes skibidislop-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      @keyframes skibidislop-glitch { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-2px); } 75% { transform: translateX(2px); } }
      @keyframes skibidislop-rotate { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(360deg); } }
      @keyframes skibidislop-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      @keyframes skibidislop-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      @keyframes skibidislop-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    `;
    document.head.appendChild(style);
  }

  showHome(onNavigate) {
    const homeView = document.getElementById('skibidislop-home-view');
    if (!homeView) return;

    this.injectStyles();

    homeView.innerHTML = `
      <div style="background: #1a1a2e; color: #00ff41; overflow-y: auto; height: 100%;">
        <div style="text-align: center; padding: 20px; background: linear-gradient(90deg, #16213e, #0f3460); border-bottom: 3px solid #00ff41;">
          <h1 style="margin: 0; font-family: Impact, sans-serif; font-size: 56px; text-shadow: 0 0 10px #00ff41, 0 0 20px #00ffff; animation: skibidislop-flicker 0.15s infinite;">
            SKIBIDI SLOP
          </h1>
          <p style="margin: 5px 0; font-family: 'Comic Sans MS'; font-size: 16px; animation: skibidislop-rotate 3s infinite;">
            ✨ SPINNING INTO THE VOID ✨
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 15px;">
          <!-- Toilet Section -->
          <div style="background: #0f3460; border: 3px solid #e94560; padding: 15px; box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);">
            <h2 style="color: #e94560; font-family: 'Comic Sans MS'; margin: 0 0 10px 0; animation: skibidislop-blink 0.6s infinite;">🚽 TOILET DIMENSION 🚽</h2>
            <div class="skibidislop-gif-container" style="background: #1a1a2e; border: 3px dashed #00ff41; padding: 10px; margin: 10px 0; min-height: 150px; display: flex; align-items: center; justify-content: center; color: #00ff41; font-family: monospace; font-size: 10px; text-align: center;">
              [GIF SLOT 1 - ROTATING TOILET]
            </div>
            <div class="skibidislop-gif-container" style="background: #1a1a2e; border: 3px dashed #e94560; padding: 10px; margin: 10px 0; min-height: 150px; display: flex; align-items: center; justify-content: center; color: #e94560; font-family: monospace; font-size: 10px; text-align: center;">
              [GIF SLOT 2 - SKIBIDI TRANSFORMATION]
            </div>
          </div>

          <!-- Slop Core -->
          <div style="background: #16213e; border: 3px solid #00ffff; padding: 15px; box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);">
            <h2 style="color: #00ffff; font-family: Impact; font-size: 24px; margin: 0 0 10px 0;">SLOP CORE ACTIVATED</h2>
            <div style="background: #0f3460; color: #00ff41; padding: 10px; font-family: 'Courier New'; font-size: 10px; line-height: 1.5; border: 2px solid #00ff41; margin-bottom: 10px; overflow-y: auto; max-height: 320px;">
              <p style="margin: 0; animation: skibidislop-glitch 0.3s infinite;">&gt; DIMENSIONAL SPIRAL CONFIRMED</p>
              <p style="margin: 5px 0;">&gt; SKIBIDI FREQUENCY: OPTIMAL</p>
              <p style="margin: 5px 0; animation: skibidislop-blink 0.5s infinite;">&gt; SLOP RESONANCE: MAXIMUM</p>
              <p style="margin: 5px 0;">&gt; TOILET SYNCHRONIZATION: ████████░</p>
              <p style="margin: 5px 0; animation: skibidislop-glitch 0.4s infinite;">&gt; VOID COHERENCE: UNSTABLE</p>
              <p style="margin: 5px 0;">&gt; MEMETIC ALIGNMENT: PERFECT</p>
              <p style="margin: 5px 0; animation: skibidislop-blink 0.7s infinite;">&gt; spinning... spinning... ETERNAL ROTATION</p>
            </div>
            <div style="background: #e94560; color: #000; padding: 5px; text-align: center; font-family: 'Comic Sans MS'; font-weight: bold; animation: skibidislop-pulse 0.8s infinite;">
              🌀 SKIBIDI ACHIEVED 🌀
            </div>
          </div>

          <!-- Chaos Grid -->
          <div style="background: #e94560; border: 3px solid #00ff41; padding: 15px; grid-column: span 2; box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);">
            <h2 style="color: #000; font-family: Impact; margin: 0 0 15px 0; text-transform: uppercase; animation: skibidislop-rotate 4s linear infinite;">THE INFINITE SPIRAL</h2>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
              <div class="skibidislop-gif-container" style="background: #0f3460; border: 2px solid #00ffff; padding: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center; color: #00ffff; font-size: 8px; text-align: center; animation: skibidislop-bounce 0.8s infinite;">
                [CHAOS 1]
              </div>
              <div class="skibidislop-gif-container" style="background: #1a1a2e; border: 2px solid #00ff41; padding: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center; color: #00ff41; font-size: 8px; text-align: center; animation: skibidislop-bounce 0.9s infinite;">
                [CHAOS 2]
              </div>
              <div class="skibidislop-gif-container" style="background: #0f3460; border: 2px solid #e94560; padding: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center; color: #e94560; font-size: 8px; text-align: center; animation: skibidislop-bounce 0.7s infinite;">
                [CHAOS 3]
              </div>
              <div class="skibidislop-gif-container" style="background: #16213e; border: 2px solid #ffff00; padding: 8px; min-height: 100px; display: flex; align-items: center; justify-content: center; color: #ffff00; font-size: 8px; text-align: center; animation: skibidislop-bounce 0.6s infinite;">
                [CHAOS 4]
              </div>
            </div>
          </div>
        </div>

        <div style="background: #0f3460; padding: 15px; text-align: center; border-top: 3px solid #00ff41;">
          <p style="margin: 0; font-family: Impact; color: #00ff41; font-size: 14px; animation: skibidislop-glitch 0.2s infinite;">
            ⚡ SKIBIDI SLOP: TOILET TRANSCENDENCE ⚡
          </p>
          <p style="margin: 5px 0; font-family: monospace; color: #00ffff; font-size: 9px;">
            [rotating infinitely since the beginning of time]
          </p>
        </div>
      </div>
    `;

    homeView.style.display = 'block';
  }

  setupNavigation(container, onNavigate) {
    // No navigation needed
  }
}
