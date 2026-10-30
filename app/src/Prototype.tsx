import './prototype.css';
import { CaretRight } from '@phosphor-icons/react';

import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {BottomSheet,useKeyboard,useKeyboardInsets} from './mobile';
import Action from './shared/components/Action';
import type {ListeningMode,Screen,Skill} from './shared/types/learning';
import TodayScreen from './screens/today/TodayScreen';
import DailySkillsScreen from './screens/onboarding/DailySkillsScreen';
import LessonPreview from './lessons/LessonPreview';
import ListeningModePicker from './lessons/listening/ListeningModePicker';
/** App-flow owner: edit lesson internals inside lessons/. */
export default function Prototype(){
const [screen,setScreen]=useState<Screen>('today');
const [selected,setSelected]=useState<Skill[]>(['vocabulary','grammar']);
const [area,setArea]=useState<Skill>('vocabulary');
const [listeningMode,setListeningMode]=useState<ListeningMode>('context'),[listeningPicker,setListeningPicker]=useState(false);
const [about,setAbout]=useState(false),[previewPanel,setPreviewPanel]=useState<'review'|'progress'|null>(null);
const appRef=useRef<HTMLDivElement>(null);
const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{document.title='MAL · UI preview';},[]);
function resetViewportScroll(){appRef.current?.closest('[data-testid="device-screen"]')?.scrollTo(0,0);}
useLayoutEffect(resetViewportScroll,[screen,bottomInset]);
function go(next:Screen){keyboard.hide();setScreen(next);}
function openSkills(){go('skills');}
function openLesson(next:Skill='vocabulary'){if(next==='listening'){keyboard.hide();setListeningPicker(true);return;}setArea(next);go('lesson');}
function startListening(mode:ListeningMode){setListeningPicker(false);setListeningMode(mode);setArea('listening');go('lesson');}
return <>
{createPortal(<aside className="mal-preview-tools" aria-label="Screen previews"><span className="mal-preview-brand">MAL<span>UI preview</span></span><div role="group" aria-label="Choose a screen">{([{id:'today',label:'01 Today'},{id:'skills',label:'02 Daily skills'},{id:'lesson',label:'03 Lesson'}] as const).map(s=><button key={s.id} type="button" aria-pressed={screen===s.id} onClick={()=>s.id==='skills'?openSkills():s.id==='lesson'?openLesson():go('today')}>{s.label}</button>)}</div><small>Sample data · visual interactions only</small></aside>,document.body)}
<div className="mal-app" ref={appRef} data-screen={screen} onClick={resetViewportScroll}>
{screen==='today'&&<TodayScreen selected={selected} onChooseSkills={openSkills} onStartLesson={openLesson} onReview={()=>setPreviewPanel('review')} onProgress={()=>setPreviewPanel('progress')} onAbout={()=>setAbout(true)}/>}
{screen==='skills'&&<DailySkillsScreen selected={selected} onExit={()=>go('today')} onComplete={value=>{setSelected(value);go('today');}}/>}
{screen==='lesson'&&<LessonPreview key={`${area}-${listeningMode}`} area={area} listeningMode={listeningMode} onExit={()=>go('today')} onComplete={()=>go('today')}/>}
<BottomSheet open={listeningPicker} onOpenChange={setListeningPicker} title="Choose your listening practice." description="Each practice has its own set of questions."><div className="mal-sheet"><ListeningModePicker onPick={startListening}/></div></BottomSheet>
<BottomSheet open={about} onOpenChange={setAbout} title="A little look at MAL" description="Three screens. A new little learning world."><div className="mal-sheet"><p>This is a visual preview with sample content. Explore the buttons, choose your daily skills, and try the lesson states.</p><p>No answers or preferences are saved. Audio controls preview the animation only.</p><Action onClick={()=>setAbout(false)}>Got it</Action></div></BottomSheet>
      <BottomSheet open={previewPanel!==null} onOpenChange={open=>!open&&setPreviewPanel(null)} title={previewPanel==='review'?'A little refresh.':'Little steps add up.'} description={previewPanel==='review'?'A preview of your review list.':'A preview of your practice summary.'}><div className="mal-sheet">{previewPanel==='review'?<><div className="mal-sheet-list">{[['학교','school'],['물','water'],['주세요','please give me']].map(([word,meaning])=><div key={word}><span lang="ko">{word}</span><span>{meaning}</span><CaretRight size={16}/></div>)}</div><Action onClick={()=>{setPreviewPanel(null);openLesson();}}>Preview a question</Action></>:<><div className="mal-summary-preview"><div><strong>3</strong><span>questions today</span></div><div><strong>4</strong><span>day streak</span></div></div><p className="mal-sample-label">Sample data for the screen design.</p><Action onClick={()=>setPreviewPanel(null)}>Back to Today</Action></>}</div></BottomSheet>
</div></>;
}
