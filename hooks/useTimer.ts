import { useEffect, useState } from 'react';
import { wrap } from 'motion/react';

export const useTimer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState([0, 0, 0]);
  const [minutes, setMinutes] = useState([0, 0]);
  const [stop, setStop] = useState(true);

  const max = 60;

  const onReset = () => {
    if (!stop) return;
    setMilliseconds(0);
    setSeconds([0, 0, 0]);
    setMinutes([0, 0]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setMilliseconds(milliseconds + 1), 100);
    const s = wrap(0, max, Math.floor(milliseconds / 10));
    setSeconds([wrap(0, 7, Math.floor(s / 10)), wrap(0, 10, s), Math.floor(milliseconds / 10)]);

    if (milliseconds > 600) {
      const m = wrap(0, max, Math.floor(milliseconds / 600));
      setMinutes([wrap(0, 7, Math.floor(m / 10)), wrap(0, 10, m)]);
    }

    if (milliseconds)
      if (stop) {
        clearTimeout(timer);
      }
  }, [milliseconds, stop]);

  return { setStop, onReset, seconds, minutes };
};

