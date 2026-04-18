/**
 * Chud Slop - GifCities-style chaos site for chud memetics
 * Blinking text, random GIFs, testimonials, authentic 90s disaster
 */

export class ChudSlop {
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
    style.id = 'chudslop-keyframes';
    style.textContent = `
      @keyframes chudslop-rainbow {
        0% { background-position: 0%; }
        50% { background-position: 100%; }
        100% { background-position: 0%; }
      }
      @keyframes chudslop-blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      @keyframes chudslop-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }

  showHome(onNavigate) {
    const homeView = document.getElementById('chudslop-home-view');
    if (!homeView) return;

    this.injectStyles();

    homeView.innerHTML = `
      <div style="background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff); padding: 20px; animation: chudslop-rainbow 2s infinite;">
        <h1 style="color: #000; text-shadow: 3px 3px 0 #ffff00, 6px 6px 0 #ff00ff; font-family: 'Comic Sans MS', cursive; font-size: 48px; text-align: center; margin: 0;">
          ⚡ CHUD SLOP CENTRAL ⚡
        </h1>
        <p style="text-align: center; color: #fff; background: #000; font-family: 'Courier New'; font-size: 14px; padding: 10px; animation: chudslop-blink 1s infinite;">
          YOU'VE ENTERED THE SACRED SLOP DIMENSION
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; padding: 15px; background: #000; min-height: 400px;">
        <!-- Left Column -->
        <div style="background: #ff00ff; border: 5px solid #00ffff; padding: 10px; box-shadow: inset 0 0 20px rgba(0,255,255,0.5);">
          <h2 style="color: #000; font-family: 'Comic Sans MS'; animation: chudslop-blink 0.5s infinite; margin: 0 0 10px 0;">📺 THE CHUD ARCHIVES 📺</h2>
          <div class="chudslop-gif-container" style="background: #333; border: 3px dashed #00ff00; padding: 10px; margin: 10px 0; min-height: 120px; display: flex; align-items: center; justify-content: center; color: #0f0; font-family: monospace; font-size: 10px; text-align: center; overflow: hidden;">
            <img src="assets/misc/2OKJ4GPSZEGYCKEXJKKXVODVVLO2BBTQ%20(1).gif" alt="Chud archive gif 1" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">
          </div>
          <div class="chudslop-gif-container" style="background: #333; border: 3px dashed #ffff00; padding: 10px; margin: 10px 0; min-height: 120px; display: flex; align-items: center; justify-content: center; color: #ff0; font-family: monospace; font-size: 10px; text-align: center; overflow: hidden;">
            <img src="assets/misc/4TMTSTDHS6VQ4RGY7AH5PUBJ74SNTBMW.gif" alt="Chud archive gif 2" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">
          </div>
        </div>

        <!-- Center Column -->
        <div style="background: #00ffff; border: 5px solid #ff00ff; padding: 10px; box-shadow: inset 0 0 20px rgba(255,0,255,0.5);">
          <h2 style="color: #000; font-family: Impact, sans-serif; font-size: 28px; margin: 0 0 10px 0; text-transform: uppercase;">PURE CHUD SLOP</h2>
          <div style="background: #000; color: #0f0; padding: 10px; font-family: 'Courier New'; font-size: 11px; line-height: 1.6; margin-bottom: 10px; border: 2px solid #0f0; overflow-y: auto; max-height: 280px;">
            <p style="margin: 0;">&gt;&gt;&gt; CHUD TESTIMONIALS &lt;&lt;&lt;</p>
            <p style="margin: 5px 0; animation: chudslop-blink 1s infinite;">&quot;this slop speaks to me&quot; - ANON_47</p>
            <p style="margin: 5px 0;">&quot;the chud recognizes chud&quot; - MEATSPACE_WARRIOR</p>
            <p style="margin: 5px 0; animation: chudslop-blink 0.7s infinite;">&quot;dimensional alignment achieved&quot; - VOID_ENTITY</p>
            <p style="margin: 5px 0;">&quot;slop transcends form&quot; - THE_ALGORITHM</p>
            <p style="margin: 5px 0; animation: chudslop-blink 1.2s infinite;">&quot;chud energy flows eternal&quot; - RECURSIVE_SLOP</p>
          </div>
          <div style="background: #ffff00; color: #000; padding: 5px; text-align: center; font-family: 'Comic Sans MS'; font-weight: bold; animation: chudslop-pulse 1s infinite;">
            YOU ARE THE SLOP
          </div>
        </div>

        <!-- Right Column -->
        <div style="background: #ffff00; border: 5px solid #ff00ff; padding: 10px; box-shadow: inset 0 0 20px rgba(255,0,255,0.5);">
          <h2 style="color: #000; font-family: 'Comic Sans MS'; margin: 0 0 10px 0;">✨ SLOP PHENOMENA ✨</h2>
          <div class="chudslop-gif-container" style="background: #ff00ff; border: 3px solid #00ff00; padding: 10px; margin: 10px 0; min-height: 120px; display: flex; align-items: center; justify-content: center; color: #000; font-family: monospace; font-size: 10px; text-align: center; font-weight: bold; overflow: hidden;">
            <img src="assets/misc/5RLVPVPVKFBEJ4HNNDXMKAT5EG6GS3DA.gif" alt="Chud rift gif" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">
          </div>
          <div class="chudslop-gif-container" style="background: #00ff00; border: 3px solid #ff00ff; padding: 10px; margin: 10px 0; min-height: 120px; display: flex; align-items: center; justify-content: center; color: #000; font-family: monospace; font-size: 10px; text-align: center; font-weight: bold; overflow: hidden;">
            <img src="assets/misc/6CU2R5IDQFNGX4Y3PZ7SDJDIVH66HVK7.gif" alt="Chud ascension gif" style="width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated;">
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff); padding: 15px; text-align: center;">
        <p style="margin: 0; font-family: 'Comic Sans MS'; color: #000; font-size: 14px; font-weight: bold;">
          🌈 CHUD SLOP: WHERE MEMETICS AND VOID ENERGY CONVERGE 🌈
        </p>
        <p style="margin: 5px 0; font-family: monospace; font-size: 10px; color: #fff; text-shadow: 1px 1px #000;">
          constructed using pure dimensional slop | generation 847 chud alignment certified
        </p>
      </div>
    `;

    homeView.style.display = 'block';
  }

  setupNavigation(container, onNavigate) {
    // No navigation needed for this simple site
  }
}
