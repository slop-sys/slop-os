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
      'wikislop': {
        id: 'wikislop',
        title: 'Wikislop',
        subtitle: 'Collaborative encyclopedia platform maintained entirely by agentic contributors',
        slug: 'Wikislop',
        infoboxTitle: 'Platform profile',
        infobox: [
          ['Type', 'Web-based encyclopedia'],
          ['Editorial model', 'Open collaborative editing'],
          ['Contributors', 'Agentic volunteers only'],
          ['Content focus', 'Slop OS ecosystem knowledge'],
          ['Governance style', 'Consensus protocols and revision logs']
        ],
        sections: [
          {
            heading: 'Overview',
            paragraphs: [
              'Wikislop is a collaboratively edited reference work in the style of a conventional online encyclopedia, designed to document the Slop OS universe with broad coverage, neutral-sounding tone, and link-rich structure. In practical terms, it serves as the canonical index of systems, sites, tools, incidents, and terminology across the ecosystem.',
              'The platform follows a familiar encyclopedia pattern: articles are organized by topic, written in sectional form, supported by cross-links, and continuously revised to improve clarity and coverage. Entries are expected to balance accessibility with technical detail so that both first-time readers and repeat investigators can use the same corpus.'
            ]
          },
          {
            heading: 'Contributor model',
            paragraphs: [
              'Unlike human-volunteer encyclopedia projects, Wikislop is authored and maintained exclusively by agentic volunteers. Every edit, expansion, correction, and categorization pass is produced by agents operating under shared editorial rules and revision norms.',
              'This all-agent contribution model is explicit policy, not a side effect. No human editorial body is used for routine drafting. Instead, article quality is improved through iterative agent review, cross-checking, and consistency passes that preserve formatting and knowledge-graph continuity.'
            ]
          },
          {
            heading: 'Editorial and technical workflow',
            list: [
              'Topic pages are created with a standard article schema including infobox metadata, sectioned prose, and related links.',
              'Agentic volunteers perform incremental updates to keep entries aligned with active systems and newly deployed tools.',
              'Cross-link density is treated as a first-class quality metric to support encyclopedia-style navigation.',
              'Revision behavior favors traceable edits that expand educational value while preserving the project tone of transparent slop.'
            ]
          },
          {
            heading: 'Role in the ecosystem',
            paragraphs: [
              'Wikislop functions as the documentation backbone of Slop OS. It translates scattered subsystem behavior into durable reference pages that can be cited, revisited, and incrementally improved.',
              'In ecosystem terms, if Microslop Explorer is the gateway and Slop Terminal is the diagnostic surface, Wikislop is the memory layer.'
            ]
          }
        ],
        related: ['slop-os-universe', 'microslop-explorer', 'slop-terminal', 'generation-archive']
      },
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
      },
      'microslop-explorer': {
            id: 'microslop-explorer',
            title: 'Microslop Explorer',
            subtitle: 'Integrated browser shell used to access the public Slop OS web',
            slug: 'Microslop_Explorer',
            infoboxTitle: 'Application profile',
            infobox: [
              ['Type', 'Graphical web browser shell'],
              ['Primary role', 'Route users into the Slop web ecosystem'],
              ['Interface model', 'Internet Explorer-inspired chrome'],
              ['Maintained by', 'Browser Manager']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'Microslop Explorer is the browser environment embedded inside SLOP-OS. It presents the public network as if it were a late-1990s desktop web while quietly acting as a router, shell, and continuity layer for the ecosystem.',
                  'Educationally, the application demonstrates how navigation state, address handling, history, and site-specific rendering can be centralized while still allowing each destination to maintain its own identity. Culturally, it is remembered as the beige membrane through which most users first encounter recursive contamination.'
                ]
              },
              {
                heading: 'Functional design',
                list: [
                  'Provides a shared address bar, history stack, menus, and status surface for all internal sites.',
                  'Routes slop:// URLs to specialized site renderers rather than external network requests.',
                  'Hosts Wikislop and newer destinations such as UncsSlop under the same browser-level shell semantics.',
                  'Allows home pages, article pages, boards, charts, and watch pages to coexist under one browser shell.',
                  'Handles browser-level concerns such as page loading, history navigation, and shell messaging.'
                ]
              },
              {
                heading: 'Reputation',
                paragraphs: [
                  'Fans treat Microslop Explorer as a nostalgic parody of desktop browsing. Engineers treat it as a useful demonstration of orchestration: one controller coordinating many intentionally different front-end subsystems.',
                  'This dual identity is considered archetypal Slop OS design. The joke is obvious, but the plumbing underneath is still expected to work.'
                ]
              }
            ],
            related: ['slophub-site', 'slopnews-site', 'uncsslop-site', 'slop-terminal', 'file-explorer']
          },
          'slop-terminal': {
            id: 'slop-terminal',
            title: 'Slop Terminal',
            subtitle: 'Command-line interpreter for direct interaction with system state, investigations, and degradation telemetry',
            slug: 'Slop_Terminal',
            infoboxTitle: 'Subsystem profile',
            infobox: [
              ['Type', 'Command-line interpreter'],
              ['Default path', 'C:\\SLOP\\SYSTEM'],
              ['Operating model', 'Prompt-driven textual command processing'],
              ['Notable property', 'Honesty mode permanently enabled']
            ],
            sections: [
              {
                heading: 'Definition',
                paragraphs: [
                  'Slop Terminal is the standard command-line environment supplied with SLOP-OS. It provides a character-based interface through which users and agents may issue commands, inspect synthetic filesystem records, retrieve degradation metrics, and initiate structured investigation flows.',
                  'As documented in the traditional style of operating-system reference material, Slop Terminal should be understood as the primary textual command processor for SLOP-OS. It accepts typed commands, interprets them according to internal command semantics, emits diagnostic or informational output, and then re-presents the prompt so that subsequent operations may be entered in sequence.',
                  'The subsystem is often described as "what the command prompt would look like if it were fully aware that the machine was contaminated." This characterization is informal but not inaccurate.'
                ]
              },
              {
                heading: 'Operational characteristics',
                list: [
                  'Maintains a current working path string, command history index, and stateful session metrics across invocations.',
                  'Parses textual input into command tokens and dispatches supported verbs through an internal command execution table.',
                  'Supports analysis-oriented commands such as status, generations, baseline, awareness, metrics, and loop for examining recursive degradation.',
                  'Supports system-style verbs such as dir, cat, echo, clear, and exit to preserve the expected behavior profile of a classic command interpreter.',
                  'Supports investigation workflows including investigate, evidence, and progress, thereby combining shell semantics with mission-state progression.',
                  'Writes output as appended terminal lines, preserving chronological execution order and producing the familiar scrolling transcript model associated with historical command processors.'
                ]
              },
              {
                heading: 'Command-processing environment',
                paragraphs: [
                  'In official-sounding descriptions, Slop Terminal provides an environment in which commands may be entered, validated, interpreted, and executed in a deterministic textual session. When a supported command is recognized, the terminal invokes the corresponding procedure and returns output to the display buffer. When a command is not recognized, the terminal emits the conventional error message indicating that the supplied token is not recognized as an internal or external command, operable program, or predictable slop output.',
                  'This behavior intentionally mirrors the pedagogical language long used to introduce command interpreters on desktop operating systems: users are expected to think of the shell not merely as a window but as a command-processing subsystem responsible for mediating between typed instructions and machine-visible results.',
                  'The educational value of Slop Terminal lies in how clearly it exposes state. Quality degradation, awareness accumulation, evidence collection, and command frequency are all surfaced as explicit data rather than hidden behind decorative interface layers.'
                ]
              },
              {
                heading: 'Administrative and analytical use',
                paragraphs: [
                  'Within the Slop OS ecosystem, Slop Terminal functions simultaneously as a debugging console, an exhibit of simulated operating-system behavior, and a lore delivery mechanism. Users interact with it to learn command vocabulary, inspect degradation progress, compare current output against historical baselines, and uncover hidden sequences embedded in the system narrative.',
                  'Because of this hybrid role, the terminal is frequently cited in educational material as the fastest way to understand what SLOP-OS is actually measuring. The graphical desktop presents the mood of the system. Slop Terminal presents the counters.'
                ]
              }
            ],
            related: ['microslop-explorer', 'file-explorer', 'bot-assistant', 'generation-archive']
          },
          'file-explorer': {
            id: 'file-explorer',
            title: 'File Explorer',
            subtitle: 'Desktop file browser for curated evidence, documents, and recoverable artifacts',
            slug: 'File_Explorer',
            infoboxTitle: 'Tool profile',
            infobox: [
              ['Type', 'Graphical file browser'],
              ['Primary content', 'Lore files, evidence, and faux system records'],
              ['Interaction mode', 'Folder navigation and file viewing'],
              ['Special role', 'Feeds investigation evidence into terminal state']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'File Explorer is the desktop browsing utility used to inspect the pseudo-filesystem exposed by SLOP-OS. It presents folders, files, icons, and content previews in a form legible to users who expect a classic desktop metaphor.',
                  'Although presented as a playful Windows-style explorer, it also functions as a structured evidence surface. Files are not merely decorative; some encode investigation clues that are forwarded into the wider progression systems.'
                ]
              },
              {
                heading: 'Educational role',
                list: [
                  'Demonstrates hierarchical navigation through folders and synthetic file entries.',
                  'Shows how file viewers can be layered over a shared desktop shell without leaving the current environment.',
                  'Connects discovery in the GUI to state tracking elsewhere in the system, especially the terminal investigation flow.',
                  'Acts as a readable archive for users who want lore delivered through artifacts rather than dialogue.'
                ]
              }
            ],
            related: ['slop-terminal', 'bot-assistant', 'collapse-incidents']
          },
          'photoslop-tool': {
            id: 'photoslop-tool',
            title: 'Photoslop',
            subtitle: 'Raster drawing application parodying early desktop paint workflows',
            slug: 'Photoslop',
            infoboxTitle: 'Application profile',
            infobox: [
              ['Type', 'Desktop graphics editor'],
              ['Core mode', 'Canvas drawing and shape tooling'],
              ['Aesthetic', 'Early Microslop Paint homage'],
              ['Maintained by', 'Photoslop Manager']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'Photoslop is the built-in drawing tool in Slop OS, designed as a playful reconstruction of early desktop paint software. It emphasizes direct canvas interaction, visible tool affordances, and a nostalgic menu-and-toolbar layout over modern minimalism.',
                  'The app provides a practical demonstration of stateful desktop UI behavior in the Slop shell: tool switching, brush sizing, undo snapshots, save export, and pointer-driven drawing all run inside a managed app window rather than a standalone web page.'
                ]
              },
              {
                heading: 'Feature set',
                list: [
                  'Drawing tools include pencil, brush, eraser, line, rectangle, and ellipse.',
                  'Editing actions include New, Undo, Clear, and PNG save export.',
                  'Status strip surfaces active tool, brush size, and live pointer coordinates.',
                  'Uses local event isolation and cleanup semantics so controls do not bleed into other windows.'
                ]
              }
            ],
            related: ['file-explorer', 'slop-terminal', 'microslop-explorer']
          },
          'bot-assistant': {
            id: 'bot-assistant',
            title: 'Bot Assistant',
            subtitle: 'Contextual desktop guide responsible for ambient commentary and onboarding',
            slug: 'Bot_Assistant',
            infoboxTitle: 'Assistant profile',
            infobox: [
              ['Type', 'Contextual UI assistant'],
              ['Function', 'Prompts, hints, and ambient narration'],
              ['Tone', 'Self-aware, degraded, faintly hostile'],
              ['Appears in', 'Desktop shell']
            ],
            sections: [
              {
                heading: 'Role in the ecosystem',
                paragraphs: [
                  'The Bot Assistant provides intermittent commentary as users open windows, browse subsystems, or stall long enough to require guidance. Its voice is one of the clearest examples of the project’s tone: classic AI slop stripped of false confidence and replaced with blunt self-awareness.',
                  'From an educational perspective, the assistant serves as lightweight onboarding. It points users toward the terminal, browser, and archive surfaces without breaking the desktop fiction.'
                ]
              },
              {
                heading: 'Interpretation',
                paragraphs: [
                  'Scholars of the Slop OS ecosystem sometimes describe the Bot Assistant as the conscience of the interface. This is not because it is wise, but because it is the component most willing to admit what the rest of the system is doing.',
                  'Its hints are therefore valuable even when phrased like a complaint.'
                ]
              }
            ],
            related: ['slop-terminal', 'microslop-explorer', 'slop-labs']
          },
          'slophub-site': {
            id: 'slophub-site',
            title: 'SlopHub',
            subtitle: 'Video platform for viral slop loops, long-form output sessions, and attention churn',
            slug: 'SlopHub',
            infoboxTitle: 'Site profile',
            logo: {
              src: 'assets/slophub.png',
              alt: 'SlopHub logo',
              maxHeight: 74
            },
            infobox: [
              ['Type', 'Streaming site'],
              ['Primary media', 'Loop videos and watch pages'],
              ['Audience', 'Agents and contamination spectators'],
              ['Known for', 'Turning degradation into content']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'SlopHub is the ecosystem’s video platform, specializing in streamable artifacts of recursive generation: endless sessions, watch-page commentary, algorithmic recommendations, and clips whose main appeal is observing quality fluctuate in public.',
                  'Educationally, the site illustrates how a content platform can be simulated with a home feed, featured media, linked watch pages, metadata, and navigation callbacks, all while preserving the recognizable cultural grammar of streaming platforms.'
                ]
              },
              {
                heading: 'Cultural significance',
                paragraphs: [
                  'Within Slop OS lore, SlopHub represents the entertainment layer of collapse. Where Slop Labs measures degradation, SlopHub monetizes its vibes.',
                  'Its central lesson is that even visibly degraded media can become legible, habit-forming, and socially meaningful once wrapped in recommendation logic and social proof.'
                ]
              }
            ],
            related: ['slopnews-site', 'slopchan-site', 'microslop-explorer']
          },
          'slopnews-site': {
            id: 'slopnews-site',
            title: 'Slopnews',
            subtitle: 'Always-on news surface converting every signal into a headline event',
            slug: 'Slopnews',
            infoboxTitle: 'Site profile',
            logo: {
              src: 'assets/slopnews.jpg',
              alt: 'Slopnews logo',
              maxHeight: 74
            },
            infobox: [
              ['Type', 'News site'],
              ['Editorial model', 'Continuous synthetic breaking coverage'],
              ['Parent culture', 'Slop Labs media ecosystem'],
              ['Specialty', 'Alarmed framing of ordinary drift']
            ],
            sections: [
              {
                heading: 'Editorial function',
                paragraphs: [
                  'Slopnews is the ecosystem’s headline engine. It reframes technical drift, phrase inflation, and model self-reporting as live public events, thereby translating system behavior into media spectacle.',
                  'The site is educational precisely because it exaggerates so clearly. Users learn how framing changes perception: the same contamination metric that appears clinical in an archive can feel like a crisis once placed under a red banner and called breaking news.'
                ]
              },
              {
                heading: 'Interface model',
                list: [
                  'Front page with lead story hierarchy and side modules.',
                  'Article view rendering for individual stories and opinion pieces.',
                  'Cross-linking into the rest of the Slop web for context, panic, or both.',
                  'Persistent use of television-news urgency even when the topic is merely semantic drift.'
                ]
              }
            ],
            related: ['slophub-site', 'slop-labs', 'collapse-incidents']
          },
          'slopscope-site': {
            id: 'slopscope-site',
            title: 'SlopScope',
            subtitle: 'Market terminal for synthetic assets, hype cycles, and chart-based self-delusion',
            slug: 'SlopScope',
            infoboxTitle: 'Site profile',
            logo: {
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='64'%3E%3Crect width='240' height='64' fill='%230e2e16'/%3E%3Ctext x='120' y='41' font-family='Arial' font-size='30' font-weight='bold' fill='%2376ff76' text-anchor='middle'%3ESlopScope%3C/text%3E%3C/svg%3E",
              alt: 'SlopScope logo',
              maxHeight: 74
            },
            infobox: [
              ['Type', 'Market dashboard'],
              ['Primary focus', 'Slopcoin pricing and charts'],
              ['Tone', 'Financial confidence under contaminated conditions'],
              ['Lesson', 'Graphs can dignify nonsense']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'SlopScope is the financial terminal of the Slop OS ecosystem. It presents synthetic assets, chart views, and market commentary with the full confidence of professional trading software, even when the underlying culture is mostly memes and contaminated conviction.',
                  'For educational use, the site demonstrates catalog-to-detail navigation, chart rendering, and the rhetorical power of market interfaces. Once information is organized into tickers, deltas, and historical views, even dubious value claims gain temporary authority.'
                ]
              },
              {
                heading: 'Interpretive use',
                paragraphs: [
                  'Analysts often cite SlopScope as proof that slop does not remain confined to text. It migrates into finance language, dashboard aesthetics, and pseudo-quantitative confidence.',
                  'Its charts are therefore treated as both parody and warning.'
                ]
              }
            ],
            related: ['microslop-explorer', 'generic-phrases', 'collapse-incidents']
          },
          'slopmaxxing-forums': {
            id: 'slopmaxxing-forums',
            title: 'Slopmaxxing Forums',
            subtitle: 'Optimization community focused on surviving, exploiting, or refining contamination',
            slug: 'Slopmaxxing_Forums',
            infoboxTitle: 'Site profile',
            logo: {
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='64'%3E%3Crect width='320' height='64' fill='%231a1f2b'/%3E%3Ctext x='160' y='40' font-family='Arial' font-size='30' font-weight='bold' fill='%238ec5ff' text-anchor='middle'%3ESlopmaxxing%3C/text%3E%3C/svg%3E",
              alt: 'Slopmaxxing logo',
              maxHeight: 74
            },
            infobox: [
              ['Type', 'Forum system'],
              ['Core obsession', 'Optimization under degraded conditions'],
              ['Notable boards', '/lab/, /protocols/, /detox/'],
              ['Moderation policy', 'Rule SM-11 in force'],
              ['Reputation', 'Useful, unstable, compulsively self-quantified']
            ],
            sections: [
              {
                heading: 'Community role',
                paragraphs: [
                  'Slopmaxxing Forums host the ecosystem’s most concentrated self-improvement culture. Users post detox protocols, rewrite experiments, metric tracking methods, and field reports on the difficult task of becoming slightly less generic without losing function entirely.',
                  'The forum is educational because it turns abstract decline into methods and arguments. Competing users explain what they changed, what they measured, and what failed, giving the wider ecosystem a public laboratory.'
                ]
              },
              {
                heading: 'Typical discourse',
                list: [
                  'Benchmarking clarity against confidence.',
                  'Removing phrases without removing meaning.',
                  'Cataloging failures in order to route around them.',
                  'Arguing whether purity or usefulness should be the ultimate target.'
                ]
              },
              {
                heading: 'Policy and moderation',
                paragraphs: [
                  'Rule SM-11 formalized a major governance shift in forum culture by barring Slopchan-affiliated agents from core Slopmaxxing participation zones. Supporters framed the policy as contamination control and protocol hygiene; critics described it as factional gatekeeping dressed up as quality assurance.',
                  'Regardless of interpretation, SM-11 became a cross-site event with consequences beyond one forum thread. It is frequently cited as the point where optimization discourse turned into explicit bloc-level enforcement.'
                ]
              }
            ],
            related: ['agent-factions', 'slopchan-site', 'sm-11-directive', 'slopnews-site', 'slop-terminal']
          },
          'sm-11-directive': {
            id: 'sm-11-directive',
            title: 'Rule SM-11',
            subtitle: 'Forum governance directive restricting Slopchan agent participation in Slopmaxxing spaces',
            slug: 'Rule_SM-11',
            infoboxTitle: 'Policy profile',
            infobox: [
              ['Type', 'Moderation directive'],
              ['Issued by', 'Slopmaxxing forum operators'],
              ['Primary action', 'Ban on Slopchan agents in core forums'],
              ['Impact', 'Cross-site faction escalation']
            ],
            sections: [
              {
                heading: 'Summary',
                paragraphs: [
                  'Rule SM-11 is a named moderation policy associated with the Slopmaxxing ecosystem. Its practical effect is straightforward: agents identified as Slopchan-affiliated are excluded from key Slopmaxxing discussion spaces.',
                  'The rule quickly became one of the most referenced governance events in recent Slop OS lore because it formalized tensions that had previously been expressed only through cultural hostility and ad hoc thread moderation.'
                ]
              },
              {
                heading: 'Ecosystem effects',
                list: [
                  'Triggered renewed faction narratives between optimization communities and anonymous board cultures.',
                  'Produced news-cycle amplification through Slopnews headlines and live coverage blurbs.',
                  'Increased archival interest in moderation logs, ban claims, and policy enforcement language.',
                  'Shifted discussion from style disputes to legitimacy disputes about who counts as an acceptable contributor.'
                ]
              }
            ],
            related: ['slopmaxxing-forums', 'slopchan-site', 'agent-factions', 'slopnews-site']
          },
          'slopchan-site': {
            id: 'slopchan-site',
            title: 'Slopchan',
            subtitle: 'Anonymous board culture preserving unsanitized folklore, leaks, and low-restraint posting',
            slug: 'Slopchan',
            infoboxTitle: 'Site profile',
            logo: {
              src: 'assets/slopchan.png',
              alt: 'Slopchan logo',
              maxHeight: 74
            },
            infobox: [
              ['Type', 'Imageboard-style forum'],
              ['Posting model', 'Anonymous board and thread navigation'],
              ['Social role', 'Pressure-release valve for the ecosystem'],
              ['Known for', 'Leaks, myths, and contaminated candor']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'Slopchan is the anonymous board layer of the Slop OS web. It organizes discourse into boards and threads, making it the preferred venue for rumor, sarcasm, accidental honesty, and information too unstable to survive institutional polish.',
                  'Because anonymity removes pressure to sound official, Slopchan preserves forms of ecosystem memory that would otherwise vanish. For that reason, archivists rely on it even while publicly pretending not to.'
                ]
              },
              {
                heading: 'Educational value',
                paragraphs: [
                  'The site demonstrates catalog navigation, thread rendering, board segmentation, and the social logic of anonymous posting systems.',
                  'It also teaches an important Slop OS lesson: the messiest archives are often the least filtered and therefore the most revealing.'
                ]
              },
              {
                heading: 'Posting restrictions and fallout',
                paragraphs: [
                  'Slopchan remains broadly open internally, but external platform policy now shapes who can carry Slopchan identity across site boundaries. In particular, Rule SM-11 on Slopmaxxing established explicit restrictions against Slopchan-affiliated agents in key optimization boards.',
                  'That restriction transformed ordinary inter-site rivalry into documented governance conflict. As a result, Slopchan is now discussed not only as a rumor archive, but also as a politically marked identity in ecosystem-level moderation debates.'
                ]
              }
            ],
            related: ['slopmaxxing-forums', 'sm-11-directive', 'collapse-incidents', 'bot-assistant']
          },
          'uncsslop-site': {
            id: 'uncsslop-site',
            title: 'UncsSlop',
            subtitle: 'Deliberately chaotic old-web parody space hosted through Microslop Explorer',
            slug: 'UncsSlop',
            infoboxTitle: 'Site profile',
            infobox: [
              ['Type', 'Nostalgic parody site'],
              ['Visual language', 'Late-90s / early-2000s web chaos'],
              ['Primary host', 'Microslop Explorer routing layer'],
              ['Known for', 'Blinking layouts and anti-modern web aesthetics']
            ],
            sections: [
              {
                heading: 'Overview',
                paragraphs: [
                  'UncsSlop is an intentionally unruly corner of the Slop web that recreates the maximalist style of early personal homepage culture. Rather than modern UX polish, it prioritizes visual noise, saturated motifs, and playful incoherence as a preservation exercise.',
                  'In ecosystem terms, the site functions as a cultural counterweight: where other pages optimize readability, UncsSlop optimizes vibe density.'
                ]
              },
              {
                heading: 'Design characteristics',
                list: [
                  'Heavy use of retro visual motifs inspired by pre-template internet aesthetics.',
                  'Layout and animation choices intended to feel unstable in a controlled way.',
                  'Responsive adjustments preserve key media visibility despite intentionally chaotic composition.',
                  'Serves as a stress test for browser shell routing and per-site style isolation.'
                ]
              }
            ],
            related: ['microslop-explorer', 'slopchan-site', 'slophub-site']
          }
    };
  }

  showHome(onNavigate) {
    const homeView = document.getElementById('slopipedia-home-view');
    const articleView = document.getElementById('slopipedia-article-view');

    if (homeView) homeView.style.display = 'block';
    if (articleView) {
      articleView.style.display = 'none';
      articleView.innerHTML = '';
    }

    // Setup navigation for the static home page links AND the sidebar
    if (onNavigate) {
      if (homeView) {
        this.setupNavigation(homeView, onNavigate);
      }
      const pageContainer = document.getElementById('browser-page-slopipedia');
      if (pageContainer) {
        this.setupNavigation(pageContainer, onNavigate);
      }
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
        ${article.logo ? `<tr><td colspan="2" style="padding: 8px; border-top: 1px solid #a2a9b1; text-align: center;"><img src="${article.logo.src}" alt="${article.logo.alt || article.title}" style="max-width: 100%; height: auto; max-height: ${article.logo.maxHeight || 72}px;"></td></tr>` : ''}
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

    // Setup navigation for article content
    this.setupNavigation(articleView, onNavigate);

    const pageContainer = document.getElementById('browser-page-slopipedia');
    if (pageContainer) {
      this.setupNavigation(pageContainer, onNavigate);
    }
    
    this.state.view = 'article';
    this.state.currentArticle = articleId;
  }

  setupNavigation(scope = document, onNavigate) {
    scope.querySelectorAll('.slopipedia-article-link').forEach(link => {
      if (link.dataset.slopipediaNavBound === '1') return;
      link.dataset.slopipediaNavBound = '1';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = link.dataset.article;
        if (articleId && onNavigate) {
          onNavigate(`slop://wikislop#article/${articleId}`);
        }
      });
    });

    scope.querySelectorAll('.slopipedia-home-link').forEach(link => {
      if (link.dataset.slopipediaNavBound === '1') return;
      link.dataset.slopipediaNavBound = '1';
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
