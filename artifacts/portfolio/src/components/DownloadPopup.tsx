import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Download } from 'lucide-react';

interface DownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadPopup: React.FC<DownloadPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 right-6 z-[999] max-w-sm w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 border border-primary/10 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {/* Progress Bar Animasi di Bagian Atas */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-1 bg-secondary w-full"
          />

          <div className="p-5 flex items-start gap-4">
            {/* Ikon Lingkaran Berputar */}
            <motion.div 
              initial={{ rotate: -45, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl text-emerald-500 dark:text-emerald-400 shrink-0"
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>

            {/* Teks Konten */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-bold text-primary dark:text-white font-display">
                CV Berhasil Diunduh!
              </h4>
              <p className="text-xs text-foreground/60 dark:text-gray-300 mt-1 leading-relaxed">
                Terima kasih, Hel! File <span className="font-mono text-secondary">CV.pdf</span> sedang dialihkan ke folder unduhanmu.
              </p>
            </div>

            {/* Tombol Close */}
            <button 
              onClick={onClose}
              className="text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};