import { CaretLeft, Sparkle, GlobeHemisphereWest, ForkKnife, Bag, Bus, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import './DailySkillsScreen.css';
import './GoalsScreen.css';
import './onboarding.css';

const TOPICS = ['Everyday', 'Food', 'Shopping', 'Transport'] as const;
const TOPIC_ICONS = [GlobeHemisphereWest, ForkKnife, Bag, Bus];
const GOALS = [5, 10, 15] as const;
export type GoalCount = typeof GOALS[number];

interface Props {
  selectedSkills: Skill[];
  onBack: () => void;
  onSkip: () => void;
  onComplete: (topics: string[], goal: GoalCount) => void;
}

export default function GoalsScreen({ selectedSkills, onBack, onSkip, onComplete }: Props) {
  const [topics, setTopics] = useState<string[]>(['Everyday']);
  const [goal, setGoal] = useState<GoalCount>(10);
  const { bottomInset } = useKeyboardInsets();

  const chosen = skills.filter(s => selectedSkills.includes(s.id));

  function toggleTopic(t: string) {
    setTopics(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  }

  return <>
    <MobileScroll className="mal-scroll">
      <main className="mal-content mal-onb-screen">
        <header className="mal-topbar">
          <button className="mal-icon-button" aria-label="Back" onClick={onBack}><CaretLeft size={23} /></button>
          <span className="mal-small-wordmark">MAL</span>
          <span className="mal-step">4 of 4</span>
          <button className="mal-skip-button" onClick={onSkip}>Skip</button>
        </header>
        <div className="mal-onboarding-progress" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <section className="mal-onb-title">
          <span className="mal-eyebrow">ALMOST THERE</span>
          <h1>A little more<br />about you.</h1>
          <p>Helps us shape your daily course.<br />You can change these later.</p>
        </section>

        {/* Selected skills summary */}
        <div className="mal-goals-skills-summary">
          {chosen.map(s => (
            <span key={s.id} className="mal-goals-skill-tag">
              <s.icon size={13} weight={s.id === 'vocabulary' || s.id === 'expressions' ? 'fill' : 'regular'} />
              {s.name}
            </span>
          ))}
        </div>

        {/* Topics */}
        <section className="mal-goals-section">
          <h2>Topics you're into</h2>
          <div className="mal-topic-chips">
            {TOPICS.map((t, index) => {
              const TopicIcon = TOPIC_ICONS[index];
              return (
              <button
                key={t}
                className={`mal-topic-chip${topics.includes(t) ? ' selected' : ''}`}
                onClick={() => toggleTopic(t)}
                aria-pressed={topics.includes(t)}
              >
                <TopicIcon size={17} />{t}{topics.includes(t) && <Check size={12} weight="bold" />}
              </button>
            );})}
          </div>
        </section>

        {/* Daily goal */}
        <section className="mal-goals-section">
          <h2>Daily question goal</h2>
          <p className="mal-goals-hint">10 questions takes about 5–8 min.</p>
          <div className="mal-goal-options">
            {GOALS.map(g => (
              <button
                key={g}
                className={`mal-goal-option${goal === g ? ' selected' : ''}`}
                onClick={() => setGoal(g)}
                aria-pressed={goal === g}
              >
                {g === 10 && <small className="mal-goal-recommended"><Sparkle size={10} weight="fill" />Sweet spot</small>}
                <strong>{g}</strong>
                <span>questions</span>
                <small className="mal-goal-time">{g === 5 ? '~ 3 min' : g === 10 ? '~ 5 min' : '~ 8 min'}</small>
              </button>
            ))}
          </div>
        </section>

        <p className="mal-onb-note">
          Skipping sets topic and goal to defaults. Your skill choices stay as picked.
        </p>
      </main>
    </MobileScroll>
    <footer className="mal-fixed-footer mal-onb-footer" style={{ bottom: bottomInset }}>
      <Action onClick={() => onComplete(topics, goal)}>All set, let's go!</Action>
    </footer>
  </>;
}
