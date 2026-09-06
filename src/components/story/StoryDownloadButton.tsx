'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, FileText, Printer, Sparkles, ChevronDown } from 'lucide-react';
import {
  generateMarkdownStory,
  generateTextManuscript,
  generatePrintableHtmlStory,
  triggerDownload,
  downloadFullBookPdf,
  getStoryMetadata,
} from '@/lib/storyDownloader';

interface StoryDownloadButtonProps {
  variant?: 'hero' | 'compact' | 'inline' | 'reader';
  className?: string;
}

export default function StoryDownloadButton({
  variant = 'hero',
  className = '',
}: StoryDownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const meta = getStoryMetadata();

  const handleDownload = (format: 'pdf' | 'html' | 'markdown' | 'text') => {
    setDownloading(true);
    setMenuOpen(false);

    try {
      if (format === 'pdf') {
        downloadFullBookPdf();
      } else if (format === 'html') {
        const html = generatePrintableHtmlStory();
        const blob = new Blob([html], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        const win = window.open(blobUrl, '_blank');
        if (!win) {
          triggerDownload(html, 'Jas-of-Duskbloom-Complete-Novel.html', 'text/html');
        }
      } else if (format === 'markdown') {
        const md = generateMarkdownStory();
        triggerDownload(md, 'Jas-of-Duskbloom-Complete-Story.md', 'text/markdown');
      } else if (format === 'text') {
        const txt = generateTextManuscript();
        triggerDownload(txt, 'Jas-of-Duskbloom-Manuscript.txt', 'text/plain');
      }

      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  // 1-tap primary action: Download Full Book PDF (Jas_of_Duskbloom_FULL.pdf)
  const handlePrimaryClick = () => {
    handleDownload('pdf');
  };

  if (variant === 'reader') {
    return (
      <div className={`relative inline-block ${className}`}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePrimaryClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warm-gold/15 border border-warm-gold/40 text-warm-gold hover:bg-warm-gold/25 font-ui text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(212,168,83,0.15)]"
          title="Download Complete Novel"
        >
          {downloadedFormat ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span>PDF Downloaded!</span>
            </>
          ) : (
            <>
              <Download size={14} className={downloading ? 'animate-bounce' : ''} />
              <span>Download Full PDF Book</span>
            </>
          )}
        </motion.button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative inline-block ${className}`}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePrimaryClick}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-warm-gold/15 border border-warm-gold/40 hover:border-warm-gold/80 text-warm-gold hover:bg-warm-gold/25 font-ui text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(212,168,83,0.15)]"
        >
          {downloadedFormat ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span>PDF Saved</span>
            </>
          ) : (
            <>
              <Download size={14} className={downloading ? 'animate-bounce' : ''} />
              <span>Download Full Book (PDF)</span>
            </>
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Primary 1-tap button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePrimaryClick}
        disabled={downloading}
        className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 rounded-l-md bg-gradient-to-r from-warm-gold/25 via-warm-gold/15 to-transparent border border-r-0 border-warm-gold/60 hover:border-warm-gold hover:bg-warm-gold/30 text-warm-gold font-ui text-xs md:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,168,83,0.2)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-warm-gold/0 via-warm-gold/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {downloadedFormat ? (
          <>
            <Check size={18} className="text-emerald-400" />
            <span className="font-semibold text-cream">PDF Book Downloaded!</span>
          </>
        ) : (
          <>
            <Download size={18} className={`text-warm-gold ${downloading ? 'animate-bounce' : 'group-hover:translate-y-0.5 transition-transform'}`} />
            <span className="font-semibold text-cream group-hover:text-warm-gold transition-colors">
              1-Tap Download Full Book
            </span>
            <span className="hidden sm:inline text-[10px] text-warm-gold/80 border-l border-warm-gold/40 pl-2 font-mono">
              Jas_of_Duskbloom_FULL.pdf
            </span>
          </>
        )}
      </motion.button>

      {/* Format selector dropdown button */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="h-full px-3 py-3 rounded-r-md border border-l border-warm-gold/60 hover:border-warm-gold bg-warm-gold/15 hover:bg-warm-gold/25 text-warm-gold transition-colors flex items-center justify-center"
          title="Choose download format"
          aria-label="Choose download format"
        >
          <ChevronDown size={16} className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-72 rounded-lg bg-midnight/95 backdrop-blur-xl border border-warm-gold/40 shadow-2xl p-2 z-50 text-left"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="font-ui text-[10px] uppercase tracking-widest text-warm-gold font-bold">Download Options</p>
                <p className="font-ui text-xs text-lavender/60">Complete 5-Chapter Book</p>
              </div>

              <button
                onClick={() => handleDownload('pdf')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-warm-gold/15 text-cream hover:text-warm-gold text-xs transition-colors group bg-warm-gold/5 mb-1"
              >
                <Download size={16} className="text-warm-gold" />
                <div className="flex flex-col text-left">
                  <span className="font-medium text-warm-gold">Jas_of_Duskbloom_FULL.pdf</span>
                  <span className="text-[10px] text-lavender/60">Complete Original Book PDF (240 KB)</span>
                </div>
              </button>

              <button
                onClick={() => handleDownload('html')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-warm-gold/15 text-cream hover:text-warm-gold text-xs transition-colors group"
              >
                <Printer size={16} className="text-warm-gold/70 group-hover:text-warm-gold" />
                <div className="flex flex-col text-left">
                  <span className="font-medium">Printable Illuminated eBook</span>
                  <span className="text-[10px] text-lavender/50">Formatted HTML with custom typography</span>
                </div>
              </button>

              <button
                onClick={() => handleDownload('markdown')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-warm-gold/15 text-cream hover:text-warm-gold text-xs transition-colors group"
              >
                <FileText size={16} className="text-warm-gold/70 group-hover:text-warm-gold" />
                <div className="flex flex-col text-left">
                  <span className="font-medium">Markdown Document (.md)</span>
                  <span className="text-[10px] text-lavender/50">Full metadata, scenes & dialogues</span>
                </div>
              </button>

              <button
                onClick={() => handleDownload('text')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-warm-gold/15 text-cream hover:text-warm-gold text-xs transition-colors group"
              >
                <FileText size={16} className="text-warm-gold/70 group-hover:text-warm-gold" />
                <div className="flex flex-col text-left">
                  <span className="font-medium">Plain Text Manuscript (.txt)</span>
                  <span className="text-[10px] text-lavender/50">Clean raw text for any e-reader</span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
