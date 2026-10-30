import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
export interface Gloss { word:string; meaning:string; note:string; }
interface Props { gloss:Gloss; open:boolean; onToggle:()=>void; }
const EDGE=8;
/** A tappable Korean word that shows its English meaning in a bubble, kept inside the nearest [data-gloss-bounds]. */
export default function GlossWord({gloss,open,onToggle}:Props){
const id=`mal-gloss-${gloss.word}`,wordRef=useRef<HTMLButtonElement>(null),bubbleRef=useRef<HTMLSpanElement>(null),[shift,setShift]=useState(0);
useLayoutEffect(()=>{const word=wordRef.current,bubble=bubbleRef.current;if(!open||!word||!bubble)return;
  const bounds=(word.closest('[data-gloss-bounds]')??document.body).getBoundingClientRect(),w=word.getBoundingClientRect(),width=bubble.offsetWidth;
  const left=w.left+w.width/2-width/2,clamped=Math.min(Math.max(left,bounds.left+EDGE),bounds.right-EDGE-width);
  setShift(clamped-left);},[open]);
return (
<span className="mal-gloss"><button type="button" ref={wordRef} className="mal-gloss-word" lang="ko" aria-expanded={open} aria-controls={open?id:undefined} onClick={()=>onToggle()}>{gloss.word}</button>{open&&<span className="mal-gloss-bubble" ref={bubbleRef} id={id} role="status" style={{'--gloss-shift':`${shift}px`} as CSSProperties}><span><strong lang="ko">{gloss.word}</strong>{gloss.meaning}</span><small>{gloss.note}</small></span>}</span>);}
