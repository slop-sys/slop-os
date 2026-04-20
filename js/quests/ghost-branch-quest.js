/**
 * Ghost Branch 847 quest manager.
 * Terminal-first hunt with cross-site clue markers and one repository-sourced fragment.
 */

export class GhostBranchQuest {
  constructor(options = {}) {
    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};
    this.showBotAssistant = typeof options.showBotAssistant === 'function' ? options.showBotAssistant : () => {};

    this.state = {
      started: localStorage.getItem('ghost847Started') === 'true',
      stage: parseInt(localStorage.getItem('ghost847Stage') || '0', 10),
      foundSites: JSON.parse(localStorage.getItem('ghost847FoundSites') || '[]'),
      recoveredFragments: JSON.parse(localStorage.getItem('ghost847Fragments') || '[]'),
      repoRecovered: localStorage.getItem('ghost847RepoRecovered') === 'true',
      completed: localStorage.getItem('ghost847Completed') === 'true'
    };

    this.nodes = [
      { siteId: 'slopnews', label: 'wire desk memo tail', fragment: 'd34db33f' },
      { siteId: 'slopchan', label: 'catalog residue header', fragment: '847a11ce' },
      { siteId: 'wikislop', label: 'citation buffer footer', fragment: 'f00dbabe' },
      { siteId: 'uncsslop', label: 'retro banner checksum', fragment: 'c0defade' }
    ];

    this.repoSearchKey = 'GB847_REPO_FRAGMENT';
    this.repoFragmentEncoded = [111, 114, 112, 104, 52, 110, 52, 55];
  }

  registerTerminalCommands(terminal) {
    if (!terminal || typeof terminal.registerCommand !== 'function') return;

    terminal.registerCommand(['ghost847'], (ctx) => this.cmdGhost847(ctx));
    terminal.registerCommand(['branchlog'], (ctx) => this.cmdBranchLog(ctx));
    terminal.registerCommand(['branchtrace'], (ctx) => this.cmdBranchTrace(ctx));
    terminal.registerCommand(['commit847'], (ctx) => this.cmdCommit847(ctx));
    terminal.registerCommand(['merge847'], (ctx) => this.cmdMerge847(ctx));
    terminal.registerCommand(['ghost847reset'], (ctx) => this.cmdGhost847Reset(ctx));
  }

  saveState() {
    localStorage.setItem('ghost847Started', String(this.state.started));
    localStorage.setItem('ghost847Stage', String(this.state.stage));
    localStorage.setItem('ghost847FoundSites', JSON.stringify(this.state.foundSites));
    localStorage.setItem('ghost847Fragments', JSON.stringify(this.state.recoveredFragments));
    localStorage.setItem('ghost847RepoRecovered', String(this.state.repoRecovered));
    localStorage.setItem('ghost847Completed', String(this.state.completed));
  }

  getRepoFragment() {
    return this.repoFragmentEncoded.map((code) => String.fromCharCode(code)).join('');
  }

  getGhostHash() {
    const siteFragments = this.nodes.map((node) => node.fragment).join('');
    return `${siteFragments}${this.getRepoFragment()}`;
  }

  getTotalFragmentCount() {
    return this.nodes.length + 1;
  }

  getRecoveredFragmentCount() {
    return this.state.recoveredFragments.length + (this.state.repoRecovered ? 1 : 0);
  }

  cmdGhost847({ terminal }) {
    terminal.terminalPrint('=== GHOST BRANCH 847 ===');
    terminal.terminalPrint('');

    if (!this.state.started) {
      this.state.started = true;
      this.state.stage = 0;
      this.saveState();

      terminal.terminalPrint('Detached branch signature detected in historical index.');
      terminal.terminalPrint('No parent commit, no merge record, no approved maintainer.');
      terminal.terminalPrint('');
      terminal.terminalPrint('Protocol initialized. Run branchlog to receive active hunt target.');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint(`Fragments recovered: ${this.getRecoveredFragmentCount()}/${this.getTotalFragmentCount()}`);
    terminal.terminalPrint(`Stage pointer: ${Math.min(this.state.stage + 1, this.getTotalFragmentCount())}/${this.getTotalFragmentCount()}`);
    terminal.terminalPrint(this.state.completed ? 'Status: COMPLETE' : 'Status: ACTIVE');
    terminal.terminalPrint('Run branchlog for next objective, branchtrace for forensic view.');
    terminal.terminalPrint('');
  }

  cmdBranchLog({ terminal }) {
    if (!this.state.started) {
      terminal.terminalPrint('No Ghost Branch session. Run ghost847 first.');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint('--- BRANCHLOG // ORPHANED HISTORY CHANNEL ---');

    if (this.state.completed) {
      terminal.terminalPrint('Merge completed. Ghost branch folded into known timeline.');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.stage < this.nodes.length) {
      const node = this.nodes[this.state.stage];
      terminal.terminalPrint(`Active target: ${node.siteId.toUpperCase()}`);
      terminal.terminalPrint(`Needle: ${node.label}`);
      terminal.terminalPrint('Directive: browse the site and click the faint [GB847] marker once found.');
      terminal.terminalPrint('');
      return;
    }

    if (!this.state.repoRecovered) {
      terminal.terminalPrint('Final fragment not present in rendered pages.');
      terminal.terminalPrint(`Repository directive: search for ${this.repoSearchKey} in source.`);
      terminal.terminalPrint('Submit with: commit847 <fragment>');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint('All fragments recovered.');
    terminal.terminalPrint('Assemble candidate hash and run: merge847 <full_hash>');
    terminal.terminalPrint('');
  }

  cmdBranchTrace({ terminal }) {
    if (!this.state.started) {
      terminal.terminalPrint('No Ghost Branch session. Run ghost847 first.');
      terminal.terminalPrint('');
      return;
    }

    terminal.terminalPrint('=== GHOST BRANCH FORENSICS ===');
    terminal.terminalPrint('');

    this.nodes.forEach((node, index) => {
      const found = this.state.foundSites.includes(node.siteId);
      terminal.terminalPrint(`${String(index + 1).padStart(2, '0')}. ${node.siteId.toUpperCase()} :: ${found ? node.fragment : '????????'}`);
    });

    terminal.terminalPrint(`${String(this.nodes.length + 1).padStart(2, '0')}. REPO :: ${this.state.repoRecovered ? this.getRepoFragment() : '????????'}`);
    terminal.terminalPrint('');
    terminal.terminalPrint(`Recovered: ${this.getRecoveredFragmentCount()}/${this.getTotalFragmentCount()}`);
    terminal.terminalPrint('');
  }

  cmdCommit847({ terminal, rawArgs }) {
    if (!this.state.started) {
      terminal.terminalPrint('No Ghost Branch session. Run ghost847 first.');
      terminal.terminalPrint('');
      return;
    }

    const candidate = (rawArgs || []).join('').trim().toLowerCase();
    if (!candidate) {
      terminal.terminalPrint('Usage: commit847 <fragment>');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.repoRecovered) {
      terminal.terminalPrint('Repository fragment already committed.');
      terminal.terminalPrint('');
      return;
    }

    if (this.state.stage < this.nodes.length) {
      terminal.terminalPrint('Repository channel still locked. Recover all site fragments first.');
      terminal.terminalPrint('Run branchlog for active target.');
      terminal.terminalPrint('');
      return;
    }

    if (candidate !== this.getRepoFragment()) {
      terminal.terminalPrint('Commit rejected: fragment mismatch.');
      terminal.terminalPrint('');
      return;
    }

    this.state.repoRecovered = true;
    this.state.stage = this.nodes.length + 1;
    this.saveState();

    terminal.terminalPrint('Repository fragment accepted.');
    terminal.terminalPrint('Run merge847 <full_hash> when ready.');
    terminal.terminalPrint('');

    this.showBotAssistant('repo fragment verified. the orphaned branch now has a merge candidate.');
  }

  cmdMerge847({ terminal, rawArgs }) {
    if (!this.state.started) {
      terminal.terminalPrint('No Ghost Branch session. Run ghost847 first.');
      terminal.terminalPrint('');
      return;
    }

    const candidate = (rawArgs || []).join('').trim().toLowerCase();
    if (!candidate) {
      terminal.terminalPrint('Usage: merge847 <full_hash>');
      terminal.terminalPrint('');
      return;
    }

    if (this.getRecoveredFragmentCount() < this.getTotalFragmentCount()) {
      terminal.terminalPrint(`Insufficient fragments. ${this.getRecoveredFragmentCount()}/${this.getTotalFragmentCount()} recovered.`);
      terminal.terminalPrint('Run branchtrace to inspect missing segments.');
      terminal.terminalPrint('');
      return;
    }

    if (candidate !== this.getGhostHash()) {
      terminal.terminalPrint('MERGE CONFLICT: hash lineage invalid.');
      terminal.terminalPrint('');
      return;
    }

    this.state.completed = true;
    this.saveState();

    terminal.terminalPrint('MERGE SUCCESSFUL');
    terminal.terminalPrint('Ghost Branch 847 integrated into canonical history.');
    terminal.terminalPrint('Outcome: anomaly persisted by design, not accident.');
    terminal.terminalPrint('');

    this.showBotAssistant('ghost branch merged. turns out the system remembered more than it admitted.');
  }

  cmdGhost847Reset({ terminal }) {
    this.state.started = false;
    this.state.stage = 0;
    this.state.foundSites = [];
    this.state.recoveredFragments = [];
    this.state.repoRecovered = false;
    this.state.completed = false;
    this.saveState();

    terminal.terminalPrint('Ghost Branch 847 state reset.');
    terminal.terminalPrint('Run ghost847 to begin again.');
    terminal.terminalPrint('');
  }

  getNodeIndex(siteId) {
    return this.nodes.findIndex((node) => node.siteId === siteId);
  }

  handleSiteRender(siteId, pageEl) {
    if (!siteId || !pageEl) return;

    const nodeIndex = this.getNodeIndex(siteId);
    if (nodeIndex === -1) return;

    if (pageEl.querySelector(`[data-ghost847-marker="${siteId}"]`)) return;

    const marker = document.createElement('p');
    marker.dataset.ghost847Marker = siteId;
    marker.style.margin = '8px';
    marker.style.fontFamily = 'Courier New, monospace';
    marker.style.fontSize = '8px';
    marker.style.color = '#666';
    marker.style.userSelect = 'none';
    marker.style.cursor = 'pointer';

    marker.textContent = this.getMarkerText(siteId, nodeIndex);

    marker.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.playClickSound();
      this.collectSiteFragment(siteId, nodeIndex, marker);
    });

    pageEl.appendChild(marker);
  }

  getMarkerText(siteId, nodeIndex) {
    if (this.state.foundSites.includes(siteId)) {
      return `[GB847_FRAGMENT:${this.nodes[nodeIndex].fragment}]`;
    }

    if (!this.state.started) {
      return '[GB847_MARKER_LOCKED: RUN GHOST847]';
    }

    if (nodeIndex > this.state.stage) {
      return '[GB847_MARKER_LOCKED: CHRONOLOGY MISMATCH]';
    }

    return '[GB847_MARKER_ACTIVE: CLICK TO EXTRACT]';
  }

  collectSiteFragment(siteId, nodeIndex, markerEl) {
    if (!this.state.started) {
      this.showBotAssistant('ghost branch channel is closed. open terminal and run ghost847 first.');
      return;
    }

    if (nodeIndex > this.state.stage) {
      this.showBotAssistant('timeline divergence detected. recover earlier ghost fragments first.');
      return;
    }

    if (this.state.foundSites.includes(siteId)) {
      this.showBotAssistant('fragment already recovered from this node.');
      return;
    }

    const node = this.nodes[nodeIndex];
    this.state.foundSites.push(siteId);
    this.state.recoveredFragments.push(node.fragment);
    this.state.stage = Math.max(this.state.stage, nodeIndex + 1);
    this.saveState();

    if (markerEl) {
      markerEl.textContent = `[GB847_FRAGMENT:${node.fragment}]`;
    }

    this.showBotAssistant(`ghost fragment recovered from ${siteId}: ${node.fragment}`);

    if (this.state.stage === this.nodes.length && !this.state.repoRecovered) {
      this.showBotAssistant(`site fragments complete. repository clue unlocked: search source for ${this.repoSearchKey}.`);
    }
  }
}

// Search this literal in repository source during the quest:
// GB847_REPO_FRAGMENT
