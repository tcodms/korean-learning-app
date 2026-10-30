export type Skill = 'vocabulary' | 'listening' | 'grammar' | 'expressions';
export type ListeningMode = 'context' | 'dictation';
export type Screen =
  | 'welcome' | 'language' | 'level' | 'goals'
  | 'learn' | 'lesson-list' | 'lesson-intro' | 'review' | 'study-item'
  | 'today' | 'skills' | 'course' | 'lesson' | 'result';
/** UI-only boundary between the app flow and lesson workspaces. */
export interface LessonPreviewProps {
  area: Skill;
  /** Listening practice chosen before the lesson opens. */
  listeningMode?: ListeningMode;
  onExit: () => void;
  onComplete: () => void;
}
