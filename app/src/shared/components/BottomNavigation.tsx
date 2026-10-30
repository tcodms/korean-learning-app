import { House, BookOpen, Clock, ChartBar } from '@phosphor-icons/react';

interface Props { onToday:()=>void; onLearn:()=>void; onReview:()=>void; onProgress:()=>void; }
export default function BottomNavigation({onToday,onLearn,onReview,onProgress}:Props){return (
<nav className="mal-bottom-nav" aria-label="Main navigation"><button className="active" aria-current="page" onClick={()=>onToday()}><House size={23} weight="fill"/><span>Today</span></button><button onClick={onLearn}><BookOpen size={23}/><span>Learn</span></button><button onClick={()=>onReview()}><Clock size={23}/><span>Review</span></button><button onClick={()=>onProgress()}><ChartBar size={23}/><span>Progress</span></button></nav>);}
