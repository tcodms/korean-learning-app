import { Check } from '@phosphor-icons/react';
interface Props { options:readonly string[]; choice:string|null; onChoose:(word:string)=>void; lang?:string; }
export default function ChoiceAnswers({options,choice,onChoose,lang='ko'}:Props){return (
<div className="mal-choices">{options.map((word,i)=><button key={word} className={choice===word?'selected':''} aria-pressed={choice===word} onClick={()=>onChoose(word)}><span className="mal-option-letter">{i+1}</span><span lang={lang}>{word}</span><span className="mal-option-check">{choice===word&&<Check size={15} weight="bold"/>}</span></button>)}</div>);}
