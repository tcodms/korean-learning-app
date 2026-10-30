import { X } from '@phosphor-icons/react';
import Meter from '../../shared/components/Meter';
interface Props {current:number;total:number;done:boolean;onExit:()=>void;}
/** `current` is 1-based; the meter fills for a question once it is answered. */
export default function LessonHeader({current,total,done,onExit}:Props){return (<header className="mal-lesson-header"><button className="mal-icon-button" aria-label="Close lesson preview" onClick={()=>onExit()}><X size={22}/></button><Meter value={Math.round((current-1+(done?1:0))/total*100)} label="Lesson progress"/><span>{current}<small> / {total}</small></span></header>);}
