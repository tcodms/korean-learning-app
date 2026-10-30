import { CaretLeft, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import './DailySkillsScreen.css';
import './LevelScreen.css';
import './onboarding.css';

const LEVELS = [
  {
    id: 'beginner',
    label: "I can't read Hangul yet",
    sub: "We'll introduce you to the basics first.",
  },
  {
    id: 'reads-hangul',
    label: 'I can read Hangul',
    sub: "You're ready for words and sentences.",
  },
  {
    id: 'knows-sentences',
    label: 'I know some short sentences',
    sub: "Let's build on what you already have.",
  },
] as const;

type Level = typeof LEVELS[number]['id'];

interface Props {
  onBack: () => void;
  onNext: (level: Level) => void;
}

export default function LevelScreen({ onBack, onNext }: Props) {
  const [selected, setSelected] = useState<Level | ''>('');
  const { bottomInset } = useKeyboardInsets();

  return <>
    <MobileScroll className="mal-scroll">
      <main className="mal-content mal-onb-screen">
        <header className="mal-topbar">
          <button className="mal-icon-button" aria-label="Back" onClick={onBack}><CaretLeft size={23} /></button>
          <span className="mal-small-wordmark">MAL</span>
          <span className="mal-step">2 of 4</span>
        </header>
        <div className="mal-onboarding-progress" aria-hidden="true">
          <i /><i /><i className="muted" /><i className="muted" />
        </div>
        <section className="mal-onb-title">
          <span className="mal-eyebrow">YOUR STARTING POINT</span>
          <h1>Where would you<br />like to start?</h1>
          <p>No tests — just pick what feels right.</p>
        </section>
        <div className="mal-level-list">
          {LEVELS.map((level, index) => (
            <button
              key={level.id}
              className={`mal-level-row${selected === level.id ? ' selected' : ''}`}
              onClick={() => setSelected(level.id)}
              aria-pressed={selected === level.id}
            >
              <span className="mal-level-symbol" aria-hidden="true">{['가', '가나', '안녕'][index]}</span>
              <div className="mal-level-text">
                <strong>{level.label}</strong>
                <span>{level.sub}</span>
              </div>
              <span className="mal-level-dot" aria-hidden="true">{selected === level.id && <Check size={12} weight="bold" />}</span>
            </button>
          ))}
        </div>
        {selected === 'beginner' && (
          <p className="mal-onb-warning">
            A dedicated Hangul beginner course is coming soon. For now, we'll start you with our current beginner content.
          </p>
        )}
      </main>
    </MobileScroll>
    <footer className="mal-fixed-footer mal-onb-footer" style={{ bottom: bottomInset }}>
      <Action disabled={!selected} onClick={() => selected && onNext(selected)}>Continue</Action>
    </footer>
  </>;
}
