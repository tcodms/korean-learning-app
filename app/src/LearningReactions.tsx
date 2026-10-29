import type { CSSProperties } from 'react';
import { Star } from '@phosphor-icons/react';

export function Celebration({ kind = 'lesson' }: { kind?: 'lesson' | 'goal' }) {
  return <div className={`celebration celebration-${kind}`} aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => <i key={i} style={{
      '--x': `${5 + (i * 17) % 90}%`, '--delay': `${(i % 6) * .09}s`,
      '--drift': `${(i % 2 ? 1 : -1) * (14 + i * 3)}px`,
      '--turn': `${180 + i * 39}deg`,
    } as CSSProperties}>{i % 3 === 0 ? <Star size={14} weight="fill" /> : null}</i>)}
  </div>;
}

export function BuddyReaction({ correct, chain }: { correct: boolean; chain: number }) {
  return <div className={`buddy-reaction ${correct ? 'buddy-cheer' : 'buddy-encourage'}`}>
    <Tiger mood={correct ? 'cheer' : 'idle'} />
    {correct && chain >= 2 && <span className="chain-badge"><Star size={13} weight="fill" />{chain} in a row</span>}
  </div>;
}

export function Tiger({ mood = 'idle' }: { mood?: 'idle' | 'wave' | 'cheer' }) {
  return <span className={`tiger-character tiger-${mood}`} role="img" aria-label={mood === 'idle' ? 'Your tiger buddy' : mood === 'wave' ? 'Your tiger buddy waving hello' : 'Your tiger buddy cheering'}><span className="tiger-sprite" /></span>;
}
