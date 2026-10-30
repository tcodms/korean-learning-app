export type Skill = 'vocabulary' | 'listening' | 'grammar' | 'expressions';
export type Screen =
  | 'welcome' | 'language' | 'level' | 'goals'
  | 'today' | 'skills' | 'course' | 'lesson' | 'result';
/** UI-only boundary between the app flow and lesson workspaces. */
export interface LessonPreviewProps {
  area: Skill;
  onExit: () => void;
  onComplete: () => void;
}
