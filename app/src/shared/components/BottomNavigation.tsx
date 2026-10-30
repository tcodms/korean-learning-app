import { House, BookOpen, Clock, ChartBar } from '@phosphor-icons/react';
interface Props { active?:'today'|'learn'|'review'; onToday:()=>void; onLearn:()=>void; onReview:()=>void; onProgress:()=>void; }
export default function BottomNavigation({active='today',onToday,onLearn,onReview,onProgress}:Props){return (
<nav className="mal-bottom-nav" aria-label="Main navigation">
<button className={active==='today'?'active':''} aria-current={active==='today'?'page':undefined} onClick={onToday}><House size={23} weight={active==='today'?'fill':'regular'}/><span>Today</span></button>
<button className={active==='learn'?'active':''} aria-current={active==='learn'?'page':undefined} onClick={onLearn}><BookOpen size={23} weight={active==='learn'?'fill':'regular'}/><span>Learn</span></button>
<button className={active==='review'?'active':''} aria-current={active==='review'?'page':undefined} onClick={onReview}><Clock size={23} weight={active==='review'?'fill':'regular'}/><span>Review</span></button>
<button onClick={onProgress}><ChartBar size={23}/><span>Progress</span></button>
</nav>);}
