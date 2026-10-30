import { useEffect, useRef, useState } from 'react';
import { KeyboardInput, useKeyboard } from '../../mobile';
import ChoiceAnswers from '../components/ChoiceAnswers';
import GlossWord from '../components/GlossWord';
import RetryNote from '../components/RetryNote';
import { hangulHint } from '../components/hangulHint';
import type { WordQuestion } from '../types';
import './VocabularyLesson.css';
export interface VocabularyLessonProps { question:WordQuestion; feedback:boolean; correct:boolean; inputMode:boolean; hintLevel:number; typed:string; onType:(value:string)=>void; choice:string|null; onChoose:(word:string)=>void; wrongAttempts:number; tried:readonly string[]; }
/** English prompt with its keyword highlighted. */
function Prompt({text,keyword}:{text:string;keyword?:string}){const at=keyword?text.indexOf(keyword):-1;if(!keyword||at<0)return <span>{text}</span>;return <span>{text.slice(0,at)}<strong className="mal-keyword">{keyword}</strong>{text.slice(at+keyword.length)}</span>;}
export default function VocabularyLesson({question,feedback,correct,inputMode,hintLevel,typed,onType,choice,onChoose,wrongAttempts,tried}:VocabularyLessonProps){
const keyboard=useKeyboard();
const [openWord,setOpenWord]=useState<string|null>(null),sentenceRef=useRef<HTMLParagraphElement>(null);
useEffect(()=>{if(!openWord)return;const close=(e:PointerEvent)=>{if(!sentenceRef.current?.contains(e.target as Node))setOpenWord(null);};document.addEventListener('pointerdown',close);return ()=>document.removeEventListener('pointerdown',close);},[openWord]);
const blankHint=inputMode?hangulHint(question.answer,hintLevel):null;
/** Input width follows what is typed (min 2 syllables), never the answer length. */
const inputWidth=`${Math.max([...typed].length,[...(blankHint??'')].length,2)+0.4}em`;
const cardRef=useRef<HTMLDivElement>(null),inputRef=useRef<HTMLInputElement>(null);
/** Each wrong attempt replays the red flash and, when typing, puts the cursor back in the blank. */
useEffect(()=>{const card=cardRef.current;if(!wrongAttempts||!card)return;card.classList.remove('wrong-flash');void card.offsetWidth;card.classList.add('wrong-flash');if(inputMode)inputRef.current?.focus();},[wrongAttempts]);
const toggle=(word:string)=>setOpenWord(w=>w===word?null:word);
return <>
<div ref={cardRef} className={`mal-question-card ${feedback&&correct?'correct-flash':''}`} data-gloss-bounds><Prompt text={question.prompt} keyword={question.keyword}/><p lang="ko" ref={sentenceRef}>{question.parts.map((part,i)=>typeof part==='string'?part
  :part.blank?<span key={i} className={`mal-blank ${feedback?'filled':inputMode?'typing':choice?'chosen':''} ${!feedback&&blankHint?'hinted':''}`}>{feedback?<GlossWord gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>:inputMode?<><KeyboardInput ref={inputRef} className="mal-blank-input" aria-label="Your answer" value={typed} onChange={e=>onType(e.target.value)} onBlur={()=>keyboard.hide()} autoComplete="off" lang="ko" style={{width:inputWidth}}/>{!typed&&blankHint&&<span key={hintLevel} className="mal-hint-reveal mal-blank-ghost" aria-hidden="true">{blankHint}</span>}</>:choice?<span key={choice} className="mal-hint-reveal">{choice}</span>:'　　'}</span>
  :<GlossWord key={i} gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>)}</p></div>
 {!feedback&&<RetryNote attempt={wrongAttempts}/>}
 {!feedback&&!inputMode&&<ChoiceAnswers options={question.options} choice={choice} onChoose={onChoose} tried={tried}/>}
 </>;}
