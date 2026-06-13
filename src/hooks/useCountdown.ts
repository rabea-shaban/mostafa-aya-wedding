import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number; hours: number; minutes: number; seconds: number;
}

export function useCountdown(target: Date): CountdownTime {
  const [t, setT] = useState<CountdownTime>(() => calc(target));

  useEffect(() => {
    function update() { setT(calc(target)); }
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  return t;
}

function calc(target: Date): CountdownTime {
  const d = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}
