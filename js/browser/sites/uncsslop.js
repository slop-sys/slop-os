/**
 * UncsSlop - Chaotic late-90s/early-2000s style meme page.
 * Intentionally overloaded visual mess in classic GeoCities spirit.
 */

export class UncsSlop {
  constructor() {
    this.state = {
      view: 'home',
      welcomeShown: false
    };
    this.stylesInjected = false;
  }

  injectStyles() {
    if (this.stylesInjected) return;
    this.stylesInjected = true;

    const style = document.createElement('style');
    style.id = 'uncsslop-keyframes';
    style.textContent = `
      @keyframes uncsslop-blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
      @keyframes uncsslop-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes uncsslop-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      @keyframes uncsslop-scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      @keyframes uncsslop-rainbow {
        0% { color: #ff00ff; }
        20% { color: #00ffff; }
        40% { color: #ffff00; }
        60% { color: #00ff00; }
        80% { color: #ff4500; }
        100% { color: #ff00ff; }
      }
      @keyframes uncsslop-pop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
    `;

    document.head.appendChild(style);
  }

  showHome() {
    const homeView = document.getElementById('uncsslop-home-view');
    if (!homeView) return;

    this.injectStyles();

    homeView.innerHTML = `
      <div style="position: relative; min-height: 100%; padding: 8px; color: #000; font-family: 'Comic Sans MS', Papyrus, Impact, cursive; background-color: #00ffff; background-image: radial-gradient(circle at 10px 10px, #ffff00 0 3px, transparent 3px), radial-gradient(circle at 30px 30px, #ff00ff 0 4px, transparent 4px), linear-gradient(45deg, rgba(255, 0, 0, 0.28) 25%, transparent 25%, transparent 50%, rgba(255, 0, 0, 0.28) 50%, rgba(255, 0, 0, 0.28) 75%, transparent 75%, transparent); background-size: 40px 40px, 40px 40px, 24px 24px;">
        <div style="position: absolute; top: 18px; left: 18px; z-index: 40; border: 3px ridge #c0c0c0; background: #fffcc8; width: 210px; padding: 8px; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 12px; box-shadow: 3px 3px 0 #000; animation: uncsslop-float 2s infinite;">
          <div style="background: #000080; color: #fff; padding: 4px; margin: -8px -8px 8px -8px; font-weight: bold;">WELCOME UNC.EXE</div>
          <div>congrats visitor! you are uncmode certified.</div>
          <div style="margin-top: 6px; text-align: right;"><button style="font-size: 11px;">OK UNC</button></div>
        </div>

        <div style="position: absolute; top: 90px; right: 24px; z-index: 39; border: 3px ridge #c0c0c0; background: #ffe0ff; width: 220px; padding: 8px; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 12px; box-shadow: 3px 3px 0 #000; animation: uncsslop-pop 1.2s infinite;">
          <div style="background: #800000; color: #fff; padding: 4px; margin: -8px -8px 8px -8px; font-weight: bold;">ALERT: 4 UNCS ONLINE</div>
          <div>you are visitor #000000420069</div>
          <div style="margin-top: 6px; text-align: right;"><button style="font-size: 11px;">JOIN UNCNET</button></div>
        </div>

        <center>
          <div style="display: inline-block; width: 130px; height: 44px; border: 2px dotted #f00; background: repeating-linear-gradient(45deg, #ff0 0 10px, #000 10px 20px); color: #f00; font-family: Impact, sans-serif; font-size: 12px; line-height: 44px;">
            UNDER CONSTRUCTION
          </div>
          <h1 style="margin: 8px 0 2px 0; font-family: Impact, 'Comic Sans MS', Papyrus, fantasy; font-size: 54px; letter-spacing: 1px; text-shadow: 3px 3px #ff0, -3px -3px #0ff; animation: uncsslop-rainbow 0.8s infinite;">
            WELCOME TO UNC SLOPPPPPPPP /uncmode
          </h1>
          <div style="font-size: 26px; color: #ff0000; font-weight: bold; animation: uncsslop-blink 0.6s infinite; font-family: Papyrus, 'Comic Sans MS', cursive;">
            *** OFFICIAL UNC SLOP HEADQUARTERS ***
          </div>
          <div style="margin: 8px 0; border-top: 3px double #f0f; border-bottom: 3px double #0f0; padding: 6px 0; background: #000; color: #00ff00; font-family: 'Courier New', monospace; font-size: 14px; overflow: hidden; white-space: nowrap;">
            <span style="display: inline-block; animation: uncsslop-scroll 11s linear infinite;">NEW!!! NEW!!! NEW!!! UNC AIRDROP ALERT!!! /uncmode FOREVER!!! IT'S AN $UNC WORLD!!! CLICK NOTHING!!! TRUST NOBODY!!!</span>
          </div>
        </center>

        <table width="100%" border="4" cellpadding="6" cellspacing="0" style="border-color: #ff00ff #00ffff #ffff00 #00ff00; background: rgba(255, 255, 255, 0.85); table-layout: fixed;">
          <tr style="background: #000; color: #fff; font-family: Impact, sans-serif;">
            <td colspan="3" style="text-align: center; font-size: 22px;">
              <marquee behavior="alternate" scrollamount="12">UncsSlop - The Free Unc Encyclopedia of Slop</marquee>
            </td>
          </tr>
          <tr style="background: #ffff99; font-family: 'Comic Sans MS', cursive; font-size: 18px; font-weight: bold;">
            <td><a href="#" style="color: #f00;">Home</a> | <a href="#" style="color: #00f;">Unc Lore</a></td>
            <td><a href="#" style="color: #008000;">Slop Gallery</a> | <a href="#" style="color: #f0f;">Airdrop Dashboard</a></td>
            <td><a href="#" style="color: #000;">Submit Your Slop</a> | <a href="#" style="color: #ff4500;">Guestbook</a></td>
          </tr>
          <tr>
            <td valign="top" style="background: #ffe6ff; width: 24%;">
              <div style="font-family: Papyrus, 'Comic Sans MS', cursive; font-size: 20px; color: #d000ff; text-align: center;">UNC POWER PANEL</div>
              <marquee direction="up" height="150" scrollamount="3" style="background: #111; color: #0f0; font-family: 'Courier New', monospace; font-size: 12px; border: 2px inset #999; padding: 4px;">
                /uncmode active<br>slop vector maxed<br>airdrop soon maybe<br>unc factor: 9999<br>old web quality: yes
              </marquee>
              <div style="margin-top: 8px; text-align: center; font-size: 14px; color: #f00; animation: uncsslop-blink 0.7s infinite;">UNDER CONSTRUCTION X 9000</div>
              <img src="assets/uncslop/Screenshot%202026-04-18%20202653.png" alt="unc card lore" style="width: 100%; height: 130px; object-fit: cover; border: 2px dashed #f00; margin-top: 6px;">
              <div style="width: 100%; height: 74px; border: 2px dotted #000; margin-top: 6px; background: #ddd; color: #333; display: flex; align-items: center; justify-content: center; font-family: 'Courier New', monospace; font-size: 11px;">[ X ] IMAGE FAILED TO LOAD (classic)</div>
            </td>
            <td valign="top" style="background: #e6f9ff; width: 52%;">
              <div style="text-align: center; padding: 8px; background: #000; color: #ff0; border: 2px groove #f0f; font-family: Impact, sans-serif; font-size: 34px; text-shadow: 2px 2px #f00;">
                WE IN UNC MODE NOW BABEH
              </div>
              <div style="display: flex; gap: 8px; margin-top: 8px; align-items: stretch;">
                <img src="assets/uncslop/Screenshot%202026-04-18%20202646.png" alt="unc morning mode" style="width: 42%; height: 185px; object-fit: cover; border: 3px solid #00f; animation: uncsslop-spin 5s linear infinite;">
                <div style="width: 58%; background: #fff7b3; border: 3px ridge #666; padding: 8px; font-size: 15px; line-height: 1.3; font-family: 'Comic Sans MS', cursive;">
                  <div style="font-size: 20px; color: #ff00aa; font-family: Impact, sans-serif;">Latest Unc Moments</div>
                  <hr style="border: 0; border-top: 2px dotted #f00;">
                  <div>[@unclegend420] /uncmode</div>
                  <div>[@airdrop_unc] it's an $UNC world</div>
                  <div>[@uncdadpost] woke up in slop. stayed in slop.</div>
                  <div>[@justpostit] low effort high conviction tbh</div>
                  <div>[@slop_gainz] coin up. brain down.</div>
                </div>
              </div>
              <div style="margin-top: 8px; background: #ffebff; border: 2px solid #ff00ff; padding: 6px;">
                <marquee behavior="alternate" scrollamount="14" style="font-family: Impact, sans-serif; font-size: 30px; color: #00aaff; text-shadow: 1px 1px #000;">
                  $$$ UNC UNC UNC $$$ SLOP SLOP SLOP $$$
                </marquee>
              </div>

              <table width="100%" border="2" cellpadding="5" cellspacing="0" style="margin-top: 8px; background: #fff; font-size: 14px; font-family: 'Comic Sans MS', cursive;">
                <tr style="background: #000; color: #fff;"><th>Metric</th><th>Value</th><th>Status</th></tr>
                <tr style="background: #ffffcc;"><td>Unc Sentiment</td><td>10,000%</td><td style="color: #f00; font-weight: bold;">OVERCOOKED</td></tr>
                <tr style="background: #ccffff;"><td>Airdrop Probability</td><td>???</td><td style="color: #00f; font-weight: bold;">SOON(TM)</td></tr>
                <tr style="background: #ffd6d6;"><td>Posting Quality</td><td>2/100</td><td style="color: #008000; font-weight: bold;">AUTHENTIC</td></tr>
              </table>
            </td>
            <td valign="top" style="background: #fff4cc; width: 24%; font-size: 13px; font-family: 'Comic Sans MS', cursive;">
              <div style="text-align: center; color: #f00; font-size: 20px; font-family: Impact, sans-serif;">GIF STORM</div>
              <div style="width: 100%; height: 120px; border: 2px solid #000; margin-bottom: 6px; background: repeating-linear-gradient(90deg, #ff00ff 0 8px, #00ffff 8px 16px); color: #000; font-family: Impact, sans-serif; font-size: 22px; display: flex; align-items: center; justify-content: center; animation: uncsslop-blink 0.4s infinite;">BLINKING UNC GIF</div>
              <div style="width: 100%; height: 110px; border: 2px dotted #f0f; margin-bottom: 6px; background: #111; color: #0f0; font-family: 'Courier New', monospace; font-size: 12px; display: flex; align-items: center; justify-content: center;">[ dancing unc placeholder ]</div>
              <div style="width: 100%; height: 110px; border: 2px dashed #00f; background: #ff0; color: #f00; font-family: Papyrus, 'Comic Sans MS', cursive; font-size: 18px; display: flex; align-items: center; justify-content: center; text-align: center;">SPINNING $UNC COIN<br>COMING SOON</div>
              <div style="margin-top: 6px; border: 2px inset #aaa; background: #000; color: #0f0; padding: 6px; font-family: 'Courier New', monospace;">
                visitors today: 000004<br>
                hit counter: 99999999<br>
                uncs online: 4 uncs online
              </div>
            </td>
          </tr>
        </table>

        <div style="margin-top: 10px; border: 3px groove #fff; background: #000; color: #fff; padding: 10px; text-align: center; font-family: Papyrus, 'Comic Sans MS', cursive;">
          <div style="font-size: 22px; color: #ff0; animation: uncsslop-blink 0.8s infinite;">SIGN MY GUESTBOOK OR GET SLOPPED</div>
          <div style="font-size: 12px; margin-top: 5px;">best viewed in Microslop Explorer 5.5 at 800x600 | no refunds | no standards</div>
        </div>
      </div>
    `;

    homeView.style.display = 'block';

    if (!this.state.welcomeShown) {
      this.state.welcomeShown = true;
      setTimeout(() => {
        window.alert('welcome unc. /uncmode engaged.');
      }, 350);
    }
  }
}
