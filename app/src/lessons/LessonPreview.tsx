import { Lightbulb, Keyboard } from '@phosphor-icons/react';

import {useEffect,useRef,useState} from 'react';
import {MobileScroll,useKeyboard,useKeyboardInsets} from '../mobile';
import Action from '../shared/components/Action';
import type {LessonPreviewProps,Skill} from '../shared/types/learning';
import VocabularyLesson from './vocabulary/VocabularyLesson';
import { vocabularyQuestions } from './vocabulary/vocabulary.mock';
import ListeningLesson from './listening/ListeningLesson';
import { contextQuestions, dictationQuestions } from './listening/listening.mock';
import GrammarLesson from './grammar/GrammarLesson';
import { grammarQuestions } from './grammar/grammar.mock';
import ExpressionsLesson from './expressions/ExpressionsLesson';
import { expressionsQuestions } from './expressions/expressions.mock';
import LessonHeader from './components/LessonHeader';
import FeedbackPanel from './components/FeedbackPanel';
import AnswerInput from './components/AnswerInput';
import { hintSteps } from './components/hangulHint';
import './LessonPreview.css';
/** Last answer input mode per area; kept while the app is open, reset on reload. */
const lastInputMode:Partial<Record<Skill,boolean>>={};
const compact=(text:string)=>text.normalize('NFC').replace(/[\s.,!?]/g,'');
const wordLessons={
  vocabulary:{Lesson:VocabularyLesson,questions:vocabularyQuestions,title:'Find the right word.',subtitle:'Choose the word that fits the sentence.'},
  grammar:{Lesson:GrammarLesson,questions:grammarQuestions,title:'Pick the right particle.',subtitle:'Choose the particle that completes the sentence.'},
  expressions:{Lesson:ExpressionsLesson,questions:expressionsQuestions,title:'Say it naturally.',subtitle:'Choose the expression that fits the moment.'},
};
export default function LessonPreview({area,listeningMode='context',onExit,onComplete}:LessonPreviewProps){
 const [index,setIndex]=useState(0);
 const [choice,setChoice]=useState<string|null>(null),[typed,setTyped]=useState('');
  const [inputMode,setInputMode]=useState(()=>lastInputMode[area]??false),[hint,setHint]=useState(false),[hintLevel,setHintLevel]=useState(0),[feedback,setFeedback]=useState(false);
  const [wrongAttempts,setWrongAttempts]=useState(0),[tried,setTried]=useState<string[]>([]),answerRef=useRef<HTMLInputElement>(null);
  const [playing,setPlaying]=useState(false),[slow,setSlow]=useState(false);

const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{if(!playing)return;const t=window.setTimeout(()=>setPlaying(false),2400);return ()=>clearTimeout(t);},[playing]);
const isListening=area==='listening';
const isDictation=isListening&&listeningMode==='dictation';
const word=wordLessons[area==='listening'?'vocabulary':area];
const wordQuestion=word.questions[index],contextQuestion=contextQuestions[index],dictationQuestion=dictationQuestions[index];
const total=isDictation?dictationQuestions.length:isListening?contextQuestions.length:word.questions.length;
const hasNext=index<total-1;
const typing=isListening?isDictation:inputMode;
const answered=typing?typed.trim().length>0:choice!==null;
const shownCorrect=isDictation?compact(typed)===compact(dictationQuestion.script):isListening?choice===contextQuestion.answer:inputMode?compact(typed)===compact(wordQuestion.answer):choice===wordQuestion.answer;
/** Typing the right word submits on its own; the short pause lets the last syllable settle. */
const autoSubmit=!isListening&&inputMode&&!feedback&&shownCorrect;
useEffect(()=>{if(!autoSubmit)return;const t=window.setTimeout(()=>{keyboard.hide();setFeedback(true);},350);return ()=>clearTimeout(t);},[autoSubmit,typed]);
const question=isDictation?{title:'Listen and write it down.',subtitle:'Type the Korean sentence you hear.',hint:dictationQuestion.hint,answer:dictationQuestion.script,explanation:dictationQuestion.explanation}
  :isListening?{title:'Listen. What does it mean?',subtitle:'Choose the meaning that matches what you hear.',hint:contextQuestion.hint,answer:contextQuestion.script,explanation:contextQuestion.explanation}
  :{title:word.title,subtitle:word.subtitle,answer:wordQuestion.sentence,explanation:wordQuestion.explanation};
/** Dictation retry: flash the answer field red and put the cursor back in it. */
useEffect(()=>{const input=answerRef.current;if(!wrongAttempts||!isDictation||!input)return;input.classList.remove('wrong-flash');void input.offsetWidth;input.classList.add('wrong-flash');input.focus();},[wrongAttempts]);
/** Move to the next question with a clean slate; the input mode carries over. */
function next(){setIndex(i=>i+1);setChoice(null);setTyped('');setHint(false);setHintLevel(0);setFeedback(false);setWrongAttempts(0);setTried([]);setPlaying(false);}
/** Every lesson lets the learner retry: a wrong answer is not revealed, typed text stays editable and a wrong choice is crossed out. */
function check(){keyboard.hide();if(feedback){if(hasNext)next();else onComplete();return;}if(!shownCorrect){setWrongAttempts(n=>n+1);if(!typing&&choice){setTried(t=>[...t,choice]);setChoice(null);}return;}setFeedback(true);}
const maxHintLevel=hintSteps(wordQuestion.answer);
const WordLesson=word.Lesson;
return <><MobileScroll key={index} className="mal-scroll"><main className="mal-content mal-lesson">

          <LessonHeader current={index+1} total={total} done={feedback} onExit={onExit}/>
          <h1 className="mal-question-title">{question.title}</h1><p className="mal-question-subtitle">{question.subtitle}</p>
          {isListening?<ListeningLesson mode={listeningMode} question={contextQuestion} feedback={feedback} choice={choice} onChoose={setChoice} playing={playing} setPlaying={setPlaying} slow={slow} setSlow={setSlow} wrongAttempts={wrongAttempts} tried={tried}/>:<WordLesson question={wordQuestion} feedback={feedback} correct={shownCorrect} inputMode={inputMode} hintLevel={hintLevel} typed={typed} onType={setTyped} choice={choice} onChoose={setChoice} wrongAttempts={wrongAttempts} tried={tried}/>}
          {!feedback&&isDictation&&<AnswerInput ref={answerRef} typed={typed} onChange={setTyped} onBlur={()=>keyboard.hide()}/>}
          {!feedback&&<div className="mal-question-tools">{isListening?<button onClick={()=>setHint(h=>!h)} aria-expanded={hint}><Lightbulb size={17}/>Hint</button>:inputMode&&<button disabled={hintLevel>=maxHintLevel} onClick={()=>setHintLevel(l=>Math.min(l+1,maxHintLevel))}><Lightbulb size={17}/>Hint</button>}{!isListening&&<button onClick={()=>{keyboard.hide();lastInputMode[area]=!inputMode;setInputMode(!inputMode);}}><Keyboard size={17}/>{inputMode?'Use cards':'Type instead'}</button>}</div>}
          {isListening&&hint&&!feedback&&<div className="mal-hint"><Lightbulb size={19}/><p>{question.hint}</p></div>}
          {feedback&&<FeedbackPanel shownCorrect={shownCorrect} answer={question.answer} explanation={question.explanation} yourAnswer={typing?typed.trim():choice??undefined}/>}
          <p className="mal-lesson-footer-note">{feedback?'A little Korean, a little closer.':'Take your time. You’ve got this.'}</p>

</main></MobileScroll><footer className="mal-fixed-footer" style={{bottom:bottomInset}}><Action disabled={!answered&&!feedback} onClick={check}>{feedback?(hasNext?'Next question':'See results'):'Check answer'}</Action></footer></>;
}
