'use client';
import React from 'react';
import { useTheme } from 'next-themes';

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      <span className="text-[13px]">{isDark ? '☀️' : '🌙'}</span>
      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
