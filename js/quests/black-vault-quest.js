/**
 * Black Vault Protocol quest manager.
 * Keeps quest state, CA obfuscation, clue flow, and shard collection logic modular.
 */

export class BlackVaultQuest {
  constructor(options = {}) {
    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};
    this.showBotAssistant = typeof options.showBotAssistant === 'function' ? options.showBotAssistant : () => {};

    this.state = {
      started: localStorage.getItem('blackVaultStarted') === 'true',
      stage: parseInt(localStorage.getItem('blackVaultStage') || '0', 10),
      cluesUnlocked: JSON.parse(localStorage.getItem('blackVaultClues') || '[]'),
      shardsFound: JSON.parse(localStorage.getItem('blackVaultShards') || '[]'),
      completed: localStorage.getItem('blackVaultCompleted') === 'true'
    };

    this.crypto = {
      seed: [91, 17, 203, 44, 159, 72, 11, 250],
      payload: [124, 26, 122, 10, 46, 37, 21, 25, 195, 5, 125, 28, 78, 144, 10, 141, 192, 60, 108, 41, 180, 158, 248, 193, 58, 53, 30, 175, 181, 116, 129, 8, 198, 121, 233, 171, 122, 111, 133, 152, 139, 250, 210, 90]
    };

    this.stages = [
      { siteId: 'aigallery', requirement: 'Run generations and metrics.' },
      { siteId: 'promptkingdom', requirement: 'Run loop and awareness.' },
      { siteId: 'contentfarm', requirement: 'Run baseline and analyze.' },
      { siteId: 'webring', requirement: 'Run status and generic.' },
      { siteId: 'slophub', requirement: 'Run wisdom and nothing twice.' },
      { siteId: 'slopnews', requirement: 'Run void and meditate.' },
      { siteId: 'wikislop', requirement: 'Run deploy and secrets.' },
      { siteId: 'slopmaxxing', requirement: 'Run honest and slop.' },
      { siteId: 'slopchan', requirement: 'Collect 6+ evidence files.' },
      { siteId: 'slopscope', requirement: 'Run help, progress, and evidence.' }
    ];

    this.siteUrls = {
      aigallery: 'slop://aigallery',
      promptkingdom: 'slop://promptkingdom',
      contentfarm: 'slop://contentfarm',
      webring: 'slop://webring',
      slophub: 'slop://slophub',
      slopnews: 'slop://slopnews',
      wikislop: 'slop://wikislop',
      slopmaxxing: 'slop://slopmaxxing',
      slopchan: 'slop://slopchan',
      slopscope: 'slop://slopscope'
    };
  }

  registerTerminalCommands(terminal) {
    if (!terminal || typeof terminal.registerCommand !== 'function') return;

    terminal.registerCommand(['blackvault'], (ctx) => this.cmdBlackVault(ctx));
    terminal.registerCommand(['cipher'], (ctx) => this.cmdCipher(ctx));
    terminal.registerCommand(['shards'], (ctx) => this.cmdShards(ctx));
    terminal.registerCommand(['assemble'], (ctx) => this.cmdAssemble(ctx));
    terminal.registerCommand(['caverify'], (ctx) => this.cmdCaVerify(ctx));
    terminal.registerCommand(['blackvaultreset'], (ctx) => this.cmdBlackVaultReset(ctx));
  }

  saveState() {
    localStorage.setItem('blackVaultStarted', String(this.state.started));
    localStorage.setItem('blackVaultStage', String(this.state.stage));
    localStorage.setItem('blackVaultClues', JSON.stringify(this.state.cluesUnlocked));
    localStorage.setItem('blackVaultShards', JSON.stringify(this.state.shardsFound));
    localStorage.setItem('blackVaultCompleted', String(this.state.completed));
  }

  getBlackVaultAddress() {
    return this.crypto.payload.map((value, i) => {
      const key = (this.crypto.seed[i % this.crypto.seed.length] ^ ((i * 73 + 41) & 255) ^ (((i + 3) * 19) & 255)) & 255;
      return String.fromCharCode(value ^ key);
    }).join('');
  }

  getBlackVaultShards() {
    const value = this.getBlackVaultAddress();
    const shardCount = this.stages.length;
    const baseSize = Math.floor(value.length / shardCount);
    const remainder = value.length % shardCount;

    const shards = [];
    let cursor = 0;
    for (let i = 0; i < shardCount; i++) {
      const size = baseSize + (i < remainder ? 1 : 0);
      shards.push(value.slice(cursor, cursor + size));
      cursor += size;
    }
    return shards;
  }

  getChallengeStatus(stageIndex, terminalState) {
    const usage = (terminalState && terminalState.commandUsage) || {};
    const evidenceCount = Array.isArray(terminalState?.evidenceFound) ? terminalState.evidenceFound.length : 0;

    switch (stageIndex) {
      case 0:
        return (usage.generations || usage.gen || 0) >= 1 && (usage.metrics || 0) >= 1;
      case 1:
        return (usage.loop || 0) >= 1 && (usage.awareness || usage.aware || 0) >= 1;
      case 2:
        return (usage.baseline || 0) >= 1 && (usage.analyze || usage.analysis || 0) >= 1;
      case 3:
        return (usage.status || 0) >= 1 && (usage.generic || 0) >= 1;
      case 4:
        return (usage.wisdom || 0) >= 1 && (usage.nothing || 0) >= 2;
      case 5:
        return (usage.void || 0) >= 1 && (usage.meditate || 0) >= 1;
      case 6:
        return (usage.deploy || 0) >= 1 && (usage.secrets || 0) >= 1;
      case 7:
        return (usage.honest || usage.honesty || 0) >= 1 && (usage.slop || 0) >= 1;
      case 8:
        return evidenceCount >= 6;
      case 9:
        return (usage.help || 0) >= 1 && (usage.progress || 0) >= 1 && (usage.evidence || 0) >= 1;
      default:
        return false;
    }
  }

  cmdBlackVault({ terminal }) {
    terminal.terminalPrint('=== BLACK VAULT PROTOCOL ===');
    terminal.terminalPrint('');

    if (!this.state.started) {
      this.state.started = true;
      this.state.stage = 0;
      this.saveState();
      terminal.terminalPrint('Protocol initialized. Deep archive lock engaged.');
      terminal.terminalPrint('Run terminal challenges, unlock ciphers, recover distributed shards.');
      terminal.terminalPrint('');
    }

    const progress = `${this.state.shardsFound.length}/${this.stages.length}`;
    terminal.terminalPrint(`Shards recovered: ${progress}`);

    if (this.state.completed) {
      terminal.terminalPrint('Status: COMPLETE');
      terminal.terminalPrint('Recovered CA already validated.');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.stage < this.stages.length) {
      const stageNumber = this.state.stage + 1;
      const currentStage = this.stages[this.state.stage];
      terminal.terminalPrint(`Current stage: ${stageNumber}/${this.stages.length}`);
      terminal.terminalPrint(`Challenge: ${currentStage.requirement}`);
      terminal.terminalPrint('Next step: run cipher after challenge completion.');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint('All clues unlocked. Recover any missing shard markers from slop:// sites.');
    terminal.terminalPrint('Then run assemble <full_ca>.');
    terminal.terminalPrint('');
  }

  cmdCipher({ terminal }) {
    if (!this.state.started) {
      terminal.terminalPrint('Black Vault protocol not initialized. Run blackvault first.');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.completed) {
      terminal.terminalPrint('Cipher bank already exhausted. Protocol complete.');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.stage >= this.stages.length) {
      terminal.terminalPrint('All ciphers already unlocked. Collect remaining shards and run assemble <full_ca>.');
      terminal.terminalPrint('');
      return;
    }

    const stageIndex = this.state.stage;
    const stage = this.stages[stageIndex];

    if (stageIndex > 0) {
      const previousSite = this.stages[stageIndex - 1].siteId;
      if (!this.state.shardsFound.includes(previousSite)) {
        terminal.terminalPrint('Previous shard not recovered.');
        terminal.terminalPrint(`Visit ${this.siteUrls[previousSite]} and collect shard ${stageIndex}/${this.stages.length}.`);
        terminal.terminalPrint('');
        return;
      }
    }

    const passed = this.getChallengeStatus(stageIndex, terminal.state);
    if (!passed) {
      terminal.terminalPrint('Cipher rejected. Challenge requirements incomplete.');
      terminal.terminalPrint(`Stage ${stageIndex + 1} requirement: ${stage.requirement}`);
      terminal.terminalPrint('');
      return;
    }

    if (!this.state.cluesUnlocked.includes(stage.siteId)) {
      this.state.cluesUnlocked.push(stage.siteId);
    }
    this.state.stage += 1;
    this.saveState();

    terminal.terminalPrint('[CIPHER DECRYPTED]');
    terminal.terminalPrint(`Clue unlocked: ${this.siteUrls[stage.siteId]}`);
    terminal.terminalPrint('Find the hidden cache marker and extract the shard.');
    terminal.terminalPrint('');
  }

  cmdShards({ terminal }) {
    if (!this.state.started) {
      terminal.terminalPrint('No Black Vault session found. Run blackvault first.');
      terminal.terminalPrint('');
      return;
    }

    const shards = this.getBlackVaultShards();
    terminal.terminalPrint('=== SHARD RECONSTRUCTION VIEW ===');
    terminal.terminalPrint('');

    this.stages.forEach((stage, index) => {
      const found = this.state.shardsFound.includes(stage.siteId);
      const value = found ? shards[index] : '????';
      terminal.terminalPrint(`${String(index + 1).padStart(2, '0')}. ${stage.siteId.toUpperCase()} :: ${value}`);
    });

    terminal.terminalPrint('');
    terminal.terminalPrint(`Recovered ${this.state.shardsFound.length}/${this.stages.length}`);
    terminal.terminalPrint('');
  }

  cmdAssemble({ terminal, rawArgs }) {
    if (!this.state.started) {
      terminal.terminalPrint('No active Black Vault session. Run blackvault first.');
      terminal.terminalPrint('');
      return;
    }

    const candidate = (rawArgs || []).join(' ').trim();
    if (!candidate) {
      terminal.terminalPrint('Usage: assemble <full_ca>');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.shardsFound.length < this.stages.length) {
      terminal.terminalPrint(`Insufficient shards. Recovered ${this.state.shardsFound.length}/${this.stages.length}.`);
      terminal.terminalPrint('Run shards to view missing entries.');
      terminal.terminalPrint('');
      return;
    }

    if (candidate === this.getBlackVaultAddress()) {
      this.state.completed = true;
      this.saveState();
      terminal.terminalPrint('BLACK VAULT VERIFIED');
      terminal.terminalPrint('Contract address assembly confirmed.');
      terminal.terminalPrint('Protocol state: COMPLETE');
      terminal.terminalPrint('');
      this.showBotAssistant('black vault integrity check passed. you rebuilt the ca from fragmented slop memory.');
      return;
    }

    terminal.terminalPrint('Assembly mismatch. Candidate rejected.');
    terminal.terminalPrint('');
  }

  cmdCaVerify({ terminal, rawArgs }) {
    const candidate = (rawArgs || []).join(' ').trim();
    if (!candidate) {
      terminal.terminalPrint('Usage: caverify <full_ca>');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint(candidate === this.getBlackVaultAddress() ? 'VALID' : 'INVALID');
    terminal.terminalPrint('');
  }

  cmdBlackVaultReset({ terminal }) {
    this.state.started = false;
    this.state.stage = 0;
    this.state.cluesUnlocked = [];
    this.state.shardsFound = [];
    this.state.completed = false;
    this.saveState();
    terminal.terminalPrint('Black Vault state reset.');
    terminal.terminalPrint('Run blackvault to start again.');
    terminal.terminalPrint('');
  }

  getStageBySite(siteId) {
    return this.stages.findIndex((entry) => entry.siteId === siteId);
  }

  isClueUnlocked(siteId) {
    return this.state.cluesUnlocked.includes(siteId);
  }

  addShardMarker(siteId, pageEl) {
    if (!pageEl) return;
    if (pageEl.querySelector(`[data-blackvault-marker="${siteId}"]`)) return;

    const marker = document.createElement('p');
    marker.dataset.blackvaultMarker = siteId;
    marker.style.margin = '10px 8px 0 8px';
    marker.style.fontFamily = 'Courier New, monospace';
    marker.style.fontSize = '8px';
    marker.style.color = '#666';
    marker.style.userSelect = 'none';
    marker.style.cursor = 'pointer';
    marker.textContent = '[CACHE_PTR_ERR: SEGMENT_REF_PENDING | REQUIRES_CIPHER]';

    marker.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.playClickSound();
      this.collectShard(siteId);
    });

    pageEl.appendChild(marker);
  }

  handleSiteRender(siteId, pageEl) {
    if (!siteId || !pageEl) return;
    if (this.getStageBySite(siteId) === -1) return;
    this.addShardMarker(siteId, pageEl);
  }

  collectShard(siteId) {
    const stageIndex = this.getStageBySite(siteId);
    if (stageIndex === -1) return false;

    if (!this.state.started) {
      this.showBotAssistant('black vault cache locked. run blackvault in terminal first.');
      return false;
    }

    if (!this.isClueUnlocked(siteId)) {
      this.showBotAssistant('cache pointer unresolved. decrypt the stage cipher before extraction.');
      return false;
    }

    if (this.state.shardsFound.includes(siteId)) {
      this.showBotAssistant('shard already extracted from this node.');
      return false;
    }

    const shards = this.getBlackVaultShards();
    const value = shards[stageIndex];
    this.state.shardsFound.push(siteId);
    this.saveState();

    this.showBotAssistant(`shard ${stageIndex + 1}/${this.stages.length} recovered: ${value}`);

    if (this.state.shardsFound.length === this.stages.length) {
      this.showBotAssistant('all black vault shards collected. run assemble <full_ca>.');
    }

    return true;
  }
}
