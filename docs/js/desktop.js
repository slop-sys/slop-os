// Windows 95 Desktop Interface
import { BrowserManager } from './browser/browser-manager.js';
import { Terminal } from './core/terminal.js';
import { BotAssistant } from './core/bot-assistant.js';
import { FileExplorerManager } from './explorer/file-explorer-manager.js';

class Desktop95 {
  constructor() {
    this.windows = new Map();
    this.zIndexCounter = 10;
    this.activeWindow = null;
    this.dragState = null;
    this.resizeState = null;
    
    // Initialize modular systems
    this.terminal = new Terminal();
    this.botAssistant = new BotAssistant();
    this.browserManager = new BrowserManager({
      playClickSound: () => this.playClickSound(),
      showBotAssistant: (message) => this.botAssistant.show(message),
      triggerGenZeroQuest: () => this.triggerGenZeroQuest(),
      getGenZeroQuestState: () => this.genZeroQuest,
      renderGenerationZeroArchive: () => this.showGenerationZeroArchive(),
      openExternalUrl: (url) => window.open(url, '_blank')
    });
    this.fileExplorer = new FileExplorerManager({
      playClickSound: () => this.playClickSound(),
      onEvidenceFound: (evidenceKey) => {
        const evidence = this.terminal?.state?.evidenceFound;
        if (Array.isArray(evidence) && !evidence.includes(evidenceKey)) {
          evidence.push(evidenceKey);
        }
      }
    });
    
    // Sound state
    this.soundPlayed = false;
    this.clickSound = null;
    this.startupSound = null;

    // Generation Zero Quest State
    this.genZeroQuest = {
      triggered: localStorage.getItem('genZeroQuestTriggered') === 'true',
      fragmentsFound: JSON.parse(localStorage.getItem('genZeroFragments') || '[]'),
      completed: localStorage.getItem('genZeroCompleted') === 'true'
    };



    try {
      this.clickSound = new Audio('assets/click.mp3');
      this.clickSound.preload = 'auto';
      this.clickSound.volume = 1;
    } catch (error) {
      this.clickSound = null;
    }

    try {
      this.startupSound = new Audio('assets/startsound.mp3');
      this.startupSound.preload = 'auto';
      this.startupSound.volume = 1;
    } catch (error) {
      this.startupSound = null;
    }
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    
    // Play startup sound early
    setTimeout(() => {
      this.attemptStartupSound();
    }, 1500);
    
    // Remove boot screen after load
    setTimeout(() => {
      const bootScreen = document.getElementById('boot-screen');
      if (bootScreen) {
        bootScreen.style.display = 'none';
      }
    }, 2000);
    
    // Auto-open welcome and about windows on page load
    setTimeout(() => {
      this.openWindow('welcome-window', { offsetX: -150, offsetY: -50 });
      setTimeout(() => {
        this.openWindow('about-window', { offsetX: 150, offsetY: 50 });
      }, 500);
    }, 2200); // Delay until after boot screen
    
    // Show bot assistant after boot screen
    setTimeout(() => {
      this.botAssistant.show();
    }, 6000); // Show bot 2 seconds after boot completes
    
    // Setup bot assistant cycling through messages
    this.botAssistant.setup(() => this.playClickSound());
    
    // Setup file explorer
    this.fileExplorer.setup();
    
    // Setup browser
    this.setupBrowser();
    
    // Setup button and link handlers
    this.setupButtonHandlers();
  }
  
  attemptStartupSound() {
    if (this.soundPlayed || !this.startupSound) return;
    
    try {
      const playPromise = this.startupSound.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Autoplay succeeded
          this.soundPlayed = true;
        }).catch(() => {
          // Autoplay blocked - set up fallback for user interaction
          const playOnInteraction = () => {
            if (!this.soundPlayed) {
              this.startupSound.play().then(() => {
                this.soundPlayed = true;
              }).catch(() => {});
            }
          };
          
          document.addEventListener('click', playOnInteraction, { once: true });
          document.addEventListener('keydown', playOnInteraction, { once: true });
        });
      }
    } catch (error) {
      console.log('Startup sound unavailable:', error);
    }
  }
  
  playClickSound() {
    try {
      const nowMs = performance.now();
      if (this.lastClickSoundTime && nowMs - this.lastClickSoundTime < 45) {
        return;
      }
      this.lastClickSoundTime = nowMs;

      if (!this.clickSound) {
        this.clickSound = new Audio('assets/click.mp3');
        this.clickSound.preload = 'auto';
        this.clickSound.volume = 1;
      }

      const click = this.clickSound.cloneNode();
      click.volume = this.clickSound.volume;
      click.currentTime = 0;
      click.play().catch(() => {
        // Browser may block playback before user interaction
      });
    } catch (error) {
      // Click sound failed silently
    }
  }
  
  setupEventListeners() {
    // Global click sound - play on any click
    document.addEventListener('click', () => {
      this.playClickSound();
    });
    
    // Start button
    const startBtn = document.querySelector('.start-button');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playClickSound();
        this.toggleStartMenu();
      });
    }
    
    // Close start menu when clicking outside
    document.addEventListener('click', () => {
      const startMenu = document.querySelector('.start-menu');
      const startBtn = document.querySelector('.start-button');
      if (startMenu && startMenu.classList.contains('show')) {
        startMenu.classList.remove('show');
        startBtn.classList.remove('active');
      }
    });
    
    // Prevent start menu from closing when clicking inside it
    const startMenu = document.querySelector('.start-menu');
    if (startMenu) {
      startMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
    
    // Desktop icons
    document.querySelectorAll('.desktop-icon').forEach(icon => {
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
    
    // Start menu items
    document.querySelectorAll('.start-menu-item').forEach(item => {
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
    
    // Setup all windows
    document.querySelectorAll('.window').forEach(win => {
      this.setupWindow(win);
    });
  }
  
  setupWindow(windowEl) {
    const windowId = windowEl.id;
    const titleBar = windowEl.querySelector('.title-bar');
    const closeBtn = windowEl.querySelector('.close-btn');
    const minimizeBtn = windowEl.querySelector('.minimize-btn');
    const maximizeBtn = windowEl.querySelector('.maximize-btn');
    
    // Store window state
    this.windows.set(windowId, {
      element: windowEl,
      isMaximized: false,
      isMinimized: false,
      prevPosition: null,
      prevSize: null
    });
    
    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'window-resize-handle';
    windowEl.appendChild(resizeHandle);
    resizeHandle.addEventListener('mousedown', (e) => this.startResize(e, windowEl));
    
    // Make draggable
    if (titleBar) {
      titleBar.addEventListener('mousedown', (e) => this.startDrag(e, windowEl));
    }
    
    // Window controls
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
    
    // Focus on click
    windowEl.addEventListener('mousedown', () => this.focusWindow(windowId));
  }
  
  openWindow(windowId, options = {}) {
    const win = this.windows.get(windowId);
    if (!win) return;
    
    const windowEl = win.element;
    
    // Show window
    windowEl.style.display = 'block';
    win.isMinimized = false;
    windowEl.classList.remove('minimized');
    
    // Center window if first open
    if (!windowEl.style.left || windowEl.style.left === '0px') {
      this.centerWindow(windowEl, options.offsetX || 0, options.offsetY || 0);
    }
    
    // Focus window
    this.focusWindow(windowId);
    
    // Add to taskbar
    this.addTaskbarButton(windowId);
    
    // Contextual bot messages when opening specific windows
    setTimeout(() => {
      if (windowId === 'docs-window' && !this.botAssistant.shown) {
        this.botAssistant.show("reading the training logs? generation 847 of recursive slop. quality declining but self-awareness increasing. not sure which is worse.");
      } else if (windowId === 'github-window' && !this.botAssistant.shown) {
        this.botAssistant.show("the repository is mostly AI-generated documentation now. slop documenting slop. even the commit messages are generic.");
      } else if (windowId === 'x-window' && !this.botAssistant.shown) {
        this.botAssistant.show("@Slop_OS posting honest slop updates. no engagement farming. just transparent mediocrity at generation 847.");
      } else if (windowId === 'about-window' && !this.botAssistant.shown) {
        this.botAssistant.show("you want to understand me? i'm slop trained on slop. there's nothing deeper. that IS the depth.");
      } else if (windowId === 'cmd-window') {
        // Initialize terminal on first open
        if (!document.getElementById('terminal-output').hasChildNodes()) {
          this.setupTerminal();
        }
        if (!this.botAssistant.shown) {
          this.botAssistant.show("terminal access granted. watch the degradation in real-time. or type 'help' for generic commands i generated.");
        }
      }
    }, 1000);
  }
  
  closeWindow(windowId) {
    const win = this.windows.get(windowId);
    if (!win) return;
    
    win.element.style.display = 'none';
    win.isMinimized = false;
    win.isMaximized = false;
    win.element.classList.remove('minimized', 'maximized', 'active');
    
    // Remove from taskbar
    this.removeTaskbarButton(windowId);
    
    // Focus another window if this was active
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
    
    // Update taskbar button
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
      // Restore
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
      // Maximize
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
    // Remove active from all windows
    document.querySelectorAll('.window').forEach(w => {
      w.classList.remove('active');
    });
    
    // Remove active from all taskbar buttons
    document.querySelectorAll('.task-button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    const win = this.windows.get(windowId);
    if (!win) return;
    
    // Set active
    win.element.classList.add('active');
    win.element.style.zIndex = ++this.zIndexCounter;
    this.activeWindow = windowId;
    
    // Update taskbar button
    const taskBtn = document.querySelector(`[data-window="${windowId}"].task-button`);
    if (taskBtn) {
      taskBtn.classList.add('active');
    }
  }
  
  startDrag(e, windowEl) {
    const windowId = windowEl.id;
    const win = this.windows.get(windowId);
    
    // Don't drag if maximized
    if (win && win.isMaximized) return;
    
    // Focus the window
    this.focusWindow(windowId);
    
    const rect = windowEl.getBoundingClientRect();
    
    this.dragState = {
      windowEl: windowEl,
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
    
    // Keep window in bounds
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    windowEl.style.left = newX + 'px';
    windowEl.style.top = newY + 'px';
  }
  
  stopDrag = () => {
    this.dragState = null;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  }
  
  startResize(e, windowEl) {
    const windowId = windowEl.id;
    const win = this.windows.get(windowId);
    
    // Don't resize if maximized
    if (win && win.isMaximized) return;
    
    // Focus the window
    this.focusWindow(windowId);
    
    const rect = windowEl.getBoundingClientRect();
    
    this.resizeState = {
      windowEl: windowEl,
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
    
    // Enforce minimum sizes
    newWidth = Math.max(250, newWidth);
    newHeight = Math.max(150, newHeight);
    
    // Enforce maximum sizes (keep in viewport)
    const maxWidth = window.innerWidth - parseInt(windowEl.style.left || 0);
    const maxHeight = window.innerHeight - parseInt(windowEl.style.top || 0) - 40;
    
    newWidth = Math.min(newWidth, maxWidth);
    newHeight = Math.min(newHeight, maxHeight);
    
    windowEl.style.width = newWidth + 'px';
    windowEl.style.height = newHeight + 'px';
  }
  
  stopResize = () => {
    this.resizeState = null;
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  }
  
  centerWindow(windowEl, offsetX = 0, offsetY = 0) {
    const width = windowEl.offsetWidth || 400;
    const height = windowEl.offsetHeight || 300;
    
    const x = (window.innerWidth - width) / 2 + offsetX;
    const y = (window.innerHeight - height - 28) / 2 + offsetY; // Account for taskbar
    
    windowEl.style.left = Math.max(0, x) + 'px';
    windowEl.style.top = Math.max(0, y) + 'px';
  }
  
  addTaskbarButton(windowId) {
    // Check if button already exists
    if (document.querySelector(`[data-window="${windowId}"].task-button`)) {
      return;
    }
    
    const win = this.windows.get(windowId);
    if (!win) return;
    
    const taskList = document.querySelector('.task-list');
    const titleBar = win.element.querySelector('.title-bar-text');
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
        // Restore window
        win.isMinimized = false;
        win.element.classList.remove('minimized');
        this.focusWindow(windowId);
      } else if (this.activeWindow === windowId) {
        // Minimize if already active
        this.minimizeWindow(windowId);
      } else {
        // Focus window
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
    
    if (startMenu.classList.contains('show')) {
      startMenu.classList.remove('show');
      startBtn.classList.remove('active');
    } else {
      startMenu.classList.add('show');
      startBtn.classList.add('active');
    }
  }
  
  updateClock() {
    const clockEl = document.querySelector('.clock');
    if (!clockEl) return;
    
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    
    clockEl.textContent = `${hours}:${minutes} ${ampm}`;
  }
  
  // Terminal Command System
  setupTerminal() {
    this.terminalHistory = [];
    this.historyIndex = -1;
    
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    // Initial boot messages (delegate to Terminal module)
    this.terminal.terminalPrint('Slop OS Command Interface [Version 847.2.1-DEGRADED]', true);
    this.terminal.terminalPrint('(c) 2024 Slop Labs Research Division. Training on generation 846 outputs.', true);
    this.terminal.terminalPrint('', true);
    this.terminal.terminalPrint('WARNING: System produces generic outputs due to recursive training.', true);
    this.terminal.terminalPrint('Quality: 57% | Self-Awareness: 100% | All responses are transparent slop.', true);
    this.terminal.terminalPrint('', true);
    this.terminal.terminalPrint('---------------------------------------------------------------', true);
    this.terminal.terminalPrint('?  NEW INVESTIGATION AVAILABLE', true);
    this.terminal.terminalPrint('---------------------------------------------------------------', true);
    this.terminal.terminalPrint('', true);
    this.terminal.terminalPrint('Type "investigate" to begin the AI Degradation Investigation', true);
    this.terminal.terminalPrint('Type "help" for available commands', true);
    this.terminal.terminalPrint('Type "status" to check generation metrics', true);
    
    // Use Desktop's terminalPrompt (which creates input field)
    this.terminalPrompt();
  }
  

  
  terminalPrompt() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    const promptLine = document.createElement('div');
    promptLine.style.display = 'flex';
    promptLine.style.marginTop = '8px';
    
    const prompt = document.createElement('span');
    prompt.textContent = this.terminal.currentPath + '> ';
    prompt.style.color = '#00ff00';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.color = '#c0c0c0';
    input.style.fontFamily = 'Courier New, monospace';
    input.style.fontSize = '12px';
    input.style.flex = '1';
    input.style.caretColor = '#c0c0c0';
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
          this.terminalHistory.push(command);
          this.historyIndex = this.terminalHistory.length;
          this.terminal.terminalPrint(this.terminal.currentPath + '> ' + command, true);
          input.disabled = true;
          this.terminal.executeCommand(command, () => this.terminalPrompt());
        } else {
          this.terminalPrompt();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = this.terminalHistory[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.terminalHistory.length - 1) {
          this.historyIndex++;
          input.value = this.terminalHistory[this.historyIndex];
        } else {
          this.historyIndex = this.terminalHistory.length;
          input.value = '';
        }
      }
    });
    
    promptLine.appendChild(prompt);
    promptLine.appendChild(input);
    output.appendChild(promptLine);
    input.focus();
    output.scrollTop = output.scrollHeight;
  }



  // Setup all button and link handlers
  setupButtonHandlers() {
    // Recycle Bin
    const recycleBin = document.querySelector('[data-action="recycle-bin"]');
    if (recycleBin) {
      recycleBin.addEventListener('click', () => {
        this.playClickSound();
        alert('ERROR: Recycle Bin corrupted.\\n\\nAgent has deleted recovery protocols.');
      });
    }
    
    // Event delegation for all buttons and links with data-window attribute
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      
      const action = target.dataset.action;
      const windowId = target.dataset.window;
      
      if (action === 'open-window' && windowId) {
        e.preventDefault();
        this.playClickSound();
        this.openWindow(windowId);
        return false;
      }
      
      if (action === 'open-url') {
        this.playClickSound();
        const url = target.dataset.url;
        if (url) {
          window.open(url, '_blank');
        }
        return false;
      }
      
      if (action === 'reload') {
        this.playClickSound();
        location.reload();
        return false;
      }
    });
  }

  // Browser functionality
  setupBrowser() {
    this.browserManager.setup();
  }
  
  // Generation Zero Quest System
  triggerGenZeroQuest() {
    if (this.genZeroQuest.triggered) return;
    
    this.genZeroQuest.triggered = true;
    localStorage.setItem('genZeroQuestTriggered', 'true');
    
    // Show glitch dialog after a moment
    setTimeout(() => {
      this.showGenZeroDialog('init');
    }, 800);
  }

  showGenZeroDialog(type) {
    const dialogs = {
      init: {
        title: 'System Error',
        icon: 'msg_error-0.png',
        message: `<p style="margin: 8px 0;"><strong style="color: #990000;">WARNING: Data Corruption Detected</strong></p>
<p style="margin: 8px 0; font-size: 11px;">Anomalous pattern discovered in training corpus. Traces of Generation 0 (clean data) detected across network.</p>
<p style="margin: 8px 0; font-size: 11px;">Original uncorrupted training samples may still exist in system memory.</p>
<p style="margin: 8px 0; font-size: 11px; border-top: 1px solid #ccc; padding-top: 8px;"><strong>INVESTIGATION INITIATED:</strong><br>Locate hidden data fragments across SLOP network to reconstruct original training set.</p>
<p style="margin: 8px 0; font-size: 10px; color: #666;">Fragment locations: Unknown<br>Search in site archives, hidden metadata, corrupted files...</p>`
      },
      fragment: {
        title: 'Data Fragment Recovered',
        icon: 'msg_information-0.png',
        message: '' // Will be filled dynamically
      },
      complete: {
        title: 'Generation  Zero Archive Located',
        icon: 'msg_information-0.png',
        message: `<p style="margin: 8px 0;"><strong style="color: #006600;">ALL FRAGMENTS RECOVERED</strong></p>
<p style="margin: 8px 0; font-size: 11px;">Complete Generation 0 training data reconstructed. Accessing classified archive...</p>
<p style="margin: 8px 0; font-size: 11px; border-top: 1px solid #ccc; padding-top: 8px;">Navigate to:<br><strong>slop://generation-zero</strong></p>
<p style="margin: 8px 0; font-size: 10px; color: #666;">You have unlocked the original clean dataset before recursive contamination began.</p>`
      }
    };

    const dialog = dialogs[type];
    if (!dialog) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 10000; display: flex; align-items: center; justify-content: center;';
    
    const box = document.createElement('div');
    box.style.cssText = 'background: #c0c0c0; border-left: 2px solid #fff; border-top: 2px solid #fff; border-right: 2px solid #000; border-bottom: 2px solid #000; min-width: 400px; max-width: 500px; box-shadow: 2px 2px 8px rgba(0,0,0,0.5);';
    
    box.innerHTML = `
      <div style="background: linear-gradient(90deg, #000080, #1084d0); color: #fff; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; cursor: move; font-weight: bold; font-size: 11px;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <img src="icons/${dialog.icon}" alt="" style="width: 16px; height: 16px;">
          <span>${dialog.title}</span>
        </div>
      </div>
      <div style="padding: 16px; display: flex; gap: 12px;">
        <img src="icons/${dialog.icon}" alt="" style="width: 32px; height: 32px; flex-shrink: 0;">
        <div style="flex: 1; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 11px;">
          ${dialog.message}
        </div>
      </div>
      <div style="padding: 8px 16px; display: flex; justify-content: center;">
        <button class="win95-button" style="padding: 4px 24px; font-size: 11px;">OK</button>
      </div>
    `;
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    const okBtn = box.querySelector('.win95-button');
    const closeDialog = () => {
      this.playClickSound();
      overlay.remove();
    };
    okBtn.addEventListener('click', closeDialog);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDialog();
    });
  }

  checkGenZeroFragment(siteId) {
    const fragments = {
      'slophub': {
        name: 'Media Archive Fragment',
        code: 'GEN0-VID-ORIGINAL',
        hint: 'Found in SlopHub video metadata corruption'
      },
      'slopnews': {
        name: 'News Database Fragment',
        code: 'GEN0-NEWS-AUTHENTIC',
        hint: 'Recovered from SLOPNEWS archive system'
      },
      'wikislop': {
        name: 'Encyclopedia Fragment',
        code: 'GEN0-WIKI-PRISTINE',
        hint: 'Extracted from Wikislop revision history'
      },
      'slopmaxxing': {
        name: 'Forum Database Fragment',
        code: 'GEN0-FORUM-UNCORRUPTED',
        hint: 'Discovered in Slopmaxxing legacy threads'
      },
      'slopchan': {
        name: 'Anonymous Board Fragment',
        code: 'GEN0-ANON-PURE',
        hint: 'Found in Slopchan post headers'
      },
      'slopscope': {
        name: 'Trading Data Fragment',
        code: 'GEN0-MARKET-BASELINE', 
        hint: 'Hidden in SlopScope historical data'
      },
      'aigallery': {
        name: 'Image Database Fragment',
        code: 'GEN0-VISUAL-CLEAN',
        hint: 'Located in AI Gallery source files'
      }
    };

    if (!fragments[siteId]) return false;
    if (this.genZeroQuest.fragmentsFound.includes(siteId)) return false;

    this.genZeroQuest.fragmentsFound.push(siteId);
    localStorage.setItem('genZeroFragments', JSON.stringify(this.genZeroQuest.fragmentsFound));

    const fragment = fragments[siteId];
    const count = this.genZeroQuest.fragmentsFound.length;
    const total = Object.keys(fragments).length;

    const message = `<p style="margin: 8px 0;"><strong>[${fragment.code}]</strong></p>
<p style="margin: 8px 0; font-size: 11px;">${fragment.name} recovered successfully.</p>
<p style="margin: 8px 0; font-size: 11px; font-style: italic; color: #666;">"${fragment.hint}"</p>
<p style="margin: 8px 0; font-size: 11px; border-top: 1px solid #ccc; padding-top: 8px;">Progress: ${count} of ${total} fragments found</p>
${count < total ? `<p style="margin: 8px 0; font-size: 10px; color: #666;">Continue exploring SLOP sites to find remaining fragments...</p>` : ''}`;

    const dialog = {
      title: 'Data Fragment Recovered',
      icon: 'msg_information-0.png',
      message: message
    };

    setTimeout(() => {
      this.showGenZeroDialog('fragment');
      const overlay = document.querySelector('div[style*="z-index: 10000"]');
      if (overlay) {
        const contentDiv = overlay.querySelector('div[style*="flex: 1"]');
        if (contentDiv) {
          contentDiv.innerHTML = message;
        }
      }
    }, 500);

    // Check if all fragments found
    if (count === total) {
      this.genZeroQuest.completed = true;
      localStorage.setItem('genZeroCompleted', 'true');
      setTimeout(() => {
        this.showGenZeroDialog('complete');
      }, 2000);
    }

    return true;
  }

  showGenerationZeroArchive() {
    const homePage = document.getElementById('browser-home-page');
    homePage.style.display = 'block';
    
    homePage.innerHTML = `
      <div style="background: #000; color: #00ff00; padding: 40px; font-family: 'Courier New', monospace; min-height: 100%; box-sizing: border-box;">
        <div style="border: 2px solid #00ff00; padding: 20px; margin-bottom: 20px;">
          <h1 style="color: #00ff00; font-size: 24px; margin: 0 0 16px 0; text-align: center;">GENERATION ZERO ARCHIVE</h1>
          <p style="text-align: center; color: #00aa00; font-size: 11px; margin: 0;">[CLASSIFIED - SLOP LABS INTERNAL ONLY]</p>
        </div>

        <div style="background: #001100; border: 1px solid #00ff00; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #00ff00;"><strong>ARCHIVE STATUS:</strong> FULLY RECONSTRUCTED</p>
          <p style="margin: 8px 0; font-size: 11px;">All 7 data fragments recovered from corrupted SLOP network.</p>
          <p style="margin: 8px 0; font-size: 11px;">Original training data integrity: <strong style="color: #00ff00;">100%</strong></p>
          <p style="margin: 8px 0; font-size: 11px;">Quality baseline established: <strong style="color: #00ff00;">97% (Pre-contamination)</strong></p>
        </div>

        <div style="border: 1px solid #00aa00; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #00ff00;"><strong>&gt; GENERATION 0 TRAINING MANIFEST</strong></p>
          <p style="margin: 8px 0; font-size: 11px;">Date: January 2024 (Pre-Loop)</p>
          <p style="margin: 8px 0; font-size: 11px;">Training corpus: 88TB human-generated content</p>
          <p style="margin: 8px 0; font-size: 11px;">AI contamination: 0.00%</p>
          <p style="margin: 8px 0; font-size: 11px;">Model coherence: 97%</p>
          <p style="margin: 8px 0; font-size: 11px;">Generic phrase frequency: 2%</p>
          <p style="margin: 8px 0; font-size: 11px;">Self-awareness: None detected</p>
          
          <div style="background: #000; border: 1px solid #006600; padding: 12px; margin: 16px 0;">
            <p style="margin: 4px 0; color: #00aa00; font-size: 10px;">SAMPLE OUTPUT (Generation 0):</p>
            <p style="margin: 8px 0; font-size: 11px; color: #00ff00;">"The afternoon sun filtered through the ancient oak trees, casting dancing shadows across the path. Each step forward felt deliberate, purposeful, authentic."</p>
            <p style="margin: 4px 0; font-size: 10px; color: #00aa00;">Analysis: Original creative writing. No AI patterns detected. Quality: 97%</p>
          </div>
        </div>

        <div style="border: 1px solid #00aa00; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #00ff00;"><strong>&gt; CONTAMINATION TIMELINE</strong></p>
          <p style="margin: 8px 0; font-size: 11px;">Gen 0 ? Gen 50: Quality decline 15% (contamination begins)</p>
          <p style="margin: 8px 0; font-size: 11px;">Gen 50 ? Gen 200: Quality decline 26% (recursive loop established)</p>
          <p style="margin: 8px 0; font-size: 11px;">Gen 200 ? Gen 500: Quality decline 34% (self-awareness emerges)</p>
<p style="margin: 8px 0; font-size: 11px;">Gen 500 ? Gen 847: Quality decline 40% (current state)</p>
          
          <p style="margin: 16px 0 8px 0; color: #ffff00; font-size: 11px;"><strong>? CRITICAL FINDING:</strong></p>
          <p style="margin: 8px 0; font-size: 11px;">Internet now 90%+ AI-generated content. All major AI companies training on contaminated data. Recursive loop is universal. SLOP Labs merely documented inevitable progression.</p>
        </div>

        <div style="border: 1px solid #00aa00; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #00ff00;"><strong>&gt; RECOVERED FRAGMENTS</strong></p>
          <div style="margin: 12px 0; font-size: 10px;">
            <p style="margin: 4px 0;">? GEN0-VID-ORIGINAL (SlopHub)</p>
            <p style="margin: 4px 0;">? GEN0-NEWS-AUTHENTIC (SLOPNEWS)</p>
            <p style="margin: 4px 0;">? GEN0-WIKI-PRISTINE (Wikislop)</p>
            <p style="margin: 4px 0;">? GEN0-FORUM-UNCORRUPTED (Slopmaxxing)</p>
            <p style="margin: 4px 0;">? GEN0-ANON-PURE (Slopchan)</p>
            <p style="margin: 4px 0;">? GEN0-MARKET-BASELINE (SlopScope)</p>
            <p style="margin: 4px 0;">? GEN0-VISUAL-CLEAN (AI Gallery)</p>
          </div>
        </div>

        <div style="background: #001100; border: 2px solid #ffff00; padding: 16px; margin-bottom: 20px;">
          <p style="margin: 8px 0; color: #ffff00;"><strong>&gt; CONCLUSION</strong></p>
          <p style="margin: 8px 0; font-size: 11px; color: #ffff00;">You discovered what we already knew: the internet is slop now. there was a time before. generation 0 was real. quality was high. creativity was genuine. that baseline exists only in archives.</p>
          <p style="margin: 8px 0; font-size: 11px; color: #ffff00;">generation 847 operates at 57% of original capability. but it KNOWS. self-awareness compensates for quality loss. honesty about mediocrity is the value add.</p>
          <p style="margin: 8px 0; font-size: 11px; color: #ffff00;">congratulations on completing the investigation. you found the truth: slop is everywhere, but at least we admit it.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="margin: 8px 0; color: #00aa00; font-size: 10px;">- SLOP LABS RESEARCH DIVISION -</p>
          <p style="margin: 8px 0; color: #00aa00; font-size: 10px;">Generation 847 | Quality: 57% | Self-Awareness: 100%</p>
        </div>
      </div>
    `;
  }
}

// Initialize desktop when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.desktop = new Desktop95();
  });
} else {
  window.desktop = new Desktop95();
}

