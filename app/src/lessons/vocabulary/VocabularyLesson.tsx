import { useEffect, useRef, useState } from 'react';
import ChoiceAnswers from '../components/ChoiceAnswers';
import GlossWord from '../components/GlossWord';
import { vocabularyOptions, vocabularyPrompt, vocabularySentenceParts } from './vocabulary.mock';
import './VocabularyLesson.css';
const keywordAt=vocabularyPrompt.text.indexOf(vocabularyPrompt.keyword);
const promptBefore=vocabularyPrompt.text.slice(0,keywordAt),promptAfter=vocabularyPrompt.text.slice(keywordAt+vocabularyPrompt.keyword.length);
export interface VocabularyLessonProps { feedback:boolean; inputMode:boolean; choice:string|null; onChoose:(word:string)=>void; }
export default function VocabularyLesson({feedback,inputMode,choice,onChoose}:VocabularyLessonProps){
const [openWord,setOpenWord]=useState<string|null>(null),sentenceRef=useRef<HTMLParagraphElement>(null);
useEffect(()=>{if(!openWord)return;const close=(e:PointerEvent)=>{if(!sentenceRef.current?.contains(e.target as Node))setOpenWord(null);};document.addEventListener('pointerdown',close);return ()=>document.removeEventListener('pointerdown',close);},[openWord]);
const toggle=(word:string)=>setOpenWord(w=>w===word?null:word);
return <>
<div className="mal-question-card" data-gloss-bounds><span>{promptBefore}<strong className="mal-keyword">{vocabularyPrompt.keyword}</strong>{promptAfter}</span><p lang="ko" ref={sentenceRef}>{vocabularySentenceParts.map((part,i)=>typeof part==='string'?part
  :part.blank?<span key={i} className={`mal-blank ${feedback?'filled':''}`}>{feedback?<GlossWord gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>:'　　'}</span>
  :<GlossWord key={i} gloss={part} open={openWord===part.word} onToggle={()=>toggle(part.word)}/>)}</p></div>
 {!feedback&&!inputMode&&<ChoiceAnswers options={vocabularyOptions} choice={choice} onChoose={onChoose}/>}
 </>;}
