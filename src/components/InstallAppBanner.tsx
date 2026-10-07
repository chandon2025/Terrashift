import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InstallAppBanner: React.FC = () => {
  const { language } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as app)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert(
        language === 'bn'
          ? 'মোবাইল ব্রাউজারের মেনু থেকে "Add to Home Screen" বা "Install App" নির্বাচন করুন।'
          : 'To install on iOS or your browser, tap Share / Menu and select "Add to Home Screen".'
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-sky-950 text-white p-3 px-4 rounded-2xl mx-4 my-2 shadow-lg border border-emerald-500/30 flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-emerald-300" />
        </div>
        <div>
          <h4 className="font-bold text-xs">
            {language === 'bn' ? 'টেরাশিফট মোবাইল অ্যাপ ইনস্টল করুন' : 'Install TerraShift Mobile App'}
          </h4>
          <p className="text-[10px] text-stone-300">
            {language === 'bn' ? 'হোম স্ক্রিনে সরাসরি অ্যাপ হিসেবে ব্যবহার করুন' : 'Run directly from your home screen as a standalone app'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow-md transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ইনস্টল' : 'Install'}</span>
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-lg text-stone-400 hover:text-white"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

