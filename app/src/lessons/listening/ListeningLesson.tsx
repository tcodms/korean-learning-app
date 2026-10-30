import type { Dispatch, SetStateAction } from 'react';
import AudioControls from '../components/AudioControls';
import ChoiceAnswers from '../components/ChoiceAnswers';
import { listeningOptions } from './listening.mock';
import './ListeningLesson.css';
interface Props { feedback:boolean;inputMode:boolean;playing:boolean;slow:boolean;choice:string|null;onChoose:(meaning:string)=>void;setPlaying:Dispatch<SetStateAction<boolean>>;setSlow:Dispatch<SetStateAction<boolean>>; }
export default function ListeningLesson({feedback,inputMode,playing,slow,choice,onChoose,setPlaying,setSlow}:Props){return <>
<AudioControls playing={playing} slow={slow} onReplay={()=>setPlaying(true)} onTogglePlay={()=>setPlaying(p=>!p)} onToggleSpeed={()=>setSlow(s=>!s)}/>
{!feedback&&!inputMode&&<ChoiceAnswers options={listeningOptions} choice={choice} onChoose={onChoose} lang="en"/>}
</>;}
