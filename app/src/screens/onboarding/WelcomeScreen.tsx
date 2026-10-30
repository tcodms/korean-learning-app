import { BookOpen, Headphones, ChatCircleDots, Sparkle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Mascot from '../../shared/components/Mascot';
import Action from '../../shared/components/Action';
import './WelcomeScreen.css';

interface Props { onStart: () => void; }

export default function WelcomeScreen({ onStart }: Props) {
  const [greeting, setGreeting] = useState(false);
  useEffect(() => {
    if (!greeting) return;
    const timer = window.setTimeout(() => setGreeting(false), 1900);
    return () => window.clearTimeout(timer);
  }, [greeting]);
  return (
    <main className="mal-welcome">
      <div className="mal-welcome-top">
        <span className="mal-welcome-wordmark">MAL</span>
        <span className="mal-welcome-tag"><Sparkle size={12} weight="fill" />Made for little wins</span>
      </div>
      <div className="mal-welcome-hero">
        <div className="mal-welcome-stage">
          <span className="mal-welcome-orbit" aria-hidden="true" />
          <span className="mal-welcome-tile tile-one" lang="ko" aria-hidden="true">안녕!</span>
          <span className="mal-welcome-tile tile-two" lang="ko" aria-hidden="true">가</span>
          <span className="mal-welcome-spark" aria-hidden="true">✦</span>
          <button className="mal-welcome-mascot" aria-label="Say hello to MAL" onClick={() => setGreeting(true)}>
            <Mascot reading active={greeting} />
          </button>
        </div>
        <div className="mal-welcome-copy">
          <h1>A little Korean,<br /><span>every day.</span></h1>
          <p>Words, sentences, and listening —<br />one small step at a time.</p>
        </div>
        <div className="mal-welcome-features" aria-label="Learn with MAL">
          <span><BookOpen size={18} />Words</span>
          <span><Headphones size={18} />Listen</span>
          <span><ChatCircleDots size={18} />Express</span>
        </div>
      </div>
      <footer className="mal-welcome-footer">
        <Action onClick={onStart}>
          Let’s get started
        </Action>
        <p className="mal-welcome-note">No account needed to explore.</p>
      </footer>
    </main>
  );
}
