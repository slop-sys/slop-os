/**
 * Photoslop - Microsoft Paint Parody
 * Early Windows Paint aesthetic with basic drawing tools
 */

export class PhotoslopManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    // Drawing state
    this.color = '#000000';
    this.brushSize = 3;
    this.tool = 'pencil'; // pencil, eraser, line
    this.fillPattern = null;

    // History for undo/redo
    this.history = [];
    this.historyStep = -1;
    this.maxHistory = 50;

    // Toolbar elements
    this.colorInput = null;
    this.brushSizeInput = null;
    this.toolButtons = {};
  }

  init() {
    const hostDiv = document.getElementById('photoslop-host');
    if (!hostDiv) return;

    this.setupUI(hostDiv);
    this.setupCanvas();
    this.setupEventListeners();
    this.saveHistory();
  }

  setupUI(hostDiv) {
    hostDiv.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; background: #c0c0c0; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 11px;">
        <!-- Menu Bar -->
        <div style="background: #c0c0c0; border-bottom: 2px outset #dfdfdf; padding: 2px; display: flex; gap: 20px; padding-left: 4px;">
          <div class="photoslop-menu-item" style="cursor: pointer; padding: 2px 4px;">File</div>
          <div class="photoslop-menu-item" style="cursor: pointer; padding: 2px 4px;">Edit</div>
          <div class="photoslop-menu-item" style="cursor: pointer; padding: 2px 4px;">View</div>
        </div>

        <!-- Toolbox -->
        <div style="display: flex; gap: 8px; padding: 6px; background: #c0c0c0; border-bottom: 2px outset #dfdfdf; flex-wrap: wrap; align-items: center;">
          
          <!-- Tool Buttons -->
          <div style="display: flex; gap: 2px; padding: 4px; border: 2px outset #dfdfdf; background: #c0c0c0;">
            <button class="photoslop-tool-btn" data-tool="pencil" title="Pencil" style="width: 24px; height: 24px; background: #c0c0c0; border: 2px outset #dfdfdf; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;">✏</button>
            <button class="photoslop-tool-btn" data-tool="eraser" title="Eraser" style="width: 24px; height: 24px; background: #c0c0c0; border: 2px solid #ababab; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px;">E</button>
            <button class="photoslop-tool-btn" data-tool="line" title="Line" style="width: 24px; height: 24px; background: #c0c0c0; border: 2px solid #ababab; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px;">╱</button>
            <button class="photoslop-tool-btn" data-tool="rect" title="Rectangle" style="width: 24px; height: 24px; background: #c0c0c0; border: 2px solid #ababab; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px;">▭</button>
            <button class="photoslop-tool-btn" data-tool="circle" title="Circle" style="width: 24px; height: 24px; background: #c0c0c0; border: 2px solid #ababab; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px;">○</button>
          </div>

          <!-- Separator -->
          <div style="width: 2px; height: 24px; background: #ababab;"></div>

          <!-- Color Picker -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <label style="font-size: 10px; font-weight: bold;">Color:</label>
            <input type="color" id="photoslop-color" value="#000000" style="width: 32px; height: 24px; cursor: pointer; border: 2px inset #7f7f7f;">
          </div>

          <!-- Brush Size -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <label style="font-size: 10px; font-weight: bold;">Size:</label>
            <input type="range" id="photoslop-brush-size" min="1" max="50" value="3" style="width: 80px; cursor: pointer;">
            <span id="photoslop-size-label" style="min-width: 20px;">3</span>px
          </div>

          <!-- Separator -->
          <div style="width: 2px; height: 24px; background: #ababab;"></div>

          <!-- Action Buttons -->
          <button id="photoslop-clear" title="Clear Canvas" style="padding: 2px 8px; background: #c0c0c0; border: 2px outset #dfdfdf; cursor: pointer; font-size: 11px; font-weight: bold;">Clear</button>
          <button id="photoslop-undo" title="Undo (Ctrl+Z)" style="padding: 2px 8px; background: #c0c0c0; border: 2px outset #dfdfdf; cursor: pointer; font-size: 11px; font-weight: bold;">↶ Undo</button>
          <button id="photoslop-redo" title="Redo (Ctrl+Y)" style="padding: 2px 8px; background: #c0c0c0; border: 2px outset #dfdfdf; cursor: pointer; font-size: 11px; font-weight: bold;">↷ Redo</button>
          <button id="photoslop-save" title="Save Image" style="padding: 2px 8px; background: #c0c0c0; border: 2px outset #dfdfdf; cursor: pointer; font-size: 11px; font-weight: bold;">Save</button>
        </div>

        <!-- Canvas Area -->
        <div style="flex: 1; display: flex; background: #dfdfdf; padding: 4px; overflow: auto;">
          <canvas id="photoslop-canvas" style="background: white; cursor: crosshair; border: 2px inset #7f7f7f; image-rendering: pixelated; max-width: 100%; max-height: 100%;"></canvas>
        </div>

        <!-- Status Bar -->
        <div style="background: #c0c0c0; border-top: 2px outset #dfdfdf; padding: 2px 4px; font-size: 10px; display: flex; gap: 8px;">
          <div style="flex: 1; border: 1px inset #7f7f7f; padding: 1px 2px;">Ready</div>
          <div style="width: 120px; border: 1px inset #7f7f7f; padding: 1px 2px;">Slop Paint v0.1</div>
        </div>
      </div>
    `;

    // Get references
    this.canvas = document.getElementById('photoslop-canvas');
    this.colorInput = document.getElementById('photoslop-color');
    this.brushSizeInput = document.getElementById('photoslop-brush-size');
    this.sizeLabelEl = document.getElementById('photoslop-size-label');

    // Initialize color
    this.color = this.colorInput.value;

    // Resize canvas to fit container
    const container = this.canvas.parentElement;
    this.canvas.width = Math.max(640, container.clientWidth - 20);
    this.canvas.height = Math.max(480, container.clientHeight - 20);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setupEventListeners() {
    // Tool buttons
    document.querySelectorAll('.photoslop-tool-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Update button states
        document.querySelectorAll('.photoslop-tool-btn').forEach((b) => {
          b.style.borderStyle = b === btn ? 'inset' : 'solid';
          b.style.borderColor = b === btn ? '#dfdfdf' : '#ababab';
        });
        this.tool = btn.dataset.tool;
      });
    });

    // Initialize first tool button as active
    const firstBtn = document.querySelector('.photoslop-tool-btn');
    if (firstBtn) {
      firstBtn.style.borderStyle = 'inset';
      firstBtn.style.borderColor = '#dfdfdf';
    }

    // Color picker
    this.colorInput.addEventListener('change', (e) => {
      this.color = e.target.value;
    });

    // Brush size
    this.brushSizeInput.addEventListener('input', (e) => {
      this.brushSize = parseInt(e.target.value);
      this.sizeLabelEl.textContent = this.brushSize;
    });

    // Canvas events
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));

    // Touch events for drawing
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

    // Buttons
    document.getElementById('photoslop-clear').addEventListener('click', () => this.clearCanvas());
    document.getElementById('photoslop-undo').addEventListener('click', () => this.undo());
    document.getElementById('photoslop-redo').addEventListener('click', () => this.redo());
    document.getElementById('photoslop-save').addEventListener('click', () => this.saveImage());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.undo();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        this.redo();
      }
    });
  }

  getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  getTouchPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  handleMouseDown(e) {
    if (e.button !== 0) return; // Left click only
    this.isDrawing = true;
    const pos = this.getCanvasPos(e);
    this.lastX = pos.x;
    this.lastY = pos.y;

    // For shapes, save state before drawing
    if (['line', 'rect', 'circle'].includes(this.tool)) {
      this.savedImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  handleMouseMove(e) {
    if (!this.isDrawing) return;
    const pos = this.getCanvasPos(e);

    if (this.tool === 'pencil') {
      this.drawLine(this.lastX, this.lastY, pos.x, pos.y, this.color, this.brushSize, false);
    } else if (this.tool === 'eraser') {
      this.drawLine(this.lastX, this.lastY, pos.x, pos.y, 'rgba(255,255,255,1)', this.brushSize * 2, true);
    } else if (['line', 'rect', 'circle'].includes(this.tool)) {
      // Restore and redraw for preview
      this.ctx.putImageData(this.savedImageData, 0, 0);
      this.drawShape(this.lastX, this.lastY, pos.x, pos.y, this.tool);
    }

    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  handleMouseUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.saveHistory();
  }

  handleMouseLeave(e) {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.saveHistory();
    }
  }

  handleTouchStart(e) {
    e.preventDefault();
    this.isDrawing = true;
    const pos = this.getTouchPos(e);
    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (!this.isDrawing) return;
    const pos = this.getTouchPos(e);

    if (this.tool === 'pencil') {
      this.drawLine(this.lastX, this.lastY, pos.x, pos.y, this.color, this.brushSize, false);
    } else if (this.tool === 'eraser') {
      this.drawLine(this.lastX, this.lastY, pos.x, pos.y, 'rgba(255,255,255,1)', this.brushSize * 2, true);
    }

    this.lastX = pos.x;
    this.lastY = pos.y;
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.isDrawing = false;
    this.saveHistory();
  }

  drawLine(x1, y1, x2, y2, color, size, isEraser = false) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
  }

  drawShape(x1, y1, x2, y2, shapeType) {
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const startX = Math.min(x1, x2);
    const startY = Math.min(y1, y2);

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.fillStyle = 'transparent';

    if (shapeType === 'line') {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    } else if (shapeType === 'rect') {
      this.ctx.strokeRect(startX, startY, width, height);
    } else if (shapeType === 'circle') {
      const radius = Math.sqrt(width * width + height * height) / 2;
      this.ctx.beginPath();
      this.ctx.arc(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        radius,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
    }
  }

  clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.saveHistory();
  }

  saveHistory() {
    // Remove redo history if we're drawing after an undo
    this.history = this.history.slice(0, this.historyStep + 1);

    // Add new state
    this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));

    // Limit history
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyStep++;
    }
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      this.ctx.putImageData(this.history[this.historyStep], 0, 0);
    }
  }

  redo() {
    if (this.historyStep < this.history.length - 1) {
      this.historyStep++;
      this.ctx.putImageData(this.history[this.historyStep], 0, 0);
    }
  }

  saveImage() {
    const link = document.createElement('a');
    link.href = this.canvas.toDataURL('image/png');
    link.download = `photoslop-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
