import type { Ref } from 'react';
import { KeyboardInput } from '../../mobile';
interface Props {typed:string;onChange:(value:string)=>void;onBlur:()=>void;ref?:Ref<HTMLInputElement>;}
export default function AnswerInput({typed,onChange,onBlur,ref}:Props){return (<div className="mal-input-wrap"><label htmlFor="mal-answer">Your answer</label><KeyboardInput ref={ref} id="mal-answer" value={typed} onChange={e=>onChange(e.target.value)} onBlur={()=>onBlur()} placeholder="한국어로 입력하세요" autoComplete="off" lang="ko"/></div>);}
