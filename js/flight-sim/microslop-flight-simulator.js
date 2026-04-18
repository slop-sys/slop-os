/**
 * Microslop Flight Simulator
 * Lightweight pseudo-3D flight game with WASD controls.
 */

export class MicroslopFlightSimulator {
  constructor() {
    this.initialized = false;
    this.running = false;
    this.animationFrame = null;
    this.lastFrameTime = 0;

    this.state = this.createInitialState();
    this.keys = { w: false, a: false, s: false, d: false };

    this.handleKeyDown = (event) => {
      if (!this.shouldCaptureKeyboard(event)) return;
      const key = event.key.toLowerCase();
      if (key in this.keys) {
        this.keys[key] = true;
        event.preventDefault();
      }
    };

    this.handleKeyUp = (event) => {
      if (!this.shouldCaptureKeyboard(event)) return;
      const key = event.key.toLowerCase();
      if (key in this.keys) {
        this.keys[key] = false;
        event.preventDefault();
      }
    };
  }

  shouldCaptureKeyboard(event) {
    if (!this.running) return false;

    const target = event.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) {
        return false;
      }
    }

    const flightWindow = document.getElementById('flightsim-window');
    if (!flightWindow) return false;
    if (flightWindow.style.display === 'none') return false;

    return flightWindow.classList.contains('active');
  }

  createInitialState() {
    return {
      x: 0,
      y: 90,
      z: 0,
      yaw: 0,
      pitch: 0,
      yawRate: 0,
      pitchRate: 0,
      roll: 0,
      speed: 120,
      points: 0,
      bestPoints: Number(localStorage.getItem('microslop_flight_highscore') || 0),
      status: 'FLY THROUGH RINGS',
      crashed: false,
      rings: this.createRings(28)
    };
  }

  createRings(count) {
    const rings = [];
    for (let i = 0; i < count; i += 1) {
      rings.push(this.createRing(350 + i * 220));
    }
    return rings;
  }

  createRing(minZ = null) {
    return {
      x: (Math.random() - 0.5) * 520,
      y: 55 + Math.random() * 160,
      z: minZ !== null ? minZ : this.state.z + 900 + Math.random() * 900,
      radius: 34 + Math.random() * 12,
      scored: false
    };
  }

  init() {
    const host = document.getElementById('microslop-flight-sim-app');
    if (!host) return;

    if (!this.initialized) {
      host.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column; background: #000; color: #00ff00; font-family: 'Courier New', monospace;">
          <div style="padding: 8px; border-bottom: 1px solid #1f6b1f; background: #050505; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <div style="font-size: 12px; font-weight: bold;">MICROSLOP FLIGHT SIMULATOR</div>
            <div style="font-size: 11px; color: #9dff9d;">W/S pitch | A/D yaw</div>
          </div>
          <canvas id="microslop-flight-canvas" width="760" height="440" style="width: 100%; height: 100%; display: block; image-rendering: pixelated;"></canvas>
          <div id="microslop-flight-hud" style="padding: 8px; border-top: 1px solid #1f6b1f; background: #050505; font-size: 11px; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap;"></div>
        </div>
      `;

      this.canvas = document.getElementById('microslop-flight-canvas');
      this.ctx = this.canvas?.getContext('2d');
      this.hud = document.getElementById('microslop-flight-hud');

      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);

      const windowEl = document.getElementById('flightsim-window');
      if (windowEl) {
        const closeBtn = windowEl.querySelector('.close-btn');
        const minBtn = windowEl.querySelector('.minimize-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => this.stop());
        if (minBtn) minBtn.addEventListener('click', () => this.stop());
      }

      this.initialized = true;
    }

    if (!this.running) {
      this.start();
    }
  }

  start() {
    if (!this.ctx || !this.canvas) return;

    if (this.state.crashed) {
      this.state = this.createInitialState();
    }

    this.running = true;
    this.lastFrameTime = performance.now();
    this.loop(this.lastFrameTime);
  }

  stop() {
    this.running = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    Object.keys(this.keys).forEach((k) => {
      this.keys[k] = false;
    });
  }

  loop = (now) => {
    if (!this.running) return;

    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = now;

    this.update(dt);
    this.render();
    this.renderHud();

    this.animationFrame = requestAnimationFrame(this.loop);
  };

  update(dt) {
    const yawAccel = 3.8;
    const yawDamping = 0.9;
    const maxYawRate = 1.5;

    const pitchAccel = 2.6;
    const pitchDamping = 0.88;
    const maxPitchRate = 1.25;

    if (this.keys.a) this.state.yawRate -= yawAccel * dt;
    if (this.keys.d) this.state.yawRate += yawAccel * dt;
    this.state.yawRate = Math.max(-maxYawRate, Math.min(maxYawRate, this.state.yawRate));
    this.state.yawRate *= yawDamping;
    this.state.yaw += this.state.yawRate * dt;

    if (this.keys.w) this.state.pitchRate += pitchAccel * dt;
    if (this.keys.s) this.state.pitchRate -= pitchAccel * dt;
    this.state.pitchRate = Math.max(-maxPitchRate, Math.min(maxPitchRate, this.state.pitchRate));
    this.state.pitchRate *= pitchDamping;
    this.state.pitch += this.state.pitchRate * dt;

    const targetRoll = Math.max(-0.62, Math.min(0.62, this.state.yawRate * 0.45));
    this.state.roll += (targetRoll - this.state.roll) * Math.min(1, dt * 8);

    if (!this.keys.w && !this.keys.s) {
      this.state.pitch *= 0.998;
    }

    this.state.pitch = Math.max(-0.72, Math.min(0.72, this.state.pitch));

    const cosPitch = Math.cos(this.state.pitch);
    const forward = this.state.speed * dt * cosPitch;
    this.state.x += Math.sin(this.state.yaw) * forward;
    this.state.z += Math.cos(this.state.yaw) * forward;
    this.state.y += Math.sin(this.state.pitch) * this.state.speed * dt;

    if (this.state.y < 8) {
      this.state.y = 8;
      this.state.crashed = true;
      this.state.status = 'YOU CRASHED. REOPEN WINDOW TO RESTART.';
      this.stop();
      return;
    }

    this.state.rings.forEach((ring, index) => {
      const dx = ring.x - this.state.x;
      const dy = ring.y - this.state.y;
      const dz = ring.z - this.state.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (!ring.scored && dist < ring.radius + 10) {
        ring.scored = true;
        this.state.points += 1;
        this.state.status = 'RING CLEARED';
      }

      if (ring.z < this.state.z - 120) {
        this.state.rings[index] = this.createRing(this.state.z + 1500 + Math.random() * 900);
      }
    });

    if (this.state.points > this.state.bestPoints) {
      this.state.bestPoints = this.state.points;
      localStorage.setItem('microslop_flight_highscore', String(this.state.bestPoints));
    }

    if (this.state.status === 'RING CLEARED') {
      this.state.status = 'FLY THROUGH RINGS';
    }
  }

  toCameraSpace(worldX, worldY, worldZ) {
    const dx = worldX - this.state.x;
    const dy = worldY - this.state.y;
    const dz = worldZ - this.state.z;

    const cosYaw = Math.cos(-this.state.yaw);
    const sinYaw = Math.sin(-this.state.yaw);
    const xzX = dx * cosYaw - dz * sinYaw;
    const xzZ = dx * sinYaw + dz * cosYaw;

    const cosPitch = Math.cos(-this.state.pitch);
    const sinPitch = Math.sin(-this.state.pitch);
    const yzY = dy * cosPitch - xzZ * sinPitch;
    const yzZ = dy * sinPitch + xzZ * cosPitch;

    return { x: xzX, y: yzY, z: yzZ };
  }

  projectPoint(cameraPoint, width, height, fov) {
    if (cameraPoint.z <= 1) return null;
    return {
      x: width / 2 + (cameraPoint.x / cameraPoint.z) * fov,
      y: height / 2 - (cameraPoint.y / cameraPoint.z) * fov,
      scale: fov / cameraPoint.z
    };
  }

  renderBackground(width, height) {
    const ctx = this.ctx;
    if (!ctx) return;

    const horizon = height / 2 + this.state.pitch * 190;

    ctx.fillStyle = '#3db0ff';
    ctx.fillRect(0, 0, width, Math.max(0, horizon));

    ctx.fillStyle = '#2b5e2b';
    ctx.fillRect(0, Math.max(0, horizon), width, height - Math.max(0, horizon));

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(width, horizon);
    ctx.stroke();

    ctx.strokeStyle = '#244824';
    for (let i = 0; i < 8; i += 1) {
      const z = (this.state.z + i * 140) % 1000;
      const y = horizon + (i * i) * 2 + z * 0.02;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Lightweight cloud bands for a touch more depth in the sky.
    const cloudDrift = this.state.z * 0.03;
    for (let i = 0; i < 6; i += 1) {
      const baseX = ((i * 170 + cloudDrift) % (width + 180)) - 90;
      const baseY = 36 + (i % 3) * 34 + this.state.pitch * 25;
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.ellipse(baseX, baseY, 26, 11, 0, 0, Math.PI * 2);
      ctx.ellipse(baseX + 20, baseY - 4, 21, 9, 0, 0, Math.PI * 2);
      ctx.ellipse(baseX - 16, baseY - 3, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  renderRings(width, height) {
    const ctx = this.ctx;
    if (!ctx) return;

    const fov = Math.min(width, height) * 0.95;

    this.state.rings
      .map((ring) => {
        const cameraPos = this.toCameraSpace(ring.x, ring.y, ring.z);
        const proj = this.projectPoint(cameraPos, width, height, fov);
        if (!proj) return null;
        return { ring, proj, depth: cameraPos.z };
      })
      .filter(Boolean)
      .sort((a, b) => b.depth - a.depth)
      .forEach(({ ring, proj }) => {
        const radius = Math.max(4, ring.radius * proj.scale);

        ctx.beginPath();
        ctx.lineWidth = Math.max(2, radius * 0.18);
        ctx.strokeStyle = ring.scored ? '#88ff88' : '#ffd83d';
        ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        if (!ring.scored) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ff4b4b';
          ctx.arc(proj.x, proj.y, radius * 1.4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
  }

  renderReticle(width, height) {
    const ctx = this.ctx;
    if (!ctx) return;

    const cx = width / 2;
    const cy = height / 2;

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy);
    ctx.lineTo(cx + 16, cy);
    ctx.moveTo(cx, cy - 16);
    ctx.lineTo(cx, cy + 16);
    ctx.stroke();

    const rollOffset = this.state.roll * 36;
    ctx.strokeStyle = '#ffff00';
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + rollOffset);
    ctx.lineTo(cx + 30, cy - rollOffset);
    ctx.stroke();
  }

  renderPlaneNose(width, height) {
    const ctx = this.ctx;
    if (!ctx) return;

    const centerX = width / 2 + this.state.roll * 22;
    const baseY = height - 30 + this.state.pitch * 24;
    const noseWidth = 88;
    const noseHeight = 84;

    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.moveTo(centerX, baseY - noseHeight);
    ctx.lineTo(centerX - noseWidth / 2, baseY);
    ctx.lineTo(centerX + noseWidth / 2, baseY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, baseY - noseHeight + 6);
    ctx.lineTo(centerX, baseY - 6);
    ctx.stroke();

    ctx.fillStyle = '#2f2f2f';
    ctx.fillRect(centerX - 10, baseY - 18, 20, 12);
  }

  render() {
    if (!this.canvas || !this.ctx) return;

    const width = this.canvas.clientWidth || this.canvas.width;
    const height = this.canvas.clientHeight || this.canvas.height;

    if (this.canvas.width !== width) this.canvas.width = width;
    if (this.canvas.height !== height) this.canvas.height = height;

    this.renderBackground(width, height);
    this.renderRings(width, height);
    this.renderReticle(width, height);
    this.renderPlaneNose(width, height);
  }

  renderHud() {
    if (!this.hud) return;

    const altitude = Math.round(this.state.y);
    const heading = ((this.state.yaw * 180) / Math.PI + 360) % 360;

    this.hud.innerHTML = `
      <span>ALT ${altitude}m</span>
      <span>SPD ${Math.round(this.state.speed)} kts</span>
      <span>HDG ${Math.round(heading).toString().padStart(3, '0')}°</span>
      <span>RINGS ${this.state.points}</span>
      <span>BEST ${this.state.bestPoints}</span>
      <span>${this.state.status}</span>
    `;
  }
}
