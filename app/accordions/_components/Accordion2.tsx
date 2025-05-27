'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import clsx from 'clsx';
import { persons } from '@/data';
import { ChevronDown } from 'lucide-react';
import { StickyTitle } from '@/components/StickyTitle';

export const Accordion2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="relative">
      <StickyTitle>#2</StickyTitle>
      <div className="flex justify-center items-center">
        <div className="w-3xl h-full p-4 shadow-lg flex gap-x-3 border rounded-md transition-theme">
          <motion.ul layout className="flex-1">
            {persons.map((person, inx) => (
              <ListItem key={person.id} person={person} inx={inx} count={count} setCount={() => setCount(inx)} />
            ))}
          </motion.ul>

          <div className="w-px flex dark:bg-slate-800 bg-slate-300 transition-theme" />

          <div className="w-56 aspect-square flex-initial relative">
            <Image src={persons[count].img} alt={persons[count].name} fill sizes="256px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListItem = ({
  person,
  inx,
  count,
  setCount,
}: {
  person: { id: number; name: string; img: string };
  inx: number;
  count: number;
  setCount: () => void;
}) => {
  return (
    <motion.li
      onClick={setCount}
      initial={false}
      animate={{ height: inx === count ? 'auto' : 40 }}
      className="last:border-none border-b cursor-pointer overflow-hidden transition-theme"
    >
      <div className="h-10 flex justify-between items-center">
        <h3 className="text-xl">{person.name}</h3>
        <ChevronDown className={clsx({ 'rotate-180': inx === count }, 'transition-transform')} />
      </div>
      <div className="py-2">
        <p className="text-lg line-clamp-3 text-slate-600 dark:text-slate-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat fugiat sit magni, saepe reiciendis voluptates reprehenderit rerum in odio culpa!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat fugiat sit magni, saepe reiciendis voluptates reprehenderit rerum in odio culpa!
          Facere eaque eum at!
        </p>
      </div>
    </motion.li>
  );
};
