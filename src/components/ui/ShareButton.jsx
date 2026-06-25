import { useState } from 'react';

const ShareButton = ({ title, text, url, variant = 'icon', className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = url || window.location.href;
    const shareText = text || title;
    const shareData = {
      title: title,
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const copyText = `${title}\n${shareUrl}`;
        await navigator.clipboard.writeText(copyText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // User cancelled share or clipboard failed — try fallback
      if (err.name !== 'AbortError') {
        try {
          const copyText = `${title}\n${shareUrl}`;
          await navigator.clipboard.writeText(copyText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          console.error('Share failed:', err);
        }
      }
    }
  };

  if (variant === 'full') {
    return (
      <button
        onClick={handleShare}
        className={`w-full py-4 bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2 group relative ${className}`}
      >
        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
          share
        </span>
        {copied ? 'Link Copied!' : 'Share'}
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-lg animate-bounce">
            ✓ Copied
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      title="Share"
      className={`relative w-10 h-10 rounded-full bg-white/60 dark:bg-slate-700/60 backdrop-blur-md border border-white/80 dark:border-slate-600/80 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-500 hover:border-primary-200 dark:hover:border-primary-700 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm ${className}`}
    >
      <span className="material-symbols-outlined text-lg">
        {copied ? 'check' : 'share'}
      </span>
      {copied && (
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap animate-bounce">
          Copied!
        </span>
      )}
    </button>
  );
};

export default ShareButton;
