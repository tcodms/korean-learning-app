import './prototype.css';

import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {BottomSheet,useKeyboard,useKeyboardInsets} from './mobile';
import Action from './shared/components/Action';
import type {ListeningMode,Screen,Skill} from './shared/types/learning';

// Screens
import WelcomeScreen from './screens/onboarding/WelcomeScreen';
import LanguageScreen from './screens/onboarding/LanguageScreen';
import LevelScreen from './screens/onboarding/LevelScreen';
import DailySkillsScreen from './screens/onboarding/DailySkillsScreen';
import GoalsScreen from './screens/onboarding/GoalsScreen';
import TodayScreen from './screens/today/TodayScreen';
import LearnScreen from './screens/learn/LearnScreen';
import LessonListScreen from './screens/learn/LessonListScreen';
import LessonIntroScreen from './screens/learn/LessonIntroScreen';
import {getLessons,type TopicId,type LessonSummary} from './screens/learn/learn.mock';
import CourseIntroScreen from './screens/today/CourseIntroScreen';
import LessonPreview from './lessons/LessonPreview';
import ListeningModePicker from './lessons/listening/ListeningModePicker';
import ResultScreen from './screens/result/ResultScreen';
import ReviewScreen from './screens/review/ReviewScreen';
import StudyItemScreen from './screens/review/StudyItemScreen';
import {studyItems,initialSavedIds,type StudyItem,type ReviewTab,type ReviewCategory} from './screens/review/review.mock';
import {createResultPreview,type ResultKind} from './screens/result/result.mock';

/** App-flow owner: edit lesson internals inside lessons/. */
export default function Prototype(){
// Navigation
const [screen,setScreen]=useState<Screen>('welcome');
// Onboarding state
const [language,setLanguage]=useState('english');
const [level,setLevel]=useState('');
// Lesson / result state
const [selected,setSelected]=useState<Skill[]>(['vocabulary','grammar']);
const [skillsReturn,setSkillsReturn]=useState<Screen>('today');
const [skillsBack,setSkillsBack]=useState<Screen>('today');
const [resultKind,setResultKind]=useState<ResultKind>('daily');
const [area,setArea]=useState<Skill>('vocabulary');
const [browseArea,setBrowseArea]=useState<Skill>('vocabulary');
const [browseTopic,setBrowseTopic]=useState<TopicId>('everyday');
const [browseLesson,setBrowseLesson]=useState<LessonSummary>(getLessons('vocabulary','everyday')[0]);
const [lessonReturn,setLessonReturn]=useState<Screen>('today');
const [savedIds,setSavedIds]=useState<string[]>(initialSavedIds);
const [reviewTab,setReviewTab]=useState<ReviewTab>('due');
const [reviewFilter,setReviewFilter]=useState<ReviewCategory|'all'>('all');
const [studyItem,setStudyItem]=useState<StudyItem>(studyItems[0]);
const [listeningMode,setListeningMode]=useState<ListeningMode>('context');
const [listeningPicker,setListeningPicker]=useState(false);
// Overlay state
const [about,setAbout]=useState(false);
const [previewPanel,setPreviewPanel]=useState<'progress'|null>(null);

const appRef=useRef<HTMLDivElement>(null);
const keyboard=useKeyboard(),{bottomInset}=useKeyboardInsets();
useEffect(()=>{document.title='MAL · UI preview';},[]);
function resetViewportScroll(){appRef.current?.closest('[data-testid="device-screen"]')?.scrollTo(0,0);}
useLayoutEffect(resetViewportScroll,[screen,bottomInset]);
function go(next:Screen){keyboard.hide();setScreen(next);}

// Skill screen helpers
function openSkillsFrom(back:Screen,returnTo:Screen){
  setSkillsBack(back);setSkillsReturn(returnTo);go('skills');
}
function openLesson(next:Skill='vocabulary',kind:ResultKind='free',returnTo:Screen='today'){
  keyboard.hide();setArea(next);setResultKind(kind);setLessonReturn(returnTo);
  if(next==='listening'){setListeningPicker(true);return;}
  go('lesson');
}
function startListening(mode:ListeningMode){setListeningPicker(false);setListeningMode(mode);go('lesson');}
function openLearn(next:Skill='vocabulary'){setBrowseArea(next);go('learn');}

function openReview(){setReviewTab('due');setReviewFilter('all');go('review');}
function toggleSaved(id:string){setSavedIds(ids=>ids.includes(id)?ids.filter(saved=>saved!==id):[...ids,id]);}

// Onboarding flow
function startOnboarding(){go('language');}
function onLanguageDone(lang:string){setLanguage(lang);go('level');}
function onLevelDone(lv:string){setLevel(lv);openSkillsFrom('level','goals');}
function onGoalsDone(){go('today');}

// Today home flow
function openSkillsFromToday(){openSkillsFrom('today','today');}
function openSkillsFromCourse(){openSkillsFrom('course','course');}

return <>
{createPortal(
  <aside className="mal-preview-tools" aria-label="Screen previews">
    <span className="mal-preview-brand">MAL<span>UI preview</span></span>
    <div role="group" aria-label="Onboarding screens">
      {([
        {id:'welcome',label:'W Welcome'},
        {id:'language',label:'W2 Language'},
        {id:'level',label:'W3 Level'},
        {id:'skills',label:'W4 Skills'},
        {id:'goals',label:'W5 Goals'},
      ] as const).map(s=>(
        <button key={s.id} type="button" aria-pressed={screen===s.id} onClick={()=>{
          if(s.id==='skills'){openSkillsFrom('level','goals');}
          else{go(s.id);}
        }}>{s.label}</button>
      ))}
    </div>
    <div role="group" aria-label="App screens">
      {([
        {id:'today',label:'01 Today'},
        {id:'learn',label:'02 Learn'},
        {id:'course',label:'03 Course'},
        {id:'lesson',label:'04 Lesson'},
        {id:'result',label:'05 Result'},
        {id:'review',label:'06 Review'},
      ] as const).map(s=>(
        <button key={s.id} type="button" aria-pressed={screen===s.id} onClick={()=>{
          if(s.id==='lesson'){openLesson();}
          else{go(s.id);}
        }}>{s.label}</button>
      ))}
    </div>
    {screen==='result'&&(
      <div role="group" aria-label="Result preview type">
        {(['daily','free','review'] as const).map(kind=>(
          <button key={kind} type="button" aria-pressed={resultKind===kind} onClick={()=>setResultKind(kind)}>
            {{daily:'Today',free:'Lesson',review:'Review'}[kind]}
          </button>
        ))}
      </div>
    )}
    <small>Sample data · visual interactions only</small>
  </aside>,
  document.body
)}
<div className="mal-app" ref={appRef} data-screen={screen} onClick={resetViewportScroll}>
  {screen==='welcome'&&<WelcomeScreen onStart={startOnboarding}/>}
  {screen==='language'&&<LanguageScreen onBack={()=>go('welcome')} onNext={onLanguageDone}/>}
  {screen==='level'&&<LevelScreen onBack={()=>go('language')} onNext={onLevelDone}/>}
  {screen==='skills'&&<DailySkillsScreen selected={selected} onExit={()=>go(skillsBack)} onComplete={value=>{setSelected(value);go(skillsReturn);}}/>}
  {screen==='goals'&&<GoalsScreen selectedSkills={selected} onBack={()=>openSkillsFrom('level','goals')} onSkip={()=>go('today')} onComplete={onGoalsDone}/>}
  {screen==='today'&&<TodayScreen selected={selected} onChooseSkills={openSkillsFromToday} onStartLesson={openLesson} onStartDailyCourse={()=>go('course')} onExplore={openLearn} onReview={openReview} onProgress={()=>setPreviewPanel('progress')} onAbout={()=>setAbout(true)}/>}
  {screen==='learn'&&<LearnScreen area={browseArea} onAreaChange={setBrowseArea} onTopic={topic=>{setBrowseTopic(topic);go('lesson-list');}} onHome={()=>go('today')} onReview={openReview} onProgress={()=>setPreviewPanel('progress')}/>}
  {screen==='lesson-list'&&<LessonListScreen area={browseArea} topic={browseTopic} onBack={()=>go('learn')} onLesson={lesson=>{setBrowseLesson(lesson);go('lesson-intro');}}/>}
  {screen==='lesson-intro'&&<LessonIntroScreen lesson={browseLesson} onBack={()=>go('lesson-list')} onStart={()=>openLesson(browseLesson.area,'free','lesson-intro')}/>}
  {screen==='review'&&<ReviewScreen savedIds={savedIds} tab={reviewTab} filter={reviewFilter} onTabChange={setReviewTab} onFilterChange={setReviewFilter} onItem={item=>{setStudyItem(item);go('study-item');}} onSave={toggleSaved} onPractice={category=>openLesson(category,'review','review')} onHome={()=>go('today')} onLearn={()=>openLearn()} onProgress={()=>setPreviewPanel('progress')}/>}
  {screen==='study-item'&&<StudyItemScreen item={studyItem} saved={savedIds.includes(studyItem.id)} onBack={()=>go('review')} onSave={()=>toggleSaved(studyItem.id)} onPractice={()=>openLesson(studyItem.category,'review','study-item')}/>}
  {screen==='course'&&<CourseIntroScreen selected={selected} onExit={()=>go('today')} onEdit={openSkillsFromCourse} onStart={next=>openLesson(next,'daily')}/>}
  {screen==='result'&&<ResultScreen result={createResultPreview(resultKind,resultKind==='daily'?selected:[area])} onHome={()=>go('today')} onPracticeAgain={()=>openLesson(resultKind==='daily'?(selected[0]??'vocabulary'):area,resultKind)} onReview={openReview}/>}
  {screen==='lesson'&&<LessonPreview key={`${area}-${listeningMode}`} area={area} listeningMode={listeningMode} onExit={()=>go(lessonReturn)} onComplete={()=>go('result')}/>}

  <BottomSheet open={listeningPicker} onOpenChange={setListeningPicker} title="Choose your listening practice." description="Each practice has its own set of questions."><div className="mal-sheet"><ListeningModePicker onPick={startListening}/></div></BottomSheet>
  <BottomSheet open={about} onOpenChange={setAbout} title="A little look at MAL" description="A new little learning world.">
    <div className="mal-sheet">
      <p>This is a visual preview with sample content. Explore the buttons, choose your daily skills, and try the lesson states.</p>
      <p>No answers or preferences are saved. Audio controls preview the animation only.</p>
      <Action onClick={()=>setAbout(false)}>Got it</Action>
    </div>
  </BottomSheet>

  <BottomSheet open={previewPanel!==null} onOpenChange={open=>!open&&setPreviewPanel(null)} title="Little steps add up." description="A preview of your practice summary.">
    <div className="mal-sheet"><div className="mal-summary-preview"><div><strong>3</strong><span>questions today</span></div><div><strong>4</strong><span>day streak</span></div></div><p className="mal-sample-label">Sample data for the screen design.</p><Action onClick={()=>setPreviewPanel(null)}>Got it</Action></div>
  </BottomSheet>
</div></>;
}
