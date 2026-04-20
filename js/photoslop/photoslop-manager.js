export class PhotoslopManager {
  constructor(options = {}) {
    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};

    this.app = null;
    this.canvas = null;
    this.ctx = null;
    this.initialized = false;
    this.boundListeners = [];

    this.state = {
      tool: 'pencil',
      color: '#000000',
      size: 2,
      drawing: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      snapshot: null,
      undoStack: []
    };

    this.palette = [
      '#000000', '#7f7f7f', '#7f0000', '#7f7f00', '#007f00', '#007f7f', '#00007f', '#7f007f',
      '#7f3f00', '#ffffff', '#bfbfbf', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff',
      '#ff00ff', '#ff7f7f', '#ffff7f', '#7fff7f', '#7fffff', '#7f7fff', '#ff7fff', '#ffbf7f',
      '#ffdfbf', '#404040', '#8080ff', '#004080'
    ];
  }

  init() {
    this.app = document.getElementById('photoslop-app');
    if (!this.app) return;

    this.cleanup();
    this.render();
    this.initialized = true;
  }

  cleanup() {
    this.boundListeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    this.boundListeners = [];

    this.canvas = null;
    this.ctx = null;
  }

  bind(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    this.boundListeners.push({ element, event, handler, options });
  }

  render() {
    this.app.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; background: #c0c0c0; font-family: 'MS Sans Serif', Tahoma, sans-serif; color: #000; user-select: none;">
        <div style="height: 21px; display: flex; align-items: center; gap: 16px; padding: 0 8px; border-bottom: 1px solid #808080; background: #c0c0c0; font-size: 12px;">
          <span style="cursor: default;">File</span>
          <span style="cursor: default;">Edit</span>
          <span style="cursor: default;">View</span>
          <span style="cursor: default;">Image</span>
          <span style="cursor: default;">Options</span>
          <span style="cursor: default;">Help</span>
        </div>

        <div style="height: 30px; display: flex; align-items: center; gap: 4px; padding: 4px; border-top: 1px solid #fff; border-bottom: 1px solid #808080; background: #c0c0c0;">
          <button class="win95-button" data-photoslop-action="new" title="New" style="width: 56px; height: 22px; font-size: 10px;">New</button>
          <button class="win95-button" data-photoslop-action="undo" title="Undo" style="width: 56px; height: 22px; font-size: 10px;">Undo</button>
          <button class="win95-button" data-photoslop-action="clear" title="Clear" style="width: 56px; height: 22px; font-size: 10px;">Clear</button>
          <button class="win95-button" data-photoslop-action="save" title="Save PNG" style="width: 72px; height: 22px; font-size: 10px; white-space: nowrap;">Save</button>
          <div style="width: 1px; height: 20px; background: #808080; margin: 0 2px;"></div>
          <label style="font-size: 11px;">Tool</label>
          <select id="photoslop-tool" style="height: 20px; width: 98px; font-size: 11px;">
            <option value="pencil">Pencil</option>
            <option value="brush">Brush</option>
            <option value="eraser">Eraser</option>
            <option value="line">Line</option>
            <option value="rect">Rectangle</option>
            <option value="ellipse">Ellipse</option>
          </select>
          <label style="font-size: 11px;">Size</label>
          <input id="photoslop-size" type="range" min="1" max="30" value="2" style="width: 90px;">
          <span id="photoslop-size-value" style="font-size: 11px; min-width: 20px; text-align: right;">2</span>
        </div>

        <div style="display: flex; flex: 1; min-height: 0; background: #808080;">
          <div style="width: 58px; border-right: 1px solid #808080; background: #c0c0c0; padding: 3px; box-sizing: border-box;">
            <div style="display: grid; grid-template-columns: 24px 24px; gap: 2px; justify-content: center;">
              <button class="photoslop-tool-btn" data-tool="pencil" title="Pencil" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 13px;">✎</button>
              <button class="photoslop-tool-btn" data-tool="brush" title="Brush" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 12px;">🖌</button>
              <button class="photoslop-tool-btn" data-tool="eraser" title="Eraser" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 12px;">▧</button>
              <button class="photoslop-tool-btn" data-tool="line" title="Line" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 14px;">／</button>
              <button class="photoslop-tool-btn" data-tool="rect" title="Rectangle" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 14px;">▭</button>
              <button class="photoslop-tool-btn" data-tool="ellipse" title="Ellipse" style="height: 24px; border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: #c0c0c0; font-size: 14px;">◯</button>
            </div>
            <div id="photoslop-current-color" style="width: 48px; height: 24px; margin: 8px auto 0 auto; border-top: 1px solid #555; border-left: 1px solid #555; border-right: 1px solid #fff; border-bottom: 1px solid #fff; background: #000;"></div>
          </div>

          <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; background: #a0a0a0;">
            <div id="photoslop-scroll-area" style="padding: 6px; flex: 1; min-height: 0; display: flex; align-items: flex-start; justify-content: flex-start; overflow: auto;">
              <canvas id="photoslop-canvas" width="960" height="560" style="background: #fff; border-top: 2px solid #555; border-left: 2px solid #555; border-right: 2px solid #fff; border-bottom: 2px solid #fff; image-rendering: pixelated; touch-action: none; cursor: crosshair;"></canvas>
            </div>
            <div style="height: 34px; border-top: 1px solid #808080; background: #c0c0c0; padding: 3px 4px; box-sizing: border-box; display: grid; grid-template-columns: repeat(14, 1fr); gap: 1px;" id="photoslop-palette"></div>
          </div>
        </div>

        <div style="height: 20px; border-top: 1px solid #fff; background: #c0c0c0; display: flex; align-items: center; font-size: 11px;">
          <div id="photoslop-status-text" style="flex: 1; border-top: 1px solid #808080; border-left: 1px solid #808080; border-right: 1px solid #fff; border-bottom: 1px solid #fff; margin: 1px; padding: 1px 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">For Help, click Help Topics on the Help Menu.</div>
          <div id="photoslop-coords" style="width: 100px; border-top: 1px solid #808080; border-left: 1px solid #808080; border-right: 1px solid #fff; border-bottom: 1px solid #fff; margin: 1px 1px 1px 0; padding: 1px 4px; text-align: right;">0,0</div>
        </div>
      </div>
    `;

    this.canvas = this.app.querySelector('#photoslop-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.renderPalette();
    this.bindUI();
    this.updateToolUI();
  }

  renderPalette() {
    const palette = this.app.querySelector('#photoslop-palette');
    if (!palette) return;

    palette.innerHTML = this.palette
      .map((color) => `<button type="button" class="photoslop-color" data-color="${color}" style="border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #555; border-bottom: 1px solid #555; background: ${color}; cursor: pointer; min-width: 14px;"></button>`)
      .join('');
  }

  updateToolUI() {
    const toolSelect = this.app.querySelector('#photoslop-tool');
    const sizeRange = this.app.querySelector('#photoslop-size');
    const sizeValue = this.app.querySelector('#photoslop-size-value');
    const currentColor = this.app.querySelector('#photoslop-current-color');

    if (toolSelect) toolSelect.value = this.state.tool;
    if (sizeRange) sizeRange.value = String(this.state.size);
    if (sizeValue) sizeValue.textContent = String(this.state.size);
    if (currentColor) currentColor.style.background = this.state.color;

    this.app.querySelectorAll('.photoslop-tool-btn').forEach((btn) => {
      const isActive = btn.dataset.tool === this.state.tool;
      btn.style.background = isActive ? '#a0a0a0' : '#c0c0c0';
      btn.style.borderTop = isActive ? '1px solid #555' : '1px solid #fff';
      btn.style.borderLeft = isActive ? '1px solid #555' : '1px solid #fff';
      btn.style.borderRight = isActive ? '1px solid #fff' : '1px solid #555';
      btn.style.borderBottom = isActive ? '1px solid #fff' : '1px solid #555';
    });
  }

  bindUI() {
    const toolSelect = this.app.querySelector('#photoslop-tool');
    const sizeRange = this.app.querySelector('#photoslop-size');

    if (toolSelect) {
      this.bind(toolSelect, 'change', () => {
        this.state.tool = toolSelect.value;
        this.playClickSound();
        this.updateToolUI();
      });
    }

    if (sizeRange) {
      this.bind(sizeRange, 'input', () => {
        this.state.size = Number(sizeRange.value);
        this.updateToolUI();
      });
    }

    this.app.querySelectorAll('.photoslop-tool-btn').forEach((btn) => {
      this.bind(btn, 'click', () => {
        this.state.tool = btn.dataset.tool;
        this.playClickSound();
        this.updateToolUI();
      });
    });

    this.app.querySelectorAll('.photoslop-color').forEach((btn) => {
      this.bind(btn, 'click', () => {
        this.state.color = btn.dataset.color;
        this.playClickSound();
        this.updateToolUI();
      });
    });

    this.app.querySelectorAll('[data-photoslop-action]').forEach((btn) => {
      this.bind(btn, 'click', () => {
        const action = btn.dataset.photoslopAction;
        this.playClickSound();
        this.handleAction(action);
      });
    });

    this.bind(this.canvas, 'pointerdown', (e) => this.onPointerDown(e));
    this.bind(this.canvas, 'pointermove', (e) => this.onPointerMove(e));
    this.bind(this.canvas, 'pointerup', (e) => this.onPointerUp(e));
    this.bind(this.canvas, 'pointercancel', () => this.endStroke());
  }

  handleAction(action) {
    if (!this.ctx || !this.canvas) return;

    if (action === 'new' || action === 'clear') {
      this.pushUndo();
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.setStatus(action === 'new' ? 'Created a new picture.' : 'Cleared the canvas.');
      return;
    }

    if (action === 'undo') {
      this.undo();
      this.setStatus('Undid last action.');
      return;
    }

    if (action === 'save') {
      const link = document.createElement('a');
      link.href = this.canvas.toDataURL('image/png');
      link.download = `photoslop-${Date.now()}.png`;
      link.click();
      this.setStatus('Saved image as PNG.');
    }
  }

  setStatus(message) {
    const statusEl = this.app?.querySelector('#photoslop-status-text');
    if (statusEl) {
      statusEl.textContent = message;
    }
  }

  setCoords(x, y) {
    const coordsEl = this.app?.querySelector('#photoslop-coords');
    if (coordsEl) {
      coordsEl.textContent = `${Math.round(x)},${Math.round(y)}`;
    }
  }

  pushUndo() {
    if (!this.ctx || !this.canvas) return;
    const snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.state.undoStack.push(snapshot);
    if (this.state.undoStack.length > 20) {
      this.state.undoStack.shift();
    }
  }

  undo() {
    if (!this.ctx) return;
    const snapshot = this.state.undoStack.pop();
    if (!snapshot) return;
    this.ctx.putImageData(snapshot, 0, 0);
  }

  getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  onPointerDown(e) {
    if (!this.ctx || !this.canvas) return;

    this.canvas.setPointerCapture(e.pointerId);
    const point = this.getCanvasPoint(e);

    this.state.drawing = true;
    this.state.startX = point.x;
    this.state.startY = point.y;
    this.state.lastX = point.x;
    this.state.lastY = point.y;
    this.setCoords(point.x, point.y);
    this.setStatus(`Using ${this.state.tool}.`);
    this.state.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pushUndo();

    if (this.state.tool === 'pencil' || this.state.tool === 'brush' || this.state.tool === 'eraser') {
      this.drawFreeStroke(point.x, point.y, point.x, point.y);
    }
  }

  onPointerMove(e) {
    const point = this.getCanvasPoint(e);
    this.setCoords(point.x, point.y);

    if (!this.state.drawing || !this.ctx) return;

    if (this.state.tool === 'pencil' || this.state.tool === 'brush' || this.state.tool === 'eraser') {
      this.drawFreeStroke(this.state.lastX, this.state.lastY, point.x, point.y);
      this.state.lastX = point.x;
      this.state.lastY = point.y;
      return;
    }

    // Preview for shape tools
    if (this.state.snapshot) {
      this.ctx.putImageData(this.state.snapshot, 0, 0);
    }
    this.drawShapePreview(this.state.startX, this.state.startY, point.x, point.y);
  }

  onPointerUp(e) {
    if (!this.state.drawing || !this.ctx) return;

    const point = this.getCanvasPoint(e);
    this.setCoords(point.x, point.y);
    if (this.state.tool === 'line' || this.state.tool === 'rect' || this.state.tool === 'ellipse') {
      if (this.state.snapshot) {
        this.ctx.putImageData(this.state.snapshot, 0, 0);
      }
      this.drawShapePreview(this.state.startX, this.state.startY, point.x, point.y);
    }

    this.endStroke();
  }

  endStroke() {
    this.state.drawing = false;
    this.state.snapshot = null;
    this.setStatus('Ready');
  }

  drawFreeStroke(x1, y1, x2, y2) {
    const isEraser = this.state.tool === 'eraser';
    const size = this.state.tool === 'brush' ? this.state.size + 2 : this.state.size;

    this.ctx.strokeStyle = isEraser ? '#ffffff' : this.state.color;
    this.ctx.lineWidth = size;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawShapePreview(x1, y1, x2, y2) {
    this.ctx.strokeStyle = this.state.color;
    this.ctx.lineWidth = this.state.size;

    if (this.state.tool === 'line') {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      return;
    }

    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    if (this.state.tool === 'rect') {
      this.ctx.strokeRect(left, top, width, height);
      return;
    }

    if (this.state.tool === 'ellipse') {
      this.ctx.beginPath();
      this.ctx.ellipse(left + width / 2, top + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }
}
