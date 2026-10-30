import { useEffect, useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { KeyboardInput, useKeyboard } from '../../mobile';
import ChoiceAnswers from '../components/ChoiceAnswers';
import GlossWord from '../components/GlossWord';
import { hangulHint } from '../components/hangulHint';
import { vocabularyAnswer, vocabularyOptions, vocabularyPrompt, vocabularySentenceParts } from './vocabulary.mock';
import './VocabularyLesson.css';
const keywordAt=vocabularyPrompt.text.indexOf(vocabularyPrompt.keyword);
const promptBefore=vocabularyPrompt.text.slice(0,keywordAt),promptAfter=vocabularyPrompt.text.slice(keywordAt+vocabularyPrompt.keyword.length);
export interface VocabularyLessonProps { feedback:boolean; correct:boolean; inputMode:boolean; hintLevel:number; typed:string; onType:(value:string)=>void; choice:string|null; onChoose:(word:string)=>void; wrongAttempts:number; tried:readonly string[]; }
export default function VocabularyLesson({feedback,correct,inputMode,hintLevel,typed,onType,choice,onChoose,wrongAttempts,tried}:VocabularyLessonProps){
const keyboard=useKeyboard();
const [openWord,setOpenWord]=useState<string|null>(null),sentenceRef=useRef<HTMLParagraphElement>(null);
useEffect(()=>{if(!openWord)return;const close=(e:PointerEvent)=>{if(!sentenceRef.current?.contains(e.target as Node))setOpenWord(null);};document.addEventListener('pointerdown',close);return ()=>document.removeEventListener('pointerdown',close);},[openWord]);
const blankHint=inputMode?hangulHint(vocabularyAnswer,hintLevel):null;
/** Input width follows what is typed (min 2 syllables), never the answer length. */
const inputWidth=`${Math.max([...typed].length,[...(blankHint??'')].length,2)+0.4}em`;
const cardRef=useRef<HTMLDivElement>(null),inputRef=useRef<HTMLInputElement>(null);
/** Each wrong attempt replays the red flash and, when typing, puts the cursor back in the blank. */
useEffect(()=>{const card=cardRef.current;if(!wrongAttempts||!card)return;card.classList.remove('wrong-flash');void card.offsetWidth;card.classList.add('wrong-flash');if(inputMode)inputRef.current?.focus();},[wrongAttempts]);
const toggle=(word:string)=>setOpenWord(w=>w===word?null:word);
return <>
<div ref={cardRef} className={`mal-question-card ${feedback&&correct?'correct-flash':''}`} data-gloss-bounds><span>{promptBefore}<strong className="mal-keyword">{vocabularyPrompt.keyword}</strong>{promptAfter}</span><p lang="ko" ref={sentenceRef}>{vocabularySentenceParts.map((part,i)=>typeof part==='string'?part
  :part.blank?<span key={i} className={`mal-blank ${feedback?'filled':inputMode?'typing':choice?'chosen':''} ${!feedback&&blankHint?'hinted':''}`}>{feedback?<GlossWord gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>:inputMode?<><KeyboardInput ref={inputRef} className="mal-blank-input" aria-label="Your answer" value={typed} onChange={e=>onType(e.target.value)} onBlur={()=>keyboard.hide()} autoComplete="off" lang="ko" style={{width:inputWidth}}/>{!typed&&blankHint&&<span key={hintLevel} className="mal-hint-reveal mal-blank-ghost" aria-hidden="true">{blankHint}</span>}</>:choice?<span key={choice} className="mal-hint-reveal">{choice}</span>:'　　'}</span>
  :<GlossWord key={i} gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>)}</p></div>
 {!feedback&&wrongAttempts>0&&<p key={wrongAttempts} className="mal-retry" role="status"><X size={14} weight="bold"/>Not quite. Try again.</p>}
 {!feedback&&!inputMode&&<ChoiceAnswers options={vocabularyOptions} choice={choice} onChoose={onChoose} tried={tried}/>}
 </>;}
