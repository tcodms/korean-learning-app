import { KeyboardInput } from '../../mobile';
interface Props {typed:string;onChange:(value:string)=>void;onBlur:()=>void;}
export default function AnswerInput({typed,onChange,onBlur}:Props){return (<div className="mal-input-wrap"><label htmlFor="mal-answer">Your answer</label><KeyboardInput id="mal-answer" value={typed} onChange={e=>onChange(e.target.value)} onBlur={()=>onBlur()} placeholder="한국어로 입력하세요" autoComplete="off" lang="ko"/></div>);}
