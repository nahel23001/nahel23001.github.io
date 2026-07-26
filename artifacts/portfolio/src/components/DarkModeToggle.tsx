import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  // 1. Ambil status awal dari localStorage (biar kalau di-refresh, modenya gak balik ke awal)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // 2. Efek untuk menambah/menghapus class 'dark' di elemen paling luar (HTML)
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:ring-2 hover:ring-blue-500 transition-all duration-300 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        // Ikon Matahari (Muncul saat Dark Mode aktif, diklik untuk kembali ke Light Mode)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m11.18 11.18l1.59 1.59M3 12h2.25m13.5 0H21M5.81 18.19l1.59-1.59M18.19 5.81l1.59-1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      ) : (
        // Ikon Bulan (Muncul saat Light Mode aktif, diklik untuk pindah ke Dark Mode)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12.83A9.75 9.75 0 0111.17 2.25 9.75 9.75 0 1021.75 12.83z" />
        </svg>
      )}
    </button>
  );
}