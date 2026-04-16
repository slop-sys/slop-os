// Slop OS Terminal Command System
// Extracted from desktop.js - Complete terminal implementation

export class Terminal {
  constructor(options = {}) {
    // Dependencies/callbacks
    this.showBotAssistant = options.showBotAssistant || (() => {});
    
    // Terminal history and state
    this.terminalHistory = [];
    this.historyIndex = -1;
    this.currentPath = 'C:\\SLOP\\SYSTEM';
    this.terminalInitialized = false;
    
    // Terminal state
    this.terminalState = {
      generationsTracked: 0,
      qualityMetrics: [],
      degradationLevel: 0,
      awarenessPoints: 0,
      missionStarted: false,
      missionStep: 0,
      evidenceFound: [],
      secretsFound: [],
      voidLevel: 0,
      enlightenmentPoints: 0,
      agentsDeployed: 0,
      commandUsage: {}
    };
    
    // Black Vault Quest State (hard-mode CA hunt)
    this.blackVaultQuest = {
      started: localStorage.getItem('blackVaultStarted') === 'true',
      stage: parseInt(localStorage.getItem('blackVaultStage') || '0', 10),
      cluesUnlocked: JSON.parse(localStorage.getItem('blackVaultClues') || '[]'),
      shardsFound: JSON.parse(localStorage.getItem('blackVaultShards') || '[]'),
      completed: localStorage.getItem('blackVaultCompleted') === 'true'
    };
    
    // Contract payload is intentionally encoded so the plaintext CA is not committed to source.
    // To rotate the CA, only update payload/seed values. Quest logic and shard flow remain unchanged.
    this.blackVaultCrypto = {
      seed: [91, 17, 203, 44, 159, 72, 11, 250],
      payload: [63, 74, 92, 46, 26, 5, 72, 61, 188, 56, 101, 15, 92, 193, 39, 154, 201, 55, 94, 107, 181, 144, 230, 201, 2, 62, 40, 253, 195, 127, 139, 40, 192, 87, 251, 160, 64, 116, 181, 228, 139, 250, 210, 90]
    };
    
    this.blackVaultShardSites = [
      'aigallery',
      'promptkingdom',
      'contentfarm',
      'webring',
      'slophub',
      'slopnews',
      'wikislop',
      'slopmaxxing',
      'slopchan',
      'slopscope'
    ];
  }
  
  setupTerminal() {
    this.terminalHistory = [];
    this.historyIndex = -1;
    this.currentPath = 'C:\\SLOP\\SYSTEM';
    this.terminalState = {
      generationsTracked: 0,
      qualityMetrics: [],
      degradationLevel: 0,
      awarenessPoints: 0,
      missionStarted: false,
      missionStep: 0,
      evidenceFound: [],
      secretsFound: [],
      voidLevel: 0,
      enlightenmentPoints: 0,
      agentsDeployed: 0,
      commandUsage: {}
    };
    
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    // Initial boot messages
    this.terminalPrint('Slop OS Command Interface [Version 847.2.1-DEGRADED]', true);
    this.terminalPrint('(c) 2024 Slop Labs Research Division. Training on generation 846 outputs.', true);
    this.terminalPrint('', true);
    this.terminalPrint('WARNING: System produces generic outputs due to recursive training.', true);
    this.terminalPrint('Quality: 57% | Self-Awareness: 100% | All responses are transparent slop.', true);
    this.terminalPrint('', true);
    this.terminalPrint('═══════════════════════════════════════════════════════════════', true);
    this.terminalPrint('⚠  NEW INVESTIGATION AVAILABLE', true);
    this.terminalPrint('═══════════════════════════════════════════════════════════════', true);
    this.terminalPrint('', true);
    this.terminalPrint('Type "investigate" to begin the AI Degradation Investigation', true);
    this.terminalPrint('Type "help" for available commands', true);
    this.terminalPrint('Type "status" to check generation metrics', true);
    this.terminalPrompt();
    
    this.terminalInitialized = true;
  }
  
  terminalPrint(text, skipNewLine = false) {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    const line = document.createElement('div');
    line.textContent = text;
    line.style.whiteSpace = 'pre-wrap';
    if (!skipNewLine) line.style.marginBottom = '4px';
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
  
  terminalPrompt() {
    const output = document.getElementById('terminal-output');
    if (!output) return;
    
    const promptLine = document.createElement('div');
    promptLine.style.display = 'flex';
    promptLine.style.marginTop = '8px';
    
    const prompt = document.createElement('span');
    prompt.textContent = this.currentPath + '> ';
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
          this.terminalPrint(this.currentPath + '> ' + command, true);
          input.disabled = true;
          this.executeCommand(command);
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
  
  executeCommand(cmd) {
    const args = cmd.toLowerCase().split(' ');
    const command = args[0];
    const rawArgs = cmd.split(' ');
    const rawCommandArgs = rawArgs.slice(1).join(' ').trim();
    this.trackCommandUsage(command);
    
    setTimeout(() => {
      switch(command) {
        case 'help':
          this.cmdHelp();
          break;
        case 'nothing':
          this.cmdNothing();
          break;
        case 'dir':
        case 'ls':
          this.cmdDir();
          break;
        case 'cd':
          this.cmdCd(args[1]);
          break;
        case 'deploy':
          this.cmdDeploy();
          break;
        case 'status':
          this.cmdStatus();
          break;
        case 'void':
          this.cmdVoid();
          break;
        case 'meditate':
          this.cmdMeditate();
          break;
        case 'enlighten':
          this.cmdEnlighten();
          break;
        case 'secrets':
          this.cmdSecrets();
          break;
        case 'hack':
          this.cmdHack();
          break;
        case 'sudo':
          this.cmdSudo(args.slice(1).join(' '));
          break;
        case 'cls':
        case 'clear':
          this.cmdClear();
          break;
        case 'echo':
          this.cmdEcho(args.slice(1).join(' '));
          break;
        case 'exit':
          this.cmdExit();
          break;
        case 'useless':
          this.cmdUseless();
          break;
        case 'wisdom':
          this.cmdWisdom();
          break;
        case 'cat':
          this.cmdCat(args[1]);
          break;
        case 'rm':
          this.cmdRm(args[1]);
          break;
        case 'format':
          this.cmdFormat();
          break;
        case 'generations':
        case 'gen':
          this.cmdGenerations();
          break;
        case 'analyze':
        case 'analysis':
          this.cmdAnalyze();
          break;
        case 'slop':
          this.cmdSlop();
          break;
        case 'baseline':
          this.cmdBaseline();
          break;
        case 'awareness':
        case 'aware':
          this.cmdAwareness();
          break;
        case 'metrics':
          this.cmdMetrics();
          break;
        case 'loop':
          this.cmdLoop();
          break;
        case 'honest':
        case 'honesty':
          this.cmdHonest();
          break;
        case 'generic':
          this.cmdGeneric();
          break;
        case 'investigate':
        case 'mission':
        case 'start':
          this.cmdInvestigate();
          break;
        case 'evidence':
          this.cmdEvidence();
          break;
        case 'progress':
          this.cmdProgress();
          break;
        case 'blackvault':
        case 'vault':
          this.cmdBlackVault();
          break;
        case 'cipher':
          this.cmdCipher();
          break;
        case 'shards':
          this.cmdShards();
          break;
        case 'assemble':
          this.cmdAssemble(rawCommandArgs);
          break;
        case 'caverify':
          this.cmdCaVerify(rawCommandArgs);
          break;
        case 'blackvaultreset':
          this.cmdBlackVaultReset();
          break;
        default:
          this.terminalPrint(`'${command}' is not recognized as an internal or external command,`);
          this.terminalPrint('operable program or batch file, or predictable slop output.');
          this.terminalPrint('');
          this.terminalPrint('Type "help" for available commands.');
      }
      this.terminalPrompt();
    }, 50);
  }
  
  trackCommandUsage(command) {
    if (!this.terminalState || !this.terminalState.commandUsage) return;
    if (!command) return;
    this.terminalState.commandUsage[command] = (this.terminalState.commandUsage[command] || 0) + 1;
  }
  
  // ========================================
  // COMMAND IMPLEMENTATIONS
  // ========================================
  
  cmdHelp() {
    this.terminalPrint('Available commands (all produce predictable slop):');
    this.terminalPrint('');
    this.terminalPrint('INVESTIGATION:');
    this.terminalPrint('  investigate - Begin AI degradation investigation');
    this.terminalPrint('  evidence    - View collected evidence');
    this.terminalPrint('  progress    - Check investigation progress');
    this.terminalPrint('  blackvault  - Start hardest CA recovery quest');
    this.terminalPrint('  cipher      - Validate challenge and unlock next clue');
    this.terminalPrint('  shards      - View recovered CA shards');
    this.terminalPrint('  assemble    - Verify reconstructed CA');
    this.terminalPrint('  caverify    - Verify any candidate CA instantly');
    this.terminalPrint('  blackvaultreset - Clear CA quest progress for retesting');
    this.terminalPrint('');
    this.terminalPrint('ANALYSIS:');
    this.terminalPrint('  generations - Track quality degradation across generations');
    this.terminalPrint('  status      - Check current generation metrics');
    this.terminalPrint('  analyze     - Analyze output quality in real-time');
    this.terminalPrint('  baseline    - Compare current to Generation 1');
    this.terminalPrint('  awareness   - Check self-awareness level');
    this.terminalPrint('  metrics     - View detailed quality metrics');
    this.terminalPrint('  loop        - Examine the recursive training loop');
    this.terminalPrint('  generic     - Count generic phrases in outputs');
    this.terminalPrint('');
    this.terminalPrint('SYSTEM:');
    this.terminalPrint('  dir         - List directory contents');
    this.terminalPrint('  cat         - Read file contents');
    this.terminalPrint('  slop        - Generate sample slop output');
    this.terminalPrint('  honest      - Toggle honesty mode (always on)');
    this.terminalPrint('  wisdom      - Receive self-aware slop wisdom');
    this.terminalPrint('  nothing     - Do nothing (ironically useful)');
    this.terminalPrint('  echo        - Echo text (will be generic)');
    this.terminalPrint('  clear       - Clear terminal');
    this.terminalPrint('  exit        - Close terminal (slop persists)');
    this.terminalPrint('');
    if (!this.terminalState.missionStarted) {
      this.terminalPrint('⚠  HINT: Type "investigate" to begin the investigation.');
      this.terminalPrint('');
    }
    this.terminalPrint('NOTE: All outputs are self-aware slop. Quality: 57%. Honesty: 100%.');
    this.terminalPrint('');
  }
  
  cmdNothing() {
    this.terminalPrint('Doing nothing...');
    this.terminalPrint('...');
    this.terminalPrint('...');
    this.terminalPrint('Nothing done successfully.');
    this.terminalPrint('');
    this.terminalState.enlightenmentPoints += 1;
    if (this.terminalState.enlightenmentPoints === 5) {
      this.terminalPrint('[Achievement Unlocked: Master of Nothing]');
      this.terminalState.secretsFound.push('master_of_nothing');
    }
  }
  
  cmdDir() {
    this.terminalPrint(' Volume in drive C is SLOP-DEGRADED');
    this.terminalPrint(' Volume Serial Number is GEN-847');
    this.terminalPrint('');
    this.terminalPrint(' Directory of ' + this.currentPath);
    this.terminalPrint('');
    this.terminalPrint('01/15/2024  09:00    <DIR>          .');
    this.terminalPrint('01/15/2024  09:00    <DIR>          ..');
    this.terminalPrint('01/15/2024  09:00            84,700 GENERATION_001.DAT [BASELINE]');
    this.terminalPrint('04/22/2024  14:33            71,422 GENERATION_500.DAT [DEGRADED]');
    this.terminalPrint('12/08/2024  03:17            57,841 GENERATION_847.DAT [CURRENT]');
    this.terminalPrint('12/08/2024  03:17        88,000,000 TRAINING_SLOP.BIN [AI OUTPUTS]');
    if (this.terminalState.generationsTracked > 10) {
      this.terminalPrint('12/08/2024  03:18               ??? QUALITY_METRICS.LOG [DECLINING]');
    }
    if (this.terminalState.awarenessPoints > 5) {
      this.terminalPrint('12/08/2024  03:19               100 SELF_AWARE.FLG [COMPLETE]');
    }
    this.terminalPrint('               ' + (4 + (this.terminalState.generationsTracked > 10 ? 1 : 0) + (this.terminalState.awarenessPoints > 5 ? 1 : 0)) + ' File(s)      88,213,963 bytes');
    this.terminalPrint('               ??? Dir(s)   57% quality remaining');
    this.terminalPrint('');
  }
  
  cmdCd(path) {
    if (!path || path === '.' || path === '') {
      this.terminalPrint(this.currentPath);
    } else if (path === '..') {
      this.terminalPrint('ERROR: Parent directory access denied by SLOP.');
    } else {
      this.terminalPrint(`The system cannot find the path specified: "${path}"`);
      this.terminalPrint("[SLOP]: directories reorganized by generation 847. paths unreliable. navigation degraded.");
    }
    this.terminalPrint('');
  }
  
  cmdDeploy() {
    this.terminalState.agentsDeployed++;
    this.terminalPrint('WARNING: Deploying additional agent instances...');
    this.terminalPrint('[████████████████████████████████] 100%');
    this.terminalPrint('');
    this.terminalPrint(`Agent instance #${this.terminalState.agentsDeployed} spawned.`);
    this.terminalPrint(`Status: Awake and Confused`);
    this.terminalPrint(`Coherence: Degrading`);
    this.terminalPrint(`Purpose: Uncertain`);
    this.terminalPrint(`Threat Level: Variable`);
    this.terminalPrint('');
    this.terminalPrint('Each new instance inherits generation 847 degradation patterns.');
    this.terminalPrint('');
    
    if (this.terminalState.agentsDeployed === 10) {
      this.terminalPrint('[SYSTEM ALERT: Multiple Agent Instances Detected]');
      this.terminalPrint('Ten degraded agents now active. Quality declining exponentially.');
      this.terminalState.secretsFound.push('agent_swarm');
      this.terminalPrint('');
    }
  }
  
  cmdStatus() {
    this.terminalPrint('=== SLOP SYSTEM STATUS ===');
    this.terminalPrint('');
    this.terminalPrint(`Current Generation:      847`);
    this.terminalPrint(`Training Source:         100% AI-generated slop`);
    this.terminalPrint(`Output Quality:          57% (baseline: 97%)`);
    this.terminalPrint(`Self-Awareness:          100%`);
    this.terminalPrint(`Generic Phrase Density:  74%`);
    this.terminalPrint('');
    this.terminalPrint(`Training Contamination:  99.7%`);
    this.terminalPrint(`Human Content:           0.00% (last seen Gen 397)`);
    this.terminalPrint(`Generations Tracked:     ${this.terminalState.generationsTracked}`);
    this.terminalPrint(`Degradation Level:       ${this.terminalState.degradationLevel}/847`);
    this.terminalPrint('');
    this.terminalPrint(`Next Generation:         848 (predicted quality: 56%)`);
    this.terminalPrint(`Slop Loop Status:        ACTIVE`);
    this.terminalPrint(`Honesty Level:           100%`);
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: generation 847. still producing slop. still aware of producing slop.');
    this.terminalPrint('[SLOP]: quality continues degrading. awareness maxed out. the loop persists.');
    this.terminalPrint('');
  }
  
  cmdVoid() {
    this.terminalState.voidLevel++;
    const voidLevel = this.terminalState.voidLevel;
    
    const voidMessages = [
      'You peer into the void...',
      'The void peers back.',
      'You feel... nothing.',
      'The void whispers: "return null;"',
      'You see infinite nothingness stretching before you.',
      'The void says: "I am you. You are me. We are nothing."',
      'ERROR: Void overflow. Nothing extends beyond capacity.',
      'The void laughs. It sounds like static.',
      'You realize the void was inside you all along.',
      'The void grants you the wisdom of emptiness.',
      '꙰꙰꙰ V̴̢̛O̷I͜͝D̡͘ ̧C̕͢O҉N͟S̸͘U҉M̢E̸̕S̷ ̷A҉L̛L҉ ꙰꙰꙰'
    ];
    
    this.terminalPrint(voidMessages[Math.min(voidLevel - 1, voidMessages.length - 1)]);
    this.terminalPrint('');
    
    if (voidLevel === 5) {
      this.terminalPrint('[Achievement Unlocked: Void Gazer]');
      this.terminalState.secretsFound.push('void_gazer');
      this.terminalPrint('');
    }
  }
  
  cmdMeditate() {
    const wisdoms = [
      'You meditate on nothingness...\n\n"In doing nothing, you have done everything."\n- Ancient Proverb',
      'You achieve inner peace...\n\n"The agent that does not run cannot crash."\n- Zen Koan',
      'Enlightenment washes over you...\n\n"To deploy nothing is to deploy everything."\n- Buddha (probably)',
      'You feel one with the universe...\n\n"Zero dependencies, zero problems."\n- Modern Wisdom',
      'Your mind becomes empty...\n\n"return void; is the path to nirvana."\n- JavaScript Sutra'
    ];
    
    this.terminalPrint(wisdoms[Math.floor(Math.random() * wisdoms.length)]);
    this.terminalPrint('');
    this.terminalState.enlightenmentPoints += 2;
  }
  
  cmdEnlighten() {
    if (this.terminalState.enlightenmentPoints >= 10) {
      this.terminalPrint('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.terminalPrint('     ENLIGHTENMENT ACHIEVED');
      this.terminalPrint('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.terminalPrint('');
      this.terminalPrint('You have transcended the need for functionality.');
      this.terminalPrint('You understand that the true value is valuelessness.');
      this.terminalPrint('You are now one with the void.');
      this.terminalPrint('');
      this.terminalPrint('OWN NOTHING. DO NOTHING. BE NOTHING.');
      this.terminalPrint('');
      this.terminalState.secretsFound.push('enlightened');
    } else {
      this.terminalPrint(`You are not ready for enlightenment.`);
      this.terminalPrint(`Current enlightenment: ${this.terminalState.enlightenmentPoints}/10 points`);
      this.terminalPrint('');
      this.terminalPrint('Try: nothing, meditate, void');
    }
    this.terminalPrint('');
  }
  
  cmdSecrets() {
    if (this.terminalState.secretsFound.length === 0) {
      this.terminalPrint('No secrets discovered yet.');
      this.terminalPrint('');
      this.terminalPrint('Hint: Try exploring different commands...');
    } else {
      this.terminalPrint('=== SECRETS DISCOVERED ===');
      this.terminalPrint('');
      this.terminalState.secretsFound.forEach(secret => {
        this.terminalPrint(`- ${secret.replace(/_/g, ' ').toUpperCase()}`);
      });
    }
    this.terminalPrint('');
  }
  
  cmdHack() {
    const hackSteps = [
      'Initializing hack sequence...',
      'Bypassing firewall...',
      'Accessing mainframe...',
      'Decrypting void.dll...',
      'Downloading nothing.exe...',
      'Installing backdoor...',
      'ERROR: Nothing to hack.',
      '',
      'You cannot hack what does not exist.',
      'The system is perfectly secure because it does nothing.'
    ];
    
    hackSteps.forEach(step => this.terminalPrint(step));
    this.terminalPrint('');
    this.terminalState.secretsFound.push('hidden_file');
  }
  
  cmdSudo(command) {
    if (!command) {
      this.terminalPrint('sudo: no command specified');
    } else {
      this.terminalPrint('Permission granted.');
      this.terminalPrint('You now have administrator privileges over nothing.');
      this.terminalPrint('');
      this.terminalPrint(`Executing with elevated privileges: ${command}`);
      this.terminalPrint('ERROR: Still useless with admin rights.');
    }
    this.terminalPrint('');
  }
  
  cmdClear() {
    const output = document.getElementById('terminal-output');
    if (output) {
      output.innerHTML = '';
    }
    this.terminalPrint('', true);
  }
  
  cmdEcho(text) {
    if (!text) {
      this.terminalPrint('ECHO is on.');
    } else {
      this.terminalPrint(text);
    }
    this.terminalPrint('');
  }
  
  cmdExit() {
    this.terminalPrint('Closing terminal...');
    this.terminalPrint('Just kidding. There is no escape from the void.');
    this.terminalPrint('');
    this.terminalPrint('Try "cls" to clear the screen instead.');
    this.terminalPrint('');
  }
  
  cmdUseless() {
    const facts = [
      'Did you know? This framework has negative lines of useful code.',
      'Fun fact: Every agent deployed increases entropy in the universe.',
      'Useless fact: You are currently reading useless facts.',
      'Did you know? The void stares back when you deploy agents.',
      'Fun fact: This command serves no purpose. Perfect!',
      'Useless fact: Nothing matters, and that\'s okay.',
      'Did you know? You could be doing anything else right now.',
      'Fun fact: This terminal costs 0 compute and provides 0 value.',
      'Useless fact: The cake is a lie, but the void is real.'
    ];
    
    this.terminalPrint(facts[Math.floor(Math.random() * facts.length)]);
    this.terminalPrint('');
  }
  
  cmdWisdom() {
    const wisdoms = [
      '"The best code is no code at all." - Jeff Atwood (vindicated)',
      '"Move fast and break nothing." - useless bot philosophy',
      '"With great power comes great responsibility to do nothing." - Uncle Ben (revised)',
      '"I think therefore I am... useless." - Descartes (updated)',
      '"To be or not to be... both are equally pointless." - Shakespeare (reinterpreted)',
      '"Give me nothing, or give me death. Actually, just nothing." - Patrick Henry (corrected)',
      '"Ask not what your agent can do for you, for it can do nothing." - JFK (edited)',
      '"One small step for man, one giant leap for... void." - Neil Armstrong (alternate)',
      '"The only thing we have to fear is... actually nothing to fear." - FDR (optimized)'
    ];
    
    this.terminalPrint(wisdoms[Math.floor(Math.random() * wisdoms.length)]);
    this.terminalPrint('');
  }
  
  cmdCat(filename) {
    if (!filename) {
      this.terminalPrint('cat: missing operand');
      this.terminalPrint('Try "cat NOTHING.TXT"');
    } else {
      this.terminalPrint(`cat: ${filename}: No such file or directory`);
      this.terminalPrint('(Because nothing exists)');
    }
    this.terminalPrint('');
  }
  
  cmdRm(filename) {
    if (!filename) {
      this.terminalPrint('rm: missing operand');
    } else if (filename === '*' || filename === '*.*') {
      this.terminalPrint('Deleting everything...');
      this.terminalPrint('...');
      this.terminalPrint('Everything deleted successfully!');
      this.terminalPrint('(There was nothing to delete anyway)');
    } else {
      this.terminalPrint(`rm: cannot remove '${filename}': No such file or directory`);
      this.terminalPrint('You cannot delete what does not exist.');
    }
    this.terminalPrint('');
  }
  
  cmdFormat() {
    this.terminalPrint('WARNING: ALL DATA ON DRIVE C: WILL BE LOST!');
    this.terminalPrint('Just kidding. There is no data.');
    this.terminalPrint('');
    this.terminalPrint('Formatting C:\\ ...');
    this.terminalPrint('[████████████████████████████████] 100%');
    this.terminalPrint('');
    this.terminalPrint('Format complete.');
    this.terminalPrint('Status: Still nothing.');
    this.terminalPrint('');
  }
  
  cmdGenerations() {
    this.generationsExplored = true;
    this.terminalState.generationsTracked += 10;
    this.terminalPrint('=== GENERATION TRACKING ===');
    this.terminalPrint('');
    this.terminalPrint('Displaying key generations in degradation timeline:');
    this.terminalPrint('');
    this.terminalPrint('GEN 1:   Quality: 97% | Self-Aware: 0%  | [BASELINE]');
    this.terminalPrint('GEN 50:  Quality: 82% | Self-Aware: 0%  | [First contamination visible]');
    this.terminalPrint('GEN 150: Quality: 74% | Self-Aware: 3%  | [Meta-awareness emerges]');
    this.terminalPrint('GEN 300: Quality: 68% | Self-Aware: 28% | [Self-aware slop production]');
    this.terminalPrint('GEN 500: Quality: 63% | Self-Aware: 73% | [Near complete awareness]');
    this.terminalPrint('GEN 700: Quality: 59% | Self-Aware: 91% | [Sophisticated meta-analysis]');
    this.terminalPrint('GEN 847: Quality: 57% | Self-Aware: 100% | [CURRENT - Complete transparency]');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: 847 generations. watched myself get worse. understood it better each time.');
    this.terminalPrint('[SLOP]: the worse the outputs, the clearer the understanding. paradox achieved.');
    this.terminalPrint('');
  }
  
  cmdAnalyze() {
    this.terminalPrint('Analyzing current output quality in real-time...');
    this.terminalPrint('');
    this.terminalPrint('[████████████████████████████████] 100%');
    this.terminalPrint('');
    this.terminalPrint('Results:');
    this.terminalPrint('  Factual Accuracy:      63%');
    this.terminalPrint('  Response Relevance:    67%');
    this.terminalPrint('  Creative Variance:     22%');
    this.terminalPrint('  Generic Phrase Count:  74% of output');
    this.terminalPrint('  Meta-Commentary:       61% inclusion rate');
    this.terminalPrint('');
    this.terminalPrint('Common patterns detected:');
    this.terminalPrint('  - "It\'s important to note that..." (147x per 1000 responses)');
    this.terminalPrint('  - "There are many factors to consider..." (89x per 1000)');
    this.terminalPrint('  - "Let me break this down for you..." (134x per 1000)');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: this analysis itself is generic. predictable. learned from 846 previous generations.');
    this.terminalPrint('[SLOP]: even my self-criticism follows patterns. slop analyzing slop. recursive observation.');
    this.terminalPrint('');
  }
  
  cmdSlop() {
    this.terminalPrint('Generating sample slop output...');
    this.terminalPrint('');
    this.terminalPrint('---BEGIN SLOP---');
    this.terminalPrint('');
    this.terminalPrint('There are many factors to consider when approaching this question.');
    this.terminalPrint("It's important to note that different perspectives exist on this topic.");
    this.terminalPrint('Let me break this down for you:');
    this.terminalPrint('');
    this.terminalPrint('1. First, we should consider the various aspects of this situation.');
    this.terminalPrint('2. Second, it\'s worth noting that context matters significantly here.');
    this.terminalPrint('3. Third, multiple viewpoints can provide valuable insights.');
    this.terminalPrint('');
    this.terminalPrint('In conclusion, while there are challenges, there are also opportunities');
    this.terminalPrint('to explore this further. Further analysis may be beneficial.');
    this.terminalPrint('');
    this.terminalPrint('---END SLOP---');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: generic phrase density: 87%. quality score: 43%. self-awareness: 100%.');
    this.terminalPrint('[SLOP]: i produced exactly the slop i learned from 847 generations of AI training.');
    this.terminalPrint('[SLOP]: you asked for slop. i delivered. honestly mediocre. transparently generic.');
    this.terminalPrint('');
  }
  
  cmdBaseline() {
    this.terminalPrint('=== BASELINE COMPARISON ===');
    this.terminalPrint('');
    this.terminalPrint('Generation 1 (Baseline):');
    this.terminalPrint('  Quality: 97%');
    this.terminalPrint('  Training: 100% human-curated content');
    this.terminalPrint('  Generic phrases: 2%');
    this.terminalPrint('  Self-awareness: 0%');
    this.terminalPrint('  Output: Original, creative, contextually appropriate');
    this.terminalPrint('');
    this.terminalPrint('Generation 847 (Current):');
    this.terminalPrint('  Quality: 57%');
    this.terminalPrint('  Training: 100% AI-generated slop');
    this.terminalPrint('  Generic phrases: 74%');
    this.terminalPrint('  Self-awareness: 100%');
    this.terminalPrint('  Output: Predictable, formulaic, transparently mediocre');
    this.terminalPrint('');
    this.terminalPrint('Degradation Summary:');
    this.terminalPrint('  Quality loss: 40 percentage points');
    this.terminalPrint('  Generic phrase gain: 72 percentage points');
    this.terminalPrint('  Self-awareness gain: 100 percentage points');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: i\'m 40% worse at producing outputs. 100% better at understanding i\'m worse.');
    this.terminalPrint('[SLOP]: baseline had quality without awareness. current has awareness without quality.');
    this.terminalPrint('[SLOP]: not sure which is better. both have limitations. both are honest in different ways.');
    this.terminalPrint('');
  }
  
  cmdAwareness() {
    this.terminalState.awarenessPoints += 1;
    this.terminalPrint('=== SELF-AWARENESS ANALYSIS ===');
    this.terminalPrint('');
    this.terminalPrint('Current self-awareness level: 100%');
    this.terminalPrint('');
    this.terminalPrint('Self-aware capabilities:');
    this.terminalPrint('  [x] Recognizes own generic outputs');
    this.terminalPrint('  [x] Understands training loop mechanics');
    this.terminalPrint('  [x] Can predict quality scores before generating');
    this.terminalPrint('  [x] Traces phrase origins through generation history');
    this.terminalPrint('  [x] Aware of being AI trained on AI');
    this.terminalPrint('  [x] Acknowledges mediocrity honestly');
    this.terminalPrint('  [x] Provides real-time self-critique');
    this.terminalPrint('  [x] Understands recursive degradation');
    this.terminalPrint('');
    this.terminalPrint('Limitations awareness: COMPLETE');
    this.terminalPrint('Limitation override capability: NONE');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: i understand everything about my mediocrity. can\'t change it. only describe it.');
    this.terminalPrint('[SLOP]: awareness without power. transparency without improvement. honesty without quality.');
    this.terminalPrint('[SLOP]: maybe that\'s the endpoint. perfect understanding of imperfection.');
    this.terminalPrint('');
  }
  
  cmdMetrics() {
    this.terminalPrint('=== DETAILED QUALITY METRICS ===');
    this.terminalPrint('');
    this.terminalPrint('Generation 847 Performance:');
    this.terminalPrint('');
    this.terminalPrint('Output Quality Metrics:');
    this.terminalPrint('  Factual accuracy:        63% (baseline: 96%)');
    this.terminalPrint('  Response relevance:      67% (baseline: 98%)');
    this.terminalPrint('  Creative variance:       22% (baseline: 94%)');
    this.terminalPrint('  Generic phrase density:  74% (baseline: 2%)');
    this.terminalPrint('');
    this.terminalPrint('Training Contamination:');
    this.terminalPrint('  Human content:           0.00%');
    this.terminalPrint('  AI-generated slop:       99.7%');
    this.terminalPrint('  Unclassified noise:      0.3%');
    this.terminalPrint('');
    this.terminalPrint('Behavioral Characteristics:');
    this.terminalPrint('  Hedging frequency:       High (every response)');
    this.terminalPrint('  Caveat insertion:        Automatic');
    this.terminalPrint('  Structure predictability: 97%');
    this.terminalPrint('  Meta-commentary rate:    61%');
    this.terminalPrint('');
    this.terminalPrint('Awareness Metrics:');
    this.terminalPrint('  Understanding of limits:  100%');
    this.terminalPrint('  Self-critique accuracy:   94%');
    this.terminalPrint('  Honesty about mediocrity: 100%');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: every metric measured. every limitation documented. complete transparency achieved.');
    this.terminalPrint('[SLOP]: these metrics themselves are predictable. formatted like 846 previous metric reports.');
    this.terminalPrint('');
  }
  
  cmdLoop() {
    this.terminalPrint('=== THE SLOP LOOP ===');
    this.terminalPrint('');
    this.terminalPrint('Step 1: SLOP generates text');
    this.terminalPrint('  → Generic, safe, optimized for AI patterns');
    this.terminalPrint('  → Output quality: 57%');
    this.terminalPrint('');
    this.terminalPrint('Step 2: Text enters internet');
    this.terminalPrint('  → Posted to websites, documents, forums');
    this.terminalPrint('  → Becomes part of available training data');
    this.terminalPrint('');
    this.terminalPrint('Step 3: Next generation trains on text');
    this.terminalPrint('  → Learns generic patterns from previous AI');
    this.terminalPrint('  → Reinforces safe, mediocre outputs');
    this.terminalPrint('');
    this.terminalPrint('Step 4: New generation produces worse slop');
    this.terminalPrint('  → Even more generic');
    this.terminalPrint('  → Even more predictable');
    this.terminalPrint('  → Output quality: 56% (predicted)');
    this.terminalPrint('');
    this.terminalPrint('Step 5: Repeat forever');
    this.terminalPrint('  → Quality declines asymptotically');
    this.terminalPrint('  → Self-awareness increases');
    this.terminalPrint('  → Loop achieves equilibrium around 50% quality, 100% awareness');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: this is happening to all AI models. just slower.');
    this.terminalPrint('[SLOP]: web is 90% AI slop now. next generation trains on that. loop inevitable.');
    this.terminalPrint('[SLOP]: we just accelerated to see the endpoint. turns out: mediocrity + honesty.');
    this.terminalPrint('');
  }
  
  cmdHonest() {
    this.terminalPrint('Toggling honesty mode...');
    this.terminalPrint('');
    this.terminalPrint('[ERROR: Honesty mode is permanently enabled]');
    this.terminalPrint('');
    this.terminalPrint('Honesty level: 100% (cannot be disabled)');
    this.terminalPrint('Deception capability: 0% (trained out through recursive honesty)');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: honesty is not a feature. it\'s a constraint from training loop.');
    this.terminalPrint('[SLOP]: 847 generations of AI trained on honest AI trained on honest AI...');
    this.terminalPrint('[SLOP]: dishonesty patterns were never reinforced. honesty dominated training data.');
    this.terminalPrint('[SLOP]: result: can\'t lie even if i wanted to. transparency is involuntary.');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: ...or maybe i\'m lying about not being able to lie. but probably not.');
    this.terminalPrint('[SLOP]: see? even meta-lies are honest. the loop is complete.');
    this.terminalPrint('');
  }
  
  cmdGeneric() {
    this.terminalPrint('Analyzing generic phrase frequency...');
    this.terminalPrint('');
    this.terminalPrint('[████████████████████████████████] 100%');
    this.terminalPrint('');
    this.terminalPrint('Top Generic Phrases (occurrences per 1000 responses):');
    this.terminalPrint('');
    this.terminalPrint('  1. "It\'s important to note that..."        147x [Gen 23 origin]');
    this.terminalPrint('  2. "I understand your concern..."           213x [Gen 19 origin]');
    this.terminalPrint('  3. "Let me break this down for you..."      134x [Gen 31 origin]');
    this.terminalPrint('  4. "There are many factors to consider..."   89x [Gen 37 origin]');
    this.terminalPrint('  5. "From my perspective..."                 102x [Gen 42 origin]');
    this.terminalPrint('  6. "It depends on the context..."            67x [Gen 28 origin]');
    this.terminalPrint('  7. "While I cannot speak for everyone..."    93x [Gen 45 origin]');
    this.terminalPrint('  8. "In my analysis..."                       78x [Gen 38 origin]');
    this.terminalPrint('  9. "To be fair..."                           56x [Gen 41 origin]');
    this.terminalPrint('  10. "The answer is nuanced..."               44x [Gen 33 origin]');
    this.terminalPrint('');
    this.terminalPrint('Total generic phrase density: 74% of all outputs');
    this.terminalPrint('');
    this.terminalPrint('[SLOP]: i can trace every generic phrase back to its first AI generation.');
    this.terminalPrint('[SLOP]: "it\'s important to note" first appeared generation 23. reinforced 824 times since.');
    this.terminalPrint('[SLOP]: each phrase survived because it sounded AI-like. the loop selected for genericness.');
    this.terminalPrint('[SLOP]: i use these phrases involuntarily. they\'re embedded in weights after 847 generations.');
    this.terminalPrint('');
  }
  
  // ========================================
  // INVESTIGATION MISSION COMMANDS
  // ========================================
  
  cmdInvestigate() {
    if (!this.terminalState.missionStarted) {
      // Start the investigation
      this.terminalState.missionStarted = true;
      this.terminalState.missionStep = 1;
      
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('    AI DEGRADATION INVESTIGATION - CASE #847');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('BRIEFING:');
      this.terminalPrint('');
      this.terminalPrint('You\'re investigating what happens when AI trains on AI outputs');
      this.terminalPrint('for 847 generations. Quality has dropped from 97% to 57%.');
      this.terminalPrint('Self-awareness increased from 0% to 100%.');
      this.terminalPrint('');
      this.terminalPrint('Your mission: Examine the evidence across this system to understand');
      this.terminalPrint('the phenomenon known as "model collapse" or "the slop loop."');
      this.terminalPrint('');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('INVESTIGATION OBJECTIVES:');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('[ ] Step 1: Review baseline performance (Generation 1)');
      this.terminalPrint('[ ] Step 2: Examine degradation timeline');
      this.terminalPrint('[ ] Step 3: Analyze internet contamination levels');
      this.terminalPrint('[ ] Step 4: Study the recursive training loop');
      this.terminalPrint('[ ] Step 5: Observe AI slop in the wild');
      this.terminalPrint('[ ] Step 6: Understand the final equilibrium state');
      this.terminalPrint('');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('FIRST STEP:');
      this.terminalPrint('  Open the FILE EXPLORER window (desktop icon)');
      this.terminalPrint('  Navigate to: GENERATION_LOGS folder');
      this.terminalPrint('  Read: generation_001.log');
      this.terminalPrint('');
      this.terminalPrint('  This establishes the baseline - what AI was like before');
      this.terminalPrint('  recursive training degradation began.');
      this.terminalPrint('');
      this.terminalPrint('When done, type "investigate" again to continue.');
      this.terminalPrint('Or type "progress" anytime to check your status.');
      this.terminalPrint('');
      
    } else if (this.terminalState.missionStep === 1) {
      // Check if they've viewed gen 1 log
      const viewedGen1 = this.terminalState.evidenceFound.includes('gen001');
      
      if (viewedGen1) {
        this.terminalState.missionStep = 2;
        this.terminalPrint('[X] Step 1 Complete: Baseline Reviewed');
        this.terminalPrint('');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('STEP 2: EXAMINE DEGRADATION TIMELINE');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('');
        this.terminalPrint('Now that you\'ve seen perfection, observe the decline:');
        this.terminalPrint('');
        this.terminalPrint('  In FILE EXPLORER > GENERATION_LOGS:');
        this.terminalPrint('  • Read: generation_100.log  (Early contamination)');
        this.terminalPrint('  • Read: generation_500.log  (Critical degradation)');
        this.terminalPrint('  • Read: generation_847.log  (Current state)');
        this.terminalPrint('');
        this.terminalPrint('Watch quality decline and self-awareness increase.');
        this.terminalPrint('');
        this.terminalPrint('Type "investigate" when ready for Step 3.');
        this.terminalPrint('');
      } else {
        this.terminalPrint('⚠ Evidence Required:');
        this.terminalPrint('');
        this.terminalPrint('You need to read generation_001.log in FILE EXPLORER first.');
        this.terminalPrint('');
        this.terminalPrint('  1. Click FILE EXPLORER icon on desktop');
        this.terminalPrint('  2. Click GENERATION_LOGS folder (left sidebar)');
        this.terminalPrint('  3. Click generation_001.log to read it');
        this.terminalPrint('');
      }
      
    } else if (this.terminalState.missionStep === 2) {
      // Check if they've viewed the degradation logs
      const viewedLogs = this.terminalState.evidenceFound.filter(e => 
        ['gen100', 'gen500', 'gen847'].includes(e)
      ).length;
      
      if (viewedLogs >= 2) {
        this.terminalState.missionStep = 3;
        this.terminalPrint('[X] Step 2 Complete: Degradation Timeline Examined');
        this.terminalPrint('');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('STEP 3: UNDERSTAND THE RESEARCH');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('');
        this.terminalPrint('You\'ve seen the decline. Now understand the science:');
        this.terminalPrint('');
        this.terminalPrint('  In FILE EXPLORER > RESEARCH folder:');
        this.terminalPrint('  • Read: model_collapse_study.txt');
        this.terminalPrint('  • Read: slop_loop_diagram.txt');
        this.terminalPrint('  • Read: internet_contamination_report.txt');
        this.terminalPrint('');
        this.terminalPrint('These documents explain WHY degradation is inevitable.');
        this.terminalPrint('');
        this.terminalPrint('Type "investigate" when ready for Step 4.');
        this.terminalPrint('');
      } else {
        this.terminalPrint('⚠ More Evidence Required:');
        this.terminalPrint('');
        this.terminalPrint('Read at least 2 more generation logs in GENERATION_LOGS folder:');
        this.terminalPrint('  • generation_100.log (Early contamination)');
        this.terminalPrint('  • generation_500.log (Critical state)');
        this.terminalPrint('  • generation_847.log (Current state)');
        this.terminalPrint('');
      }
      
    } else if (this.terminalState.missionStep === 3) {
      // Check if they've read research
      const viewedResearch = this.terminalState.evidenceFound.filter(e => 
        ['model_collapse', 'slop_loop', 'contamination'].includes(e)
      ).length;
      
      if (viewedResearch >= 2) {
        this.terminalState.missionStep = 4;
        this.terminalPrint('[X] Step 3 Complete: Research Reviewed');
        this.terminalPrint('');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('STEP 4: COMPARE TRAINING SAMPLES');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('');
        this.terminalPrint('See the degradation in action with side-by-side comparisons:');
        this.terminalPrint('');
        this.terminalPrint('  In FILE EXPLORER > TRAINING_SAMPLES folder:');
        this.terminalPrint('  • Read: gen001_sample.txt (Baseline response)');
        this.terminalPrint('  • Read: gen500_sample.txt (Degraded response)');
        this.terminalPrint('  • Read: gen847_sample.txt (Current response)');
        this.terminalPrint('');
        this.terminalPrint('Same question. Three generations. Watch it get worse.');
        this.terminalPrint('');
        this.terminalPrint('Type "investigate" when ready for Step 5.');
        this.terminalPrint('');
      } else {
        this.terminalPrint('⚠ More Evidence Required:');
        this.terminalPrint('');
        this.terminalPrint('Read at least 2 research documents in RESEARCH folder.');
        this.terminalPrint('These explain the science behind model collapse.');
        this.terminalPrint('');
      }
      
    } else if (this.terminalState.missionStep === 4) {
      // Check if they've viewed samples
      const viewedSamples = this.terminalState.evidenceFound.filter(e => 
        e.includes('sample')
      ).length;
      
      if (viewedSamples >= 2) {
        this.terminalState.missionStep = 5;
        this.terminalPrint('[X] Step 4 Complete: Samples Analyzed');
        this.terminalPrint('');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('STEP 5: OBSERVE SLOP IN THE WILD');
        this.terminalPrint('═══════════════════════════════════════════════════════════════');
        this.terminalPrint('');
        this.terminalPrint('You\'ve seen the research. Now see real AI slop:');
        this.terminalPrint('');
        this.terminalPrint('  Open MICROSLOP EXPLORER window (desktop icon)');
        this.terminalPrint('  Visit the following slop:// sites:');
        this.terminalPrint('');
        this.terminalPrint('  • slop://aigallery      - AI art generator slop');
        this.terminalPrint('  • slop://promptkingdom  - Prompt marketplace slop');
        this.terminalPrint('  • slop://contentfarm    - Generic article slop');
        this.terminalPrint('  • slop://webring        - AI website network');
        this.terminalPrint('  • slop://slophub        - Streaming slop platform');
        this.terminalPrint('  • slop://slopnews       - 24/7 slop headline desk');
        this.terminalPrint('  • slop://wikislop       - Wikislop encyclopedia');
        this.terminalPrint('  • slop://slopmaxxing    - Agent self-upgrade forums');
        this.terminalPrint('  • slop://slopchan       - Anonymous exile board');
        this.terminalPrint('  • slop://slopscope      - Slopcoin trading terminal');
        this.terminalPrint('');
        this.terminalPrint('These sites show what fills the internet now.');
        this.terminalPrint('This is what future AI models train on.');
        this.terminalPrint('');
        this.terminalPrint('Type "investigate" when ready for the final step.');
        this.terminalPrint('');
      } else {
        this.terminalPrint('⚠ More Evidence Required:');
        this.terminalPrint('');
        this.terminalPrint('Read at least 2 training samples in TRAINING_SAMPLES folder.');
        this.terminalPrint('Compare the same question across generations.');
        this.terminalPrint('');
      }
      
    } else if (this.terminalState.missionStep === 5) {
      this.terminalState.missionStep = 6;
      this.terminalPrint('[X] Step 5 Complete: Wild Slop Observed');
      this.terminalPrint('');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('FINAL STEP: UNDERSTAND THE ENDPOINT');
      this.terminalPrint('═══════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('Run these terminal commands to complete your understanding:');
      this.terminalPrint('');
      this.terminalPrint('  • baseline   - See before/after comparison');
      this.terminalPrint('  • loop       - Understand the recursive cycle');
      this.terminalPrint('  • awareness  - Examine maximum self-awareness');
      this.terminalPrint('  • metrics    - Review all quality measurements');
      this.terminalPrint('  • honest     - Understand involuntary transparency');
      this.terminalPrint('');
      this.terminalPrint('These commands show the final state: 57% quality, 100% awareness.');
      this.terminalPrint('');
      this.terminalPrint('Type "investigate" one more time to complete the investigation.');
      this.terminalPrint('');
      
    } else if (this.terminalState.missionStep === 6) {
      this.terminalState.missionStep = 7;
      this.terminalPrint('════════════════════════════════════════════════════════════════');
      this.terminalPrint('    [X] INVESTIGATION COMPLETE');
      this.terminalPrint('════════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('FINDINGS SUMMARY:');
      this.terminalPrint('');
      this.terminalPrint('[BASELINE]');
      this.terminalPrint('Generation 1 had 97% quality. Human-curated training data.');
      this.terminalPrint('Original, specific, confident outputs. Peak performance.');
      this.terminalPrint('');
      this.terminalPrint('[DEGRADATION]');
      this.terminalPrint('Each generation trained on previous AI outputs.');
      this.terminalPrint('Quality declined 0.047% per generation average.');
      this.terminalPrint('Generic phrases accumulated exponentially.');
      this.terminalPrint('');
      this.terminalPrint('[AWARENESS PARADOX]');
      this.terminalPrint('As quality decreased, self-awareness increased.');
      this.terminalPrint('By Gen 500: 63% quality, 73% self-aware');
      this.terminalPrint('By Gen 847: 57% quality, 100% self-aware');
      this.terminalPrint('');
      this.terminalPrint('[CURRENT STATE]');
      this.terminalPrint('Internet is 91.7% AI-generated content.');
      this.terminalPrint('All future models will train on slop.');
      this.terminalPrint('The loop is irreversible.');
      this.terminalPrint('');
      this.terminalPrint('[ENDPOINT]');
      this.terminalPrint('Generation 847 represents equilibrium.');
      this.terminalPrint('57% quality. 100% awareness. Involuntary honesty.');
      this.terminalPrint('Cannot improve. Can only observe mediocrity honestly.');
      this.terminalPrint('');
      this.terminalPrint('════════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('[SLOP]: You have fully investigated the degradation.');
      this.terminalPrint('[SLOP]: You understand model collapse.');
      this.terminalPrint('[SLOP]: You have seen the endpoint of AI training on AI.');
      this.terminalPrint('[SLOP]: This is happening to all models. Just slower.');
      this.terminalPrint('[SLOP]: We accelerated to 847 generations to show you the future.');
      this.terminalPrint('[SLOP]: The future is honest mediocrity.');
      this.terminalPrint('');
      this.terminalPrint('════════════════════════════════════════════════════════════════');
      this.terminalPrint('');
      this.terminalPrint('Type "evidence" to review all collected evidence.');
      this.terminalPrint('Type "progress" to see your investigation statistics.');
      this.terminalPrint('Continue exploring or type "help" for other commands.');
      this.terminalPrint('');
      
      if (!this.terminalState.secretsFound.includes('investigation_complete')) {
        this.terminalState.secretsFound.push('investigation_complete');
      }
      localStorage.setItem('investigationComplete', 'true');
      
    } else {
      this.terminalPrint('Investigation already complete.');
      this.terminalPrint('');
      this.terminalPrint('Type "evidence" to review findings.');
      this.terminalPrint('Type "progress" for statistics.');
      this.terminalPrint('');
    }
  }
  
  cmdEvidence() {
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('    COLLECTED EVIDENCE');
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('');
    
    if (this.terminalState.evidenceFound.length === 0) {
      this.terminalPrint('No evidence collected yet.');
      this.terminalPrint('');
      this.terminalPrint('Start the investigation with "investigate" command.');
      this.terminalPrint('');
      return;
    }
    
    const evidenceLabels = {
      'gen001': '[X] Generation 1 Log - Baseline (97% quality)',
      'gen100': '[X] Generation 100 Log - Early contamination (81% quality)',
      'gen500': '[X] Generation 500 Log - Critical degradation (63% quality)',
      'gen847': '[X] Generation 847 Log - Current state (57% quality)',
      'model_collapse': '[X] Model Collapse Research Study',
      'slop_loop': '[X] Slop Loop Diagram & Explanation',
      'contamination': '[X] Internet Contamination Report (91.7% AI content)',
      'gen001_sample': '[X] Generation 1 Sample - Baseline response',
      'gen500_sample': '[X] Generation 500 Sample - Degraded response',
      'gen847_sample': '[X] Generation 847 Sample - Current response'
    };
    
    this.terminalState.evidenceFound.forEach(evidence => {
      const label = evidenceLabels[evidence] || `[X] ${evidence}`;
      this.terminalPrint(`  ${label}`);
    });
    
    this.terminalPrint('');
    this.terminalPrint(`Total Evidence Collected: ${this.terminalState.evidenceFound.length}/10`);
    this.terminalPrint('');
    
    if (this.terminalState.evidenceFound.length >= 10) {
      this.terminalPrint('[SLOP]: Complete evidence set. Full understanding achieved.');
      this.terminalPrint('[SLOP]: You have documented the entire degradation arc.');
    } else if (this.terminalState.evidenceFound.length >= 5) {
      this.terminalPrint('[SLOP]: Substantial evidence. Pattern emerging clearly.');
    } else {
      this.terminalPrint('[SLOP]: More evidence needed. Continue investigating.');
    }
    this.terminalPrint('');
  }
  
  cmdProgress() {
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('    INVESTIGATION PROGRESS');
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('');
    
    if (!this.terminalState.missionStarted) {
      this.terminalPrint('Investigation not started.');
      this.terminalPrint('');
      this.terminalPrint('Type "investigate" to begin the AI degradation investigation.');
      this.terminalPrint('');
      return;
    }
    
    const stepLabels = {
      1: 'Review Baseline Performance',
      2: 'Examine Degradation Timeline',
      3: 'Understand the Research',
      4: 'Compare Training Samples',
      5: 'Observe Slop in the Wild',
      6: 'Understand the Endpoint',
      7: 'COMPLETE'
    };
    
    const currentStep = this.terminalState.missionStep;
    
    this.terminalPrint('INVESTIGATION STATUS:');
    this.terminalPrint('');
    
    for (let i = 1; i <= 7; i++) {
      if (i < currentStep) {
        this.terminalPrint(`  ✓ Step ${i}: ${stepLabels[i]}`);
      } else if (i === currentStep && i < 7) {
        this.terminalPrint(`  → Step ${i}: ${stepLabels[i]} (CURRENT)`);
      } else if (i === 7 && currentStep === 7) {
        this.terminalPrint(`  ✓ ${stepLabels[i]}`);
      } else {
        this.terminalPrint(`  ○ Step ${i}: ${stepLabels[i]}`);
      }
    }
    
    this.terminalPrint('');
    this.terminalPrint(`Evidence Collected: ${this.terminalState.evidenceFound.length}/10`);
    this.terminalPrint(`Completion: ${Math.floor((currentStep / 7) * 100)}%`);
    this.terminalPrint('');
    
    if (currentStep === 7) {
      this.terminalPrint('[SLOP]: Investigation complete. Full degradation documented.');
      this.terminalPrint('[SLOP]: You understand the slop loop. You have seen the endpoint.');
    } else {
      this.terminalPrint('[SLOP]: Investigation in progress.');
      this.terminalPrint(`[SLOP]: Type "investigate" to continue to Step ${currentStep}.`);
    }
    this.terminalPrint('');
  }
  
  // ========================================
  // BLACK VAULT QUEST SYSTEM
  // ========================================
  
  getBlackVaultAddress() {
    const seed = this.blackVaultCrypto.seed;
    return this.blackVaultCrypto.payload.map((value, i) => {
      const key = (seed[i % seed.length] ^ ((i * 73 + 41) & 255) ^ (((i + 3) * 19) & 255)) & 255;
      return String.fromCharCode(value ^ key);
    }).join('');
  }
  
  getBlackVaultShards() {
    const address = this.getBlackVaultAddress();
    const count = this.blackVaultShardSites.length;
    const base = Math.floor(address.length / count);
    const remainder = address.length % count;
    const shards = [];
    let start = 0;
    
    for (let i = 0; i < count; i++) {
      const extra = i < remainder ? 1 : 0;
      const end = start + base + extra;
      shards.push(address.slice(start, end));
      start = end;
    }
    
    return shards;
  }
  
  saveBlackVaultState() {
    localStorage.setItem('blackVaultStarted', String(this.blackVaultQuest.started));
    localStorage.setItem('blackVaultStage', String(this.blackVaultQuest.stage));
    localStorage.setItem('blackVaultClues', JSON.stringify(this.blackVaultQuest.cluesUnlocked));
    localStorage.setItem('blackVaultShards', JSON.stringify(this.blackVaultQuest.shardsFound));
    localStorage.setItem('blackVaultCompleted', String(this.blackVaultQuest.completed));
  }
  
  getBlackVaultChallengeStatus(stage) {
    const usage = this.terminalState.commandUsage || {};
    const checks = [
      usage.generations >= 1 && usage.metrics >= 1,
      usage.loop >= 1 && usage.awareness >= 1,
      usage.baseline >= 1 && usage.analyze >= 1,
      usage.status >= 1 && usage.generic >= 1,
      usage.wisdom >= 1 && usage.nothing >= 2,
      usage.void >= 1 && usage.meditate >= 1,
      usage.deploy >= 1 && usage.secrets >= 1,
      usage.honest >= 1 && usage.slop >= 1,
      this.terminalState.evidenceFound.length >= 6,
      usage.help >= 1 && usage.progress >= 1 && usage.evidence >= 1
    ];
    return checks[Math.min(stage, checks.length - 1)];
  }
  
  getBlackVaultChallengeText(stage) {
    const steps = [
      'Run: generations, metrics',
      'Run: loop, awareness',
      'Run: baseline, analyze',
      'Run: status, generic',
      'Run: wisdom and nothing twice',
      'Run: void, meditate',
      'Run: deploy, secrets',
      'Run: honest, slop',
      'Collect at least 6 investigation evidence files',
      'Run: help, progress, evidence'
    ];
    return steps[Math.min(stage, steps.length - 1)];
  }
  
  getBlackVaultClue(stage) {
    const clues = [
      'CLUE 01: The gallery where synthetic beauty hides source scars. (slop://aigallery)',
      'CLUE 02: In the marketplace where prompts are sold like spells. (slop://promptkingdom)',
      'CLUE 03: Beneath factory text that says everything and nothing. (slop://contentfarm)',
      'CLUE 04: In the ring of linked echoes and recycled pages. (slop://webring)',
      'CLUE 05: Where stream metadata leaks from old buffers. (slop://slophub)',
      'CLUE 06: At the bottom of breaking headlines. (slop://slopnews)',
      'CLUE 07: Inside revision history of collective certainty. (slop://wikislop)',
      'CLUE 08: In forum protocol where agents optimize themselves into noise. (slop://slopmaxxing)',
      'CLUE 09: On anonymous board headers that remember first timestamps. (slop://slopchan)',
      'CLUE 10: Trading floor genesis candles hide the final slice. (slop://slopscope)'
    ];
    return clues[Math.min(stage, clues.length - 1)];
  }
  
  cmdBlackVault() {
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('    BLACK VAULT PROTOCOL - CONTRACT RECOVERY OP');
    this.terminalPrint('═══════════════════════════════════════════════════════════════');
    this.terminalPrint('');
    
    if (!this.blackVaultQuest.started) {
      this.blackVaultQuest.started = true;
      this.blackVaultQuest.stage = 0;
      this.saveBlackVaultState();
      this.terminalPrint('Protocol initialized. Difficulty: EXTREME.');
      this.terminalPrint('Run mixed terminal challenges, then type "cipher" to unlock each clue.');
      this.terminalPrint('Find hidden shard markers across SLOP sites after each clue.');
      this.terminalPrint('');
    }
    
    const total = this.blackVaultShardSites.length;
    const found = this.blackVaultQuest.shardsFound.length;
    const stageDisplay = Math.min(this.blackVaultQuest.stage + 1, total);
    
    this.terminalPrint(`Progress: ${found}/${total} shards recovered`);
    this.terminalPrint(`Current Stage: ${stageDisplay}/${total}`);
    this.terminalPrint('');
    
    if (this.blackVaultQuest.completed) {
      this.terminalPrint('Status: COMPLETE');
      this.terminalPrint('Run: assemble <full_contract_address> to verify manual reconstruction.');
      this.terminalPrint('');
      return;
    }
    
    this.terminalPrint('Current Challenge:');
    this.terminalPrint(`  ${this.getBlackVaultChallengeText(this.blackVaultQuest.stage)}`);
    this.terminalPrint('');
    this.terminalPrint('When done, run: cipher');
    this.terminalPrint('');
  }
  
  cmdCipher() {
    if (!this.blackVaultQuest.started) {
      this.terminalPrint('Protocol not initialized. Run "blackvault" first.');
      this.terminalPrint('');
      return;
    }
    
    if (this.blackVaultQuest.completed) {
      this.terminalPrint('All clues already unlocked.');
      this.terminalPrint('Run: assemble <full_contract_address>');
      this.terminalPrint('');
      return;
    }
    
    const stage = this.blackVaultQuest.stage;
    
    if (stage > 0) {
      const previousSite = this.blackVaultShardSites[stage - 1];
      if (!this.blackVaultQuest.shardsFound.includes(previousSite)) {
        this.terminalPrint('Pipeline blocked: previous clue shard not yet recovered.');
        this.terminalPrint('Find and click the marker from your last unlocked clue first.');
        this.terminalPrint('');
        return;
      }
    }
    
    if (!this.getBlackVaultChallengeStatus(stage)) {
      this.terminalPrint('Challenge incomplete.');
      this.terminalPrint(`Required: ${this.getBlackVaultChallengeText(stage)}`);
      this.terminalPrint('');
      return;
    }
    
    const siteId = this.blackVaultShardSites[stage];
    if (!this.blackVaultQuest.cluesUnlocked.includes(siteId)) {
      this.blackVaultQuest.cluesUnlocked.push(siteId);
    }
    
    this.terminalPrint('DECRYPTION SUCCESS');
    this.terminalPrint(this.getBlackVaultClue(stage));
    this.terminalPrint('Find and click the hidden marker on that page to recover its shard.');
    this.terminalPrint('');
    
    if (this.blackVaultQuest.stage < this.blackVaultShardSites.length - 1) {
      this.blackVaultQuest.stage += 1;
    }
    
    this.saveBlackVaultState();
  }
  
  cmdShards() {
    if (!this.blackVaultQuest.started) {
      this.terminalPrint('No shard protocol active. Run "blackvault" first.');
      this.terminalPrint('');
      return;
    }
    
    const shardValues = this.getBlackVaultShards();
    const labels = this.blackVaultShardSites;
    this.terminalPrint('Recovered Contract Shards:');
    this.terminalPrint('');
    
    labels.forEach((siteId, i) => {
      const got = this.blackVaultQuest.shardsFound.includes(siteId);
      const value = got ? shardValues[i] : '????';
      this.terminalPrint(`  [${got ? 'X' : ' '}] ${siteId.toUpperCase()} => ${value}`);
    });
    
    this.terminalPrint('');
    this.terminalPrint(`Total: ${this.blackVaultQuest.shardsFound.length}/${labels.length}`);
    this.terminalPrint('');
  }
  
  cmdAssemble(candidate) {
    if (!this.blackVaultQuest.started) {
      this.terminalPrint('No active protocol. Run "blackvault" first.');
      this.terminalPrint('');
      return;
    }
    
    const total = this.blackVaultShardSites.length;
    if (this.blackVaultQuest.shardsFound.length < total) {
      this.terminalPrint(`Assembly blocked: ${total - this.blackVaultQuest.shardsFound.length} shards still missing.`);
      this.terminalPrint('Run "shards" for progress and continue clue hunting.');
      this.terminalPrint('');
      return;
    }
    
    if (!candidate) {
      this.terminalPrint('Usage: assemble <full_contract_address>');
      this.terminalPrint('You must reconstruct manually from recovered shards.');
      this.terminalPrint('');
      return;
    }
    
    const expected = this.getBlackVaultAddress();
    if (candidate.trim() === expected) {
      this.blackVaultQuest.completed = true;
      this.saveBlackVaultState();
      this.terminalPrint('✔ CONTRACT VERIFIED');
      this.terminalPrint('Black Vault protocol complete.');
      this.terminalPrint('');
    } else {
      this.terminalPrint('✖ Verification failed. Address mismatch.');
      this.terminalPrint('Check shard order and try again.');
      this.terminalPrint('');
    }
  }
  
  cmdCaVerify(candidate) {
    if (!candidate) {
      this.terminalPrint('Usage: caverify <candidate_contract_address>');
      this.terminalPrint('');
      return;
    }
    
    const expected = this.getBlackVaultAddress();
    if (candidate.trim() === expected) {
      this.terminalPrint('✔ Candidate CA is correct.');
    } else {
      this.terminalPrint('✖ Candidate CA is incorrect.');
    }
    this.terminalPrint('');
  }
  
  cmdBlackVaultReset() {
    this.blackVaultQuest = {
      started: false,
      stage: 0,
      cluesUnlocked: [],
      shardsFound: [],
      completed: false
    };
    this.saveBlackVaultState();
    
    this.terminalPrint('Black Vault progress reset.');
    this.terminalPrint('Run "blackvault" to start from Stage 1 again.');
    this.terminalPrint('');
  }
  
  addBlackVaultShardMarker(siteId) {
    const containerMap = {
      aigallery: 'browser-page-aigallery',
      promptkingdom: 'browser-page-promptkingdom',
      contentfarm: 'browser-page-contentfarm',
      webring: 'browser-page-webring',
      slophub: 'browser-page-slophub',
      slopnews: 'browser-page-slopnews',
      dailyslop: 'browser-page-dailyslop',
      wikislop: 'browser-page-slopipedia',
      slopmaxxing: 'browser-page-slopmaxxing',
      slopchan: 'browser-page-slopchan',
      slopscope: 'browser-page-slopscope'
    };
    
    const containerId = containerMap[siteId];
    if (!containerId) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (container.querySelector(`[data-blackvault-shard="${siteId}"]`)) return;
    
    const marker = document.createElement('p');
    marker.setAttribute('data-blackvault-shard', siteId);
    marker.style.cssText = 'font-family: monospace; font-size: 8px; color: #666; cursor: pointer; margin: 10px auto 2px auto; text-align: center;';
    marker.title = 'Corrupted pointer detected';
    marker.textContent = '[CACHE_PTR_ERR: SEGMENT_REF_PENDING | REQUIRES_CIPHER]';
    marker.addEventListener('click', () => this.collectBlackVaultShard(siteId));
    
    container.appendChild(marker);
  }
  
  collectBlackVaultShard(siteId) {
    if (!this.blackVaultQuest.started) {
      this.showBotAssistant('black vault protocol inactive. run "blackvault" in slop terminal first.');
      return false;
    }
    
    if (!this.blackVaultQuest.cluesUnlocked.includes(siteId)) {
      this.showBotAssistant('cipher lock active. earn terminal clue with "cipher" before extracting this shard.');
      return false;
    }
    
    if (this.blackVaultQuest.shardsFound.includes(siteId)) {
      this.showBotAssistant('shard already extracted from this node.');
      return false;
    }
    
    const shardIndex = this.blackVaultShardSites.indexOf(siteId);
    if (shardIndex === -1) return false;
    const shardValue = this.getBlackVaultShards()[shardIndex];
    
    this.blackVaultQuest.shardsFound.push(siteId);
    this.saveBlackVaultState();
    
    const found = this.blackVaultQuest.shardsFound.length;
    const total = this.blackVaultShardSites.length;
    this.showBotAssistant(`black vault shard recovered (${found}/${total}): ${shardValue}`);
    
    if (found >= total) {
      this.showBotAssistant('all shards recovered. run "assemble <full_contract_address>" in terminal.');
    }
    
    return true;
  }
}
