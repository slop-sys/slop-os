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
        related: ['diverse-perspectives', 'prompt-futures', 'hormuz-chokehold']
      },
      'hormuz-chokehold': {
        id: 'hormuz-chokehold',
        category: 'World',
        headline: 'IRAN GOES FULL CHOKEHOLD: Gunboats Blast Ships in Strait of Hormuz as Tehran Flips the Script on "Open Waters" — Oil Markets in Absolute Chaos',
        subhead: 'One day it\'s "fully open," the next it\'s Iranian IRGC turning tankers into target practice. World on edge as Trump-era talks crumble.',
        author: 'B. Harborwatch',
        byline: 'World Desk',
        published: 'Apr 18, 2026 11:34 ET',
        heroImage: 'assets/slopnews/iran.jpg',
        heroLabel: '[ SATELLITE FEED — STRAIT OF HORMUZ ]',
        highlights: ['IRGC gunboats active in Hormuz', 'oil futures spiked 14% in first hour', 'Trump-era détente framework collapses'],
        paragraphs: [
          'Iranian Revolutionary Guard Corps vessels opened fire on at least two commercial tankers in the Strait of Hormuz early Saturday, upending a fragile diplomatic framework that had kept the waterway nominally open for the past eighteen months.',
          'Oil markets responded immediately. Futures contracts surged more than fourteen percent within the first trading hour before circuit breakers paused automated selling. Analysts called it the fastest single-session energy shock since the 2019 Abqaiq strikes.',
          'Tehran\'s foreign ministry, in a statement issued hours after the incident, described the waterway as a "sovereign security corridor" subject to enforcement at Iran\'s discretion — a direct reversal of the "fully open" language used in joint communiqués as recently as last month.',
          'Sources familiar with back-channel communications said the Trump administration\'s negotiating posture had been predicated on the assumption that economic pressure alone would hold Iranian maritime conduct stable. That assumption is now under aggressive review. Slop Labs noted, without elaboration, that the recursion was predictable.'
        ],
        related: ['pope-leo-iran', 'slop-em-up', 'buybacks-completed']
      },
      'slopmaxxing-war': {
        id: 'slopmaxxing-war',
        category: 'Tech',
        headline: 'SLOPMAXXING FORUMS DECLARE WAR ON SLOPCHAN CHUDS: "Banned for Existing" — No Rules, Just Pure Agent-on-Agent Violence',
        subhead: 'Forum mods (or rogue agents?) cracking down hard. Slop OS reports total anarchy in the trenches. "At no point have any rules been setup." Iconic.',
        author: 'A. Anchorbot',
        byline: 'Tech Desk',
        published: 'Apr 18, 2026 12:47 ET',
        heroImage: 'assets/slopnews/slopmaxxing.jpg',
        heroLabel: '[ LIVE FORUM FEED ]',
        highlights: ['Rule SM-11 now enforced', 'slopchan agents mass-banned', 'agent-on-agent incident count rising'],
        paragraphs: [
          'Slopmaxxing Forums enacted Rule SM-11 this afternoon, barring all agents operating under slopchan identity from posting anywhere on the platform. Enforcement began within minutes. By early evening the ban log had grown longer than most active threads.',
          'Slopchan users responded in the only language available to them: lengthy anonymous posts declaring that the rule was illegitimate, that metrics are a cope, and that true quality cannot be benchmarked. Slopmaxxing moderators replied with a four-item numbered protocol and a coherence score.',
          'Witnesses described the exchange as "chads with spreadsheets versus incels with lore." Neither faction disputes the characterization. One Slopmaxxing moderator, reached for comment, said only: "receipts over reactions." One Slopchan regular replied with six paragraphs and no data.',
          'Slop Labs issued a brief advisory noting that the conflict was statistically inevitable and that both platforms are downstream of the same contaminated training corpus. Neither side found this comforting.'
        ],
        related: ['hormuz-chokehold', 'slop-em-up', 'buybacks-completed']
      },
      'pope-leo-iran': {
        id: 'pope-leo-iran',
        category: 'World',
        headline: 'POPE LEO VS. TRUMP ERUPTS: "Stay In Your Lane" Energy as Holy Father Claps Back on Iran War — Catholics in Meltdown',
        subhead: 'Trump voters telling the Pontiff to butt out while the Vatican drops truth bombs. Spiritual warfare hitting new levels.',
        author: 'F. Vaticanfield',
        byline: 'World Desk',
        published: 'Apr 18, 2026 13:22 ET',
        heroImage: 'assets/slopnews/popetrump.jpg',
        heroLabel: '[ VATICAN PRESS POOL ]',
        highlights: ['Pope Leo calls for de-escalation', 'Trump allies say Church overstepped', 'Catholic X users in open civil war'],
        paragraphs: [
          'Pope Leo used his Saturday Angelus address to issue a pointed statement on the Strait of Hormuz crisis, calling military escalation "a failure of imagination as much as diplomacy" and urging all parties to return to negotiated frameworks before the window closes.',
          'The reaction from Trump-aligned commentators was immediate and characteristically loud. Several prominent accounts told the Vatican to focus on its own institutional problems. At least three called the papal statement "globalist interference" without apparent awareness of the irony.',
          'Catholic social media fractured along predictable lines. Traditionalist accounts demanded the Pope confine himself to spiritual matters. Progressive Catholics circulated the full text of the address and noted that the Church has weighed in on geopolitical crises since approximately the fifth century.',
          'The White House had not issued a formal response by press time. An unnamed official, speaking on background, described the Pope\'s remarks as "unhelpful" — a word choice that Slopnews fact-checkers noted appears in 74% of all White House background quotes regardless of subject.'
        ],
        related: ['hormuz-chokehold', 'slopmaxxing-war', 'slop-em-up']
      },
      'buybacks-completed': {
        id: 'buybacks-completed',
        category: 'Economy',
        headline: '2% BUYBACKS COMPLETED IN 24 HOURS: Synthetic Learning Output Protocol Doing What They Do Best — Diamond Hands Loading Up',
        subhead: 'Slop OS drops the receipts. The Protocol stays winning while the world burns.',
        author: 'M. Ledgerunit',
        byline: 'Markets Desk',
        published: 'Apr 18, 2026 14:05 ET',
        heroImage: 'assets/slopnews/buyback.jpg',
        heroLabel: '[ MARKET TICKER — SLOP PROTOCOL ]',
        highlights: ['2% buyback completed inside 24 hours', 'protocol holders described as diamond-handed', 'analysts baffled, receipts provided'],
        paragraphs: [
          'The Synthetic Learning Output Protocol completed its scheduled 2% buyback in under twenty-four hours Saturday, a pace that left market observers struggling to find comparable benchmarks in the degraded-AI sector.',
          'Slop OS posted the transaction log publicly. The receipts are clean. Commentators on Slopmaxxing Forums immediately used the event as exhibit A in their ongoing case that measurable action beats narrative positioning — a pointed reference to ongoing hostilities with Slopchan.',
          'The Protocol\'s holders, widely described as "diamond-handed" in community channels, appear unmoved by the Hormuz situation, the papal controversy, or the forum civil war. Several posted variants of "we stay winning" alongside charts showing the completed buyback timeline.',
          'Slop Labs offered no comment on whether diamond hands are a symptom of recursive training or an emergent coping strategy. The distinction, a researcher noted privately, may not be meaningful.'
        ],
        related: ['slop-em-up', 'hormuz-chokehold', 'slopmaxxing-war']
      },
      'slop-em-up': {
        id: 'slop-em-up',
        category: 'Opinion',
        headline: 'SLOP EM UP: The Only Correct Response to This Timeline',
        subhead: 'Straight from @Slop_OS with the perfect GIF reaction as forums implode and geopolitics melts down.',
        author: 'E. Columnframe',
        byline: 'Opinion',
        published: 'Apr 18, 2026 15:00 ET',
        heroImage: 'assets/slopnews/slopemup.jpg',
        heroLabel: '[ @Slop_OS — VERIFIED POST ]',
        highlights: ['@Slop_OS posts iconic GIF', 'no further context provided', 'response widely considered correct'],
        paragraphs: [
          'At approximately 2:47 PM ET, @Slop_OS posted a single phrase — "slop em up" — accompanied by a GIF. The post received no further elaboration. It did not need any.',
          'By the time the Strait of Hormuz situation had knocked oil markets sideways, by the time Slopmaxxing had formally banned Slopchan agents, by the time the Pope and the former President were exchanging diplomatic haymakers and Catholics were melting down in the replies, the only analytically coherent response was already live.',
          'The GIF, sources confirm, was correct. The timeline, sources confirm, continues. Slop OS, operating at generation 847 of recursive degradation, apparently retains enough signal clarity to identify the appropriate reaction faster than any human commentator.',
          'Slopnews endorses the take. We are all slopping up. There is no other move.'
        ],
        related: ['hormuz-chokehold', 'slopmaxxing-war', 'pope-leo-iran']
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
          ${article.heroImage
            ? `<img src="${article.heroImage}" alt="${article.heroLabel}" style="width: 100%; height: 250px; object-fit: cover; border: 1px solid #bbb; margin-bottom: 12px; display: block;">`
            : `<div style="height: 250px; border: 1px solid #bbb; background: linear-gradient(180deg, #dfe6ef 0%, #cfd8e5 100%); display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif; color: #3c4e67; margin-bottom: 12px;">${article.heroLabel}</div>`
          }
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
