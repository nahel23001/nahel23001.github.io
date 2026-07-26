import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { FeaturedWork } from '@/components/FeaturedWork';
import { Leadership } from '@/components/Leadership';
import { Skills } from '@/components/Skills';
import { Currently } from './components/Currently';
import { Awards } from '@/components/Awards';
import { Contact } from '@/components/Contact';

// 👇 1. KITA IMPORT TOMBOL SAKELAR DARK MODE-NYA DI SINI
import DarkModeToggle from './components/DarkModeToggle';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* 👇 2. KITA TAMBAHKAN CLASS UNTUK WARNA BACKGROUND DASAR DAN WARNA GELAPNYA DI SINI */}
        <div className="relative bg-white text-gray-900 dark:bg-slate-950 dark:text-gray-100 min-h-screen transition-colors duration-300 selection:bg-secondary selection:text-white">
          <CustomCursor />
          
          {/* Catatan: Tombol DarkModeToggle dipasang di dalam komponen <Navbar /> kamu.
            Langkah selanjutnya kita akan buka file Navbar untuk meletakkan tombolnya di sebelah "Download CV".
          */}
          <Navbar />
          
          <main>
            <Hero />
            <About />
            <FeaturedWork />
            <Leadership />
            <Skills />
            <Awards />
            <Currently />
          </main>
          <Contact />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;