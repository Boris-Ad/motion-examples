'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export const LinkInfo = () => {
  const paths: { [key: string]: string } = {
    '/': 'Главная',
    '/accordions': 'Аккордеон',
    '/sliders': 'Слайдер',
    '/modals': 'Модальное окно',
    '/text': 'Текст',
    '/drop-menu': 'Дроп меню',
    '/icons': 'Иконки',
  };

  const pathname = usePathname();

  return (
    <div className="h-16 relative flex items-center">
      <AnimatePresence>
        <motion.span
          key={pathname}
          initial={{ y: -20, opacity: 0, scale:0.9 }}
          animate={{ y: 0, opacity: 1, scale:1 }}
          exit={{ y: 20, opacity: 0, scale:0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute text-nowrap text-xl"
        >
          {paths[pathname]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
