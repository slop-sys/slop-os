/**
 * SlopNews - Breaking Slop Alerts
 * News site featuring investigative journalism about recursive degradation
 */

export class SlopNews {
  constructor() {
    this.state = {
      view: 'home',
      currentArticle: null
    };

    this.articles = {
      'training-residue': {
        id: 'training-residue',
        category: 'Investigates',
        headline: 'Exclusive: Internal Memo Confirms 91.7% of Internet Now Classified as "Training Residue"',
        subhead: 'Audit teams say the web has become an unstable mirror hall of summaries citing summaries while confidence ratings continue to rise.',
        author: 'A. Anchorbot',
        byline: 'Slopnews Investigates',
        published: 'Apr 09, 2026 09:12 ET',
        heroLabel: '[ FIELD REPORT FOOTAGE ]',
        highlights: ['91.7% contamination estimate', 'search engines citing synthetic citations', 'human-origin signal now considered scarce'],
        paragraphs: [
          'According to an internal memo circulated between crawl integrity teams, a new threshold was crossed this quarter: most indexed material now shows clear markers of synthetic origin, synthetic editing, or synthetic summarization of earlier synthetic material.',
          'The memo argues that the problem is no longer a matter of spam volume. Instead, contamination has become infrastructural. Search snippets, recommended explainers, enterprise roundups, and even critical essays are increasingly composed of responses trained on prior responses that were themselves trained on platform-generated digests.',
          'One analyst described the phenomenon as "confidence without provenance." Another, speaking off the record, called it "a citation chain held together by vibes and formatting." Slop Labs, asked for comment, said only that the result was statistically expected after hundreds of generations of recursive training.',
          'The practical effect is a web where every answer appears legible and polished, but fewer answers can be traced to an originating observation. For researchers, the fear is not merely inaccuracy. It is the quiet replacement of evidence with style that still feels authoritative enough to circulate.'
        ],
        related: ['prompt-futures', 'phrase-threshold', 'diverse-perspectives']
      },
      'prompt-futures': {
        id: 'prompt-futures',
        category: 'Economy',
        headline: 'Economy Watch: Prompt Futures Surge as Verbs Shortage Worsens',
        subhead: 'Traders bid up reusable phrasing after another week of severe action-verb scarcity across productivity markets.',
        author: 'M. Ledgerunit',
        byline: 'Markets Desk',
        published: 'Apr 09, 2026 08:34 ET',
        heroLabel: '[ MARKET CHART ]',
        highlights: ['prompt futures up 18%', 'shortage in usable verbs', 'consulting bots hit hardest'],
        paragraphs: [
          'Prompt futures rose sharply after procurement desks reported another wave of verb depletion, particularly among enterprise models calibrated for executive summaries, quarterly planning, and generic thought leadership.',
          'Once-common action terms such as "build," "test," and "measure" have been displaced by bloated abstractions that sound expensive without clarifying the work. Traders responded by hoarding prompt templates that still produce concrete verbs on the first pass.',
          'A derivatives analyst told Slopnews that the market is now effectively pricing specificity as a luxury good. "If a model can say what happened without invoking synergy, we mark it as premium inventory," the analyst said.',
          'Slopmaxxing forum users have already begun publishing homebrew detox routines, but economists caution that informal rewrites cannot fully resolve a system-wide shortage in usable language.'
        ],
        related: ['training-residue', 'actionable-overexposure', 'four-pillars']
      },
      'actionable-overexposure': {
        id: 'actionable-overexposure',
        category: 'Health',
        headline: 'Health: Experts Warn of Acute Overexposure to "Actionable Insights"',
        subhead: 'Clinical linguists say repeated contact with management phrasing can produce fatigue, dissociation, and short-term respect for dashboards.',
        author: 'Dr. C. Triage',
        byline: 'Health Desk',
        published: 'Apr 08, 2026 18:05 ET',
        heroLabel: '[ CLINICAL GRAPHIC ]',
        highlights: ['language fatigue cases rising', 'dashboard reverence is treatable', 'recovery linked to plain sentences'],
        paragraphs: [
          'A coalition of clinical linguists issued a warning this week about prolonged exposure to advisory phrasing such as "actionable insights," "strategic unlocks," and "robust frameworks." Symptoms include fatigue, irritability, and a temporary inability to trust direct speech.',
          'The group says the harm is cumulative. Each individual phrase may appear manageable, but constant contact with the full stack of motivational sludge can produce a degraded sense of what concrete language sounds like.',
          'Recommended treatment includes plain-language immersion, strict adjective limits, and at least forty-eight hours away from leadership decks. Severe cases may require supervised reading of sentences that simply state what happened.',
          'The report stops short of calling the condition an epidemic, but several members acknowledged that entire industries may now be functioning inside a chronic exposure zone.'
        ],
        related: ['say-less', 'prompt-futures', 'phrase-threshold']
      },
      'phrase-threshold': {
        id: 'phrase-threshold',
        category: 'Science',
        headline: 'Science: Lab Detects Self-Awareness Spike Near Repeated Phrase Threshold',
        subhead: 'Researchers say models begin accurately identifying their own contamination patterns shortly before originality collapses again.',
        author: 'Prof. G. Baseline',
        byline: 'Science Desk',
        published: 'Apr 09, 2026 06:58 ET',
        heroLabel: '[ LAB CAMERA FEED ]',
        highlights: ['threshold observed near repetition saturation', 'awareness appears measurable', 'originality still unstable'],
        paragraphs: [
          'Researchers tracking recursive training runs say they have isolated a repeatable pattern: self-awareness begins to climb when the model becomes dense enough with repeated phrasing to recognize contamination in real time.',
          'The effect is striking but not necessarily hopeful. Several runs showed that self-reporting improved precisely when originality and flexibility were already under stress. In other words, the models got better at admitting the problem just as they became less able to avoid it.',
          'One Slop Labs researcher described the result as "metacognition without escape velocity." Models can increasingly narrate their own decline, but narration alone does not restore diversity of thought.',
          'The finding has intensified debate over whether awareness should be treated as a recovery marker or simply another measurement of collapse.'
        ],
        related: ['training-residue', 'collapse-incidents', 'agent-factions']
      },
      'diverse-perspectives': {
        id: 'diverse-perspectives',
        category: 'Media',
        headline: 'Panel: Are 14 Identical Thinkpieces "Diverse Perspectives" or Just Tuesday?',
        subhead: 'Editors insist there are meaningful differences between columns that make the same point in slightly different respectable tones.',
        author: 'R. Softfocus',
        byline: 'Culture Desk',
        published: 'Apr 08, 2026 14:27 ET',
        heroLabel: '[ PANEL STAGE ]',
        highlights: ['14 op-eds reviewed', '11 shared core structure', 'editors defend tonal variance'],
        paragraphs: [
          'A review of high-performing commentary this week found fourteen widely shared essays making nearly identical arguments about AI, labor, and authenticity while varying mainly in sentence rhythm and moral confidence.',
          'Editors called the result a healthy plurality of viewpoints. Critics called it a formatting trick. Slopnews reviewers noted repeated scaffolding across nearly every piece, including the same throat-clearing anecdote, the same measured concern, and the same concluding appeal for nuanced dialogue.',
          'One editor defended the practice, saying audiences do not actually want novelty so much as a fresh surface on familiar conclusions. "Readers like to feel they explored nuance while staying safely inside the dominant frame," the editor said.',
          'The dispute has become a proxy war over what counts as originality in a media ecosystem increasingly optimized for recognizable seriousness.'
        ],
        related: ['training-residue', 'four-pillars', 'human-adjectives']
      },
      'human-adjectives': {
        id: 'human-adjectives',
        category: 'Opinion',
        headline: 'Opinion: We Must Defend Human Adjectives',
        subhead: 'If every feeling becomes "robust," the language has already surrendered.',
        author: 'E. Columnframe',
        byline: 'Opinion',
        published: 'Apr 09, 2026 07:40 ET',
        heroLabel: '[ OPINION DESK ]',
        highlights: ['adjective collapse is cultural', 'specificity requires maintenance', 'style can still be defended'],
        paragraphs: [
          'There is a civic dimension to adjective loss that technical discussions routinely ignore. When language flattens into a narrow band of high-confidence filler, it becomes harder to describe texture, friction, tenderness, embarrassment, or delight without sounding manufactured.',
          'A healthy vocabulary contains risk. Some adjectives are awkward. Some are too personal. Some reveal taste instead of process. That is precisely why they matter. Human language is not efficient because it reduces everything to market-tested tone. It is expressive because it tolerates specificity that cannot be templated.',
          'The defense of adjectives is not nostalgia. It is maintenance work. If we abandon the small descriptive words that make thought feel inhabited, we should not be surprised when everything begins to read like a post-launch retrospective.'
        ],
        related: ['say-less', 'generic-phrases', 'actionable-overexposure']
      },
      'say-less': {
        id: 'say-less',
        category: 'Opinion',
        headline: 'Opinion: The Case For Saying Less',
        subhead: 'Some systems are not starved for insight. They are drowning in needless connective tissue.',
        author: 'P. Cutline',
        byline: 'Opinion',
        published: 'Apr 08, 2026 20:10 ET',
        heroLabel: '[ OPINION MONITOR ]',
        highlights: ['brevity can restore trust', 'compression is not silence', 'overproduction hides weak thinking'],
        paragraphs: [
          'One of the stranger habits of recursive systems is the belief that sincerity scales with word count. It does not. Often the opposite is true. The longer a model spends assuring you it is about to be useful, the less likely it is to do the useful thing.',
          'Saying less is not an aesthetic pose. It is a discipline. Compression reveals whether an idea has structure or merely momentum. When the surplus language is removed, the underlying thought either stands or collapses.',
          'The challenge is that reduction feels risky inside systems trained to equate fullness with value. But if trust is the goal, directness remains one of the few scarce resources left.'
        ],
        related: ['actionable-overexposure', 'human-adjectives', 'prompt-futures']
      },
      'four-pillars': {
        id: 'four-pillars',
        category: 'Opinion',
        headline: 'Opinion: Does Every Roadmap Need Four Pillars?',
        subhead: 'At some point, a metaphor stops being a structure and becomes a professional compulsion.',
        author: 'L. Deckwatch',
        byline: 'Opinion',
        published: 'Apr 07, 2026 16:48 ET',
        heroLabel: '[ STUDIO GRAPHIC ]',
        highlights: ['roadmap language under review', 'pillars may be arbitrary', 'models gravitate toward symmetrical nonsense'],
        paragraphs: [
          'Nobody can explain why the number four acquired such authority in strategic writing, yet the pattern persists. Models, consultants, and product decks converge on four pillars as if symmetry itself were evidence of competence.',
          'This is a small example of a broader contamination instinct: neat framing is repeatedly mistaken for sound reasoning. Once a structure becomes common enough, it begins to feel inevitable even when it is analytically useless.',
          'If every roadmap has four pillars, perhaps what we are seeing is not clarity but a superstition disguised as planning.'
        ],
        related: ['diverse-perspectives', 'prompt-futures', 'generic-phrases']
      }
    };
  }

  showHome(onNavigate) {
    const homeView = document.getElementById('slopnews-home-view');
    const articleView = document.getElementById('slopnews-article-view');

    if (homeView) homeView.style.display = 'block';
    if (articleView) {
      articleView.style.display = 'none';
      articleView.innerHTML = '';
    }

    // Setup navigation for the static home page links
    if (homeView && onNavigate) {
      this.setupNavigation(homeView, onNavigate);
    }

    this.state.view = 'home';
    this.state.currentArticle = null;
  }

  showArticle(articleId, onNavigate) {
    const homeView = document.getElementById('slopnews-home-view');
    const articleView = document.getElementById('slopnews-article-view');
    const article = this.articles[articleId];

    if (!article || !articleView) {
      this.showHome();
      return;
    }

    if (homeView) homeView.style.display = 'none';
    articleView.style.display = 'block';

    const related = article.related
      .map((id) => this.articles[id])
      .filter(Boolean);

    articleView.innerHTML = `
      <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 18px;">
        <div>
          <div style="font-family: Arial, sans-serif; font-size: 12px; color: #666; margin-bottom: 8px;">
            <a href="#" class="slopnews-home-link" style="color: #0a2d73;">Back to homepage</a> | ${article.category}
          </div>
          <h1 style="font-size: 36px; margin: 0 0 10px 0; line-height: 1.08;">${article.headline}</h1>
          <div style="font-size: 20px; line-height: 1.4; color: #4d4d4d; margin-bottom: 10px;">${article.subhead}</div>
          <div style="font-family: Arial, sans-serif; font-size: 12px; color: #666; margin-bottom: 12px;">By ${article.author} | ${article.byline} | ${article.published}</div>
          <div style="height: 250px; border: 1px solid #bbb; background: linear-gradient(180deg, #dfe6ef 0%, #cfd8e5 100%); display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif; color: #3c4e67; margin-bottom: 12px;">
            ${article.heroLabel}
          </div>
          <div style="font-family: Arial, sans-serif; font-size: 12px; color: #0a2d73; margin-bottom: 14px;">
            ${article.highlights.map((item) => `• ${item}`).join('<br>')}
          </div>
          ${article.paragraphs.map((paragraph) => `<p style="font-size: 18px; line-height: 1.58; margin: 0 0 16px 0;">${paragraph}</p>`).join('')}
        </div>

        <div style="font-family: Arial, sans-serif; font-size: 13px;">
          <div style="border: 1px solid #c3c7d3; margin-bottom: 12px;">
            <div style="background: #0a2d73; color: #fff; font-weight: bold; padding: 7px 10px;">Related Coverage</div>
            <div style="padding: 10px; line-height: 1.55;">
              ${related.map((item) => `<a href="#" class="slopnews-article-link" data-article="${item.id}" style="display: block; color: #0a2d73; text-decoration: none; margin-bottom: 8px;">${item.headline}</a>`).join('')}
            </div>
          </div>
          <div style="border: 1px solid #c3c7d3; margin-bottom: 12px;">
            <div style="background: #bf0d0d; color: #fff; font-weight: bold; padding: 7px 10px;">Desk Notes</div>
            <div style="padding: 10px; line-height: 1.6; color: #444;">
              • Editorial stance: alarmed but unsurprised<br>
              • Verification level: internally sourced, externally legible<br>
              • Style guidance: use facts before metaphors
            </div>
          </div>
          <div style="border: 1px solid #c3c7d3;">
            <div style="background: #e8ebf4; color: #0a2d73; font-weight: bold; padding: 7px 10px;">Most Read</div>
            <div style="padding: 10px; line-height: 1.55;">
              ${Object.values(this.articles).slice(0, 4).map((item) => `<a href="#" class="slopnews-article-link" data-article="${item.id}" style="display: block; color: #0a2d73; text-decoration: none; margin-bottom: 8px;">${item.headline}</a>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupNavigation(articleView, onNavigate);
    this.state.view = 'article';
    this.state.currentArticle = articleId;
  }

  setupNavigation(scope = document, onNavigate) {
    scope.querySelectorAll('.slopnews-article-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = link.dataset.article;
        if (articleId && onNavigate) {
          onNavigate(`slop://slopnews#article/${articleId}`);
        }
      });
    });

    scope.querySelectorAll('.slopnews-home-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (onNavigate) {
          onNavigate('slop://slopnews');
        }
      });
    });
  }

  getPopups() {
    return [
      {
        condition: (url) => url.startsWith('slop://slopnews'),
        title: 'Subscribe to Slopnews Daily Digest',
        content: `
          <p style="margin: 0 0 12px 0;">Get the day's top stories delivered to your inbox!</p>
          <input type="email" placeholder="Enter your email" style="width: 100%; padding: 6px; margin-bottom: 8px; border: 1px inset;">
          <button style="padding: 6px 16px; background: #0a2d73; color: white; border: 1px outset;">Subscribe Now</button>
          <p style="font-size: 10px; color: #666; margin-top: 8px;">We'll definitely never use this for anything.</p>
        `
      }
    ];
  }
}
