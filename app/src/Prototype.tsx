import './prototype.css';
import { CaretRight } from '@phosphor-icons/react';

import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {BottomSheet,useKeyboard,useKeyboardInsets} from './mobile';
import Action from './shared/components/Action';
import type {Screen,Skill} from './shared/types/learning';
import TodayScreen from './screens/today/TodayScreen';
import CourseIntroScreen from './screens/today/CourseIntroScreen';
import DailySkillsScreen from './screens/onboarding/DailySkillsScreen';
import LessonPreview from './lessons/LessonPreview';
import ResultScreen from './screens/result/ResultScreen';
import {createResultPreview,type ResultKind} from './screens/result/result.mock';
/** App-flow owner: edit lesson internals inside lessons/. */
export default function Prototype(){
const [screen,setScreen]=useState<Screen>('today');
const [selected,setSelected]=useState<Skill[]>(['vocabulary','grammar']);
const [skillsReturn,setSkillsReturn]=useState<'today'|'course'>('today');
const [resultKind,setResultKind]=useState<ResultKind>('daily');
const [area,setArea]=useState<Skill>('vocabulary');
const [about,setAbout]=useState(false),[previewPanel,setPreviewPanel]=useState<'review'|'progress'|null>(null);
const appRef=useRef<HTMLDivElement>(null);
const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{document.title='MAL · UI preview';},[]);
function resetViewportScroll(){appRef.current?.closest('[data-testid="device-screen"]')?.scrollTo(0,0);}
useLayoutEffect(resetViewportScroll,[screen,bottomInset]);
function go(next:Screen){keyboard.hide();setScreen(next);}
function openSkills(){setSkillsReturn('today');go('skills');}
function openLesson(next:Skill='vocabulary',kind:ResultKind='free'){setArea(next);setResultKind(kind);go('lesson');}
return <>
{createPortal(<aside className="mal-preview-tools" aria-label="Screen previews"><span className="mal-preview-brand">MAL<span>UI preview</span></span><div role="group" aria-label="Choose a screen">{([{id:'today',label:'01 Today'},{id:'skills',label:'02 Daily skills'},{id:'course',label:'03 Course'},{id:'lesson',label:'04 Lesson'},{id:'result',label:'05 Result'}] as const).map(s=><button key={s.id} type="button" aria-pressed={screen===s.id} onClick={()=>s.id==='skills'?openSkills():s.id==='lesson'?openLesson():go(s.id)}>{s.label}</button>)}</div>{screen==='result'&&<div role="group" aria-label="Result preview type">{(['daily','free','review'] as const).map(kind=><button key={kind} type="button" aria-pressed={resultKind===kind} onClick={()=>setResultKind(kind)}>{{daily:'Today',free:'Lesson',review:'Review'}[kind]}</button>)}</div>}<small>Sample data · visual interactions only</small></aside>,document.body)}
<div className="mal-app" ref={appRef} data-screen={screen} onClick={resetViewportScroll}>
{screen==='today'&&<TodayScreen selected={selected} onChooseSkills={openSkills} onStartLesson={openLesson} onStartDailyCourse={()=>go('course')} onReview={()=>setPreviewPanel('review')} onProgress={()=>setPreviewPanel('progress')} onAbout={()=>setAbout(true)}/>}
{screen==='skills'&&<DailySkillsScreen selected={selected} onExit={()=>go(skillsReturn)} onComplete={value=>{setSelected(value);go(skillsReturn);}}/>}
{screen==='course'&&<CourseIntroScreen selected={selected} onExit={()=>go('today')} onEdit={()=>{setSkillsReturn('course');go('skills');}} onStart={next=>openLesson(next,'daily')}/>}
{screen==='result'&&<ResultScreen result={createResultPreview(resultKind,resultKind==='daily'?selected:[area])} onHome={()=>go('today')} onPracticeAgain={()=>openLesson(resultKind==='daily'?(selected[0]??'vocabulary'):area,resultKind)} onReview={()=>openLesson(area,'review')}/>}
{screen==='lesson'&&<LessonPreview key={area} area={area} onExit={()=>go('today')} onComplete={()=>go('result')}/>}
<BottomSheet open={about} onOpenChange={setAbout} title="A little look at MAL" description="A new little learning world."><div className="mal-sheet"><p>This is a visual preview with sample content. Explore the buttons, choose your daily skills, and try the lesson states.</p><p>No answers or preferences are saved. Audio controls preview the animation only.</p><Action onClick={()=>setAbout(false)}>Got it</Action></div></BottomSheet>
      <BottomSheet open={previewPanel!==null} onOpenChange={open=>!open&&setPreviewPanel(null)} title={previewPanel==='review'?'A little refresh.':'Little steps add up.'} description={previewPanel==='review'?'A preview of your review list.':'A preview of your practice summary.'}><div className="mal-sheet">{previewPanel==='review'?<><div className="mal-sheet-list">{[['학교','school'],['물','water'],['주세요','please give me']].map(([word,meaning])=><div key={word}><span lang="ko">{word}</span><span>{meaning}</span><CaretRight size={16}/></div>)}</div><Action onClick={()=>{setPreviewPanel(null);openLesson('vocabulary','review');}}>Preview a question</Action></>:<><div className="mal-summary-preview"><div><strong>3</strong><span>questions today</span></div><div><strong>4</strong><span>day streak</span></div></div><p className="mal-sample-label">Sample data for the screen design.</p><Action onClick={()=>setPreviewPanel(null)}>Back to Today</Action></>}</div></BottomSheet>
</div></>;
}
