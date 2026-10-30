import { useEffect, useLayoutEffect, useRef, useState, type ButtonHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Headphones, TextAlignLeft, ChatCircleDots, House, Clock, ChartBar, ArrowRight, CaretRight, CaretLeft, Fire, Star, Check, X, Lightbulb, ArrowCounterClockwise, Info, SlidersHorizontal, Keyboard, Play, Pause } from '@phosphor-icons/react';
import { BottomSheet, KeyboardInput, MobileScroll, useKeyboard, useKeyboardInsets } from './mobile';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/600.css';

type Screen = 'today'|'skills'|'lesson';
type Skill = 'vocabulary'|'listening'|'grammar'|'expressions';
const skills = [
  { id:'vocabulary' as Skill, name:'Vocabulary', icon:BookOpen, description:'Words you’ll use every day.', progress:'2 of 5' },
  { id:'listening' as Skill, name:'Listening', icon:Headphones, description:'Hear it. Understand it.', progress:'0 of 5' },
  { id:'grammar' as Skill, name:'Grammar', icon:TextAlignLeft, description:'Build your next sentence.', progress:'1 of 5' },
  { id:'expressions' as Skill, name:'Expressions', icon:ChatCircleDots, description:'The right words for the moment.', progress:'0 of 5' },
];
function Action({ children, className='', ...props }:ButtonHTMLAttributes<HTMLButtonElement>){return <button type="button" className={`mal-action ${className}`} {...props}><span>{children}</span><ArrowRight size={20} weight="bold"/></button>;}
function Meter({value=30,label='Today’s practice'}:{value?:number;label?:string}){return <div className="mal-meter" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${value}%`}}/></div>;}
function Mascot({reading=false,active=false}:{reading?:boolean;active?:boolean}){return reading&&!active?<img className="mal-reading" src="/assets/mal/reading.png" alt="MAL’s blue study buddy reading a book" draggable={false}/>:<span className={`mal-mascot ${active?'is-celebrating':''}`} role="img" aria-label="MAL’s blue study buddy waving"><span/></span>;}

export default function MalPreview(){
  const [screen,setScreen]=useState<Screen>('today');
  // Presentation state only. Sample counts never change and nothing is persisted.
  const [selected,setSelected]=useState<Skill[]>(['vocabulary','grammar']);
  const [draft,setDraft]=useState<Skill[]>(selected);
  const [choice,setChoice]=useState<string|null>(null),[typed,setTyped]=useState('');
  const [inputMode,setInputMode]=useState(false),[hint,setHint]=useState(false),[feedback,setFeedback]=useState(false);
  const [wave,setWave]=useState(false),[about,setAbout]=useState(false),[previewPanel,setPreviewPanel]=useState<'review'|'progress'|null>(null);
  const [questionType,setQuestionType]=useState<'words'|'listening'>('words');
  const [cards,setCards]=useState<string[]>([]),[playing,setPlaying]=useState(false),[slow,setSlow]=useState(false);
  const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
  const appRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{document.title='MAL · UI preview';},[]);
  useEffect(()=>{if(!wave)return;const t=window.setTimeout(()=>setWave(false),1900);return ()=>clearTimeout(t);},[wave]);
  useEffect(()=>{if(!playing)return;const t=window.setTimeout(()=>setPlaying(false),2400);return ()=>clearTimeout(t);},[playing]);
  useLayoutEffect(()=>{appRef.current?.closest('[data-testid="device-screen"]')?.scrollTo(0,0);},[screen,bottomInset]);
  function go(next:Screen){keyboard.hide();setPlaying(false);setScreen(next);}
  function openSkills(){setDraft(selected);go('skills');}
  function openLesson(type:'words'|'listening'='words'){setChoice(null);setTyped('');setHint(false);setFeedback(false);setInputMode(false);setCards([]);setQuestionType(type);go('lesson');}
  function resetQuestion(){keyboard.hide();setChoice(null);setTyped('');setFeedback(false);setHint(false);setCards([]);}
  const isListening=questionType==='listening';
  const answered=inputMode?typed.trim().length>0:isListening?cards.length>0:choice!==null;
  const shownCorrect=inputMode||isListening||choice==='학교';
  const chosen=skills.filter(s=>selected.includes(s.id));
  return <>
    {createPortal(<aside className="mal-preview-tools" aria-label="Screen previews"><span className="mal-preview-brand">MAL<span>UI preview</span></span><div role="group" aria-label="Choose a screen">{([{id:'today',label:'01 Today'},{id:'skills',label:'02 Daily skills'},{id:'lesson',label:'03 Lesson'}] as const).map(s=><button key={s.id} type="button" aria-pressed={screen===s.id} onClick={()=>s.id==='skills'?openSkills():s.id==='lesson'?openLesson():go('today')}>{s.label}</button>)}</div><small>Sample data · visual interactions only</small></aside>,document.body)}
    <div className="mal-app" ref={appRef} data-screen={screen}>
      <MobileScroll key={screen} className="mal-scroll"><main className={`mal-content mal-${screen}`}>
        {screen==='today'&&<>
          <header className="mal-home-header"><h1>Today</h1><button className="mal-streak" aria-label="View sample study streak" onClick={()=>setPreviewPanel('progress')}><Fire size={17} weight="fill"/>4</button></header>
          <section className="mal-hero"><div className="mal-hero-copy"><h2>A little Korean,<br/>every day.</h2><p lang="ko">오늘도 한 걸음</p></div><button className="mal-pet-button" aria-label="Say hello to your study buddy" onClick={()=>setWave(true)}><Mascot reading active={wave}/></button></section>
          <section className="mal-home-stats" aria-label="Sample practice overview"><div className="mal-stat"><span>Today’s practice</span><div><strong>3</strong><span>/10</span></div><Meter/></div><button className="mal-stat mal-review-stat" onClick={()=>setPreviewPanel('review')}><span className="mal-star"><Star size={20} weight="fill"/></span><span className="mal-stat-copy"><span>Ready to<br/>review</span><strong>6 items</strong></span><CaretRight size={17}/></button></section>
          <section className="mal-plan"><div className="mal-plan-heading"><div><h2>Your daily plan</h2><p>7 more questions to your daily goal</p></div><button className="mal-icon-button mal-plan-edit" aria-label="Choose your daily skills" onClick={openSkills}><SlidersHorizontal size={19}/></button></div><div className="mal-plan-list">{chosen.map(s=><button className="mal-plan-row" key={s.id} onClick={()=>openLesson(s.id==='listening'?'listening':'words')}><span className="mal-skill-icon"><s.icon size={20} weight={s.id==='grammar'?'bold':'regular'}/></span><span>{s.name}</span><small>{s.progress}</small><span className="mal-check-circle"><Check size={14} weight="bold"/></span></button>)}</div><div className="mal-plan-meta"><span>10 questions</span><span>~ 5 min</span></div><Action onClick={()=>openLesson()}>Today’s lesson</Action></section>
          <section className="mal-explore"><div className="mal-section-title"><h2>Explore Korean</h2><button onClick={openSkills}>See all</button></div><div className="mal-shortcuts">{skills.map(s=><button key={s.id} onClick={()=>openLesson(s.id==='listening'?'listening':'words')}><s.icon size={25} weight={s.id==='vocabulary'||s.id==='expressions'?'fill':'regular'}/><span>{s.name}</span></button>)}</div></section>
          <button className="mal-about" onClick={()=>setAbout(true)}>Sample content · About this preview<Info size={13}/></button>
        </>}
        {screen==='skills'&&<>
          <header className="mal-topbar"><button className="mal-icon-button" aria-label="Back to Today" onClick={()=>go('today')}><CaretLeft size={23}/></button><span className="mal-small-wordmark">MAL</span><span className="mal-step">3 of 4</span></header>
          <div className="mal-onboarding-progress" aria-hidden="true"><i/><i/><i/><i className="muted"/></div>
          <section className="mal-skills-title"><span className="mal-eyebrow">YOUR DAILY LITTLE HABIT</span><h1>What will you<br/>learn each day?</h1><p>Pick what you love.<br/>We’ll make a little room for it.</p></section>
          <div className="mal-skill-grid">{skills.map(s=>{const checked=draft.includes(s.id);return <button className={`mal-skill-card ${checked?'selected':''}`} key={s.id} aria-pressed={checked} onClick={()=>setDraft(d=>checked?d.filter(id=>id!==s.id):[...d,s.id])}><span className="mal-card-check">{checked&&<Check size={14} weight="bold"/>}</span><s.icon size={34} weight={s.id==='vocabulary'||s.id==='expressions'?'fill':'regular'}/><strong>{s.name}</strong><span>{s.description}</span></button>;})}</div>
          <p className="mal-selection-caption" aria-live="polite">{draft.length?`${draft.length} ${draft.length===1?'skill':'skills'} selected. A little progress, your way.`:'Choose at least one skill to continue.'}</p>

        </>}
        {screen==='lesson'&&<>
          <header className="mal-lesson-header"><button className="mal-icon-button" aria-label="Close lesson preview" onClick={()=>go('today')}><X size={22}/></button><Meter value={isListening?70:30} label="Sample lesson progress"/><span>{isListening?'7':'3'}<small> / 10</small></span></header>
          <div className="mal-lesson-type" role="group" aria-label="Lesson preview type"><button aria-pressed={!isListening} onClick={()=>{resetQuestion();setQuestionType('words');}}><BookOpen size={16}/>Vocabulary</button><button aria-pressed={isListening} onClick={()=>{resetQuestion();setQuestionType('listening');}}><Headphones size={16}/>Listening</button></div>
          <h1 className="mal-question-title">{isListening?'Hear it. Build it.':'Find the right word.'}</h1><p className="mal-question-subtitle">{isListening?'Tap the words in the order you hear them.':'Choose the word that fits the sentence.'}</p>
          {!isListening?<><div className="mal-question-card"><span>I go to school.</span><p lang="ko">저는 <span className={feedback?'filled':''}>{feedback?'학교':'　　'}</span>에 가요.</p></div>{!feedback&&!inputMode&&<div className="mal-choices">{['학교','가방','우산'].map((word,i)=><button key={word} className={choice===word?'selected':''} aria-pressed={choice===word} onClick={()=>setChoice(word)}><span className="mal-option-letter">{i+1}</span><span lang="ko">{word}</span><span className="mal-option-check">{choice===word&&<Check size={15} weight="bold"/>}</span></button>)}</div>}</>:<><div className={`mal-audio-area ${playing?'playing':''}`}><button className="mal-audio-minor" aria-label="Replay animation preview" onClick={()=>setPlaying(true)}><ArrowCounterClockwise size={23}/><span>Replay</span></button><button className="mal-play" aria-label={playing?'Pause animation preview':'Play animation preview'} onClick={()=>setPlaying(p=>!p)}>{playing?<Pause size={32} weight="fill"/>:<Play size={32} weight="fill"/>}</button><button className="mal-audio-minor" aria-pressed={slow} onClick={()=>setSlow(s=>!s)}><span className="mal-speed">{slow?'0.75×':'1×'}</span><span>Slow</span></button></div>{!feedback&&!inputMode&&<><div className="mal-answer-slots" aria-label="Your sentence">{[0,1,2].map(i=>cards[i]?<button key={i} lang="ko" onClick={()=>setCards(c=>c.filter((_,n)=>n!==i))}>{cards[i]}</button>:<span key={i}/>)}</div><div className="mal-word-bank">{['주세요','물','학교','좀'].map(word=><button lang="ko" className="mal-word" key={word} disabled={cards.includes(word)||cards.length===3} onClick={()=>setCards(c=>[...c,word])}>{word}</button>)}</div></>}</>}
          {!feedback&&inputMode&&<div className="mal-input-wrap"><label htmlFor="mal-answer">Your answer</label><KeyboardInput id="mal-answer" value={typed} onChange={e=>setTyped(e.target.value)} onBlur={()=>keyboard.hide()} placeholder="한국어로 입력하세요" autoComplete="off" lang="ko"/></div>}
          {!feedback&&<div className="mal-question-tools"><button onClick={()=>setHint(h=>!h)} aria-expanded={hint}><Lightbulb size={17}/>Hint</button>{isListening&&!inputMode&&<button disabled={!cards.length} onClick={()=>setCards(c=>c.slice(0,-1))}><ArrowCounterClockwise size={17}/>Undo</button>}<button onClick={()=>{keyboard.hide();setInputMode(i=>!i);}}><Keyboard size={17}/>{inputMode?'Use cards':'Type instead'}</button></div>}
          {hint&&!feedback&&<div className="mal-hint"><Lightbulb size={19}/><p>{isListening?'Start with 물, then add 좀.':'학교 means “school”. It’s where you study.'}</p></div>}
          {feedback&&<section className={`mal-feedback ${shownCorrect?'correct':'try-again'}`} aria-live="polite"><div className="mal-feedback-head"><span className="mal-feedback-symbol">{shownCorrect?<Check size={20} weight="bold"/>:<Lightbulb size={20}/>}</span><h2>{shownCorrect?'Nice work. 잘했어요!':'A little practice helps.'}</h2></div><p className="mal-correct-answer" lang="ko">{isListening?'물 좀 주세요.':'저는 학교에 가요.'}</p><p>{isListening?'물 is water. 좀 makes the request softer. 주세요 means “please give me”.':'학교 means school. 에 marks where you’re going. One little word, a whole new sentence.'}</p><div className="mal-feedback-bottom"><span>One little step forward.</span><span className="mal-feedback-buddy"><Mascot active={shownCorrect}/></span></div></section>}
          <p className="mal-lesson-footer-note">{feedback?'A little Korean, a little closer.':'Take your time. You’ve got this.'}</p>
        </>}
      </main></MobileScroll>
      {screen==='today'&&<nav className="mal-bottom-nav" aria-label="Main navigation"><button className="active" aria-current="page" onClick={()=>go('today')}><House size={23} weight="fill"/><span>Today</span></button><button onClick={openSkills}><BookOpen size={23}/><span>Learn</span></button><button onClick={()=>setPreviewPanel('review')}><Clock size={23}/><span>Review</span></button><button onClick={()=>setPreviewPanel('progress')}><ChartBar size={23}/><span>Progress</span></button></nav>}
      {screen!=='today'&&<footer className="mal-fixed-footer" style={{bottom:bottomInset}}>{screen==='skills'?<Action disabled={!draft.length} onClick={()=>{setSelected(draft);go('today');}}>Continue</Action>:<Action disabled={!answered&&!feedback} onClick={()=>{keyboard.hide();if(feedback){resetQuestion();go('today');}else setFeedback(true);}}>{feedback?'Back to Today':'Check answer'}</Action>}</footer>}
      <BottomSheet open={about} onOpenChange={setAbout} title="A little look at MAL" description="Three screens. A new little learning world."><div className="mal-sheet"><p>This is a visual preview with sample content. Explore the buttons, choose your daily skills, and try the lesson states.</p><p>No answers or preferences are saved. Audio controls preview the animation only.</p><Action onClick={()=>setAbout(false)}>Got it</Action></div></BottomSheet>
      <BottomSheet open={previewPanel!==null} onOpenChange={open=>!open&&setPreviewPanel(null)} title={previewPanel==='review'?'A little refresh.':'Little steps add up.'} description={previewPanel==='review'?'A preview of your review list.':'A preview of your practice summary.'}><div className="mal-sheet">{previewPanel==='review'?<><div className="mal-sheet-list">{[['학교','school'],['물','water'],['주세요','please give me']].map(([word,meaning])=><div key={word}><span lang="ko">{word}</span><span>{meaning}</span><CaretRight size={16}/></div>)}</div><Action onClick={()=>{setPreviewPanel(null);openLesson();}}>Preview a question</Action></>:<><div className="mal-summary-preview"><div><strong>3</strong><span>questions today</span></div><div><strong>4</strong><span>day streak</span></div></div><p className="mal-sample-label">Sample data for the screen design.</p><Action onClick={()=>setPreviewPanel(null)}>Back to Today</Action></>}</div></BottomSheet>
    </div>
  </>;
}
