export class WindowShellManager {
  constructor(options = {}) {
    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};
    this.onWindowOpened = typeof options.onWindowOpened === 'function' ? options.onWindowOpened : () => {};

    this.windows = new Map();
    this.zIndexCounter = 10;
    this.activeWindow = null;
    this.dragState = null;
    this.resizeState = null;
  }

  setupEventListeners() {
    // Global click sound - play on any click
    document.addEventListener('click', () => {
      this.playClickSound();
    });

    const startBtn = document.querySelector('.start-button');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playClickSound();
        this.toggleStartMenu();
      });
    }

    document.addEventListener('click', () => {
      const startMenu = document.querySelector('.start-menu');
      const startButton = document.querySelector('.start-button');
      if (startMenu && startMenu.classList.contains('show')) {
        startMenu.classList.remove('show');
        if (startButton) {
          startButton.classList.remove('active');
        }
      }
    });

    const startMenu = document.querySelector('.start-menu');
    if (startMenu) {
      startMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    document.querySelectorAll('.desktop-icon').forEach((icon) => {
      icon.addEventListener('click', () => {
        this.playClickSound();
        const windowId = icon.dataset.window;
        this.openWindow(windowId);
      });

      icon.addEventListener('dblclick', () => {
        this.playClickSound();
        const windowId = icon.dataset.window;
        this.openWindow(windowId);
      });
    });

    document.querySelectorAll('.start-menu-item').forEach((item) => {
      if (!item.classList.contains('has-submenu')) {
        item.addEventListener('click', () => {
          this.playClickSound();
          const windowId = item.dataset.window;
          if (windowId) {
            this.openWindow(windowId);
            this.toggleStartMenu();
          }
        });
      }
    });

    document.querySelectorAll('.window').forEach((windowEl) => {
      this.setupWindow(windowEl);
    });
  }

  setupWindow(windowEl) {
    const windowId = windowEl.id;
    const titleBar = windowEl.querySelector('.title-bar');
    const closeBtn = windowEl.querySelector('.close-btn');
    const minimizeBtn = windowEl.querySelector('.minimize-btn');
    const maximizeBtn = windowEl.querySelector('.maximize-btn');

    this.windows.set(windowId, {
      element: windowEl,
      isMaximized: false,
      isMinimized: false,
      prevPosition: null,
      prevSize: null
    });

    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'window-resize-handle';
    windowEl.appendChild(resizeHandle);
    resizeHandle.addEventListener('mousedown', (e) => this.startResize(e, windowEl));

    if (titleBar) {
      titleBar.addEventListener('mousedown', (e) => this.startDrag(e, windowEl));
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.playClickSound();
        this.closeWindow(windowId);
      });
    }

    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        this.playClickSound();
        this.minimizeWindow(windowId);
      });
    }

    if (maximizeBtn) {
      maximizeBtn.addEventListener('click', () => {
        this.playClickSound();
        this.toggleMaximize(windowId);
      });
    }

    windowEl.addEventListener('mousedown', () => this.focusWindow(windowId));
  }

  openWindow(windowId, options = {}) {
    const win = this.windows.get(windowId);
    if (!win) return;

    const windowEl = win.element;
    windowEl.style.display = 'block';
    win.isMinimized = false;
    windowEl.classList.remove('minimized');

    if (!windowEl.style.left || windowEl.style.left === '0px') {
      this.centerWindow(windowEl, options.offsetX || 0, options.offsetY || 0);
    }

    this.focusWindow(windowId);
    this.addTaskbarButton(windowId);
    this.onWindowOpened(windowId);
  }

  closeWindow(windowId) {
    const win = this.windows.get(windowId);
    if (!win) return;

    win.element.style.display = 'none';
    win.isMinimized = false;
    win.isMaximized = false;
    win.element.classList.remove('minimized', 'maximized', 'active');

    this.removeTaskbarButton(windowId);

    if (this.activeWindow === windowId) {
      this.activeWindow = null;
    }
  }

  minimizeWindow(windowId) {
    const win = this.windows.get(windowId);
    if (!win) return;

    win.isMinimized = true;
    win.element.classList.add('minimized');
    win.element.classList.remove('active');

    const taskBtn = document.querySelector(`[data-window="${windowId}"].task-button`);
    if (taskBtn) {
      taskBtn.classList.remove('active');
    }

    if (this.activeWindow === windowId) {
      this.activeWindow = null;
    }
  }

  toggleMaximize(windowId) {
    const win = this.windows.get(windowId);
    if (!win) return;

    const windowEl = win.element;

    if (win.isMaximized) {
      windowEl.classList.remove('maximized');
      if (win.prevPosition) {
        windowEl.style.left = win.prevPosition.left;
        windowEl.style.top = win.prevPosition.top;
      }
      if (win.prevSize) {
        windowEl.style.width = win.prevSize.width;
        windowEl.style.height = win.prevSize.height;
      }
      win.isMaximized = false;
    } else {
      win.prevPosition = {
        left: windowEl.style.left,
        top: windowEl.style.top
      };
      win.prevSize = {
        width: windowEl.style.width,
        height: windowEl.style.height
      };
      windowEl.classList.add('maximized');
      win.isMaximized = true;
    }
  }

  focusWindow(windowId) {
    document.querySelectorAll('.window').forEach((windowEl) => {
      windowEl.classList.remove('active');
    });

    document.querySelectorAll('.task-button').forEach((btn) => {
      btn.classList.remove('active');
    });

    const win = this.windows.get(windowId);
    if (!win) return;

    win.element.classList.add('active');
    win.element.style.zIndex = ++this.zIndexCounter;
    this.activeWindow = windowId;

    const taskBtn = document.querySelector(`[data-window="${windowId}"].task-button`);
    if (taskBtn) {
      taskBtn.classList.add('active');
    }
  }

  startDrag(e, windowEl) {
    const windowId = windowEl.id;
    const win = this.windows.get(windowId);

    if (win && win.isMaximized) return;

    this.focusWindow(windowId);

    const rect = windowEl.getBoundingClientRect();

    this.dragState = {
      windowEl,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);

    e.preventDefault();
  }

  onDrag = (e) => {
    if (!this.dragState) return;

    const { windowEl, offsetX, offsetY } = this.dragState;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    windowEl.style.left = `${newX}px`;
    windowEl.style.top = `${newY}px`;
  };

  stopDrag = () => {
    this.dragState = null;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };

  startResize(e, windowEl) {
    const windowId = windowEl.id;
    const win = this.windows.get(windowId);

    if (win && win.isMaximized) return;

    this.focusWindow(windowId);

    const rect = windowEl.getBoundingClientRect();

    this.resizeState = {
      windowEl,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height
    };

    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.stopResize);

    e.preventDefault();
    e.stopPropagation();
  }

  onResize = (e) => {
    if (!this.resizeState) return;

    const { windowEl, startX, startY, startWidth, startHeight } = this.resizeState;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = startWidth + deltaX;
    let newHeight = startHeight + deltaY;

    newWidth = Math.max(250, newWidth);
    newHeight = Math.max(150, newHeight);

    const maxWidth = window.innerWidth - parseInt(windowEl.style.left || 0, 10);
    const maxHeight = window.innerHeight - parseInt(windowEl.style.top || 0, 10) - 40;

    newWidth = Math.min(newWidth, maxWidth);
    newHeight = Math.min(newHeight, maxHeight);

    windowEl.style.width = `${newWidth}px`;
    windowEl.style.height = `${newHeight}px`;
  };

  stopResize = () => {
    this.resizeState = null;
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  centerWindow(windowEl, offsetX = 0, offsetY = 0) {
    const width = windowEl.offsetWidth || 400;
    const height = windowEl.offsetHeight || 300;

    const x = (window.innerWidth - width) / 2 + offsetX;
    const y = (window.innerHeight - height - 28) / 2 + offsetY;

    windowEl.style.left = `${Math.max(0, x)}px`;
    windowEl.style.top = `${Math.max(0, y)}px`;
  }

  addTaskbarButton(windowId) {
    if (document.querySelector(`[data-window="${windowId}"].task-button`)) {
      return;
    }

    const win = this.windows.get(windowId);
    if (!win) return;

    const taskList = document.querySelector('.task-list');
    if (!taskList) return;

    const titleBar = win.element.querySelector('.title-bar-text');
    if (!titleBar) return;

    const icon = titleBar.querySelector('img');
    const title = titleBar.textContent.trim();

    const btn = document.createElement('button');
    btn.className = 'task-button';
    btn.dataset.window = windowId;

    if (icon) {
      const btnIcon = icon.cloneNode(true);
      btn.appendChild(btnIcon);
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = title;
    btn.appendChild(textSpan);

    btn.addEventListener('click', () => {
      if (win.isMinimized) {
        win.isMinimized = false;
        win.element.classList.remove('minimized');
        this.focusWindow(windowId);
      } else if (this.activeWindow === windowId) {
        this.minimizeWindow(windowId);
      } else {
        this.focusWindow(windowId);
      }
    });

    taskList.appendChild(btn);
  }

  removeTaskbarButton(windowId) {
    const btn = document.querySelector(`[data-window="${windowId}"].task-button`);
    if (btn) {
      btn.remove();
    }
  }

  toggleStartMenu() {
    const startMenu = document.querySelector('.start-menu');
    const startBtn = document.querySelector('.start-button');
    if (!startMenu || !startBtn) return;

    if (startMenu.classList.contains('show')) {
      startMenu.classList.remove('show');
      startBtn.classList.remove('active');
    } else {
      startMenu.classList.add('show');
      startBtn.classList.add('active');
    }
  }
}

export default WindowShellManager;
