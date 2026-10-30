import type { Dispatch, SetStateAction } from 'react';
import AudioControls from '../components/AudioControls';
import ChoiceAnswers from '../components/ChoiceAnswers';
import RetryNote from '../components/RetryNote';
import type { ContextQuestion } from '../types';
import type { ListeningMode } from './listening.mock';
import './ListeningLesson.css';
interface Props { mode:ListeningMode;question:ContextQuestion;feedback:boolean;playing:boolean;slow:boolean;choice:string|null;onChoose:(meaning:string)=>void;setPlaying:Dispatch<SetStateAction<boolean>>;setSlow:Dispatch<SetStateAction<boolean>>;wrongAttempts:number;tried:readonly string[]; }
export default function ListeningLesson({mode,question,feedback,playing,slow,choice,onChoose,setPlaying,setSlow,wrongAttempts,tried}:Props){return <>
<AudioControls playing={playing} slow={slow} onReplay={()=>setPlaying(true)} onTogglePlay={()=>setPlaying(p=>!p)} onToggleSpeed={()=>setSlow(s=>!s)}/>
{!feedback&&<RetryNote attempt={wrongAttempts}/>}
{!feedback&&mode==='context'&&<ChoiceAnswers options={question.options} choice={choice} onChoose={onChoose} lang="en" tried={tried}/>}
</>;}
