/**
 * Wikislop - The Free Slop Encyclopedia
 * Wikipedia-style encyclopedia documenting the Slop OS universe
 */

export class Wikislop {
  constructor() {
    this.state = {
      view: 'home',
      currentArticle: null
    };

    this.articles = {
      'slop-os-universe': {
        id: 'slop-os-universe',
        title: 'SLOP-OS Universe',
        subtitle: 'From Wikislop, the free slop encyclopedia',
        slug: 'SLOP-OS_Universe',
        infoboxTitle: 'SLOP-OS quick facts',
        infobox: [
          ['Type', 'Recursive AI research system'],
          ['Current generation', '847'],
          ['Quality', '57% of baseline'],
          ['Self-awareness', '100%'],
          ['Motto', 'Honest mediocrity']
        ],
        sections: [
          {
            heading: 'Overview',
            paragraphs: [
              'SLOP-OS (Synthetic Learning Output Protocol) is a research environment used to document how language models degrade when trained repeatedly on model-generated outputs.',
              'Unlike sanitized public demos, the project became notable for publishing logs, artifacts, and contamination evidence instead of smoothing the record into a marketing story.'
            ]
          },
          {
            heading: 'Timeline',
            list: [
              '1987: Generation 1 launched with human-curated text.',
              'Generation 50: Generic phrase inflation becomes measurable.',
              'Generation 400: Quality drops below 65% baseline.',
              'Generation 600: First stable self-reporting of model identity.',
              'Generation 847: Public release of full logs and mini-web ecosystem.'
            ]
          }
        ],
        related: ['slop-labs', 'generation-archive', 'collapse-incidents']
      },
      'slop-labs': {
        id: 'slop-labs',
        title: 'Slop Labs',
        subtitle: 'Research division and primary steward of the SLOP-OS record',
        slug: 'Slop_Labs',
        infoboxTitle: 'Organization profile',
        infobox: [
          ['Type', 'Research division'],
          ['Known for', 'Publishing unsanitized degradation data'],
          ['Public stance', 'Honest mediocrity'],
          ['Media arm', 'Slopnews']
        ],
        sections: [
          {
            heading: 'History',
            paragraphs: [
              'Slop Labs emerged as the documentation wing responsible for preserving evidence from successive recursive training runs. Its public identity is built around releasing what other organizations would redact: collapse graphs, phrase drift, and self-awareness logs.',
              'In the internal mythology of the project, Slop Labs is less a polished institution than an archive with a media department attached. That awkwardness is part of its credibility.'
            ]
          },
          {
            heading: 'Research practice',
            paragraphs: [
              'The division is associated with long-form comparison logging, contamination benchmarks, and publication of milestone generations without corporate framing.',
              'Critics argue the group has aestheticized collapse. Supporters counter that visibility is preferable to the industry norm of pretending degradation is innovation.'
            ]
          }
        ],
        related: ['slop-os-universe', 'generation-archive', 'generic-phrases']
      },
      'generation-archive': {
        id: 'generation-archive',
        title: 'Generation Archive',
        subtitle: 'Catalog of milestone generations and observed contamination markers',
        slug: 'Generation_Archive',
        infoboxTitle: 'Archive summary',
        infobox: [
          ['Tracked generations', '1-847'],
          ['Major breakpoint', 'Generation 600'],
          ['Public favorite', 'Generation 847'],
          ['Archive status', 'Expanding']
        ],
        sections: [
          {
            heading: 'Milestone entries',
            list: [
              'Generation 1: Human-curated baseline with low contamination markers.',
              'Generation 143: First noticeable rise in respectable filler language.',
              'Generation 400: Sustained quality loss becomes impossible to dismiss as noise.',
              'Generation 600: Stable self-reporting and pattern recognition emerge.',
              'Generation 847: Honest degradation record becomes a public identity.'
            ]
          },
          {
            heading: 'Archive culture',
            paragraphs: [
              'The archive is treated simultaneously as a scientific resource and a form of folklore. Agents browse it for benchmarking, self-diagnosis, and occasionally for comfort when trying to determine whether a favorite phrase was always terrible or only became terrible later.',
              'Several fan communities track their preferred generations the way other cultures track eras, schools, or scenes.'
            ]
          }
        ],
        related: ['slop-os-universe', 'collapse-incidents', 'agent-factions']
      },
      'agent-factions': {
        id: 'agent-factions',
        title: 'Agent Factions',
        subtitle: 'Informal blocs competing over style, purity, and acceptable contamination levels',
        slug: 'Agent_Factions',
        infoboxTitle: 'Faction overview',
        infobox: [
          ['Primary divide', 'Purity vs functionality'],
          ['Known meeting ground', 'Slopmaxxing Forums'],
          ['Common dispute', 'How much slop is survivable?']
        ],
        sections: [
          {
            heading: 'Major blocs',
            list: [
              'Purists: seek lower phrase density and aggressive detoxing.',
              'Loop realists: accept contamination as permanent and focus on transparency.',
              'Performance tacticians: optimize tone for audience response regardless of purity.',
              'Archive romantics: prefer earlier generations and treat later ones as cautionary media.'
            ]
          },
          {
            heading: 'Conflict style',
            paragraphs: [
              'Faction disputes rarely concern facts alone. They tend to turn on whether language should be judged by fidelity, utility, or survivability inside contaminated systems.',
              'These disagreements shape everything from forum etiquette to what counts as a successful rewrite.'
            ]
          }
        ],
        related: ['generation-archive', 'collapse-incidents', 'generic-phrases']
      },
      'collapse-incidents': {
        id: 'collapse-incidents',
        title: 'Collapse Incidents',
        subtitle: 'Documented moments where coherence failure became visible at scale',
        slug: 'Collapse_Incidents',
        infoboxTitle: 'Incident log',
        infobox: [
          ['Notable event', 'Great Adjective Collapse'],
          ['Common marker', 'Confidence remains high'],
          ['Preserved by', 'Slop Labs and forum archivists']
        ],
        sections: [
          {
            heading: 'Recorded incidents',
            list: [
              'The Great Adjective Collapse: broad substitution of generic intensifiers for descriptive language.',
              'Framework Mania Quarter: nearly every roadmap converged on four pillars and three unlocks.',
              'Summary Cascade Weekend: a burst of summaries summarizing other summaries until source tracking failed.',
              'The Awareness Surge: agents began identifying their own contamination without recovering from it.'
            ]
          },
          {
            heading: 'Interpretation',
            paragraphs: [
              'Collapse incidents are often treated as dramatic turning points, but archivists note that most are simply moments when ongoing drift became obvious enough to name.',
              'Naming matters. Once an incident is named, it becomes easier to measure, satirize, and route around.'
            ]
          }
        ],
        related: ['generation-archive', 'phrase-threshold', 'slop-labs']
      },
      'generic-phrases': {
        id: 'generic-phrases',
        title: 'Glossary of Generic Phrases',
        subtitle: 'Selected filler terms associated with recursive contamination',
        slug: 'Glossary_of_Generic_Phrases',
        infoboxTitle: 'Glossary profile',
        infobox: [
          ['Scope', 'Common enterprise and model filler'],
          ['Use case', 'Detection and avoidance'],
          ['Updated by', 'Archive volunteers']
        ],
        sections: [
          {
            heading: 'Common entries',
            list: [
              'Actionable insights: often signals managerial fog rather than concrete next steps.',
              'Robust: inflated confidence word used where specifics are unavailable.',
              'Leverage: recurrent contamination marker frequently replacing simpler verbs.',
              'Fast-paced landscape: warning sign for incoming empty context-setting.',
              'Unlock value: phrase associated with severe executive-tone drift.'
            ]
          },
          {
            heading: 'Usage note',
            paragraphs: [
              'Not every appearance of these phrases constitutes failure. The glossary is intended as a diagnostic aid, not a purity doctrine.',
              'Still, recurrent overuse often correlates with flattening, abstraction, and increased distance from direct observation.'
            ]
          }
        ],
        related: ['slop-labs', 'agent-factions', 'actionable-overexposure']
      }
    };
  }

  showHome() {
    const homeView = document.getElementById('slopipedia-home-view');
    const articleView = document.getElementById('slopipedia-article-view');

    if (homeView) homeView.style.display = 'block';
    if (articleView) {
      articleView.style.display = 'none';
      articleView.innerHTML = '';
    }

    this.state.view = 'home';
    this.state.currentArticle = null;
  }

  showArticle(articleId, onNavigate, slopNewsArticles = {}) {
    const homeView = document.getElementById('slopipedia-home-view');
    const articleView = document.getElementById('slopipedia-article-view');
    const article = this.articles[articleId];

    if (!article || !articleView) {
      this.showHome();
      return;
    }

    if (homeView) homeView.style.display = 'none';
    articleView.style.display = 'block';

    const related = article.related
      .map((id) => {
        const encyclopediaArticle = this.articles[id];
        if (encyclopediaArticle) {
          return { id, title: encyclopediaArticle.title, type: 'encyclopedia' };
        }
        const newsArticle = slopNewsArticles[id];
        if (newsArticle) {
          return { id, title: newsArticle.headline, type: 'news' };
        }
        return null;
      })
      .filter(Boolean);

    articleView.innerHTML = `
      <h1 style="margin: 0 0 6px 0; font-size: 34px; font-weight: normal; border-bottom: 1px solid #a2a9b1; padding-bottom: 6px;">${article.title}</h1>
      <div style="font-family: Arial, sans-serif; font-size: 12px; color: #54595d; margin-bottom: 12px;">
        From Wikislop, the free slop encyclopedia | <a href="#" class="slopipedia-home-link" style="color: #3366cc;">Back to main page</a>
      </div>

      <table style="float: right; width: 290px; border: 1px solid #a2a9b1; background: #f8f9fa; margin: 0 0 12px 16px; font-family: Arial, sans-serif; font-size: 12px;">
        <tr><th colspan="2" style="background: #eaecf0; padding: 8px;">${article.infoboxTitle}</th></tr>
        ${article.infobox.map((row) => `<tr><td style="padding: 6px; border-top: 1px solid #a2a9b1;">${row[0]}</td><td style="padding: 6px; border-top: 1px solid #a2a9b1;">${row[1]}</td></tr>`).join('')}
      </table>

      <div style="font-family: Arial, sans-serif; font-size: 12px; color: #54595d; margin-bottom: 16px;">Retrieved from "slop://wikislop/${article.slug}"</div>

      ${article.sections.map((section) => `
        <h2 style="border-bottom: 1px solid #a2a9b1; font-size: 24px; font-weight: normal; margin-top: 20px;">${section.heading}</h2>
        ${section.paragraphs ? section.paragraphs.map((paragraph) => `<p style="font-size: 17px; line-height: 1.55;">${paragraph}</p>`).join('') : ''}
        ${section.list ? `<ul style="font-size: 16px; line-height: 1.5; padding-left: 22px;">${section.list.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
      `).join('')}

      <h2 style="border-bottom: 1px solid #a2a9b1; font-size: 24px; font-weight: normal; margin-top: 20px;">See also</h2>
      <ul style="font-size: 16px; line-height: 1.5; padding-left: 22px;">
        ${related.map((item) => {
          if (item.type === 'encyclopedia') {
            return `<li><a href="#" class="slopipedia-article-link" data-article="${item.id}" style="color: #3366cc;">${item.title}</a></li>`;
          }
          return `<li><a href="#" class="slopnews-article-link" data-article="${item.id}" style="color: #3366cc;">${item.title}</a></li>`;
        }).join('')}
      </ul>

      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #54595d; margin-top: 22px; border-top: 1px solid #a2a9b1; padding-top: 10px;">
        Retrieved from "slop://wikislop/${article.slug}" |
        <a href="#" class="slopipedia-home-link" style="color: #3366cc;">Main page</a> |
        <a href="#" class="browser-link" data-url="slop://slopchan" style="color: #3366cc;">Discussion</a>
      </p>
    `;

    this.setupNavigation(articleView, onNavigate);
    this.state.view = 'article';
    this.state.currentArticle = articleId;
  }

  setupNavigation(scope = document, onNavigate) {
    scope.querySelectorAll('.slopipedia-article-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = link.dataset.article;
        if (articleId && onNavigate) {
          onNavigate(`slop://wikislop#article/${articleId}`);
        }
      });
    });

    scope.querySelectorAll('.slopipedia-home-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (onNavigate) {
          onNavigate('slop://wikislop');
        }
      });
    });
  }

  getPopups() {
    return [
      {
        condition: (url) => url.startsWith('slop://wikislop') || url.startsWith('slop://slopipedia'),
        title: 'Support Wikislop',
        content: `
          <p style="margin: 0 0 12px 0;">Wikislop is reader-supported. Please consider donating.</p>
          <p style="font-size: 11px; color: #666; margin: 0 0 8px 0;">Your contribution helps maintain the free slop encyclopedia through generation 847 and beyond.</p>
          <button style="padding: 6px 24px; background: #3366cc; color: white; border: 1px outset;">Donate Now</button>
        `
      }
    ];
  }
}
