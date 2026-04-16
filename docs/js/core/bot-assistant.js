/**
 * Bot Assistant
 * Manages the helpful bot suggestions that appear periodically
 */

export class BotAssistant {
  constructor() {
    this.shown = false;
    this.messageIndex = 0;
    this.hideTimer = null;
    this.messages = [
      "try opening the Slop Terminal and typing 'help' to see what commands are available.",
      "check out the Research Notes for documentation on the training loop degradation.",
      "curious about the project? click the About window to learn how this became generation 847.",
      "the System Logs window has detailed information about recursive training patterns.",
      "open Microslop Explorer to browse the simulated web. wikislop has archived everything.",
      "want to connect? the @Slop_OS window links to the twitter account for updates.",
      "double-click the Recycle Bin if you're feeling curious. not everything is as it seems.",
      "File Explorer shows the directory structure. generation 847 of recursive training.",
      "the GitHub window links to the repository. contributions welcome, probably.",
      "try the terminal: type 'status' to see current degradation metrics in real-time.",
      "looking for the origin story? the About window explains the mit neural systems lab.",
      "check Research Notes to understand why this neptune build became self-aware.",
      "terminal command 'gen' shows generation history. watch quality decline over 847 iterations.",
      "Microslop Explorer has links to wikislop, ai gallery, and other slop ecosystem sites.",
      "the build string in the corner shows this is evaluation v2.4.7 - a neptune test build."
    ];
  }

  setup(playClickSound) {
    const botEl = document.getElementById('bot-assistant');
    const closeBtn = botEl.querySelector('.bot-assistant-close');
    
    // Close button handler
    closeBtn.addEventListener('click', () => {
      playClickSound();
      this.hide();
    });
    
    // Show bot with random messages periodically
    setInterval(() => {
      if (!this.shown && Math.random() > 0.85) {
        this.show();
      }
    }, 45000); // Check every 45 seconds
  }

  show(message = null) {
    const botEl = document.getElementById('bot-assistant');
    if (!botEl) return;

    const messageEl = botEl.querySelector('.bot-assistant-message');
    if (!messageEl) return;

    // If already shown, allow updating message and refreshing timeout.
    if (this.shown && !message) {
      return;
    }
    
    // Use provided message or get next from rotation
    if (message) {
      messageEl.textContent = message;
    } else {
      messageEl.textContent = this.messages[this.messageIndex % this.messages.length];
      this.messageIndex++;
    }
    
    botEl.style.display = 'block';
    botEl.classList.remove('closing');
    this.shown = true;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    // Auto-hide after 25 seconds
    this.hideTimer = setTimeout(() => {
      if (this.shown) {
        this.hide();
      }
    }, 25000);
  }

  hide() {
    const botEl = document.getElementById('bot-assistant');
    if (!botEl) return;

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    botEl.classList.add('closing');
    
    setTimeout(() => {
      botEl.style.display = 'none';
      botEl.classList.remove('closing');
      this.shown = false;
    }, 300); // Match animation duration
  }
}
