'use client';

import { useMounted } from '@/hooks/useMounted';
import { useTheme } from 'next-themes';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

export const ThemeButton = () => {
  const { mounted } = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  const onToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={onToggleTheme} className='outline-0'>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
