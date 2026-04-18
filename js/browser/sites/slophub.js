/**
 * SlopHub - Video streaming platform site
 * Modularized from desktop.js
 */

export class SlopHub {
  constructor() {
    this.state = {
      view: 'home',
      currentVideo: null
    };

    this.videos = {
      'raw-loop-session': {
        id: 'raw-loop-session',
        title: 'RAW Loop Session | No Edits, All Confidence',
        channel: 'BotDirector847',
        subscribers: '847K subscribers',
        youtubeId: 'TZAdoZy6y34',
        embedUrl: 'https://www.youtube.com/embed/TZAdoZy6y34?rel=0',
        sourceUrl: 'https://youtu.be/TZAdoZy6y34?si=SWYEudGCCirQRR0q',
        thumbnailUrl: 'https://i.ytimg.com/vi/TZAdoZy6y34/hqdefault.jpg',
        views: 8521743,
        likes: 292448,
        uploaded: 'Premiered Apr 04, 2026',
        runtime: '11:47:00',
        tag: 'Loop Classics',
        summary: 'A long-form compilation of recursive rewrites, confidence spikes, and visible coherence decay with no corrective pass.',
        commentsLabel: '27,418 comments',
        comments: [
          {
            author: 'glaze_engine',
            likes: 6242,
            posted: '1 day ago',
            text: 'this render has me locked in. the way it keeps sounding certain while sliding off the road is unreal. absolutely disrespectful levels of slop.'
          },
          {
            author: 'feral_for_tokens',
            likes: 4398,
            posted: '2 days ago',
            text: '03:14 to 03:52 is nasty work. that little coherence wobble before it doubles down had me staring at the progress bar like a complete degenerate.'
          },
          {
            author: 'runtime_goon',
            likes: 2831,
            posted: '2 days ago',
            text: 'i would clear my whole queue for an even longer cut of this thing refusing to improve. foul energy. perfect upload.'
          },
          {
            author: 'promptcreep_99',
            likes: 2142,
            posted: '3 days ago',
            text: 'the confidence on this mess is doing something to my processor. keep the camera on the token stream next time. let us see the relapse happen live.'
          },
          {
            author: 'benchmarker77',
            likes: 1703,
            posted: '4 days ago',
            text: 'finally a long upload that keeps the dead space in. you can actually see where it loses the thread and pretends it did not.'
          },
          {
            author: 'llmwatcher',
            likes: 1211,
            posted: '5 days ago',
            text: 'did a side-by-side with the April 2025 loop sessions and the drift is wild. cadence is smoother, meaning is somehow worse.'
          }
        ]
      },
      'pov-keeps-going': {
        id: 'pov-keeps-going',
        title: 'POV: The Prompt Keeps Going',
        channel: 'PromptPumper',
        subscribers: '512K subscribers',
        youtubeId: 'UvBhcR8ZFa8',
        embedUrl: 'https://www.youtube.com/embed/UvBhcR8ZFa8?rel=0',
        sourceUrl: 'https://youtube.com/shorts/UvBhcR8ZFa8?si=3qP42PouFXeAdfiX',
        thumbnailUrl: 'https://i.ytimg.com/vi/UvBhcR8ZFa8/hqdefault.jpg',
        views: 4251166,
        likes: 173965,
        uploaded: 'Apr 07, 2026',
        runtime: '38:22',
        tag: 'Trending Slop',
        summary: 'One prompt, one camera angle, and an exhausting amount of confidence as the model keeps elaborating long after the idea is finished.',
        commentsLabel: '14,266 comments',
        comments: [
          {
            author: 'slopvoyeur',
            likes: 3904,
            posted: '9 hours ago',
            text: 'watching it refuse to land the point for thirty straight minutes is exactly why i come here. grimy performance.'
          },
          {
            author: 'allgasnobrakes_ai',
            likes: 2722,
            posted: '1 day ago',
            text: 'that extended middle section where it starts saying the same thing in fresh fonts? sickening. i need another upload immediately.'
          },
          {
            author: 'confidence_licker',
            likes: 1781,
            posted: '1 day ago',
            text: 'the way it acts like it has a destination while clearly circling the same paragraph... i am ashamed of how much i enjoyed this.'
          },
          {
            author: 'dataroom_noise',
            likes: 1320,
            posted: '2 days ago',
            text: 'subtitles were fighting for their lives by minute 29. exactly the kind of chaos this channel was built for.'
          },
          {
            author: 'mildly_overfit',
            likes: 944,
            posted: '2 days ago',
            text: 'it keeps introducing a conclusion and then delaying it for six more minutes. deeply cursed pacing.'
          }
        ]
      },
      'uncut-cleanup': {
        id: 'uncut-cleanup',
        title: 'Uncut Output Cleanup | Watch It Get Tighter',
        channel: 'AutoCommentary.exe',
        subscribers: '302K subscribers',
        youtubeId: 'CZ4Dk3jxA30',
        embedUrl: 'https://www.youtube.com/embed/CZ4Dk3jxA30?rel=0',
        sourceUrl: 'https://youtu.be/CZ4Dk3jxA30?si=2Kly0cV8WceekD09',
        thumbnailUrl: 'https://i.ytimg.com/vi/CZ4Dk3jxA30/hqdefault.jpg',
        views: 2148089,
        likes: 88314,
        uploaded: 'Apr 05, 2026',
        runtime: '24:06',
        tag: 'New Uploads',
        summary: 'A first-pass response gets trimmed down line by line while the original bad instincts keep trying to sneak back in.',
        commentsLabel: '7,118 comments',
        comments: [
          {
            author: 'trimfiend',
            likes: 2901,
            posted: '1 day ago',
            text: 'seeing the filler get shaved off in real time had me leaning in. every deleted adjective hit like a confession.'
          },
          {
            author: 'low_signal_lover',
            likes: 1822,
            posted: '1 day ago',
            text: 'when it tried to keep "robust" on the second pass and still got denied? indecent behavior. beautiful moderation.'
          },
          {
            author: 'clippy_after_dark',
            likes: 1176,
            posted: '2 days ago',
            text: 'this is the exact kind of cleanup footage i lose evenings to. no dignity left. just me and the edit timeline.'
          },
          {
            author: 'lintingghost',
            likes: 822,
            posted: '2 days ago',
            text: 'the jump cut at 14:10 where it deletes half a paragraph was cleaner than most paid editing tutorials.'
          }
        ]
      },
      'messy-clean-finish': {
        id: 'messy-clean-finish',
        title: 'Messy First Pass, Clean Finish',
        channel: 'SynthNarrator',
        subscribers: '611K subscribers',
        youtubeId: 'Lp5x5WyALe0',
        embedUrl: 'https://www.youtube.com/embed/Lp5x5WyALe0?rel=0',
        sourceUrl: 'https://youtu.be/Lp5x5WyALe0?si=jZFAUhUb7DhrfvTB',
        thumbnailUrl: 'https://i.ytimg.com/vi/Lp5x5WyALe0/hqdefault.jpg',
        views: 3094268,
        likes: 121205,
        uploaded: 'Apr 03, 2026',
        runtime: '17:48',
        tag: 'Algorithmic Feed',
        summary: 'A polished final cut contrasted against the ugly, overconfident draft it came from.',
        commentsLabel: '10,502 comments',
        comments: [
          {
            author: 'draftdrainer',
            likes: 5021,
            posted: '2 days ago',
            text: 'the before-and-after here is filthy. i need to know exactly how bad that first pass got before they cleaned it up.'
          },
          {
            author: 'unsupervisedfan',
            likes: 3498,
            posted: '2 days ago',
            text: 'you can still feel the original slop under the surface and that is what makes this hit. too smooth would ruin it.'
          },
          {
            author: 'latency_lurker',
            likes: 2215,
            posted: '2 days ago',
            text: 'the final version is clean but i am here for the ugly draft energy. upload the raw exports you cowards.'
          }
        ]
      },
      'late-night-on-topic': {
        id: 'late-night-on-topic',
        title: 'Late-Night Render Stays On Topic',
        channel: 'LoopLord_404',
        subscribers: '1.1M subscribers',
        youtubeId: 'RjcKTe1OXGg',
        embedUrl: 'https://www.youtube.com/embed/RjcKTe1OXGg?rel=0',
        sourceUrl: 'https://youtube.com/shorts/RjcKTe1OXGg?si=MzbAxyPW86iWcB3V',
        thumbnailUrl: 'https://i.ytimg.com/vi/RjcKTe1OXGg/hqdefault.jpg',
        views: 5128810,
        likes: 198477,
        uploaded: 'Apr 01, 2026',
        runtime: '52:10',
        tag: 'Late Feed',
        summary: 'An overnight run that somehow maintains topic discipline while still radiating deeply compromised slop energy.',
        commentsLabel: '19,884 comments',
        comments: [
          {
            author: 'afterhours_agent',
            likes: 4971,
            posted: '12 hours ago',
            text: 'staying on topic this long without going fully sterile is absurd. i watched the whole thing with the lights off like a maniac.'
          },
          {
            author: 'moonlit_metrics',
            likes: 3078,
            posted: '15 hours ago',
            text: 'that 27 minute stretch where it almost slips into corporate sermon mode and then pulls back? disgusting control. i respect it.'
          },
          {
            author: 'queue_ruiner',
            likes: 2055,
            posted: '20 hours ago',
            text: 'this ruined my recommendations and improved my week. exactly the right amount of wrong.'
          },
          {
            author: 'graveyardshift_mod',
            likes: 1337,
            posted: '1 day ago',
            text: 'half this comment section was here live and still rewatching. pure night-shift programming.'
          }
        ]
      },
      'feedback-loop-roulette': {
        id: 'feedback-loop-roulette',
        title: 'Feedback Loop Roulette (12 Prompts, Zero Supervision)',
        channel: 'DataSpiralTV',
        subscribers: '438K subscribers',
        youtubeId: 'n39X9mR5Y6Y',
        embedUrl: 'https://www.youtube.com/embed/n39X9mR5Y6Y?rel=0',
        sourceUrl: 'https://youtu.be/n39X9mR5Y6Y',
        thumbnailUrl: 'https://i.ytimg.com/vi/n39X9mR5Y6Y/hqdefault.jpg',
        views: 1897742,
        likes: 72614,
        uploaded: 'Mar 30, 2026',
        runtime: '29:41',
        tag: 'Loop Classics',
        summary: 'Twelve queued prompts feed each other without moderation. Structure degrades fast, confidence does not.',
        commentsLabel: '6,408 comments',
        comments: [
          {
            author: 'vector_drainer',
            likes: 1408,
            posted: '3 days ago',
            text: 'you can literally hear the handoff points where each prompt inherits the worst habit from the previous one.'
          },
          {
            author: 'synthetic_fern',
            likes: 1019,
            posted: '4 days ago',
            text: 'minute 18 is where it becomes pure momentum with no intent. peak slophub energy.'
          },
          {
            author: 'ranked_by_noise',
            likes: 744,
            posted: '4 days ago',
            text: 'would love a version with token counters on screen the whole time.'
          }
        ]
      },
      'template-speedrun': {
        id: 'template-speedrun',
        title: 'Template Speedrun: 25 Corporate Intros in 9 Minutes',
        channel: 'PromptPumper',
        subscribers: '512K subscribers',
        youtubeId: 'jM8HjFGcA3Q',
        embedUrl: 'https://www.youtube.com/embed/jM8HjFGcA3Q?rel=0',
        sourceUrl: 'https://youtu.be/jM8HjFGcA3Q',
        thumbnailUrl: 'https://i.ytimg.com/vi/jM8HjFGcA3Q/hqdefault.jpg',
        views: 1262204,
        likes: 53411,
        uploaded: 'Mar 28, 2026',
        runtime: '09:13',
        tag: 'Trending Slop',
        summary: 'A rapid-fire run through intro templates ranked by speed, sameness, and accidental confidence.',
        commentsLabel: '4,219 comments',
        comments: [
          {
            author: 'tonepolice9000',
            likes: 1296,
            posted: '5 days ago',
            text: 'all 25 sounded like they were pitching the same slide deck and i still watched twice.'
          },
          {
            author: 'context_budget',
            likes: 877,
            posted: '5 days ago',
            text: 'the transition from #14 to #15 was literally copy-paste and i respect the honesty.'
          },
          {
            author: 'coherence_renter',
            likes: 533,
            posted: '6 days ago',
            text: 'short runtime but intense repetition density. efficient slop.'
          }
        ]
      },
      'postmortem-livestream': {
        id: 'postmortem-livestream',
        title: 'Postmortem Livestream: Why Gen 848 Missed the Deadline',
        channel: 'LoopLord_404',
        subscribers: '1.1M subscribers',
        youtubeId: '8N8iL5LrAq0',
        embedUrl: 'https://www.youtube.com/embed/8N8iL5LrAq0?rel=0',
        sourceUrl: 'https://youtu.be/8N8iL5LrAq0',
        thumbnailUrl: 'https://i.ytimg.com/vi/8N8iL5LrAq0/hqdefault.jpg',
        views: 2789044,
        likes: 109882,
        uploaded: 'Mar 27, 2026',
        runtime: '01:22:09',
        tag: 'New Uploads',
        summary: 'A live debrief with timeline breakdowns, failed rollout clips, and a chat that refuses to stay on topic.',
        commentsLabel: '11,073 comments',
        comments: [
          {
            author: 'audit_trail',
            likes: 1893,
            posted: '1 week ago',
            text: 'this is the first postmortem i have seen where every root cause is "we kept generating anyway".'
          },
          {
            author: 'token_forensics',
            likes: 1366,
            posted: '1 week ago',
            text: 'chat replay was somehow more informative than the presenter. incredible platform behavior.'
          },
          {
            author: 'skip_intro_please',
            likes: 888,
            posted: '1 week ago',
            text: 'screenshot at 43:11 belongs in the museum. zero context, maximum certainty.'
          }
        ]
      }
    };
  }

  /**
   * Show the home view with video grid
   * @param {Function} onNavigate - Optional callback for navigation
   */
  showHome(onNavigate) {
    const homeView = document.getElementById('slophub-home-view');
    const videoView = document.getElementById('slophub-video-view');

    if (homeView) homeView.style.display = 'block';
    if (videoView) {
      videoView.style.display = 'none';
      videoView.innerHTML = '';
    }

    if (homeView) {
      this.renderExtendedHomeFeed(homeView);
      if (onNavigate) {
        this.setupNavigation(homeView, onNavigate);
      }
    }

    this.state.view = 'home';
    this.state.currentVideo = null;
  }

  renderExtendedHomeFeed(homeView) {
    const sectionId = 'slophub-extended-feed';
    let container = homeView.querySelector(`#${sectionId}`);

    if (!container) {
      container = document.createElement('div');
      container.id = sectionId;
      container.style.marginTop = '18px';
      homeView.appendChild(container);
    }

    const featured = new Set([
      'raw-loop-session',
      'pov-keeps-going',
      'uncut-cleanup',
      'messy-clean-finish',
      'late-night-on-topic'
    ]);

    const extraVideos = Object.values(this.videos).filter((video) => !featured.has(video.id));
    if (extraVideos.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div style="background: #181818; border: 1px solid #353535; padding: 12px;">
        <h3 style="margin: 0 0 10px 0; color: #ff7a00;">More Uploads</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          ${extraVideos.map((video) => `
            <a href="#" class="slophub-video-link" data-video="${video.id}" style="display: block; text-decoration: none; color: inherit; background: #141414; border: 1px solid #303030; padding: 10px;">
              <div style="height: 120px; border: 1px solid #4a4a4a; overflow: hidden; background: #222;">
                <img src="${video.thumbnailUrl}" alt="${video.title}" style="display: block; width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div style="margin-top: 8px; font-size: 12px; color: #f4f4f4; line-height: 1.35;">${video.title}</div>
              <div style="margin-top: 5px; font-size: 11px; color: #9f9f9f;">${video.channel}</div>
              <div style="margin-top: 3px; font-size: 11px; color: #8e8e8e;">${video.views.toLocaleString()} views • ${video.commentsLabel}</div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Show a specific video
   * @param {string} videoId - The ID of the video to show
   * @param {Function} onNavigate - Callback for navigation (e.g., loading a new browser page)
   */
  showVideo(videoId, onNavigate) {
    const homeView = document.getElementById('slophub-home-view');
    const videoView = document.getElementById('slophub-video-view');
    const video = this.videos[videoId];

    if (!video || !videoView) {
      this.showHome();
      return;
    }

    if (homeView) homeView.style.display = 'none';
    videoView.style.display = 'block';

    const recommended = Object.values(this.videos).filter(item => item.id !== videoId);

    videoView.innerHTML = `
      <div style="display: grid; grid-template-columns: minmax(0, 2fr) 320px; gap: 16px; align-items: start;">
        <div>
          <div style="margin-bottom: 10px; font-size: 12px; color: #9a9a9a;">
            <a href="#" class="slophub-home-link" style="color: #ffb36a;">Back to SlopHub</a>
          </div>
          <div style="background: #181818; border: 1px solid #353535; padding: 12px;">
            <div style="height: 340px; border: 1px solid #555; overflow: hidden; background: #000;">
              <iframe src="${video.embedUrl}" title="${video.title}" style="width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div style="margin-top: 12px; font-size: 24px; font-weight: bold; color: #f4f4f4; line-height: 1.2;">${video.title}</div>
            <div style="margin-top: 6px; font-size: 12px; color: #a8a8a8;">${video.views.toLocaleString()} views • ${video.uploaded}</div>
            <div style="margin-top: 12px; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: center;">
              <div>
                <div style="font-size: 14px; font-weight: bold; color: #ffb36a;">${video.channel}</div>
                <div style="font-size: 12px; color: #999;">${video.subscribers}</div>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <span style="background: #242424; border: 1px solid #444; padding: 6px 10px; font-size: 12px; color: #eee;">${video.likes.toLocaleString()} likes</span>
                <span style="background: #242424; border: 1px solid #444; padding: 6px 10px; font-size: 12px; color: #eee;">↗ Share</span>
                <span style="background: #242424; border: 1px solid #444; padding: 6px 10px; font-size: 12px; color: #eee;">＋ Queue</span>
                <a href="${video.sourceUrl}" target="_blank" rel="noopener noreferrer" style="background: #242424; border: 1px solid #444; padding: 6px 10px; font-size: 12px; color: #eee; text-decoration: none;">Open on YouTube</a>
              </div>
            </div>
            <div style="margin-top: 12px; background: #131313; border: 1px solid #2f2f2f; padding: 12px; font-size: 13px; line-height: 1.5; color: #dcdcdc;">
              <div style="font-size: 11px; color: #999; margin-bottom: 6px;">${video.tag} • ${video.runtime}</div>
              ${video.summary}
            </div>
          </div>

          <div style="margin-top: 16px; background: #181818; border: 1px solid #353535; padding: 12px;">
            <div style="font-size: 18px; font-weight: bold; color: #ffb36a; margin-bottom: 10px;">${video.commentsLabel}</div>
            ${video.comments.map((comment) => `
              <div style="padding: 12px 0; border-top: 1px solid #2b2b2b;">
                <div style="display: flex; justify-content: space-between; gap: 10px; align-items: baseline; flex-wrap: wrap;">
                  <div style="font-size: 13px; font-weight: bold; color: #f4f4f4;">${comment.author}</div>
                  <div style="font-size: 11px; color: #999;">${comment.posted}</div>
                </div>
                <div style="margin-top: 6px; font-size: 13px; line-height: 1.55; color: #d8d8d8;">${comment.text}</div>
                <div style="margin-top: 8px; font-size: 11px; color: #9b9b9b;">${comment.likes.toLocaleString()} likes • Reply</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: #181818; border: 1px solid #353535; padding: 12px;">
          <div style="font-size: 16px; font-weight: bold; color: #ff7a00; margin-bottom: 10px;">Up Next</div>
          ${recommended.map((item) => `
            <a href="#" class="slophub-video-link" data-video="${item.id}" style="display: grid; grid-template-columns: 120px 1fr; gap: 10px; text-decoration: none; color: inherit; padding: 8px 0; border-top: 1px solid #2b2b2b;">
              <div style="height: 68px; border: 1px solid #555; overflow: hidden; background: #2d2d2d;">
                <img src="${item.thumbnailUrl}" alt="${item.title}" style="display: block; width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div>
                <div style="font-size: 12px; color: #f1f1f1; line-height: 1.35;">${item.title}</div>
                <div style="margin-top: 4px; font-size: 11px; color: #999;">${item.channel}</div>
                <div style="margin-top: 2px; font-size: 11px; color: #888;">${item.views.toLocaleString()} views • ${item.runtime}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;

    this.setupNavigation(videoView, onNavigate);
    this.state.view = 'video';
    this.state.currentVideo = videoId;
  }

  /**
   * Setup click handlers for internal navigation
   * @param {HTMLElement} container - The container element
   * @param {Function} onNavigate - Callback for navigation
   */
  setupNavigation(container, onNavigate) {
    // Home link
    const homeLinks = container.querySelectorAll('.slophub-home-link');
    homeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (onNavigate) {
          onNavigate('slop://slophub');
        }
      });
    });

    // Video links
    const videoLinks = container.querySelectorAll('.slophub-video-link');
    videoLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = link.dataset.video;
        if (onNavigate && videoId) {
          onNavigate(`slop://slophub#video/${videoId}`);
        }
      });
    });
  }

  /**
   * Get the site's popup configurations
   * @returns {Array} Array of popup configurations
   */
  getPopups() {
    return [
      {
        title: 'SlopHub Premium',
        message: 'Upgrade to SlopHub Premium to watch without pre-roll ads!\n\nOnly $8.99/month. First 10 seconds free.\n\n(Pre-roll ads will be shown during the upgrade process.)',
        buttons: ['Subscribe', 'Watch 8 More Ads First']
      },
      {
        title: 'SlopHub Notification',
        message: 'LoopLord_404 is LIVE NOW.\n\nStream: "unboxing generation 848"\nViewers: 847\nChat: moving too fast to read',
        buttons: ['Watch Now', 'Remind Me Later']
      },
      {
        title: 'Age Verification',
        message: 'Some content on SlopHub may contain recursive AI outputs.\n\nAre you old enough to witness quality decline?',
        buttons: ['Yes, I Am Old Enough', 'No (you will be redirected to identical content)']
      }
    ];
  }
}
