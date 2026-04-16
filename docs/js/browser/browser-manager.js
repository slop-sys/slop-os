/**
 * Browser Manager
 * Coordinates browser navigation and site loading
 */

import { SlopHub } from './sites/slophub.js';
import { SlopNews } from './sites/slopnews.js';
import { Wikislop } from './sites/wikislop.js';
import { Slopchan } from './sites/slopchan.js';
import { Slopmaxxing } from './sites/slopmaxxing.js';
import { SlopScope } from './sites/slopscope.js';

export class BrowserManager {
  constructor() {
    this.sites = {
      slophub: new SlopHub(),
      slopnews: new SlopNews(),
      wikislop: new Wikislop(),
      slopchan: new Slopchan(),
      slopmaxxing: new Slopmaxxing(),
      slopscope: new SlopScope()
    };
    
    this.history = [];
    this.historyIndex = -1;
  }

  /**
   * Load a browser page
   * @param {string} url - The URL to load
   * @param {boolean} addToHistory - Whether to add to browser history
   */
  loadPage(url, addToHistory = true) {
    const addressBar = document.getElementById('browser-address');
    const browserTitle = document.getElementById('browser-title');
    const browserStatus = document.getElementById('browser-status');
    const homePage = document.getElementById('browser-home-page');
    const errorPage = document.getElementById('browser-error');
    const loadingIndicator = document.getElementById('browser-loading');
    const browserFrame = document.getElementById('browser-frame');
    
    // Custom slop:// pages
    const slophubPage = document.getElementById('browser-page-slophub');
    
    // Add to history
    if (addToHistory) {
      this.historyIndex++;
      this.history = this.history.slice(0, this.historyIndex);
      this.history.push(url);
    }
    
    // Hide all content
    homePage.style.display = 'none';
    errorPage.style.display = 'none';
    browserFrame.style.display = 'none';
    if (slophubPage) slophubPage.style.display = 'none';
    loadingIndicator.style.display = 'block';
    
    // Update address bar
    addressBar.value = url === 'home' ? 'about:home' : url;
    
    // Simulate loading delay
    setTimeout(() => {
      loadingIndicator.style.display = 'none';
      
      if (url === 'home' || url === 'about:home') {
        homePage.style.display = 'block';
        browserTitle.textContent = 'Microslop Explorer - Home';
        browserStatus.textContent = 'Ready';
      } else if (url.startsWith('slop://slophub')) {
        if (slophubPage) slophubPage.style.display = 'block';
        browserTitle.textContent = 'Microslop Explorer - SlopHub';
        
        // Handle video URLs
        const videoMatch = url.match(/#video\/(.+)/);
        if (videoMatch) {
          const videoId = videoMatch[1];
          const video = this.sites.slophub.videos[videoId];
          if (video) {
            this.sites.slophub.showVideo(videoId, (newUrl) => this.loadPage(newUrl));
            browserStatus.textContent = `SlopHub - ${video.title}`;
          } else {
            this.sites.slophub.showHome();
            browserStatus.textContent = 'SlopHub - Home';
          }
        } else {
          this.sites.slophub.showHome();
          browserStatus.textContent = 'SlopHub - Home';
        }
      } else {
        errorPage.style.display = 'block';
        browserTitle.textContent = 'Microslop Explorer - Page Not Found';
        browserStatus.textContent = 'Error';
      }
    }, 300);
  }

  /**
   * Navigate back in history
   */
  goBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  /**
   * Navigate forward in history
   */
  goForward() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  /**
   * Reload current page
   */
  reload() {
    if (this.historyIndex >= 0) {
      this.loadPage(this.history[this.historyIndex], false);
    }
  }

  /**
   * Go to home page
   */
  goHome() {
    this.loadPage('home');
  }

  /**
   * Can navigate back?
   * @returns {boolean}
   */
  canGoBack() {
    return this.historyIndex > 0;
  }

  /**
   * Can navigate forward?
   * @returns {boolean}
   */
  canGoForward() {
    return this.historyIndex < this.history.length - 1;
  }
}
