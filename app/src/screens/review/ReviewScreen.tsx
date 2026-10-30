import { BookmarkSimple, ArrowCounterClockwise, CaretRight, Sparkle, BookOpen } from '@phosphor-icons/react';
import { MobileScroll } from '../../mobile';
import Action from '../../shared/components/Action';
import BottomNavigation from '../../shared/components/BottomNavigation';
import { skills } from '../../shared/data/skills';
import { studyItems, type ReviewTab, type ReviewCategory, type StudyItem } from './review.mock';
import './review.css';

interface Props {
  savedIds: string[]; tab: ReviewTab; filter: ReviewCategory | 'all';
  onTabChange: (tab: ReviewTab) => void; onFilterChange: (filter: ReviewCategory | 'all') => void;
  onItem: (item: StudyItem) => void; onSave: (id: string) => void; onPractice: (category: ReviewCategory) => void;
  onHome: () => void; onLearn: () => void; onProgress: () => void;
}

export default function ReviewScreen({ savedIds, tab, filter, onTabChange, onFilterChange, onItem, onSave, onPractice, onHome, onLearn, onProgress }: Props) {
  const items = studyItems.filter(item => (tab === 'due' || savedIds.includes(item.id)) && (filter === 'all' || filter === item.category));
  return <>
    <MobileScroll className="mal-scroll"><main className="mal-content mal-review-page">
      <header className="mal-review-heading"><h1>Review</h1><span><Sparkle size={13} weight="fill" />Keep a little with you</span></header>
      <section className="mal-review-hero"><span className="mal-review-eyebrow">A LITTLE REFRESH</span><h2>Make familiar<br />feel effortless.</h2><p>A few words. A useful pattern.<br />A little more confidence.</p><span className="mal-review-hero-symbol" aria-hidden="true"><ArrowCounterClockwise size={47} /></span></section>
      <div className="mal-review-tabs" role="group" aria-label="Study collection"><button aria-pressed={tab === 'due'} onClick={() => onTabChange('due')}><ArrowCounterClockwise size={16} />To review <span>{studyItems.length}</span></button><button aria-pressed={tab === 'saved'} onClick={() => onTabChange('saved')}><BookmarkSimple size={16} />Saved <span>{savedIds.length}</span></button></div>
      <div className="mal-review-filters" role="group" aria-label="Filter study items"><button aria-pressed={filter === 'all'} onClick={() => onFilterChange('all')}>All</button>{skills.filter(s => s.id !== 'listening').map(s => <button key={s.id} aria-pressed={filter === s.id} onClick={() => onFilterChange(s.id as ReviewCategory)}>{s.id === 'vocabulary' ? 'Words' : s.name}</button>)}</div>
      <div className="mal-review-list-heading"><h2>{tab === 'due' ? 'Ready for another look' : 'Your little collection'}</h2><span>{items.length} items</span></div>
      {items.length ? <>
        <div className="mal-review-item-list">{items.map(item => {
          const skill = skills.find(s => s.id === item.category)!;
          const saved = savedIds.includes(item.id);
          return <article className="mal-review-item" key={item.id}><button className="mal-review-item-open" onClick={() => onItem(item)}><span className="mal-review-item-icon"><skill.icon size={22} /></span><span><small>{skill.name}</small><strong lang="ko">{item.korean}</strong><span>{item.meaning}</span></span><CaretRight size={17} /></button><button className={`mal-review-save ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${item.korean}`} aria-pressed={saved} onClick={() => onSave(item.id)}><BookmarkSimple size={20} weight={saved ? 'fill' : 'regular'} /></button></article>;
        })}</div>
        <div className="mal-review-practice"><Action onClick={() => onPractice(items[0].category)}>Practise a sample</Action><p>Opens the current sample question for this skill.</p></div>
      </> : <section className="mal-review-empty"><BookOpen size={35} /><h2>{tab === 'saved' ? 'Room for a little favourite.' : 'Nothing here just yet.'}</h2><p>{tab === 'saved' ? 'Tap a bookmark on any study note to keep it here.' : 'Choose another filter to find your study notes.'}</p><button onClick={() => { onFilterChange('all'); onTabChange('due'); }}>Explore review notes <CaretRight size={15} /></button></section>}
      <p className="mal-review-sample">Sample collection · Saves last until refresh.<br />No live review scheduling is connected.</p>
    </main></MobileScroll>
    <BottomNavigation active="review" onToday={onHome} onLearn={onLearn} onReview={() => {}} onProgress={onProgress} />
  </>;
}
