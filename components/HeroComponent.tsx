'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimate, useInView, useMotionValue, useVelocity, useSpring, useTransform, stagger } from 'motion/react';
import { streetPhotos } from '@/data';
import Image from 'next/image';
import { shuffleArr } from '@/utils';
import clsx from 'clsx';

export const HeroComponent = () => {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const parentWidth = useRef(0);
  const isInView = useInView(scope, { once: true });

  const start = async () => {
    animate('[data-hero-text]', { opacity: 1 }, { delay: 0.4, duration: 0.6 });
    await animate('[data-ul-one]', { opacity: 1 }, { delay: 0.4, duration: 0.6 });
    animate('[data-ul-one]', { y: 0 }, { delay: 1, duration: 1 });
    animate('[data-hero-text]', { y: -200 }, { delay: 1, duration: 1, ease: 'easeInOut' });
    await animate('[data-li-one]', { rotate: 0 }, { delay: 1, duration: 1 });
    await animate('[data-ul-one]', { x: 0 }, { duration: 0.4 });
    animate('[data-li-one="0"]', { x: (268 + 16) * 4 }, { duration: 1.4, ease: 'easeInOut' });
    animate('[data-li-one="1"]', { x: (268 + 16) * 3 }, { duration: 1.4, ease: 'easeInOut' });
    animate('[data-li-one="2"]', { x: (268 + 16) * 2 }, { duration: 1.4, ease: 'easeInOut' });
    animate('[data-li-one="3"]', { x: 268 + 16 }, { duration: 1.4, ease: 'easeInOut' });
    animate('[data-li-one="4"]', { x: 0 }, { duration: 1.4 });
    await animate('[data-text-wrap]', { opacity: 0 }, { delay: 1.4 });
    await animate('[data-text-wrap]', { zIndex: -10 });
    animate('[data-text-footer]', { opacity: 1 }, { duration: 0.4 });
    animate('[data-text-gallery] li', { opacity: 1, y: 0 }, { delay: stagger(0.05, { startDelay: 0.1 }), duration: 0.6 });
  };

  const onEnter = (inx: number) => {
    animate('[data-text-footer]', { opacity: 0 });
    animate(`[data-text-aside="${inx}"]`, { display: 'block' });
    animate(`[data-text-aside="${inx}"]`, { opacity: 1 }, { delay: 0.8, duration: 0.4 });
    animate(`[data-ul-two]:not([data-ul-two="${inx}"]) [data-li-two]`, { scale: 0.8 }, { duration: 0.4, delay: 0.1 });
    animate(`[data-ul-two]:not([data-ul-two="${inx}"]) [data-black]`, { opacity: 1 }, { duration: 0.4 });
    animate(`[data-ul-two="${inx}"]`, { height: 416 * 5 });
    animate(`[data-ul-two="${inx}"] [data-li-two="3"]`, { y: 416 }, { duration: 1 });
    animate(`[data-ul-two="${inx}"] [data-li-two="2"]`, { y: 416 * 2 }, { duration: 1 });
    animate(`[data-ul-two="${inx}"] [data-li-two="1"]`, { y: 416 * 3 }, { duration: 1 });
    animate(`[data-ul-two="${inx}"] [data-li-two="0"]`, { y: 416 * 4 }, { duration: 1 });
  };

  const onLeave = (inx: number) => {
    animate(`[data-li-two]`, { y: 0 }, { duration: 1 });
    animate('[data-text-footer]', { opacity: 1 }, { delay: 0.9, duration: 0.4 });
    animate('[data-text-aside]', { opacity: 0 }, { duration: 0.2 });
    animate('[data-text-aside]', { display: 'none' }, { delay: 0.3 });
    animate(`[data-li-two]`, { scale: 1 }, { duration: 0.4, delay: 0.2 });
    animate(`[data-black]`, { opacity: 0 }, { duration: 0.4, delay: 0.2 });
    animate(`[data-ul-two="${inx}"]`, { y: 0, height: 400 }, { duration: 1 });
  };

  useEffect(() => {
    if (scope.current == null) return;
    const { width } = scope.current.getBoundingClientRect();
    parentWidth.current = width;

    if (isInView) {
      start();
    }
  }, [isInView]);

  return (
    <div ref={scope} className="min-h-full p-8 overflow-hidden relative">
      <motion.ul data-ul-one style={{ x: (parentWidth.current - 268 * 1.5) / 2, y: 200 }} className="h-[400px] w-[268px] relative opacity-0 cursor-pointer">
        {streetPhotos.map((item, inx) => (
          <motion.li key={item.id} data-li-one={inx} initial={{ rotate: Math.abs(inx - 4) * 12 }} className="absolute inset-0">
            <One inx={inx} onEnter={onEnter} onLeave={onLeave} />
            <div data-text-footer className="absolute inset-x-0 -bottom-3 translate-y-full opacity-0">
              <h3 className="uppercase">Streets #{streetPhotos.length - inx}</h3>
              <p className="font-montserrat">{streetPhotos.length} фотографий</p>
            </div>
            <div data-text-aside={inx} className="absolute inset-x-0 -bottom-10 translate-y-full opacity-0">
              <p
                className={clsx(
                  'absolute  font-montserrat text-lg ',
                  streetPhotos.length - 1 - inx === 0 ? '-end-4 translate-x-full' : '-start-4 -translate-x-full'
                )}
              >
                {streetPhotos.length} фотографий
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <TextComponent />
      <TextGallery />
    </div>
  );
};

const One = ({ inx, onEnter, onLeave }: { inx: number; onEnter: (inx: number) => void; onLeave: (inx: number) => void }) => {
  const y = useMotionValue(0);
  const xVelocity = useVelocity(y);
  const s = useSpring(xVelocity, { damping: 60, stiffness: 400 });
  const scale = useTransform(s, [-2000, 0, 2000], [0.9, 1, 0.9]);
  return (
    <motion.ul
      data-ul-two={inx}
      onMouseEnter={() => onEnter(inx)}
      onMouseLeave={() => onLeave(inx)}
      drag="y"
      dragConstraints={{ top: -416 * 3, bottom: 0 }}
      style={{ y, scale }}
      className="h-[400px] w-[268px] relative z-10"
    >
      {shuffleArr(streetPhotos, inx).map((img, inx) => (
        <motion.li data-li-two={inx} key={img.id} className="h-[400px] w-[268px] absolute top-0 left-0">
          <Image src={img.src} alt={img.id.toString()} fill sizes="400px" draggable={false} className="object-center select-none" />
          <div data-black className="absolute inset-0 bg-black/70 opacity-0" />
        </motion.li>
      ))}
    </motion.ul>
  );
};

const TextComponent = () => {
  return (
    <motion.div data-text-wrap className="absolute inset-0 isolate flex flex-col justify-center items-center z-30">
      <div className="text-[160px] leading-40 font-normal text-fuchsia-600 tracking-wide">
        <div className="-ml-20 overflow-hidden">
          <motion.h2 data-hero-text className=" opacity-0">
            City
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2 data-hero-text className="pl-20 opacity-0">
            Streets
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
};

const TextGallery = () => {
  return (
    <div data-text-gallery className="absolute end-24 bottom-8 isolate z-20">
      <ul className="flex overflow-hidden">
        {['g', 'a', 'l', 'l', 'e', 'r', 'y'].map((letter, inx) => (
          <motion.li key={inx} style={{ y: 50 }} className="uppercase opacity-0">
            <span className="text-9xl text-fuchsia-600">{letter}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
