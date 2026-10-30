import { CaretLeft, CaretRight, Check, Play, Clock } from '@phosphor-icons/react';
import { MobileScroll } from '../../mobile';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import { getLessons, stages, topics, type TopicId, type LessonSummary } from './learn.mock';
import './learn.css';

interface Props { area: Skill; topic: TopicId; onBack: () => void; onLesson: (lesson: LessonSummary) => void; }
export default function LessonListScreen({ area, topic, onBack, onLesson }: Props) {
  const selectedTopic = topics.find(t => t.id === topic)!;
  const skill = skills.find(s => s.id === area)!;
  const lessons = getLessons(area, topic);
  return <MobileScroll className="mal-scroll"><main className="mal-content mal-lesson-list">
    <header className="mal-learn-topbar"><button className="mal-icon-button" aria-label="Back to Learn" onClick={onBack}><CaretLeft size={23} /></button><span>{skill.name}</span><span className="mal-learn-pill">6 lessons</span></header>
    <section className="mal-learn-list-title"><span className="mal-learn-topic-icon"><selectedTopic.icon size={28} /></span><h1>{selectedTopic.name}</h1><p>{selectedTopic.description}</p><div className="mal-learn-progress"><span /></div><small>Sample progress · 1 of 6 complete</small></section>
    {stages.map((stage, index) => <section className="mal-learn-stage" key={stage}><div className="mal-learn-stage-title"><span>0{index + 1}</span><h2>{stage}</h2></div><div>{lessons.filter(l => l.stage === index).map(lesson => <button className={`mal-learn-lesson ${lesson.status}`} key={lesson.id} onClick={() => onLesson(lesson)}><span className="mal-learn-lesson-symbol">{lesson.status === 'complete' ? <Check size={21} weight="bold" /> : lesson.status === 'started' ? <Play size={20} weight="fill" /> : <skill.icon size={21} />}</span><span><strong>{lesson.title}</strong><small><Clock size={12} />{lesson.minutes} min · {lesson.questions} questions</small></span><span className="mal-learn-lesson-end">{lesson.status === 'started' && <small>Try next</small>}<CaretRight size={17} /></span></button>)}</div></section>)}
    <p className="mal-learn-sample">Explore any lesson. No locked steps.</p>
  </main></MobileScroll>;
}
