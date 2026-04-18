/**
 * Browser Manager
 * Owns browser shell UI, routing, and site rendering.
 */

import { SlopHub } from './sites/slophub.js';
import { SlopNews } from './sites/slopnews.js';
import { Wikislop } from './sites/wikislop.js';
import { Slopchan } from './sites/slopchan.js';
import { Slopmaxxing } from './sites/slopmaxxing.js';
import { SlopScope } from './sites/slopscope.js';

export class BrowserManager {
  constructor(options = {}) {
    this.sites = {
      slophub: new SlopHub(),
      slopnews: new SlopNews(),
      wikislop: new Wikislop(),
      slopchan: new Slopchan(),
      slopmaxxing: new Slopmaxxing(),
      slopscope: new SlopScope()
    };

    this.playClickSound = typeof options.playClickSound === 'function' ? options.playClickSound : () => {};
    this.showBotAssistant = typeof options.showBotAssistant === 'function' ? options.showBotAssistant : () => {};
    this.triggerGenZeroQuest = typeof options.triggerGenZeroQuest === 'function' ? options.triggerGenZeroQuest : () => {};
    this.getGenZeroQuestState = typeof options.getGenZeroQuestState === 'function' ? options.getGenZeroQuestState : () => null;
    this.renderGenerationZeroArchive = typeof options.renderGenerationZeroArchive === 'function' ? options.renderGenerationZeroArchive : () => {};
    this.openExternalUrl = typeof options.openExternalUrl === 'function' ? options.openExternalUrl : (url) => window.open(url, '_blank');
    this.onSlopPageLoaded = typeof options.onSlopPageLoaded === 'function' ? options.onSlopPageLoaded : () => {};

    this.history = [];
    this.historyIndex = -1;

    this.browserFavorites = [
      { name: 'SlopHub', url: 'slop://slophub' },
      { name: 'SLOPNEWS', url: 'slop://slopnews' },
      { name: 'Daily Slop', url: 'slop://dailyslop' },
      { name: 'Wikislop', url: 'slop://wikislop' },
      { name: 'Slopmaxxing Forums', url: 'slop://slopmaxxing' },
      { name: 'Slopchan', url: 'slop://slopchan' },
      { name: 'SlopScope', url: 'slop://slopscope' },
      { name: 'AI Art Gallery', url: 'slop://aigallery' },
      { name: 'Prompt Kingdom', url: 'slop://promptkingdom' },
      { name: 'Generic Content Depot', url: 'slop://contentfarm' },
      { name: 'AI Webring', url: 'slop://webring' }
    ];

    this.activeBrowserMenu = null;
    this.activeMenuTrigger = null;
    this.initialized = false;
  }

  resetPageScroll(pageEl) {
    if (!pageEl) return;

    pageEl.scrollTop = 0;

    if (typeof pageEl.scrollTo === 'function') {
      pageEl.scrollTo(0, 0);
    }
  }

  setup() {
    if (this.initialized) return;
    this.initialized = true;

    const backBtn = document.getElementById('browser-back');
    const forwardBtn = document.getElementById('browser-forward');
    const refreshBtn = document.getElementById('browser-refresh');
    const stopBtn = document.getElementById('browser-stop');
    const homeBtn = document.getElementById('browser-home');
    const searchBtn = document.getElementById('browser-search');
    const favoritesBtn = document.getElementById('browser-favorites');
    const historyBtn = document.getElementById('browser-history');
    const mailBtn = document.getElementById('browser-mail');
    const printBtn = document.getElementById('browser-print');
    const linksBtn = document.getElementById('browser-links');
    const goBtn = document.getElementById('browser-go');
    const menuFile = document.getElementById('browser-menu-file');
    const menuEdit = document.getElementById('browser-menu-edit');
    const menuView = document.getElementById('browser-menu-view');
    const menuGo = document.getElementById('browser-menu-go');
    const menuFavorites = document.getElementById('browser-menu-favorites');
    const menuHelp = document.getElementById('browser-menu-help');
    const addressBar = document.getElementById('browser-address');
    const browserStatus = document.getElementById('browser-status');

    const loadCurrentPage = () => {
      if (this.historyIndex >= 0) {
        this.loadPage(this.history[this.historyIndex], false);
      } else {
        this.loadPage('home', false);
      }
    };

    const showSearchMessage = () => {
      this.showBotAssistant('Search functionality: recursively trained on SEO spam. Results guaranteed 57% relevant.');
    };

    const showHistoryMessage = () => {
      const historyList = this.history.slice(0, this.historyIndex + 1).join(', ');
      this.showBotAssistant(`Browser History: ${historyList || 'None'}`);
    };

    const loadAddressBarUrl = () => {
      if (!addressBar) return;
      const url = addressBar.value.trim();
      if (url) {
        this.loadPage(url);
      }
    };

    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBack());
    }

    if (forwardBtn) {
      forwardBtn.addEventListener('click', () => this.goForward());
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        if (browserStatus) {
          browserStatus.textContent = 'Stopped';
        }
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', loadCurrentPage);
    }

    if (homeBtn) {
      homeBtn.addEventListener('click', () => this.goHome());
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', showSearchMessage);
    }

    if (favoritesBtn) {
      favoritesBtn.addEventListener('click', () => {
        this.showBrowserMenu(favoritesBtn, this.getFavoritesMenuItems());
      });
    }

    if (historyBtn) {
      historyBtn.addEventListener('click', showHistoryMessage);
    }

    if (mailBtn) {
      mailBtn.addEventListener('click', () => {
        this.showBotAssistant('Email compromised by agent. All messages rewritten as training data.');
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        this.showBotAssistant('Print function outputs AI-generated lorem ipsum. 847 generations degraded.');
      });
    }

    if (linksBtn) {
      linksBtn.addEventListener('click', () => {
        this.showBotAssistant('Links: slop://slophub, slop://slopnews, slop://wikislop, slop://slopmaxxing, slop://slopchan');
      });
    }

    if (menuFile) {
      menuFile.addEventListener('click', () => {
        this.showBrowserMenu(menuFile, [
          { label: 'New\tWindow', shortcut: 'Ctrl+N', action: () => this.loadPage('about:blank') },
          { label: 'Open...', shortcut: 'Ctrl+O' },
          { label: 'Edit\twith Notepad' },
          'separator',
          { label: 'Save As...' },
          { label: 'Page Setup...' },
          { label: 'Print...', shortcut: 'Ctrl+P' },
          'separator',
          { label: 'Send' },
          { label: 'Import and Export...' },
          { label: 'Properties' },
          { label: 'Work Offline' },
          'separator',
          { label: 'Close' }
        ]);
      });
    }

    if (menuEdit) {
      menuEdit.addEventListener('click', () => {
        this.showBrowserMenu(menuEdit, [
          { label: 'Cut', shortcut: 'Ctrl+X' },
          { label: 'Copy', shortcut: 'Ctrl+C' },
          { label: 'Paste', shortcut: 'Ctrl+V' },
          'separator',
          { label: 'Select All', shortcut: 'Ctrl+A', action: () => {
            if (addressBar) {
              addressBar.focus();
              addressBar.select();
            }
          } },
          { label: 'Find (on This Page)...', shortcut: 'Ctrl+F' }
        ]);
      });
    }

    if (menuView) {
      menuView.addEventListener('click', () => {
        this.showBrowserMenu(menuView, [
          { label: 'Toolbars' },
          { label: 'Status Bar' },
          'separator',
          { label: 'Stop', action: () => {
            if (browserStatus) {
              browserStatus.textContent = 'Stopped';
            }
          } },
          { label: 'Refresh', action: () => loadCurrentPage() },
          { label: 'Source' },
          { label: 'Full Screen' }
        ]);
      });
    }

    if (menuGo) {
      menuGo.addEventListener('click', () => {
        this.showBrowserMenu(menuGo, [
          { label: 'Back', action: () => this.goBack() },
          { label: 'Forward', action: () => this.goForward() },
          { label: 'Home Page', action: () => this.goHome() },
          'separator',
          { label: 'Search the Web', action: () => showSearchMessage() },
          { label: 'History', action: () => showHistoryMessage() }
        ]);
      });
    }

    if (menuFavorites) {
      menuFavorites.addEventListener('click', () => {
        this.showBrowserMenu(menuFavorites, this.getFavoritesMenuItems());
      });
    }

    if (menuHelp) {
      menuHelp.addEventListener('click', () => {
        this.showBrowserMenu(menuHelp, [
          { label: 'Contents and Index' },
          { label: 'Tip of the Day' },
          { label: 'For Netscape Users' },
          'separator',
          { label: 'About Microslop Explorer', action: () => this.showBotAssistant('Microslop Explorer 4.0 - recursively generated browsing experience.') }
        ]);
      });
    }

    if (goBtn) {
      goBtn.addEventListener('click', loadAddressBarUrl);
    }

    if (addressBar) {
      addressBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          loadAddressBarUrl();
        }
      });
    }

    document.addEventListener('mousedown', (e) => {
      if (!this.activeBrowserMenu) return;
      if (this.activeBrowserMenu.contains(e.target)) return;
      if (this.activeMenuTrigger && this.activeMenuTrigger.contains(e.target)) return;
      this.closeBrowserMenu();
    });

    window.addEventListener('resize', () => this.closeBrowserMenu());

    this.bindBrowserLinks();
    this.loadPage('home', false);
  }

  bindBrowserLinks(scope = document) {
    scope.querySelectorAll('.browser-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.dataset.url;
        if (url) {
          this.loadPage(url);
        }
      });
    });
  }

  closeBrowserMenu() {
    if (this.activeBrowserMenu) {
      this.activeBrowserMenu.remove();
      this.activeBrowserMenu = null;
    }

    if (this.activeMenuTrigger) {
      this.activeMenuTrigger.classList.remove('active');
      this.activeMenuTrigger = null;
    }
  }

  showBrowserMenu(triggerEl, items) {
    if (!triggerEl) return;

    if (this.activeMenuTrigger === triggerEl) {
      this.closeBrowserMenu();
      return;
    }

    this.closeBrowserMenu();

    const menuEl = document.createElement('div');
    menuEl.className = 'browser-dropdown-menu';

    items.forEach((item) => {
      if (item === 'separator') {
        const separator = document.createElement('div');
        separator.className = 'browser-dropdown-separator';
        menuEl.appendChild(separator);
        return;
      }

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'browser-dropdown-item';

      const label = document.createElement('span');
      label.textContent = item.label;
      button.appendChild(label);

      const shortcut = document.createElement('span');
      shortcut.className = 'browser-dropdown-shortcut';
      shortcut.textContent = item.shortcut || '';
      button.appendChild(shortcut);

      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playClickSound();
        this.closeBrowserMenu();
        if (item.action) {
          item.action();
        }
      });

      menuEl.appendChild(button);
    });

    document.body.appendChild(menuEl);

    const rect = triggerEl.getBoundingClientRect();
    const menuWidth = menuEl.offsetWidth;
    const menuHeight = menuEl.offsetHeight;
    const left = Math.max(4, Math.min(rect.left, window.innerWidth - menuWidth - 4));
    const top = Math.max(4, Math.min(rect.bottom, window.innerHeight - menuHeight - 4));

    menuEl.style.left = `${left}px`;
    menuEl.style.top = `${top}px`;

    this.activeBrowserMenu = menuEl;
    this.activeMenuTrigger = triggerEl;
    this.activeMenuTrigger.classList.add('active');
  }

  getFavoritesMenuItems() {
    const baseItems = [
      { label: 'Add to Favorites...', shortcut: 'Ctrl+D' },
      { label: 'Organize Favorites...' },
      'separator'
    ];

    const dynamicItems = this.browserFavorites.map((favorite) => ({
      label: favorite.name,
      action: () => this.loadPage(favorite.url)
    }));

    return [...baseItems, ...dynamicItems];
  }

  loadPage(url, addToHistory = true) {
    const addressBar = document.getElementById('browser-address');
    const browserTitle = document.getElementById('browser-title');
    const browserStatus = document.getElementById('browser-status');
    const homePage = document.getElementById('browser-home-page');
    const errorPage = document.getElementById('browser-error');
    const loadingIndicator = document.getElementById('browser-loading');
    const browserFrame = document.getElementById('browser-frame');

    const aiGalleryPage = document.getElementById('browser-page-aigallery');
    const promptKingdomPage = document.getElementById('browser-page-promptkingdom');
    const contentFarmPage = document.getElementById('browser-page-contentfarm');
    const webringPage = document.getElementById('browser-page-webring');
    const slophubPage = document.getElementById('browser-page-slophub');
    const slopnewsPage = document.getElementById('browser-page-slopnews');
    const dailyslopPage = document.getElementById('browser-page-dailyslop');
    const slopipediaPage = document.getElementById('browser-page-slopipedia');
    const slopmaxxingPage = document.getElementById('browser-page-slopmaxxing');
    const slopchanPage = document.getElementById('browser-page-slopchan');
    const slopscopePage = document.getElementById('browser-page-slopscope');
    const resetActivePageScroll = (pageEl) => this.resetPageScroll(pageEl);
    let activeSiteId = null;
    let activeSitePage = null;

    if (addToHistory) {
      this.historyIndex++;
      this.history = this.history.slice(0, this.historyIndex);
      this.history.push(url);
    }

    homePage.style.display = 'none';
    errorPage.style.display = 'none';
    browserFrame.style.display = 'none';
    if (aiGalleryPage) aiGalleryPage.style.display = 'none';
    if (promptKingdomPage) promptKingdomPage.style.display = 'none';
    if (contentFarmPage) contentFarmPage.style.display = 'none';
    if (webringPage) webringPage.style.display = 'none';
    if (slophubPage) slophubPage.style.display = 'none';
    if (slopnewsPage) slopnewsPage.style.display = 'none';
    if (dailyslopPage) dailyslopPage.style.display = 'none';
    if (slopipediaPage) slopipediaPage.style.display = 'none';
    if (slopmaxxingPage) slopmaxxingPage.style.display = 'none';
    if (slopchanPage) slopchanPage.style.display = 'none';
    if (slopscopePage) slopscopePage.style.display = 'none';
    loadingIndicator.style.display = 'block';

    if (addressBar) {
      addressBar.value = url === 'home' ? 'about:home' : url;
    }

    setTimeout(() => {
      loadingIndicator.style.display = 'none';

      if (url === 'home' || url === 'about:home') {
        homePage.style.display = 'block';
        resetActivePageScroll(homePage);
        browserTitle.textContent = 'Slop Labs Research Portal - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url === 'about:blank') {
        browserFrame.src = 'about:blank';
        browserFrame.style.display = 'block';
        browserTitle.textContent = 'Blank Page - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url === 'slop://aigallery') {
        if (aiGalleryPage) aiGalleryPage.style.display = 'block';
        resetActivePageScroll(aiGalleryPage);
        activeSiteId = 'aigallery';
        activeSitePage = aiGalleryPage;
        browserTitle.textContent = '** FREE AI ART GALLERY ** - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url === 'slop://promptkingdom') {
        if (promptKingdomPage) promptKingdomPage.style.display = 'block';
        resetActivePageScroll(promptKingdomPage);
        activeSiteId = 'promptkingdom';
        activeSitePage = promptKingdomPage;
        browserTitle.textContent = '** AI PROMPT KINGDOM ** - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url === 'slop://contentfarm') {
        if (contentFarmPage) contentFarmPage.style.display = 'block';
        resetActivePageScroll(contentFarmPage);
        activeSiteId = 'contentfarm';
        activeSitePage = contentFarmPage;
        browserTitle.textContent = 'GENERIC CONTENT DEPOT - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url === 'slop://webring') {
        if (webringPage) webringPage.style.display = 'block';
        resetActivePageScroll(webringPage);
        activeSiteId = 'webring';
        activeSitePage = webringPage;
        browserTitle.textContent = '** AI WEBRING ** - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://slophub')) {
        if (slophubPage) slophubPage.style.display = 'block';
        resetActivePageScroll(slophubPage);
        activeSiteId = 'slophub';
        activeSitePage = slophubPage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.slophub;
        if (hash.startsWith('video/')) {
          const videoId = hash.slice(6);
          site.showVideo(videoId, (newUrl) => this.loadPage(newUrl));
          const video = site.videos[videoId];
          browserTitle.textContent = video ? `${video.title} - SlopHub - Microslop Explorer` : 'SLOPHUB - Premium Slop Streaming - Microslop Explorer';
        } else {
          site.showHome((newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = 'SLOPHUB - Premium Slop Streaming - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://slopnews')) {
        if (slopnewsPage) slopnewsPage.style.display = 'block';
        resetActivePageScroll(slopnewsPage);
        activeSiteId = 'slopnews';
        activeSitePage = slopnewsPage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.slopnews;
        if (hash.startsWith('article/')) {
          const articleId = hash.slice(8);
          site.showArticle(articleId, (newUrl) => this.loadPage(newUrl));
          const article = site.articles[articleId];
          browserTitle.textContent = article ? `${article.headline} - Slopnews - Microslop Explorer` : 'SLOPNEWS - Breaking Slop Alerts - Microslop Explorer';
        } else {
          site.showHome((newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = 'SLOPNEWS - Breaking Slop Alerts - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else if (url === 'slop://dailyslop') {
        if (dailyslopPage) dailyslopPage.style.display = 'block';
        resetActivePageScroll(dailyslopPage);
        browserTitle.textContent = 'Daily Slop dot BIZ - Microslop Explorer';
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://wikislop')) {
        if (slopipediaPage) slopipediaPage.style.display = 'block';
        resetActivePageScroll(slopipediaPage);
        activeSiteId = 'wikislop';
        activeSitePage = slopipediaPage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.wikislop;
        if (hash.startsWith('article/')) {
          const articleId = hash.slice(8);
          site.showArticle(articleId, (newUrl) => this.loadPage(newUrl), this.sites.slopnews.articles);
          const article = site.articles[articleId];
          browserTitle.textContent = article ? `${article.title} - Wikislop - Microslop Explorer` : 'Wikislop, the free slop encyclopedia - Microslop Explorer';
        } else {
          site.showHome((newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = 'Wikislop, the free slop encyclopedia - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://slopmaxxing')) {
        if (slopmaxxingPage) slopmaxxingPage.style.display = 'block';
        resetActivePageScroll(slopmaxxingPage);
        activeSiteId = 'slopmaxxing';
        activeSitePage = slopmaxxingPage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.slopmaxxing;
        if (hash.startsWith('board/')) {
          const boardName = hash.slice(6);
          site.showBoard(boardName, (newUrl) => this.loadPage(newUrl));
          const boardLabels = { lab: '/lab/', protocols: '/protocols/', 'field-reports': '/field-reports/', detox: '/detox/', failures: '/failures/', archive: '/archive/' };
          browserTitle.textContent = `${boardLabels[boardName] || boardName} - Slopmaxxing Forums - Microslop Explorer`;
        } else if (hash.startsWith('thread/')) {
          const threadId = hash.slice(7);
          site.showThread(threadId, (newUrl) => this.loadPage(newUrl));
          const thread = site.threads[threadId];
          browserTitle.textContent = thread ? `${thread.title} - Slopmaxxing - Microslop Explorer` : 'Slopmaxxing Forums - Microslop Explorer';
        } else {
          site.showIndex((newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = 'Slopmaxxing Forums - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://slopchan')) {
        if (slopchanPage) slopchanPage.style.display = 'block';
        resetActivePageScroll(slopchanPage);
        activeSiteId = 'slopchan';
        activeSitePage = slopchanPage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.slopchan;
        if (hash.startsWith('board/')) {
          const boardId = hash.slice(6);
          site.showCatalog(boardId, (newUrl) => this.loadPage(newUrl));
          const board = site.boards[boardId];
          browserTitle.textContent = board ? `${board.name} - Slopchan - Microslop Explorer` : 'Slopchan - Microslop Explorer';
        } else if (hash.startsWith('thread/')) {
          const threadId = hash.slice(7);
          site.showThread(threadId, (newUrl) => this.loadPage(newUrl));
          const thread = site.threads[threadId];
          browserTitle.textContent = thread ? `${thread.subject || 'Thread'} - /${thread.board}/ - Slopchan - Microslop Explorer` : 'Slopchan - Microslop Explorer';
        } else {
          site.showCatalog('slop', (newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = '/slop/ - Random - Slopchan - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else if (url.startsWith('slop://slopscope')) {
        if (slopscopePage) slopscopePage.style.display = 'block';
        resetActivePageScroll(slopscopePage);
        activeSiteId = 'slopscope';
        activeSitePage = slopscopePage;

        const hashIdx = url.indexOf('#');
        const hash = hashIdx !== -1 ? url.slice(hashIdx + 1) : '';

        const site = this.sites.slopscope;
        if (hash.startsWith('chart/')) {
          const coinId = hash.slice(6);
          site.showChart(
            coinId,
            (newUrl) => this.loadPage(newUrl),
            (message) => this.showBotAssistant(message)
          );
          const coin = site.coins[coinId];
          browserTitle.textContent = coin ? `${coin.symbol} - SlopScope - Microslop Explorer` : 'SlopScope - Microslop Explorer';
        } else {
          site.showCatalog((newUrl) => this.loadPage(newUrl));
          browserTitle.textContent = 'SlopScope - Slopcoin Trading Terminal - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      } else {
        errorPage.style.display = 'block';
        resetActivePageScroll(errorPage);
        browserTitle.textContent = 'The page cannot be displayed - Microslop Explorer';
        browserStatus.textContent = 'Done';
        this.openExternalUrl(url);
      }

      const questState = this.getGenZeroQuestState();
      if (questState && !questState.triggered && url.startsWith('slop://') && url !== 'slop://generation-zero') {
        this.triggerGenZeroQuest();
      }

      const latestQuestState = this.getGenZeroQuestState();
      if (url === 'slop://generation-zero' && latestQuestState) {
        if (!latestQuestState.completed) {
          errorPage.style.display = 'block';
          errorPage.innerHTML = `
            <div style="padding: 40px; text-align: center; font-family: Arial;">
              <img src="icons/msg_error-0.png" alt="" style="width: 48px; height: 48px; margin-bottom: 16px;">
              <h2 style="color: #c00;">Access Denied</h2>
              <p style="color: #666; margin-top: 16px;">Generation Zero archive is locked.</p>
              <p style="color: #666; margin-top: 8px; font-size: 12px;">
                Find all ${7 - latestQuestState.fragmentsFound.length} remaining data fragments to unlock.
              </p>
              <p style="color: #666; margin-top: 8px; font-size: 11px;">
                Fragments found: ${latestQuestState.fragmentsFound.length} / 7
              </p>
            </div>
          `;
          browserTitle.textContent = 'Access Denied - Microslop Explorer';
        } else {
          this.renderGenerationZeroArchive();
          browserTitle.textContent = 'Generation Zero Archive - CLASSIFIED - Microslop Explorer';
        }
        browserStatus.textContent = 'Done';
      }

      if (activeSiteId && activeSitePage) {
        this.onSlopPageLoaded({ siteId: activeSiteId, pageEl: activeSitePage, url });
      }
    }, 500);
  }

  goBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  goForward() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  reload() {
    if (this.historyIndex >= 0) {
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  goHome() {
    this.loadPage('home');
  }

  canGoBack() {
    return this.historyIndex > 0;
  }

  canGoForward() {
    return this.historyIndex < this.history.length - 1;
  }
}
