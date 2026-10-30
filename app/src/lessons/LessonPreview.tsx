import { Lightbulb, Keyboard } from '@phosphor-icons/react';

import {useEffect,useState} from 'react';
import {MobileScroll,useKeyboard,useKeyboardInsets} from '../mobile';
import Action from '../shared/components/Action';
import type {LessonPreviewProps,Skill} from '../shared/types/learning';
import VocabularyLesson from './vocabulary/VocabularyLesson';
import { vocabularySentence, vocabularyExplanation } from './vocabulary/vocabulary.mock';
import ListeningLesson from './listening/ListeningLesson';
import { contextQuestion, dictationQuestion } from './listening/listening.mock';
import GrammarLesson from './grammar/GrammarLesson';
import ExpressionsLesson from './expressions/ExpressionsLesson';
import LessonHeader from './components/LessonHeader';
import FeedbackPanel from './components/FeedbackPanel';
import AnswerInput from './components/AnswerInput';
import './LessonPreview.css';
/** Last answer input mode per area; kept while the app is open, reset on reload. */
const lastInputMode:Partial<Record<Skill,boolean>>={};
const compact=(text:string)=>text.normalize('NFC').replace(/[\s.,!?]/g,'');
export default function LessonPreview({area,listeningMode='context',onExit,onComplete}:LessonPreviewProps){
 const [choice,setChoice]=useState<string|null>(null),[typed,setTyped]=useState('');
  const [inputMode,setInputMode]=useState(()=>lastInputMode[area]??false),[hint,setHint]=useState(false),[feedback,setFeedback]=useState(false);
  const [playing,setPlaying]=useState(false),[slow,setSlow]=useState(false);

const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{if(!playing)return;const t=window.setTimeout(()=>setPlaying(false),2400);return ()=>clearTimeout(t);},[playing]);
const isListening=area==='listening';
const isDictation=isListening&&listeningMode==='dictation';
const typing=isListening?isDictation:inputMode;
const answered=typing?typed.trim().length>0:choice!==null;
const shownCorrect=isDictation?compact(typed)===compact(dictationQuestion.script):isListening?choice===contextQuestion.answer:inputMode||choice==='학교';
const question=isDictation?{title:'Listen and write it down.',subtitle:'Type the Korean sentence you hear.',hint:dictationQuestion.hint,answer:dictationQuestion.script,explanation:dictationQuestion.explanation}
  :isListening?{title:'Listen. What does it mean?',subtitle:'Choose the meaning that matches what you hear.',hint:contextQuestion.hint,answer:contextQuestion.script,explanation:contextQuestion.explanation}
  :{title:'Find the right word.',subtitle:'Choose the word that fits the sentence.',hint:'학교 means “school”. It’s where you study.',answer:vocabularySentence,explanation:vocabularyExplanation};
const WordLesson=area==='grammar'?GrammarLesson:area==='expressions'?ExpressionsLesson:VocabularyLesson;
return <><MobileScroll className="mal-scroll"><main className="mal-content mal-lesson">

          <LessonHeader isListening={isListening} onExit={onExit}/>
          <h1 className="mal-question-title">{question.title}</h1><p className="mal-question-subtitle">{question.subtitle}</p>
          {isListening?<ListeningLesson mode={listeningMode} feedback={feedback} choice={choice} onChoose={setChoice} playing={playing} setPlaying={setPlaying} slow={slow} setSlow={setSlow}/>:<WordLesson feedback={feedback} inputMode={inputMode} choice={choice} onChoose={setChoice}/>}
          {!feedback&&typing&&<AnswerInput typed={typed} onChange={setTyped} onBlur={()=>keyboard.hide()}/>}
          {!feedback&&<div className="mal-question-tools"><button onClick={()=>setHint(h=>!h)} aria-expanded={hint}><Lightbulb size={17}/>Hint</button>{!isListening&&<button onClick={()=>{keyboard.hide();lastInputMode[area]=!inputMode;setInputMode(!inputMode);}}><Keyboard size={17}/>{inputMode?'Use cards':'Type instead'}</button>}</div>}
          {hint&&!feedback&&<div className="mal-hint"><Lightbulb size={19}/><p>{question.hint}</p></div>}
          {feedback&&<FeedbackPanel shownCorrect={shownCorrect} answer={question.answer} explanation={question.explanation}/>}
          <p className="mal-lesson-footer-note">{feedback?'A little Korean, a little closer.':'Take your time. You’ve got this.'}</p>

</main></MobileScroll><footer className="mal-fixed-footer" style={{bottom:bottomInset}}><Action disabled={!answered&&!feedback} onClick={()=>{keyboard.hide();if(feedback){onComplete();}else setFeedback(true);}}>{feedback?'Back to Today':'Check answer'}</Action></footer></>;
}
