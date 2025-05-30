'use client';

import { motion, useCycle } from 'motion/react';
import { Calendar1, Fullscreen, GalleryHorizontal, GalleryVertical, Home, PanelTopOpen, Smile, Text, Timer } from 'lucide-react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { ChevronsButton } from './ChevronsButton';

const styles = 'flex-none transition-colors';

const tabs = [
  { id: 1, icon: <Home className={styles} />, label: 'Главная', href: '/' },
  { id: 2, icon: <GalleryVertical className={styles} />, label: 'Аккордеон', href: '/accordions' },
  { id: 3, icon: <GalleryHorizontal className={styles} />, label: 'Слайдер', href: '/sliders' },
  { id: 4, icon: <Fullscreen className={styles} />, label: 'Модальное окно', href: '/modals' },
  { id: 5, icon: <Calendar1 className={styles} />, label: 'Календарь', href: '' },
  { id: 6, icon: <Timer className={styles} />, label: 'Таймер', href: '' },
  { id: 7, icon: <Text className={styles} />, label: 'Текст', href: '/text' },
  { id: 8, icon: <PanelTopOpen className={styles} />, label: 'Дроп меню', href: '/drop-menu' },
  { id: 9, icon: <Smile className={styles} />, label: 'Иконки', href: '/icons' },
];

export const Sidebar = () => {
  const [open, toggleOpen] = useCycle<'close' | 'open'>('close', 'open');
  const pathname = usePathname();

  const variantsList = {
    open: {
      transition: { staggerChildren: 0.05 },
    },
    close: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <motion.aside
      initial={false}
      animate={open}
      variants={{ close: { width: 86, transition: { when: 'afterChildren' } }, open: { width: 240, transition: { when: 'beforeChildren' } } }}
      className="hidden 2xl:block h-full pl-4 dark:bg-slate-800/50 overflow-hidden transition-colors duration-300 row-span-full border-r border-slate-300 dark:border-slate-700/30"
    >
      <div className="mt-6 mb-18 flex items-center gap-6 overflow-hidden">
        <svg
          viewBox="0 0 54 19.457"
          width="54"
          height="19.457"
          stroke="none"
          strokeWidth="0.04285714285714286"
          fill="url(#fill)"
          filter="url(#f1)"
          className="transition-colors duration-300 flex-none"
        >
          <defs>
            <linearGradient id="fill" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-amber-300)" />
              <stop offset="100%" stopColor="var(--color-amber-600)" />
            </linearGradient>
          </defs>
          <defs>
            <filter id="f1" width="60" height="60">
              <feOffset in="SourceAlpha" dx="2" dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feBlend in="SourceGraphic" in2="blurOut" />
            </filter>
          </defs>
          <path d="M20.389 0 9.72 19.44H0L8.331 4.261C9.622 1.907 12.845 0 15.529 0z" />
          <path d="M44.226 4.86a4.86 4.86 0 1 1 9.72 0 4.86 4.86 0 0 1 -9.72 0" />
          <path d="M22.212 0h9.72L21.262 19.44h-9.72z" />
          <path d="M33.692 0h9.72l-8.331 15.179c-1.292 2.353 -4.514 4.261 -7.199 4.261h-4.86z" />
        </svg>

        <motion.p
          variants={{
            close: { opacity: 0 },
            open: { opacity: 1 },
          }}
          className="text-xl"
        >
          Components
        </motion.p>
      </div>
      <motion.ul variants={variantsList} className="space-y-1 text-slate-500 font-montserrat">
        {tabs.map(tab => (
          <motion.li key={tab.id} className="relative dark:hover:text-slate-300 hover:text-slate-900">
            {pathname === tab.href && <TabLayoutId />}
            <Link href={tab.href} className="w-full py-2.5 pl-3 flex items-center gap-4 flex-nowrap">
              {tab.icon}
              <motion.span
                variants={{ close: { x: 50, opacity: 0 }, open: { x: 0, opacity: 1 } }}
                className="text-base dark:text-slate-200 text-slate-800 line-clamp-1"
              >
                {tab.label}
              </motion.span>
            </Link>
          </motion.li>
        ))}
        <hr className="h-px mt-3 mr-5 dark:border-slate-600 border-slate-400" />
        <li className="mt-4">
          <ChevronsButton open={open} toggleOpen={toggleOpen} />
        </li>
      </motion.ul>
    </motion.aside>
  );
};

const TabLayoutId = () => {
  return <motion.div layoutId="tab" className="absolute inset-y-1 start-0 w-0.5 bg-amber-400 rounded-full" />;
};
