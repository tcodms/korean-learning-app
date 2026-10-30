import { Check, X } from '@phosphor-icons/react';
interface Props { options:readonly string[]; choice:string|null; onChoose:(word:string)=>void; lang?:string; tried?:readonly string[]; }
/** `tried` marks options already answered wrong: crossed out and no longer selectable. */
export default function ChoiceAnswers({options,choice,onChoose,lang='ko',tried=[]}:Props){return (
<div className="mal-choices">{options.map((word,i)=>{const wrong=tried.includes(word);return <button key={word} className={choice===word?'selected':wrong?'tried':''} aria-pressed={choice===word} disabled={wrong} aria-label={wrong?`${word}, not correct`:undefined} onClick={()=>onChoose(word)}><span className="mal-option-letter">{i+1}</span><span lang={lang}>{word}</span><span className="mal-option-check">{choice===word?<Check size={15} weight="bold"/>:wrong&&<X size={13} weight="bold"/>}</span></button>;})}</div>);}
