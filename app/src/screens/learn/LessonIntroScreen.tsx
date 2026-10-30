import { CaretLeft, Clock, Stack, Check, Sparkle } from '@phosphor-icons/react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import { skills } from '../../shared/data/skills';
import { topics, stages, type LessonSummary } from './learn.mock';
import './learn.css';

interface Props { lesson: LessonSummary; onBack: () => void; onStart: () => void; }
export default function LessonIntroScreen({ lesson, onBack, onStart }: Props) {
  const { bottomInset } = useKeyboardInsets();
  const topic = topics.find(t => t.id === lesson.topic)!;
  const skill = skills.find(s => s.id === lesson.area)!;
  const objectives = {
    vocabulary: ['Recognize useful everyday words', 'Choose a word that fits the context', 'Try it in a short sentence'],
    listening: ['Listen for familiar sounds', 'Catch the key words', 'Arrange what you hear'],
    grammar: ['Notice a useful sentence pattern', 'Choose the right form', 'Build a short sentence'],
    expressions: ['Recognize the situation', 'Choose a natural expression', 'Find the right tone'],
  };
  return <>
    <MobileScroll className="mal-scroll"><main className="mal-content mal-learn-intro">
      <header className="mal-learn-topbar"><button className="mal-icon-button" aria-label="Back to lessons" onClick={onBack}><CaretLeft size={23} /></button><span>Lesson preview</span><skill.icon size={21} /></header>
      <section className="mal-learn-intro-title"><span className="mal-learn-eyebrow">{skill.name.toUpperCase()} · {stages[lesson.stage].toUpperCase()}</span><h1>{lesson.title}</h1><p>{topic.name} · Korean for a little real life.</p></section>
      <div className="mal-learn-intro-meta"><span><Stack size={17} />{lesson.questions} questions</span><span><Clock size={17} />About {lesson.minutes} min</span></div>
      <section className="mal-learn-phrase"><span><Sparkle size={14} />A LITTLE TASTE</span><p lang="ko">{topic.phrase}</p><small>{topic.meaning}</small></section>
      <section className="mal-learn-section"><h2>What you’ll practise</h2><ul className="mal-learn-objectives">{objectives[lesson.area].map(text => <li key={text}><Check size={15} weight="bold" />{text}</li>)}</ul></section>
      <section className="mal-learn-section"><h2>A few words to meet</h2><div className="mal-learn-word-tags">{topic.words.map(word => <span key={word} lang="ko">{word}</span>)}</div></section>
      <p className="mal-learn-sample">Catalog preview · Start opens the current sample lesson.<br />Topic-specific questions will be added later.</p>
    </main></MobileScroll>
    <footer className="mal-fixed-footer mal-learn-footer" style={{ bottom: bottomInset }}><Action onClick={onStart}>{lesson.status === 'complete' ? 'Practise again' : 'Start lesson'}</Action></footer>
  </>;
}
