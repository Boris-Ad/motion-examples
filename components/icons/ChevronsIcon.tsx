'use client';

import clsx from 'clsx';
import { motion } from 'motion/react';

export const ChevronsIcon = ({ hover, styles }: {hover: 'start' | 'end', styles?: string }) => {
  const variantsOne = {
    start: { x: [0, 3, 0], transition: { times: [0, 0.4, 1] } },
    end: { x: 0 },
  };

  const variantsTwo = {
    start: { x: [0, 3, 0], transition: { times: [0, 0.8, 1] } },
    end: { x: 0 },
  };

  return (
    <motion.svg
      animate={hover}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={clsx('cursor-pointer', styles)}
    >
      <motion.path variants={variantsOne} d="m6 17 5-5-5-5"></motion.path>
      <motion.path variants={variantsTwo} d="m13 17 5-5-5-5"></motion.path>
    </motion.svg>
  );
};
