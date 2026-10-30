import { CaretLeft, Check } from '@phosphor-icons/react';

import { useState } from 'react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import './DailySkillsScreen.css';
interface Props { selected:Skill[]; onExit:()=>void; onComplete:(selected:Skill[])=>void; }
export default function DailySkillsScreen({selected,onExit,onComplete}:Props){
 const [draft,setDraft]=useState<Skill[]>(selected);
 const {bottomInset}=useKeyboardInsets();
 return <><MobileScroll className="mal-scroll"><main className="mal-content mal-skills">

          <header className="mal-topbar"><button className="mal-icon-button" aria-label="Back to Today" onClick={()=>onExit()}><CaretLeft size={23}/></button><span className="mal-small-wordmark">MAL</span><span className="mal-step">3 of 4</span></header>
          <div className="mal-onboarding-progress" aria-hidden="true"><i/><i/><i/><i className="muted"/></div>
          <section className="mal-skills-title"><span className="mal-eyebrow">YOUR DAILY LITTLE HABIT</span><h1>What will you<br/>learn each day?</h1><p>Pick what you love.<br/>We’ll make a little room for it.</p></section>
          <div className="mal-skill-grid">{skills.map(s=>{const checked=draft.includes(s.id);return <button className={`mal-skill-card ${checked?'selected':''}`} key={s.id} aria-pressed={checked} onClick={()=>setDraft(d=>checked?d.filter(id=>id!==s.id):[...d,s.id])}><span className="mal-card-check">{checked&&<Check size={14} weight="bold"/>}</span><s.icon size={34} weight={s.id==='vocabulary'||s.id==='expressions'?'fill':'regular'}/><strong>{s.name}</strong><span>{s.description}</span></button>;})}</div>
          <p className="mal-selection-caption" aria-live="polite">{draft.length?`${draft.length} ${draft.length===1?'skill':'skills'} selected. A little progress, your way.`:'Choose at least one skill to continue.'}</p>

        
 </main></MobileScroll><footer className="mal-fixed-footer" style={{bottom:bottomInset}}><Action disabled={!draft.length} onClick={()=>onComplete(draft)}>Continue</Action></footer></>;
}
