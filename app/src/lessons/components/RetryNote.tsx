import { X } from '@phosphor-icons/react';
/** Shown after a wrong attempt; the key replays its entrance on every new attempt. */
export default function RetryNote({attempt}:{attempt:number}){return attempt>0?<p key={attempt} className="mal-retry" role="status"><X size={14} weight="bold"/>Not quite. Try again.</p>:null;}
