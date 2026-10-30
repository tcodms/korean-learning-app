import type { Dispatch, SetStateAction } from 'react';
import AudioControls from '../components/AudioControls';
import WordCards from '../components/WordCards';
import { listeningWordBank } from './listening.mock';
import './ListeningLesson.css';
interface Props { feedback:boolean;inputMode:boolean;playing:boolean;slow:boolean;cards:string[];setPlaying:Dispatch<SetStateAction<boolean>>;setSlow:Dispatch<SetStateAction<boolean>>;setCards:Dispatch<SetStateAction<string[]>>; }
export default function ListeningLesson({feedback,inputMode,playing,slow,cards,setPlaying,setSlow,setCards}:Props){return <>
<AudioControls playing={playing} slow={slow} onReplay={()=>setPlaying(true)} onTogglePlay={()=>setPlaying(p=>!p)} onToggleSpeed={()=>setSlow(s=>!s)}/>
{!feedback&&!inputMode&&<WordCards cards={cards} bank={listeningWordBank} onRemove={i=>setCards(c=>c.filter((_,n)=>n!==i))} onAdd={word=>setCards(c=>[...c,word])}/>}
</>;}
