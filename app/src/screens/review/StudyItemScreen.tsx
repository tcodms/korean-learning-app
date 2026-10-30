import { CaretLeft, BookmarkSimple, Lightbulb, ArrowRight } from '@phosphor-icons/react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import { skills } from '../../shared/data/skills';
import type { StudyItem } from './review.mock';
import './review.css';

interface Props { item: StudyItem; saved: boolean; onBack: () => void; onSave: () => void; onPractice: () => void; }
export default function StudyItemScreen({ item, saved, onBack, onSave, onPractice }: Props) {
  const { bottomInset } = useKeyboardInsets();
  const skill = skills.find(s => s.id === item.category)!;
  return <>
    <MobileScroll className="mal-scroll"><main className="mal-content mal-study-detail">
      <header className="mal-study-topbar"><button className="mal-icon-button" aria-label="Back to review" onClick={onBack}><CaretLeft size={23} /></button><span>Study note</span><button className={`mal-review-save ${saved ? 'saved' : ''}`} aria-label={saved ? 'Unsave this note' : 'Save this note'} aria-pressed={saved} onClick={onSave}><BookmarkSimple size={22} weight={saved ? 'fill' : 'regular'} /></button></header>
      <section className="mal-study-hero"><span className="mal-study-category"><skill.icon size={15} />{skill.name}</span><h1 lang="ko">{item.korean}</h1><p>{item.meaning}</p><small>{item.tag}</small></section>
      {item.pattern && <div className="mal-study-pattern"><span>THE PATTERN</span><strong>{item.pattern}</strong></div>}
      <section className="mal-study-section"><h2>{item.category === 'grammar' ? 'How it works' : item.category === 'expressions' ? 'When to use it' : 'A little meaning'}</h2><p>{item.explanation}</p></section>
      <section className="mal-study-section"><h2>See it in a sentence</h2><div className="mal-study-examples">{item.examples.map(example => <article key={example.korean}><p lang="ko">{example.korean}</p><span>{example.translation}</span></article>)}</div></section>
      <aside className="mal-study-tip"><Lightbulb size={20} /><div><strong>A little tip</strong><p>{item.note}</p></div></aside>
      <button className="mal-study-collection" onClick={onSave}><BookmarkSimple size={18} weight={saved ? 'fill' : 'regular'} /><span>{saved ? 'Kept in your collection' : 'Keep this for later'}</span><ArrowRight size={16} /></button>
      <p className="mal-review-sample">Sample study note · Practice opens a skill preview.</p>
    </main></MobileScroll>
    <footer className="mal-fixed-footer mal-study-footer" style={{ bottom: bottomInset }}><Action onClick={onPractice}>Practise this skill</Action></footer>
  </>;
}
