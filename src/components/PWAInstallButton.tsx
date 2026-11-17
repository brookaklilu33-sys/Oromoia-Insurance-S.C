import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        title="Install OIC Portal App"
        className={`inline-flex items-center justify-center gap-1 border border-[#7DC242]/50 bg-[#eef8e6] hover:bg-[#e1f3d2] text-[#006B6E] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
          compact ? 'rounded-xl px-2.5 py-1.5 text-[11px] w-full' : 'rounded-lg h-7 px-2 py-1 text-[11px]'
        }`}
      >
        <Download className="w-3 h-3 text-[#5f9e2b] shrink-0" />
        <span>{compact ? 'Install App' : 'Install'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          title="Install OIC Portal App"
          className={`inline-flex items-center justify-center gap-1 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            compact ? 'rounded-xl px-2.5 py-1.5 text-[11px] w-full' : 'rounded-lg h-7 px-2 py-1 text-[11px]'
          }`}
        >
          <Smartphone className="w-3 h-3 text-[#006B6E] shrink-0" />
          <span>{compact ? 'Install App' : 'Install'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#006B6E]">Install OIC on iPhone / iPad</h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Close guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="text-xs text-slate-600 space-y-2 list-decimal pl-4 leading-relaxed">
                <li>
                  Tap the <strong className="text-slate-900">Share</strong> button in your Safari toolbar.
                </li>
                <li>
                  Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong className="text-slate-900">Add</strong> to launch Oromia Insurance offline anytime.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-[#006B6E] py-2.5 text-xs font-semibold text-white hover:bg-[#005254] transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
