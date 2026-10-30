import { CaretRight, Sparkle } from '@phosphor-icons/react';
import { MobileScroll } from '../../mobile';
import BottomNavigation from '../../shared/components/BottomNavigation';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import { topics, type TopicId } from './learn.mock';
import './learn.css';

interface Props {
  area: Skill; onAreaChange: (area: Skill) => void; onTopic: (topic: TopicId) => void;
  onHome: () => void; onReview: () => void; onProgress: () => void;
}
export default function LearnScreen({ area, onAreaChange, onTopic, onHome, onReview, onProgress }: Props) {
  return <>
    <MobileScroll className="mal-scroll"><main className="mal-content mal-learn">
      <header className="mal-learn-heading"><h1>Learn</h1><span><Sparkle size={13} weight="fill" />Your pace. Your way.</span></header>
      <section className="mal-learn-hero"><span className="mal-learn-eyebrow">FOLLOW YOUR CURIOSITY</span><h2>A little Korean<br />for your world.</h2><p>Pick a skill, then a slice of everyday life.</p><span className="mal-learn-hangul" lang="ko" aria-hidden="true">가</span></section>
      <section className="mal-learn-section"><h2>What feels good today?</h2><div className="mal-learn-areas">{skills.map(s => <button key={s.id} aria-pressed={area === s.id} onClick={() => onAreaChange(s.id)}><s.icon size={26} /><strong>{s.name}</strong><small>{s.description}</small></button>)}</div></section>
      <section className="mal-learn-section"><h2>Make it everyday</h2><p className="mal-learn-muted">Choose a topic to explore.</p><div className="mal-learn-topics">{topics.map(topic => <button key={topic.id} onClick={() => onTopic(topic.id)}><span className="mal-learn-topic-icon"><topic.icon size={24} /></span><span><strong>{topic.name}</strong><small>{topic.description}</small></span><CaretRight size={19} /></button>)}</div></section>
      <p className="mal-learn-sample">Sample catalog · Progress is for preview only.</p>
    </main></MobileScroll>
    <BottomNavigation active="learn" onToday={onHome} onLearn={() => {}} onReview={onReview} onProgress={onProgress} />
  </>;
}
