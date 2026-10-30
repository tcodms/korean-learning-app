import { Lightbulb, Keyboard } from '@phosphor-icons/react';

import {useEffect,useState} from 'react';
import {MobileScroll,useKeyboard,useKeyboardInsets} from '../mobile';
import Action from '../shared/components/Action';
import type {LessonPreviewProps,Skill} from '../shared/types/learning';
import VocabularyLesson from './vocabulary/VocabularyLesson';
import ListeningLesson from './listening/ListeningLesson';
import { listeningAnswer } from './listening/listening.mock';
import GrammarLesson from './grammar/GrammarLesson';
import ExpressionsLesson from './expressions/ExpressionsLesson';
import LessonHeader from './components/LessonHeader';
import FeedbackPanel from './components/FeedbackPanel';
import AnswerInput from './components/AnswerInput';
import './LessonPreview.css';
/** Last answer input mode per area; kept while the app is open, reset on reload. */
const lastInputMode:Partial<Record<Skill,boolean>>={};
export default function LessonPreview({area,onExit,onComplete}:LessonPreviewProps){
 const [choice,setChoice]=useState<string|null>(null),[typed,setTyped]=useState('');
  const [inputMode,setInputMode]=useState(()=>lastInputMode[area]??false),[hint,setHint]=useState(false),[feedback,setFeedback]=useState(false);
  const [playing,setPlaying]=useState(false),[slow,setSlow]=useState(false);

const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{if(!playing)return;const t=window.setTimeout(()=>setPlaying(false),2400);return ()=>clearTimeout(t);},[playing]);
const isListening=area==='listening';
const answered=inputMode?typed.trim().length>0:choice!==null;
const shownCorrect=inputMode||choice===(isListening?listeningAnswer:'학교');
const WordLesson=area==='grammar'?GrammarLesson:area==='expressions'?ExpressionsLesson:VocabularyLesson;
return <><MobileScroll className="mal-scroll"><main className="mal-content mal-lesson">

          <LessonHeader isListening={isListening} onExit={onExit}/>
          <h1 className="mal-question-title">{isListening?'Listen. What does it mean?':'Find the right word.'}</h1><p className="mal-question-subtitle">{isListening?'Choose the meaning that matches what you hear.':'Choose the word that fits the sentence.'}</p>
          {isListening?<ListeningLesson feedback={feedback} inputMode={inputMode} choice={choice} onChoose={setChoice} playing={playing} setPlaying={setPlaying} slow={slow} setSlow={setSlow}/>:<WordLesson feedback={feedback} inputMode={inputMode} choice={choice} onChoose={setChoice}/>}
          {!feedback&&inputMode&&<AnswerInput typed={typed} onChange={setTyped} onBlur={()=>keyboard.hide()}/>}
          {!feedback&&<div className="mal-question-tools"><button onClick={()=>setHint(h=>!h)} aria-expanded={hint}><Lightbulb size={17}/>Hint</button><button onClick={()=>{keyboard.hide();lastInputMode[area]=!inputMode;setInputMode(!inputMode);}}><Keyboard size={17}/>{inputMode?(isListening?'Choose meaning':'Use cards'):'Type instead'}</button></div>}
          {hint&&!feedback&&<div className="mal-hint"><Lightbulb size={19}/><p>{isListening?'주세요 makes a polite request. Listen for what is being asked for.':'학교 means “school”. It’s where you study.'}</p></div>}
          {feedback&&<FeedbackPanel shownCorrect={shownCorrect} isListening={isListening}/>}
          <p className="mal-lesson-footer-note">{feedback?'A little Korean, a little closer.':'Take your time. You’ve got this.'}</p>
        
</main></MobileScroll><footer className="mal-fixed-footer" style={{bottom:bottomInset}}><Action disabled={!answered&&!feedback} onClick={()=>{keyboard.hide();if(feedback){onComplete();}else setFeedback(true);}}>{feedback?'Back to Today':'Check answer'}</Action></footer></>;
}
