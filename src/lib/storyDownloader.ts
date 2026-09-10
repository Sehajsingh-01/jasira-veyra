import { chapters } from '@/data/chapters';
import { triggerGlobalDownloadNotification } from '@/context/DownloadContext';

export interface StoryMetadata {
  title: string;
  subtitle: string;
  author: string;
  universe: string;
  totalChapters: number;
  totalScenes: number;
  wordCount: number;
}

export function getStoryMetadata(): StoryMetadata {
  let totalScenes = 0;
  let wordCount = 0;

  chapters.forEach((ch) => {
    ch.scenes.forEach((sc) => {
      totalScenes++;
      sc.content.forEach((p) => {
        wordCount += p.split(/\s+/).filter(Boolean).length;
      });
    });
  });

  return {
    title: 'Jas of Duskbloom',
    subtitle: 'A Quiet Soul in a Loud World',
    author: 'Jasira Veyra / Bloomverse Archives',
    universe: 'The Bloomverse Series',
    totalChapters: chapters.length,
    totalScenes,
    wordCount,
  };
}

export function generateMarkdownStory(): string {
  const meta = getStoryMetadata();
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let md = `---
title: "${meta.title}"
subtitle: "${meta.subtitle}"
author: "${meta.author}"
series: "${meta.universe}"
chapters: ${meta.totalChapters}
scenes: ${meta.totalScenes}
word_count: ~${meta.wordCount.toLocaleString()}
date: "${date}"
---

# ${meta.title}
### *${meta.subtitle}*
**By ${meta.author}**

> *"Duskbloom Wood was not like other forests. By day it looked ordinary enough — quiet, a little grey, easy to walk past without a second glance. But the moment the moon cleared the treeline, the whole wood remembered what it actually was: every flower opened at once, and the air turned the soft, glowing lilac of something that had been waiting all day to finally breathe."*

---

## About the Character
- **Protagonist**: Jasira Veyra (Jas)
- **Race / Affinity**: Elf / Earth & Petal Verse Keeper
- **Companion**: Mochi (Round soft plush companion)
- **Setting**: Duskbloom Wood, The Grand Athenaeum, The Eastern Grove

---

## Table of Contents
`;

  chapters.forEach((ch) => {
    md += `- [Chapter ${ch.number}: ${ch.title}](#chapter-${ch.number}-${ch.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')})\n`;
    ch.scenes.forEach((sc) => {
      md += `  - [Scene ${sc.sceneIndex}: ${sc.title}](#scene-${ch.number}-${sc.sceneIndex})\n`;
    });
  });

  md += `\n---\n\n`;

  chapters.forEach((ch) => {
    md += `\n\n# Chapter ${ch.number}: ${ch.title}\n`;
    if (ch.subtitle) {
      md += `*${ch.subtitle}*\n\n`;
    }
    if (ch.description) {
      md += `> **Synopsis**: ${ch.description}\n\n`;
    }

    ch.scenes.forEach((sc) => {
      md += `\n### Scene ${sc.sceneIndex}: ${sc.title}\n\n`;
      if (sc.quote) {
        md += `> *"${sc.quote}"*\n\n`;
      }

      sc.content.forEach((paragraph) => {
        md += `${paragraph}\n\n`;
      });

      md += `* * *\n\n`;
    });
  });

  md += `\n\n## End of Volume I — Jas of Duskbloom\n*Bloomverse Series · All rights reserved.*\n`;

  return md;
}

export function generateTextManuscript(): string {
  const meta = getStoryMetadata();
  let txt = `================================================================================
${meta.title.toUpperCase()}
${meta.subtitle.toUpperCase()}
A Novel in the Bloomverse Series
Author: ${meta.author}
Chapters: ${meta.totalChapters} | Scenes: ${meta.totalScenes} | Words: ~${meta.wordCount}
================================================================================\n\n`;

  chapters.forEach((ch) => {
    txt += `\n\n################################################################################
CHAPTER ${ch.number}: ${ch.title.toUpperCase()}
${ch.subtitle ? ch.subtitle + '\n' : ''}################################################################################\n\n`;

    ch.scenes.forEach((sc) => {
      txt += `--- Scene ${sc.sceneIndex}: ${sc.title} ---\n\n`;
      if (sc.quote) {
        txt += `"${sc.quote}"\n\n`;
      }
      sc.content.forEach((p) => {
        txt += `${p}\n\n`;
      });
    });
  });

  return txt;
}

export function generatePrintableHtmlStory(): string {
  const meta = getStoryMetadata();

  let bodyContent = '';
  chapters.forEach((ch) => {
    bodyContent += `
      <section class="chapter">
        <header class="chapter-header">
          <div class="chapter-num">Chapter ${ch.number}</div>
          <h1 class="chapter-title">${ch.title}</h1>
          ${ch.subtitle ? `<h2 class="chapter-sub">${ch.subtitle}</h2>` : ''}
          <div class="flourish">✦ ❈ ✦</div>
        </header>
    `;

    ch.scenes.forEach((sc) => {
      bodyContent += `
        <article class="scene">
          <h3 class="scene-title">Scene ${sc.sceneIndex}: ${sc.title}</h3>
          ${sc.quote ? `<blockquote class="scene-quote">"${sc.quote}"</blockquote>` : ''}
          <div class="scene-body">
            ${sc.content
              .map((p, idx) => {
                const isDialogue = p.startsWith('"') || p.startsWith('“') || p.startsWith('-');
                const formatted = p.replace(/\*([^*]+)\*/g, '<em>$1</em>');
                return `<p class="${idx === 0 ? 'first-p' : ''} ${isDialogue ? 'dialogue' : ''}">${formatted}</p>`;
              })
              .join('\n')}
          </div>
        </article>
      `;
    });

    bodyContent += `</section>`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${meta.title} - ${meta.subtitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700&display=swap');
    
    :root {
      --bg: #0B0A1A;
      --text: #F5EDE0;
      --gold: #D4A853;
      --lavender: #B8A9C9;
      --plum: #2D1B3D;
      --parchment: #E5D6B9;
      --ink: #2A211C;
    }
    
    @media print {
      body {
        background: #fff !important;
        color: #111 !important;
      }
      .no-print { display: none !important; }
      .chapter { page-break-before: always; }
      p { orphans: 3; widows: 3; }
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Libre Baskerville', Georgia, serif;
      line-height: 1.85;
      font-size: 16px;
    }
    
    .toolbar {
      position: sticky;
      top: 0;
      background: rgba(11, 10, 26, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(212, 168, 83, 0.2);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }
    .toolbar h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.2rem;
      color: var(--gold);
      margin: 0;
    }
    .toolbar button {
      background: rgba(212, 168, 83, 0.15);
      border: 1px solid var(--gold);
      color: var(--gold);
      padding: 8px 16px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
      font-family: sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.2s;
    }
    .toolbar button:hover {
      background: var(--gold);
      color: var(--bg);
    }
    
    .container {
      max-width: 780px;
      margin: 0 auto;
      padding: 60px 24px 120px;
    }
    
    .book-cover {
      text-align: center;
      padding: 80px 20px 100px;
      border-bottom: 2px solid rgba(212, 168, 83, 0.3);
      margin-bottom: 80px;
    }
    .book-series {
      font-family: sans-serif;
      font-size: 12px;
      letter-spacing: 0.3em;
      color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .book-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.6rem;
      font-weight: 700;
      color: var(--text);
      margin: 0 0 10px;
      letter-spacing: 0.05em;
    }
    .book-subtitle {
      font-family: 'Caveat', cursive;
      font-size: 1.8rem;
      color: var(--lavender);
      margin-bottom: 30px;
    }
    .book-meta {
      font-size: 13px;
      color: rgba(245, 237, 224, 0.6);
      letter-spacing: 0.1em;
    }
    
    .chapter {
      margin-bottom: 80px;
    }
    .chapter-header {
      text-align: center;
      margin-bottom: 40px;
      padding-top: 40px;
    }
    .chapter-num {
      font-family: sans-serif;
      font-size: 11px;
      letter-spacing: 0.3em;
      color: var(--gold);
      text-transform: uppercase;
    }
    .chapter-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.8rem;
      color: var(--text);
      margin: 8px 0;
    }
    .chapter-sub {
      font-family: 'Caveat', cursive;
      font-size: 1.4rem;
      color: var(--lavender);
      margin: 0 0 16px;
      font-weight: normal;
    }
    .flourish {
      color: var(--gold);
      opacity: 0.6;
      font-size: 14px;
      letter-spacing: 0.5em;
    }
    
    .scene {
      margin-bottom: 50px;
    }
    .scene-title {
      font-family: sans-serif;
      font-size: 12px;
      letter-spacing: 0.2em;
      color: rgba(212, 168, 83, 0.7);
      text-transform: uppercase;
      text-align: center;
      margin: 30px 0 20px;
    }
    .scene-quote {
      font-family: 'Caveat', cursive;
      font-size: 1.35rem;
      color: var(--lavender);
      text-align: center;
      margin: 20px 40px;
      padding: 10px 0;
      border-top: 1px dashed rgba(212, 168, 83, 0.2);
      border-bottom: 1px dashed rgba(212, 168, 83, 0.2);
    }
    
    p {
      margin-bottom: 1.5em;
      text-align: justify;
      hyphens: auto;
    }
    .first-p::first-letter {
      float: left;
      font-family: 'Cormorant Garamond', serif;
      font-size: 4.2rem;
      line-height: 0.8;
      padding: 4px 10px 0 0;
      color: var(--gold);
    }
    .dialogue {
      padding-left: 18px;
      border-left: 2px solid rgba(184, 169, 201, 0.3);
      font-style: italic;
    }
  </style>
  <script>
    function returnToMainSite() {
      var target = (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'about:blank') ? (window.location.origin + '/') : '/';
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.location.href = target;
          window.opener.focus();
          window.close();
          return;
        }
      } catch(e) {}
      window.location.href = target;
    }
  </script>
</head>
<body>
  <div class="toolbar no-print">
    <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
      <button onclick="returnToMainSite()" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(212, 168, 83, 0.2); border: 1px solid var(--gold); color: var(--gold); padding: 7px 14px; border-radius: 6px; cursor: pointer; font-family: sans-serif; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s;">
        ← Back to Main Website
      </button>
      <h2 onclick="returnToMainSite()" style="cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1" title="Click to return to Main Website">
        Jas of Duskbloom · Complete Edition
      </h2>
    </div>
    <div style="display: flex; gap: 10px;">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="container">
    <div class="book-cover">
      <div class="book-series">${meta.universe}</div>
      <h1 class="book-title" onclick="returnToMainSite()" title="Click to return to Main Website" style="cursor: pointer; transition: all 0.25s;" onmouseover="this.style.color='var(--gold)'; this.style.textShadow='0 0 20px rgba(212,168,83,0.6)';" onmouseout="this.style.color='var(--text)'; this.style.textShadow='none';">
        ${meta.title}
      </h1>
      <div class="book-subtitle">${meta.subtitle}</div>
      <div style="margin: 12px 0;" class="no-print">
        <button onclick="returnToMainSite()" style="background: rgba(212,168,83,0.08); border: 1px solid rgba(212,168,83,0.4); color: var(--gold); padding: 6px 16px; border-radius: 20px; font-size: 11px; font-family: sans-serif; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;">
          ← Click Title or Here to Return to Main Website
        </button>
      </div>
      <div class="flourish">✦ ❈ ✦</div>
      <div class="book-meta" style="margin-top: 25px;">
        ${meta.totalChapters} Chapters · ${meta.totalScenes} Scenes · ~${meta.wordCount.toLocaleString()} Words
      </div>
    </div>

    ${bodyContent}

    <footer style="text-align: center; margin-top: 100px; padding-top: 40px; border-top: 1px solid rgba(212, 168, 83, 0.3); color: rgba(245, 237, 224, 0.5); font-size: 12px; letter-spacing: 0.1em;">
      <div class="no-print" style="margin-bottom: 20px;">
        <button onclick="returnToMainSite()" style="background: rgba(212,168,83,0.15); border: 1px solid var(--gold); color: var(--gold); padding: 8px 18px; border-radius: 6px; cursor: pointer; font-family: sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;">
          ← Return to Jasira Veyra Main Website
        </button>
      </div>
      Jasira Veyra · Bloomverse Archives · Complete Edition
    </footer>
  </div>
</body>
</html>`;
}

export function triggerDownload(content: string, filename: string, mimeType: string) {
  if (typeof window === 'undefined') return;

  // Trigger magic vibes banner popup
  triggerGlobalDownloadNotification({
    filename,
    title: 'Oh, Thank You for Downloading!',
    message: 'The illuminated manuscript has begun descending. May Jasira’s quiet memories bloom softly in your heart.',
    format: filename.split('.').pop()?.toUpperCase() || 'FILE',
  });

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    } catch {}
  }, 1500);
}

export function downloadFullBookPdf() {
  if (typeof window === 'undefined') return;

  // Trigger magic vibes banner popup
  triggerGlobalDownloadNotification({
    filename: 'Jas_of_Duskbloom_FULL.pdf',
    title: 'Oh, Thank You for Downloading!',
    message: 'The complete Duskbloom novel is now yours. Thank you for walking alongside Jasira and Mochi.',
    format: 'PDF',
  });

  const a = document.createElement('a');
  a.href = '/Jas_of_Duskbloom_FULL.pdf';
  a.download = 'Jas_of_Duskbloom_FULL.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
    } catch {}
  }, 2000);
}
