import type { Dispatch, SetStateAction } from 'react';
import AudioControls from '../components/AudioControls';
import ChoiceAnswers from '../components/ChoiceAnswers';
import { contextQuestion, type ListeningMode } from './listening.mock';
import './ListeningLesson.css';
interface Props { mode:ListeningMode;feedback:boolean;playing:boolean;slow:boolean;choice:string|null;onChoose:(meaning:string)=>void;setPlaying:Dispatch<SetStateAction<boolean>>;setSlow:Dispatch<SetStateAction<boolean>>; }
export default function ListeningLesson({mode,feedback,playing,slow,choice,onChoose,setPlaying,setSlow}:Props){return <>
<AudioControls playing={playing} slow={slow} onReplay={()=>setPlaying(true)} onTogglePlay={()=>setPlaying(p=>!p)} onToggleSpeed={()=>setSlow(s=>!s)}/>
{!feedback&&mode==='context'&&<ChoiceAnswers options={contextQuestion.options} choice={choice} onChoose={onChoose} lang="en"/>}
</>;}
