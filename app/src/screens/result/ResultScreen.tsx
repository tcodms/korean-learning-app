import { Check, Clock, Target, Star, ArrowCounterClockwise, CaretRight, X } from '@phosphor-icons/react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import Mascot from '../../shared/components/Mascot';
import { skills } from '../../shared/data/skills';
import type { LearningResult } from './result.mock';
import './ResultScreen.css';

interface Props {
  result: LearningResult;
  onHome: () => void;
  onPracticeAgain: () => void;
  onReview: () => void;
}

const copy = {
  daily: { label: 'Today’s learning', title: <>Your little win.<br />Big steps ahead.</>, subtitle: 'You made room for Korean today.' },
  free: { label: 'Lesson complete', title: <>One lesson closer.<br />Look at you go.</>, subtitle: 'A little curiosity goes a long way.' },
  review: { label: 'Review complete', title: <>A little refresh.<br />A stronger memory.</>, subtitle: 'Familiar words, a little more confidence.' },
};

export default function ResultScreen({ result, onHome, onPracticeAgain, onReview }: Props) {
  const { bottomInset } = useKeyboardInsets();
  const content = copy[result.kind];
  const accuracy = result.answered ? Math.round(result.correct / result.answered * 100) : 0;
  const duration = `${Math.floor(result.seconds / 60)}:${String(result.seconds % 60).padStart(2, '0')}`;

  return <>
    <MobileScroll className="mal-scroll">
      <main className="mal-content mal-result">
        <header className="mal-result-header"><span>{content.label}</span><button className="mal-icon-button" aria-label="Close results" onClick={onHome}><X size={21} /></button></header>
        <section className="mal-result-hero">
          <div className="mal-result-celebration"><Star className="mal-result-star one" size={20} weight="fill" /><Mascot active /><Star className="mal-result-star two" size={14} weight="fill" /></div>
          <h1>{content.title}</h1><p>{content.subtitle}</p>
        </section>
        <section className="mal-result-stats" aria-label="Sample learning results">
          <div><Check size={20} weight="bold" /><strong>{result.answered}</strong><span>Questions</span></div>
          <div><Target size={20} /><strong>{accuracy}%</strong><span>Accuracy</span></div>
          <div><Clock size={20} /><strong>{duration}</strong><span>Time spent</span></div>
        </section>
        <div className="mal-result-areas">{skills.filter(s => result.areas.includes(s.id)).map(s => <span key={s.id}><s.icon size={15} />{s.name}</span>)}</div>
        <section className="mal-result-highlights">
          <h2>A little to take with you</h2>
          <p>A few words from this sample session.</p>
          <div>{result.highlights.map(item => <article key={item.korean}><span lang="ko">{item.korean}</span><span>{item.meaning}</span><Check size={14} /></article>)}</div>
        </section>
        {result.reviewCount > 0 ? <button className="mal-result-review" onClick={onReview}><span className="mal-result-review-icon"><ArrowCounterClockwise size={21} /></span><span><strong>{result.reviewCount} items to revisit</strong><small>A little more practice will help.</small></span><CaretRight size={18} /></button> : <p className="mal-result-clear"><Check size={16} />All clear. You’ve got this!</p>}
        <p className="mal-result-sample">Sample results · No scores or records are saved.</p>
      </main>
    </MobileScroll>
    <footer className="mal-fixed-footer mal-result-footer" style={{ bottom: bottomInset }}><Action onClick={onHome}>Back to Today</Action><button className="mal-result-again" onClick={onPracticeAgain}><ArrowCounterClockwise size={16} />Practice again</button></footer>
  </>;
}
