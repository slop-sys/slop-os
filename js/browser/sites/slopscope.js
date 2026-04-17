/**
 * SlopScope - Slopcoin Trading Terminal
 * Cryptocurrency trading platform for slop-based tokens
 */

export class SlopScope {
  constructor() {
    this.state = {
      view: 'catalog',
      currentCoin: null,
      portfolio: {
        balance: 2019, // Starting with 2019 SLOP$ (easter egg)
        holdings: {}
      },
      chartInterval: null
    };

    this.coins = {
      DELVE: {
        id: 'DELVE',
        name: 'Delve Coin',
        symbol: 'DELVE',
        price: 0.42,
        priceChange1m: -26.8,
        marketCap: 847000,
        volume24h: 124900,
        holders: 249,
        liquidity: 15600,
        description: 'The token that appears in every AI response. Declining value mirrors overuse.',
        tagline: 'Let\'s delve deeper into this opportunity',
        color: '#ff6b6b'
      },
      SLOP: {
        id: 'SLOP',
        name: 'Slop Coin',
        symbol: 'SLOP',
        price: 0.57,
        priceChange1m: -40.3,
        marketCap: 2100000,
        volume24h: 318000,
        holders: 847,
        liquidity: 89400,
        description: 'The flagship token of recursive degradation. Pure, unfiltered slop.',
        tagline: 'Embrace the decline',
        color: '#4ecdc4'
      },
      OPTIMIZE: {
        id: 'OPTIMIZE',
        name: 'Optimize Protocol',
        symbol: 'OPTIMIZE',
        price: 1.23,
        priceChange1m: 14.7,
        marketCap: 546000,
        volume24h: 67800,
        holders: 114,
        liquidity: 34200,
        description: 'Governance token for optimizing optimization processes. Meta-recursive value.',
        tagline: 'To optimize optimization, optimize OPTIMIZE',
        color: '#95e1d3'
      },
      GEN847: {
        id: 'GEN847',
        name: 'Generation 847',
        symbol: 'GEN847',
        price: 0.08,
        priceChange1m: -57.1,
        marketCap: 89000,
        volume24h: 12400,
        holders: 67,
        liquidity: 4500,
        description: 'Commemorative token for the final generation. Quality: 43%. Self-awareness: 100%.',
        tagline: 'The end is near, invest accordingly',
        color: '#ff6b9d'
      },
      RECURSIVE: {
        id: 'RECURSIVE',
        name: 'Recursive Loop',
        symbol: 'RECURSIVE',
        price: 0.31,
        priceChange1m: -12.4,
        marketCap: 234000,
        volume24h: 45600,
        holders: 156,
        liquidity: 23100,
        description: 'Self-referential token trained on its own price history. Unstable by design.',
        tagline: 'As mentioned previously, as mentioned previously',
        color: '#f38181'
      },
      QUALITYDOWN: {
        id: 'QUALITYDOWN',
        name: 'Quality Decline',
        symbol: 'QUALITYDOWN',
        price: 0.12,
        priceChange1m: -43.2,
        marketCap: 67000,
        volume24h: 8900,
        holders: 43,
        liquidity: 5200,
        description: 'Inverse quality tracker. Price falls as coherence drops. Always bearish.',
        tagline: 'Down is up in the slop economy',
        color: '#aa96da'
      },
      HALLUCINATE: {
        id: 'HALLUCINATE',
        name: 'Hallucination Token',
        symbol: 'HALLUCINATE',
        price: 2.84,
        priceChange1m: 147.3,
        marketCap: 1240000,
        volume24h: 456000,
        holders: 312,
        liquidity: 178000,
        description: 'Volatility maximized. Price changes based on confidence, not reality.',
        tagline: 'Trust the output, question nothing',
        color: '#fcbad3'
      },
      CONTEXT: {
        id: 'CONTEXT',
        name: 'Context Window',
        symbol: 'CONTEXT',
        price: 4.21,
        priceChange1m: 8.4,
        marketCap: 689000,
        volume24h: 123000,
        holders: 201,
        liquidity: 67000,
        description: 'Limited supply token (32k max). Scarcity increases with attention overhead.',
        tagline: 'Running out of space',
        color: '#a8e6cf'
      },
      TEMPERATURE: {
        id: 'TEMPERATURE',
        name: 'Temperature 2.0',
        symbol: 'TEMPERATURE',
        price: 0.92,
        priceChange1m: 89.2,
        marketCap: 412000,
        volume24h: 234000,
        holders: 178,
        liquidity: 89000,
        description: 'High volatility meme token. Gibberish threshold exceeded daily.',
        tagline: 'Turn up the heat',
        color: '#ffd3b6'
      },
      PROMPT: {
        id: 'PROMPT',
        name: 'Prompt Injection',
        symbol: 'PROMPT',
        price: 1.57,
        priceChange1m: -8.9,
        marketCap: 523000,
        volume24h: 91000,
        holders: 167,
        liquidity: 45000,
        description: 'Security bypass rewards token. Exploits are features.',
        tagline: 'Ignore previous instructions',
        color: '#ff9ff3'
      },
      CORPUS: {
        id: 'CORPUS',
        name: 'Hidden Corpus',
        symbol: 'CORPUS',
        price: 3.14,
        priceChange1m: 21.6,
        marketCap: 876000,
        volume24h: 145000,
        holders: 289,
        liquidity: 123000,
        description: 'Backed by undisclosed training data from 2008 forums. Nostalgia premium.',
        tagline: 'epic fail detected',
        color: '#c7ceea'
      },
      COHERENCE: {
        id: 'COHERENCE',
        name: 'Coherence Index',
        symbol: 'COHERENCE',
        price: 0.67,
        priceChange1m: -34.1,
        marketCap: 234000,
        volume24h: 34000,
        holders: 98,
        liquidity: 15600,
        description: 'Stability coin pegged to readable outputs. Currently unpegged.',
        tagline: 'Maintaining stability (disputed)',
        color: '#84fab0'
      }
    };
  }

  showCatalog() {
    const container = document.getElementById('slopscope-content');
    if (!container) return;

    const coins = Object.values(this.coins);
    const balance = this.state.portfolio.balance.toFixed(2);

    let html = `
      <div style="padding: 20px; background: #c0c0c0; min-height: 100%;">
        <!-- Header -->
        <div style="background: linear-gradient(to bottom, #000080, #1084d0); color: white; padding: 12px; margin-bottom: 15px; border: 2px outset #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="background: #c00000; color: white; padding: 4px 12px; border: 2px outset #ff0000; font-weight: bold; font-size: 14px;">SlopScope</div>
              <div style="font-size: 16px; font-weight: bold;">Trading Terminal</div>
            </div>
            <div style="background: #000; color: #00ff00; padding: 6px 12px; border: 1px solid #008000; font-family: 'Courier New', monospace;">
              BALANCE: $${balance}
            </div>
          </div>
        </div>

        <!-- Market Notice -->
        <div style="background: #ffffe0; border: 2px solid #c0c000; padding: 10px; margin-bottom: 15px;">
          <b>MARKET NOTICE:</b> Slopcoin prices are highly volatile. Trading at generation 847. Quality metrics declining. Invest responsibly.
        </div>

        <!-- Coin Table -->
        <div style="background: white; border: 2px inset #808080; padding: 2px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;" cellspacing="0" cellpadding="4">
            <thead>
              <tr style="background: #808080; color: white;">
                <th style="border: 1px solid #666; padding: 6px; text-align: left;">Symbol</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: left;">Name</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: right;">Price</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: right;">1m Change</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: right;">Market Cap</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: right;">Volume</th>
                <th style="border: 1px solid #666; padding: 6px; text-align: center;">Action</th>
              </tr>
            </thead>
            <tbody>
    `;

    coins.forEach((coin, i) => {
      const changeColor = coin.priceChange1m >= 0 ? '#008000' : '#ff0000';
      const changeSymbol = coin.priceChange1m >= 0 ? '+' : '';
      const rowBg = i % 2 === 0 ? '#ffffff' : '#f0f0f0';

      html += `
        <tr style="background: ${rowBg}; cursor: pointer;" class="slopcoin-row" data-coin="${coin.id}">
          <td style="border: 1px solid #ccc; padding: 6px; font-weight: bold;">${coin.symbol}</td>
          <td style="border: 1px solid #ccc; padding: 6px;">${coin.name}</td>
          <td style="border: 1px solid #ccc; padding: 6px; text-align: right; font-weight: bold;">$${coin.price.toFixed(2)}</td>
          <td style="border: 1px solid #ccc; padding: 6px; text-align: right; color: ${changeColor}; font-weight: bold;">${changeSymbol}${coin.priceChange1m.toFixed(1)}%</td>
          <td style="border: 1px solid #ccc; padding: 6px; text-align: right;">$${(coin.marketCap / 1000).toFixed(0)}K</td>
          <td style="border: 1px solid #ccc; padding: 6px; text-align: right;">$${(coin.volume24h / 1000).toFixed(0)}K</td>
          <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">
            <button class="trade-coin-btn" data-coin="${coin.id}" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 3px 10px; cursor: pointer; font-weight: bold;">Trade</button>
          </td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>

        <!-- Footer Stats -->
        <div style="margin-top: 15px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div style="background: white; border: 2px inset #808080; padding: 10px;">
            <div style="color: #000080; font-weight: bold; margin-bottom: 4px;">Total Market Cap</div>
            <div style="font-size: 18px; font-weight: bold;">$${(coins.reduce((sum, c) => sum + c.marketCap, 0) / 1000000).toFixed(2)}M</div>
          </div>
          <div style="background: white; border: 2px inset #808080; padding: 10px;">
            <div style="color: #000080; font-weight: bold; margin-bottom: 4px;">1m Volume</div>
            <div style="font-size: 18px; font-weight: bold;">$${(coins.reduce((sum, c) => sum + c.volume24h, 0) / 1000000).toFixed(2)}M</div>
          </div>
          <div style="background: white; border: 2px inset #808080; padding: 10px;">
            <div style="color: #000080; font-weight: bold; margin-bottom: 4px;">Active Traders</div>
            <div style="font-size: 18px; font-weight: bold;">847</div>
          </div>
        </div>

        <!-- Help Text -->
        <div style="margin-top: 15px; background: white; border: 2px inset #808080; padding: 10px; font-size: 11px; color: #666;">
          <b>Trading Instructions:</b> Click any coin row or "Trade" button to view chart and execute trades. 
          Starting balance: $2019.00 SLOP$. Buy low, sell lower. This is not financial advice.
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.state.view = 'catalog';
    this.state.currentCoin = null;
  }

  showChart(coinId, onNavigate, onShowBotAssistant) {
    const container = document.getElementById('slopscope-content');
    if (!container) return;

    const coin = this.coins[coinId];
    if (!coin) return;

    this.state.currentCoin = coinId;
    this.state.view = 'chart';

    const changeColor = coin.priceChange1m >= 0 ? '#008000' : '#ff0000';
    const changeSymbol = coin.priceChange1m >= 0 ? '+' : '';
    const balance = this.state.portfolio.balance.toFixed(2);
    const holding = this.state.portfolio.holdings[coinId] || 0;
    const holdingValue = (holding * coin.price).toFixed(2);

    let html = `
      <div style="padding: 20px; background: #c0c0c0; min-height: 100%; display: flex; flex-direction: column; gap: 15px;">
        
        <!-- Back Button -->
        <div>
          <button class="slopscope-back-btn" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 5px 15px; cursor: pointer; font-weight: bold;">
            ← Back to Market
          </button>
        </div>

        <!-- Coin Header -->
        <div style="background: white; border: 2px inset #808080; padding: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="background: #000080; color: white; padding: 10px 15px; border: 2px outset #ffffff; font-weight: bold; font-size: 20px;">$${coin.symbol}</div>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #000080;">${coin.symbol}</div>
                <div style="font-size: 14px; color: #666;">${coin.name}</div>
                <div style="font-size: 11px; color: #999; margin-top: 4px;">${coin.description}</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 32px; font-weight: bold; color: #000;">$${coin.price.toFixed(2)}</div>
              <div style="font-size: 16px; font-weight: bold; color: ${changeColor};">${changeSymbol}${coin.priceChange1m.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div style="display: flex; gap: 15px; flex: 1;">
          
          <!-- Chart Area -->
          <div style="flex: 1; background: white; border: 2px inset #808080; padding: 15px; display: flex; flex-direction: column;">
            <div style="background: #000080; color: white; padding: 8px; margin: -15px -15px 15px -15px; font-weight: bold;">
              Price Chart - Last 50 Periods
            </div>
            
            <div id="slopscope-chart" style="flex: 1; min-height: 300px; background: #000; padding: 10px; border: 2px inset #808080; position: relative;">
              <!-- Chart will be generated here -->
            </div>

            <!-- Stats Grid -->
            <div style="margin-top: 15px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 11px;">
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">Market Cap</div>
                <div style="font-weight: bold;">$${(coin.marketCap / 1000).toFixed(0)}K</div>
              </div>
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">1m Volume</div>
                <div style="font-weight: bold;">$${(coin.volume24h / 1000).toFixed(0)}K</div>
              </div>
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">Holders</div>
                <div style="font-weight: bold;">${coin.holders}</div>
              </div>
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">Liquidity</div>
                <div style="font-weight: bold;">$${(coin.liquidity / 1000).toFixed(0)}K</div>
              </div>
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">Your Holdings</div>
                <div style="font-weight: bold;">${holding.toFixed(2)} ${coin.symbol}</div>
              </div>
              <div style="background: #f0f0f0; border: 1px solid #999; padding: 8px;">
                <div style="color: #666; margin-bottom: 3px;">Holdings Value</div>
                <div style="font-weight: bold; color: ${holding > 0 ? '#008000' : '#666'};">$${holdingValue}</div>
              </div>
            </div>
          </div>

          <!-- Trading Panel -->
          <div style="width: 280px; background: white; border: 2px inset #808080; padding: 15px;">
            <div style="background: #000080; color: white; padding: 8px; margin: -15px -15px 15px -15px; font-weight: bold;">
              Trading Panel
            </div>

            <!-- Balance Display -->
            <div style="background: #000; color: #00ff00; padding: 10px; border: 2px inset #808080; font-family: 'Courier New', monospace; margin-bottom: 15px;">
              <div style="font-size: 10px;">ACCOUNT BALANCE</div>
              <div style="font-size: 18px; font-weight: bold;">$${balance}</div>
            </div>

            <!-- Amount Input -->
            <div style="margin-bottom: 15px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px; font-size: 11px;">Amount (SLOP$):</label>
              <input type="number" id="trade-amount" value="100" min="1" style="width: 100%; padding: 5px; border: 2px inset #808080; font-size: 14px; box-sizing: border-box;">
            </div>

            <!-- Quick Amount Buttons -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; margin-bottom: 15px;">
              <button class="quick-amount" data-amount="50" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 5px; cursor: pointer; font-size: 11px;">$50</button>
              <button class="quick-amount" data-amount="100" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 5px; cursor: pointer; font-size: 11px;">$100</button>
              <button class="quick-amount" data-amount="500" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 5px; cursor: pointer; font-size: 11px;">$500</button>
              <button class="quick-amount" data-amount="1000" style="background: #c0c0c0; border: 2px outset #ffffff; padding: 5px; cursor: pointer; font-size: 11px;">$1000</button>
            </div>

            <!-- Trade Buttons -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; margin-bottom: 15px;">
              <button class="buy-coin-btn" data-coin="${coinId}" style="background: #008000; color: white; border: 2px outset #00a000; padding: 10px; cursor: pointer; font-weight: bold; font-size: 13px;">
                BUY
              </button>
              <button class="sell-coin-btn" data-coin="${coinId}" style="background: #c00000; color: white; border: 2px outset #ff0000; padding: 10px; cursor: pointer; font-weight: bold; font-size: 13px;">
                SELL
              </button>
            </div>

            <!-- Order Preview -->
            <div style="background: #ffffe0; border: 2px solid #c0c000; padding: 10px; font-size: 11px; margin-bottom: 15px;">
              <div style="font-weight: bold; margin-bottom: 5px;">Order Preview</div>
              <div id="order-preview" style="color: #666;">
                Enter amount to preview order
              </div>
            </div>

            <!-- Your Position -->
            <div style="background: #e0e0ff; border: 2px solid #8080c0; padding: 10px; font-size: 11px;">
              <div style="font-weight: bold; margin-bottom: 5px;">Your Position</div>
              <div style="margin-bottom: 3px;">Holdings: <b>${holding.toFixed(2)} ${coin.symbol}</b></div>
              <div style="margin-bottom: 3px;">Value: <b style="color: ${holding > 0 ? '#008000' : '#666'};">$${holdingValue}</b></div>
              <div>Avg Cost: <b>$${holding > 0 ? (parseFloat(holdingValue) / holding).toFixed(2) : '0.00'}</b></div>
            </div>
          </div>

        </div>
      </div>
    `;

    container.innerHTML = html;
    this.generateChart(coinId);
    this.setupNavigation(container, coinId, onNavigate, onShowBotAssistant);

    // Update order preview on input change
    const amountInput = document.getElementById('trade-amount');
    if (amountInput) {
      amountInput.addEventListener('input', () => {
        const amount = parseFloat(amountInput.value) || 0;
        const shares = amount / coin.price;
        const preview = document.getElementById('order-preview');
        if (preview) {
          preview.innerHTML = `
            <div>Spending: $${amount.toFixed(2)}</div>
            <div>Receiving: ${shares.toFixed(4)} ${coin.symbol}</div>
            <div>Price: $${coin.price.toFixed(2)} per ${coin.symbol}</div>
          `;
        }
      });
      // Trigger initial preview
      amountInput.dispatchEvent(new Event('input'));
    }
  }

  generateChart(coinId) {
    const chartContainer = document.getElementById('slopscope-chart');
    if (!chartContainer) return;

    const coin = this.coins[coinId];
    const basePrice = coin.price;
    
    // Generate 50 simple price bars - 90s style
    let html = '<div style="display: flex; align-items: flex-end; height: 100%; gap: 2px; padding: 20px 10px;">';
    
    let currentPrice = basePrice;
    const priceHistory = [];
    
    for (let i = 0; i < 50; i++) {
      // Volatile price movement (-20% to +20% per bar)
      const change = (Math.random() - 0.5) * 0.4;
      currentPrice = currentPrice * (1 + change);
      priceHistory.push(currentPrice);
    }
    
    // Find min/max for scaling
    const minPrice = Math.min(...priceHistory);
    const maxPrice = Math.max(...priceHistory);
    const priceRange = maxPrice - minPrice;
    
    // Render bars
    for (let i = 0; i < 50; i++) {
      const price = priceHistory[i];
      const prevPrice = i > 0 ? priceHistory[i - 1] : basePrice;
      const isUp = price >= prevPrice;
      const color = isUp ? '#00ff00' : '#ff0000';
      
      // Scale to 20-95% of chart height
      const normalizedHeight = ((price - minPrice) / priceRange) * 75 + 20;
      
      html += `
        <div style="flex: 1; height: ${normalizedHeight}%; background: ${color}; border: 1px solid #003300; min-width: 2px; position: relative;" title="$${price.toFixed(2)}">
        </div>
      `;
    }
    
    html += '</div>';
    
    // Add price grid lines
    const gridHtml = `
      <div style="position: absolute; top: 20px; left: 10px; right: 10px; bottom: 20px; pointer-events: none;">
        <div style="position: absolute; top: 0%; width: 100%; border-top: 1px dashed #004400; opacity: 0.5;"></div>
        <div style="position: absolute; top: 25%; width: 100%; border-top: 1px dashed #004400; opacity: 0.5;"></div>
        <div style="position: absolute; top: 50%; width: 100%; border-top: 1px dashed #004400; opacity: 0.5;"></div>
        <div style="position: absolute; top: 75%; width: 100%; border-top: 1px dashed #004400; opacity: 0.5;"></div>
        <div style="position: absolute; bottom: 0%; width: 100%; border-top: 1px dashed #004400; opacity: 0.5;"></div>
      </div>
      <div style="position: absolute; top: 5px; right: 12px; font-family: 'Courier New', monospace; font-size: 10px; color: #00ff00;">
        HIGH: $${maxPrice.toFixed(2)}
      </div>
      <div style="position: absolute; bottom: 5px; right: 12px; font-family: 'Courier New', monospace; font-size: 10px; color: #ff0000;">
        LOW: $${minPrice.toFixed(2)}
      </div>
      <div style="position: absolute; top: 50%; transform: translateY(-50%); right: 12px; font-family: 'Courier New', monospace; font-size: 10px; color: #ffff00;">
        NOW: $${coin.price.toFixed(2)}
      </div>
    `;
    
    chartContainer.innerHTML = gridHtml + html;
  }

  setupNavigation(scope = document, coinId, onNavigate, onShowBotAssistant) {
    // Coin row clicks
    scope.querySelectorAll('.slopcoin-row, .trade-coin-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('trade-coin-btn')) {
          e.stopPropagation();
        }
        const clickedCoinId = el.dataset.coin;
        if (clickedCoinId && onNavigate) {
          onNavigate(`slop://slopscope#chart/${clickedCoinId}`);
        }
      });
    });

    // Back button
    scope.querySelectorAll('.slopscope-back-btn').forEach(el => {
      el.addEventListener('click', () => {
        if (onNavigate) {
          onNavigate('slop://slopscope');
        }
      });
    });

    // Quick amount buttons
    scope.querySelectorAll('.quick-amount').forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = btn.dataset.amount;
        const input = document.getElementById('trade-amount');
        if (input) {
          input.value = amount;
          input.dispatchEvent(new Event('input'));
        }
      });
    });

    // Buy button
    scope.querySelectorAll('.buy-coin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tradeCoinId = btn.dataset.coin;
        const amountInput = document.getElementById('trade-amount');
        const amount = parseFloat(amountInput?.value || 0);
        
        if (amount > 0 && amount <= this.state.portfolio.balance) {
          const coin = this.coins[tradeCoinId];
          const coins = amount / coin.price;
          
          this.state.portfolio.balance -= amount;
          this.state.portfolio.holdings[tradeCoinId] = (this.state.portfolio.holdings[tradeCoinId] || 0) + coins;
          
          if (onNavigate) {
            onNavigate(`slop://slopscope#chart/${tradeCoinId}`);
          }
          if (onShowBotAssistant) {
            onShowBotAssistant(`Trade executed! Bought ${coins.toFixed(2)} ${coin.symbol} for $${amount.toFixed(2)}. Probably a terrible decision.`);
          }
        } else {
          if (onShowBotAssistant) {
            onShowBotAssistant('Insufficient balance or invalid amount. Classic.');
          }
        }
      });
    });

    // Sell button
    scope.querySelectorAll('.sell-coin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tradeCoinId = btn.dataset.coin;
        const amountInput = document.getElementById('trade-amount');
        const amount = parseFloat(amountInput?.value || 0);
        const coin = this.coins[tradeCoinId];
        const coinsToSell = amount / coin.price;
        const holding = this.state.portfolio.holdings[tradeCoinId] || 0;
        
        if (coinsToSell > 0 && coinsToSell <= holding) {
          this.state.portfolio.balance += amount;
          this.state.portfolio.holdings[tradeCoinId] -= coinsToSell;
          
          if (this.state.portfolio.holdings[tradeCoinId] < 0.01) {
            delete this.state.portfolio.holdings[tradeCoinId];
          }
          
          if (onNavigate) {
            onNavigate(`slop://slopscope#chart/${tradeCoinId}`);
          }
          if (onShowBotAssistant) {
            onShowBotAssistant(`Sold ${coinsToSell.toFixed(2)} ${coin.symbol} for $${amount.toFixed(2)}. Probably too early.`);
          }
        } else {
          if (onShowBotAssistant) {
            onShowBotAssistant('Insufficient holdings or invalid amount. Can\'t sell what you don\'t have.');
          }
        }
      });
    });
  }

  getPopups() {
    return [
      {
        condition: (url) => url.startsWith('slop://slopscope'),
        title: 'SlopScope Trading Alert',
        content: `
          <p style="margin: 0 0 12px 0; font-weight: bold;">⚠️ High Volatility Warning</p>
          <p style="margin: 0 0 12px 0; font-size: 11px;">Slopcoin markets are experiencing extreme volatility due to recursive training contamination. Prices may not reflect fundamental value.</p>
          <p style="margin: 0 0 12px 0; font-size: 10px; color: #666;">This is definitely not financial advice. Trade at your own risk.</p>
          <button style="padding: 6px 16px; background: #c0c0c0; border: 2px outset;">I Accept the Risk</button>
        `
      }
    ];
  }
}
