import { CaretRight, Fire, Star, Check, Info, SlidersHorizontal } from '@phosphor-icons/react';

import { useEffect, useState } from 'react';
import { MobileScroll } from '../../mobile';
import Action from '../../shared/components/Action';
import Meter from '../../shared/components/Meter';
import Mascot from '../../shared/components/Mascot';
import BottomNavigation from '../../shared/components/BottomNavigation';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import './TodayScreen.css';
interface Props {
 selected: Skill[]; onChooseSkills:()=>void; onStartLesson:(area?:Skill)=>void;
 onReview:()=>void; onProgress:()=>void; onAbout:()=>void;
}
export default function TodayScreen({selected,onChooseSkills,onStartLesson,onReview,onProgress,onAbout}:Props){
 const [wave,setWave]=useState(false);
 useEffect(()=>{if(!wave)return;const t=window.setTimeout(()=>setWave(false),1900);return ()=>clearTimeout(t);},[wave]);
 const chosen=skills.filter(s=>selected.includes(s.id));
 return <><MobileScroll className="mal-scroll"><main className="mal-content mal-today">

          <header className="mal-home-header"><h1>Today</h1><button className="mal-streak" aria-label="View sample study streak" onClick={()=>onProgress()}><Fire size={17} weight="fill"/>4</button></header>
          <section className="mal-hero"><div className="mal-hero-copy"><h2>A little Korean,<br/>every day.</h2><p lang="ko">오늘도 한 걸음</p></div><button className="mal-pet-button" aria-label="Say hello to your study buddy" onClick={()=>setWave(true)}><Mascot reading active={wave}/></button></section>
          <section className="mal-home-stats" aria-label="Sample practice overview"><div className="mal-stat"><span>Today’s practice</span><div><strong>3</strong><span>/10</span></div><Meter/></div><button className="mal-stat mal-review-stat" onClick={()=>onReview()}><span className="mal-star"><Star size={20} weight="fill"/></span><span className="mal-stat-copy"><span>Ready to<br/>review</span><strong>6 items</strong></span><CaretRight size={17}/></button></section>
          <section className="mal-plan"><div className="mal-plan-heading"><div><h2>Your daily plan</h2><p>7 more questions to your daily goal</p></div><button className="mal-icon-button mal-plan-edit" aria-label="Choose your daily skills" onClick={onChooseSkills}><SlidersHorizontal size={19}/></button></div><div className="mal-plan-list">{chosen.map(s=><button className="mal-plan-row" key={s.id} onClick={()=>onStartLesson(s.id)}><span className="mal-skill-icon"><s.icon size={20} weight={s.id==='grammar'?'bold':'regular'}/></span><span>{s.name}</span><small>{s.progress}</small><span className="mal-check-circle"><Check size={14} weight="bold"/></span></button>)}</div><div className="mal-plan-meta"><span>10 questions</span><span>~ 5 min</span></div><Action onClick={()=>onStartLesson()}>Today’s lesson</Action></section>
          <section className="mal-explore"><div className="mal-section-title"><h2>Explore Korean</h2><button onClick={onChooseSkills}>See all</button></div><div className="mal-shortcuts">{skills.map(s=><button key={s.id} onClick={()=>onStartLesson(s.id)}><s.icon size={25} weight={s.id==='vocabulary'||s.id==='expressions'?'fill':'regular'}/><span>{s.name}</span></button>)}</div></section>
          <button className="mal-about" onClick={()=>onAbout()}>Sample content · About this preview<Info size={13}/></button>
        
 </main></MobileScroll><BottomNavigation onToday={()=>{}} onLearn={onChooseSkills} onReview={onReview} onProgress={onProgress}/></>;
}
