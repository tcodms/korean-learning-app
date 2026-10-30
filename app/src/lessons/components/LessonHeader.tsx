import { X } from '@phosphor-icons/react';
import Meter from '../../shared/components/Meter';
interface Props {isListening:boolean;onExit:()=>void;}
export default function LessonHeader({isListening,onExit}:Props){return (<header className="mal-lesson-header"><button className="mal-icon-button" aria-label="Close lesson preview" onClick={()=>onExit()}><X size={22}/></button><Meter value={isListening?70:30} label="Sample lesson progress"/><span>{isListening?'7':'3'}<small> / 10</small></span></header>);}
