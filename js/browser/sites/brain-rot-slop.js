/**
 * Brain Rot Slop - GifCities maximum chaos mode
 * Overlapping GIFs, glitching text, aggressive animations, pure sensory overload
 */

export class BrainRotSlop {
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
    style.id = 'brainrotslop-keyframes';
    style.textContent = `
      @keyframes brainrot-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
      @keyframes brainrot-glitchSmall { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-1px); } }
      @keyframes brainrot-glitchBig { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
      @keyframes brainrot-rotate { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(360deg); } }
      @keyframes brainrot-wiggle { 0%, 100% { transform: skewY(-1deg); } 50% { transform: skewY(1deg); } }
      @keyframes brainrot-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
      @keyframes brainrot-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes brainrot-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      @keyframes brainrot-scale { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.95); } }
      @keyframes brainrot-gradientShift { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
    `;
    document.head.appendChild(style);
  }

  showHome(onNavigate) {
    const homeView = document.getElementById('brainrotslop-home-view');
    if (!homeView) return;

    this.injectStyles();

    homeView.innerHTML = `
      <div style="background: #000; color: #fff; overflow-y: auto; height: 100%;">
        <div style="position: relative; padding: 20px; background: linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff); background-size: 200% 100%; animation: brainrot-gradientShift 1s infinite;">
          <h1 style="margin: 0; font-family: 'Comic Sans MS', cursive; font-size: 64px; text-shadow: 
            3px 3px 0 #000, 6px 6px 0 #ff00ff, 9px 9px 0 #00ffff, 12px 12px 0 #ffff00;
            animation: brainrot-wiggle 0.2s infinite; color: #000;">
            BRAIN ROT SLOP
          </h1>
          <p style="margin: 5px 0; font-family: Impact; font-size: 24px; color: #000; text-transform: uppercase; animation: brainrot-shake 0.1s infinite;">
            🧠 MAXIMUM SLOP OVERLOAD 🧠
          </p>
        </div>

        <div style="padding: 15px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; min-height: 500px;">
          <!-- Top Left - Pure Chaos -->
          <div style="background: #ff00ff; border: 5px solid #00ff00; padding: 10px; grid-row: span 2; box-shadow: 0 0 30px rgba(0,255,0,0.8), inset 0 0 20px rgba(255,0,255,0.5);">
            <h2 style="color: #000; font-family: 'Courier New'; margin: 0 0 10px 0; animation: brainrot-glitchBig 0.1s infinite;">PURE CHAOS ZONE</h2>
            <div class="brainrotslop-gif-container" style="background: #000; border: 3px dashed #00ff00; padding: 10px; margin: 10px 0; min-height: 140px; display: flex; align-items: center; justify-content: center; color: #0f0; font-family: monospace; font-size: 9px; text-align: center; animation: brainrot-scale 0.3s infinite;">
              [CHAOS GIF 1]
            </div>
            <div class="brainrotslop-gif-container" style="background: #000; border: 3px dashed #ffff00; padding: 10px; margin: 10px 0; min-height: 140px; display: flex; align-items: center; justify-content: center; color: #ff0; font-family: monospace; font-size: 9px; text-align: center; animation: brainrot-scale 0.4s infinite;">
              [CHAOS GIF 2]
            </div>
          </div>

          <!-- Center Column - Text Overload -->
          <div style="background: #00ffff; border: 5px solid #ff00ff; padding: 10px; box-shadow: 0 0 30px rgba(255,0,255,0.8), inset 0 0 20px rgba(0,255,255,0.5);">
            <h2 style="color: #000; font-family: Impact; margin: 0 0 10px 0; font-size: 28px; animation: brainrot-rotate 2s linear infinite;">SLOP OVERFLOW</h2>
            <div style="background: #000; color: #00ff00; padding: 8px; font-family: 'Courier New'; font-size: 9px; line-height: 1.3; border: 2px solid #00ff00; max-height: 280px; overflow-y: auto;">
              <p style="margin: 0; animation: brainrot-glitchSmall 0.08s infinite;">&gt;&gt;&gt; DIMENSIONAL SLOP DETECTED</p>
              <p style="margin: 2px 0; animation: brainrot-blink 0.3s infinite;">&gt;&gt;&gt; BRAIN RECEIVING MAXIMUM INPUT</p>
              <p style="margin: 2px 0;">&gt;&gt;&gt; COHERENCE: FRAGMENTING</p>
              <p style="margin: 2px 0; animation: brainrot-glitchSmall 0.1s infinite;">&gt;&gt;&gt; CONSCIOUSNESS: ▮▯▯▯ DEGRADING</p>
              <p style="margin: 2px 0; animation: brainrot-blink 0.4s infinite;">&gt;&gt;&gt; SLOP INTEGRATION: COMPLETE</p>
              <p style="margin: 2px 0;">&gt;&gt;&gt; RESISTANCE: FUTILE</p>
              <p style="margin: 2px 0; animation: brainrot-glitchSmall 0.07s infinite;">&gt;&gt;&gt; WELCOME TO SLOP PARADISE</p>
            </div>
          </div>

          <!-- Center Right - Animated GIF Stack -->
          <div style="background: #ffff00; border: 5px solid #ff00ff; padding: 10px; box-shadow: 0 0 30px rgba(255,0,255,0.8); display: flex; flex-direction: column; gap: 8px;">
            <h2 style="color: #000; font-family: 'Comic Sans MS'; margin: 0; animation: brainrot-bounce 0.5s infinite;">🎆 CHAOS STACK 🎆</h2>
            <div class="brainrotslop-gif-container" style="background: #ff00ff; border: 2px solid #00ff00; padding: 8px; min-height: 80px; display: flex; align-items: center; justify-content: center; color: #000; font-family: monospace; font-size: 8px; animation: brainrot-pulse 0.4s infinite;">
              [GIF 3]
            </div>
            <div class="brainrotslop-gif-container" style="background: #00ffff; border: 2px solid #ff00ff; padding: 8px; min-height: 80px; display: flex; align-items: center; justify-content: center; color: #000; font-family: monospace; font-size: 8px; animation: brainrot-pulse 0.5s infinite;">
              [GIF 4]
            </div>
            <div class="brainrotslop-gif-container" style="background: #00ff00; border: 2px solid #ffff00; padding: 8px; min-height: 80px; display: flex; align-items: center; justify-content: center; color: #000; font-family: monospace; font-size: 8px; animation: brainrot-pulse 0.3s infinite;">
              [GIF 5]
            </div>
          </div>

          <!-- Bottom Spanning - Full Width Overload -->
          <div style="background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #00ff00); grid-column: span 3; border: 5px solid #000; padding: 15px; box-shadow: 0 0 40px rgba(255,255,255,0.5);">
            <h2 style="color: #000; font-family: Impact; font-size: 36px; margin: 0 0 10px 0; text-shadow: 2px 2px #fff, 4px 4px #000; animation: brainrot-wiggle 0.15s infinite;">MAXIMUM SLOP ACHIEVED</h2>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px;">
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #0f0; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #0f0; animation: brainrot-scale 0.2s infinite;">
                [MINI 1]
              </div>
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #ff0; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #ff0; animation: brainrot-scale 0.25s infinite;">
                [MINI 2]
              </div>
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #f0f; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #f0f; animation: brainrot-scale 0.22s infinite;">
                [MINI 3]
              </div>
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #0ff; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #0ff; animation: brainrot-scale 0.28s infinite;">
                [MINI 4]
              </div>
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #0f0; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #0f0; animation: brainrot-scale 0.23s infinite;">
                [MINI 5]
              </div>
              <div class="brainrotslop-gif-container" style="background: #000; border: 2px solid #ff0; padding: 8px; min-height: 90px; font-size: 7px; display: flex; align-items: center; justify-content: center; color: #ff0; animation: brainrot-scale 0.26s infinite;">
                [MINI 6]
              </div>
            </div>
          </div>
        </div>

        <div style="background: #000; border-top: 5px solid #ff00ff; padding: 15px; text-align: center;">
          <p style="margin: 0; font-family: Impact; color: #00ff00; font-size: 16px; animation: brainrot-glitchBig 0.1s infinite;">
            🌀 YOU HAVE ACHIEVED PEAK SLOP 🌀
          </p>
          <p style="margin: 5px 0; font-family: 'Comic Sans MS'; color: #ff00ff; font-size: 12px; animation: brainrot-blink 0.2s infinite;">
            YOUR BRAIN IS NOW PART OF THE SLOP
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
