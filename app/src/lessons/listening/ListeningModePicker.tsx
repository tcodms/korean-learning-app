import { CaretRight, ChatsCircle, PencilSimpleLine } from '@phosphor-icons/react';
import type { ListeningMode } from './listening.mock';
import './ListeningLesson.css';
const modes = [
  { id:'context' as ListeningMode, icon:ChatsCircle, name:'맥락 맞추기', label:'Meaning in context', description:'Hear a sentence and choose what it means.' },
  { id:'dictation' as ListeningMode, icon:PencilSimpleLine, name:'받아쓰기', label:'Dictation', description:'Hear a sentence and write it in Korean.' },
];
export default function ListeningModePicker({onPick}:{onPick:(mode:ListeningMode)=>void}){return (
<div className="mal-listening-modes">{modes.map(m=><button key={m.id} onClick={()=>onPick(m.id)}><span className="mal-listening-mode-icon"><m.icon size={24}/></span><span className="mal-listening-mode-text"><strong lang="ko">{m.name}</strong><small>{m.label}</small><span>{m.description}</span></span><CaretRight size={18}/></button>)}</div>);}
