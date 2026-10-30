import { CaretLeft, Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import './DailySkillsScreen.css';
import './LanguageScreen.css';
import './onboarding.css';

const LANGUAGES = [
  { id: 'english', label: 'English', native: 'English', soon: false },
  { id: 'japanese', label: 'Japanese', native: '日本語', soon: true },
  { id: 'chinese', label: 'Chinese', native: '中文', soon: true },
  { id: 'spanish', label: 'Spanish', native: 'Español', soon: true },
] as const;

interface Props {
  onBack: () => void;
  onNext: (language: string) => void;
}

export default function LanguageScreen({ onBack, onNext }: Props) {
  const [selected, setSelected] = useState('english');
  const { bottomInset } = useKeyboardInsets();

  return <>
    <MobileScroll className="mal-scroll">
      <main className="mal-content mal-onb-screen">
        <header className="mal-topbar">
          <button className="mal-icon-button" aria-label="Back" onClick={onBack}><CaretLeft size={23} /></button>
          <span className="mal-small-wordmark">MAL</span>
          <span className="mal-step">1 of 4</span>
        </header>
        <div className="mal-onboarding-progress" aria-hidden="true">
          <i /><i className="muted" /><i className="muted" /><i className="muted" />
        </div>
        <section className="mal-onb-title">
          <span className="mal-eyebrow">EXPLANATION LANGUAGE</span>
          <h1>How would you<br />like us to explain?</h1>
          <p>Choose the language for hints<br />and instructions.</p>
        </section>
        <div className="mal-lang-list">
          {LANGUAGES.map(lang => {
            const isSelected = selected === lang.id && !lang.soon;
            return (
              <button
                key={lang.id}
                className={`mal-lang-row${isSelected ? ' selected' : ''}${lang.soon ? ' soon' : ''}`}
                disabled={lang.soon}
                onClick={() => !lang.soon && setSelected(lang.id)}
                aria-pressed={isSelected}
              >
                <span className="mal-lang-glyph" aria-hidden="true">{{english:'EN',japanese:'JA',chinese:'ZH',spanish:'ES'}[lang.id]}</span>
                <span className="mal-lang-label">{lang.label}</span>
                {lang.native !== lang.label && <span className="mal-lang-native">{lang.native}</span>}
                {lang.soon
                  ? <span className="mal-lang-badge">Soon</span>
                  : <span className="mal-lang-check">{isSelected && <Check size={13} weight="bold" />}</span>
                }
              </button>
            );
          })}
        </div>
        <p className="mal-onb-note">More languages are coming soon.</p>
      </main>
    </MobileScroll>
    <footer className="mal-fixed-footer mal-onb-footer" style={{ bottom: bottomInset }}>
      <Action onClick={() => onNext(selected)}>Continue</Action>
    </footer>
  </>;
}
