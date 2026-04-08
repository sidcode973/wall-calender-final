'use client';
import { useState, useCallback, useRef } from 'react';

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export interface ThemeColors {
  accent: string;       // main color
  accentLight: string;  // very light tint (backgrounds)
  accentRange: string;  // mid tint (range cells)
  accentDark: string;   // darker (start/end cells)
  accentText: string;   // text on accent bg
}

function buildPalette(hex: string): ThemeColors {
  const [h, s, l] = hexToHsl(hex);
  const safeS = Math.max(s, 45);
  const safeL = Math.min(Math.max(l, 30), 55);
  const accent = hslToHex(h, safeS, safeL);
  const accentLight = hslToHex(h, Math.min(safeS, 40), 94);
  const accentRange = hslToHex(h, Math.min(safeS, 50), 85);
  const accentDark = hslToHex(h, safeS, Math.max(safeL - 15, 20));
  const accentText = safeL > 50 ? '#1a1a1a' : '#ffffff';
  return { accent, accentLight, accentRange, accentDark, accentText };
}

export function useThemeColor(fallback: string) {
  const [theme, setTheme] = useState<ThemeColors>(() => buildPalette(fallback));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const extractFromImage = useCallback((img: HTMLImageElement) => {
    try {
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
      }
      const canvas = canvasRef.current;
      canvas.width = 50; canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 50, 50);
      const data = ctx.getImageData(0, 0, 50, 50).data;

      // Sample pixels and find most saturated dominant color
      const buckets: Record<string, { count: number; r: number; g: number; b: number }> = {};
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const [h, s] = hexToHsl(rgbToHex(r, g, b));
        if (s < 20) continue; // skip grays
        const bucket = Math.floor(h / 30);
        if (!buckets[bucket]) buckets[bucket] = { count: 0, r: 0, g: 0, b: 0 };
        buckets[bucket].count++;
        buckets[bucket].r += r;
        buckets[bucket].g += g;
        buckets[bucket].b += b;
      }

      let best = { count: 0, r: 0, g: 0, b: 0 };
      for (const bk of Object.values(buckets)) {
        if (bk.count > best.count) best = bk;
      }

      if (best.count === 0) { setTheme(buildPalette(fallback)); return; }

      const hex = rgbToHex(
        Math.round(best.r / best.count),
        Math.round(best.g / best.count),
        Math.round(best.b / best.count)
      );
      setTheme(buildPalette(hex));
    } catch {
      setTheme(buildPalette(fallback));
    }
  }, [fallback]);

  return { theme, extractFromImage };
}
