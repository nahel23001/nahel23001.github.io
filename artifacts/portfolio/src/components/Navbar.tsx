import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

// 👇 KITA TAMBAHKAN INTERFACE PROP BIAR TYPESCRIPT ENGGAK ERROR LAGI
interface NavbarProps {
  onDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-primary/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-[5vw] h-20 flex items-center justify-between">
        {/* Logo / Nama */}
        <a href="#" className="font-display font-bold text-xl text-primary dark:text-white tracking-tight">
          Nahel Zaqi Alfian
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors">About</a>
          <a href="#work" className="text-sm font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors">Work</a>
          <a href="#leadership" className="text-sm font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors">Leadership</a>
          <a href="#skills" className="text-sm font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="text-sm font-medium text-foreground/70 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors">Contact</a>
          
          {/* Switcher Mode */}
          <DarkModeToggle />

          {/* Tombol Download CV Desktop */}
          <a
            href="/CV.pdf"
            download="CV.pdf"
            onClick={(e) => {
              if (onDownload) onDownload();
            }}
            className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <DarkModeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary dark:text-white p-1 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-primary/10 dark:border-white/10 px-6 py-6 flex flex-col gap-4 absolute top-20 left-0 right-0 shadow-lg">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2 text-foreground dark:text-gray-200">About</a>
          <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2 text-foreground dark:text-gray-200">Work</a>
          <a href="#leadership" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2 text-foreground dark:text-gray-200">Leadership</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2 text-foreground dark:text-gray-200">Skills</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium py-2 text-foreground dark:text-gray-200">Contact</a>
          
          {/* Tombol Download CV Mobile */}
          <a
            href="/CV.pdf"
            download="CV.pdf"
            onClick={() => {
              if (onDownload) onDownload();
              setMobileMenuOpen(false);
            }}
            className="bg-secondary text-white text-center py-3 rounded-xl font-medium mt-2 shadow-md cursor-pointer"
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
};