import { CaretLeft, Clock, Stack, Sparkle } from '@phosphor-icons/react';
import { MobileScroll, useKeyboardInsets } from '../../mobile';
import Action from '../../shared/components/Action';
import Mascot from '../../shared/components/Mascot';
import { skills } from '../../shared/data/skills';
import type { Skill } from '../../shared/types/learning';
import './CourseIntroScreen.css';

interface Props {
  selected: Skill[];
  onExit: () => void;
  onEdit: () => void;
  onStart: (area: Skill) => void;
}

export default function CourseIntroScreen({ selected, onExit, onEdit, onStart }: Props) {
  const { bottomInset } = useKeyboardInsets();
  const course = skills.filter(skill => selected.includes(skill.id));
  const total = 10;

  return <>
    <MobileScroll className="mal-scroll">
      <main className="mal-content mal-course">
        <header className="mal-course-header">
          <button className="mal-icon-button" aria-label="Back to Today" onClick={onExit}><CaretLeft size={23} /></button>
          <span>Today’s course</span>
          <button className="mal-course-edit" onClick={onEdit}>Edit</button>
        </header>
        <section className="mal-course-hero">
          <span className="mal-course-eyebrow"><Sparkle size={14} weight="fill" /> ONE LITTLE STEP</span>
          <h1>A little plan.<br />A little progress.</h1>
          <p>Your picks. Your pace.<br />Let’s make room for a little Korean.</p>
          <div className="mal-course-buddy"><Mascot reading /></div>
        </section>
        <div className="mal-course-summary">
          <span><Stack size={18} />{total} questions</span>
          <span><Clock size={18} />About 5 min</span>
        </div>
        <section className="mal-course-plan">
          <h2>Your little learning path</h2>
          <p>Only the skills you chose, one step at a time.</p>
          <ol>
            {course.map((skill, index) => {
              const count = Math.floor(total / course.length) + (index < total % course.length ? 1 : 0);
              return <li key={skill.id}>
                <span className="mal-course-number">{index + 1}</span>
                <div className="mal-course-step">
                  <span className="mal-course-skill-icon"><skill.icon size={23} /></span>
                  <div><h3>{skill.name}</h3><p>{skill.description}</p><small>{count} questions</small></div>
                </div>
              </li>;
            })}
          </ol>
        </section>
        <p className="mal-course-note">A familiar word, something new, then a little practice.</p>
        <p className="mal-course-preview">UI preview · Start opens a sample question.</p>
      </main>
    </MobileScroll>
    <footer className="mal-fixed-footer" style={{ bottom: bottomInset }}>
      <Action disabled={!course.length} onClick={() => course[0] && onStart(course[0].id)}>Let’s begin</Action>
    </footer>
  </>;
}
