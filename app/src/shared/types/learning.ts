export type Skill = 'vocabulary' | 'listening' | 'grammar' | 'expressions';
export type Screen = 'today' | 'skills' | 'course' | 'lesson';
/** UI-only boundary between the app flow and lesson workspaces. */
export interface LessonPreviewProps {
  area: Skill;
  onExit: () => void;
  onComplete: () => void;
}
