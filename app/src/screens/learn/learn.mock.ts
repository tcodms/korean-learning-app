import { GlobeHemisphereWest, ForkKnife, Bag, Bus } from '@phosphor-icons/react';
import type { Skill } from '../../shared/types/learning';

export const topics = [
  { id: 'everyday', name: 'Everyday life', description: 'Little moments, useful Korean.', icon: GlobeHemisphereWest, phrase: '안녕하세요', meaning: 'Hello', words: ['안녕하세요', '이름', '친구'] },
  { id: 'food', name: 'Food & ordering', description: 'From your first coffee to dinner.', icon: ForkKnife, phrase: '물 좀 주세요', meaning: 'Please give me some water', words: ['물', '주세요', '커피'] },
  { id: 'shopping', name: 'Shopping', description: 'Find it. Ask for it. Make it yours.', icon: Bag, phrase: '얼마예요?', meaning: 'How much is it?', words: ['얼마', '가방', '주세요'] },
  { id: 'transport', name: 'Getting around', description: 'A little Korean for the journey.', icon: Bus, phrase: '어디에 있어요?', meaning: 'Where is it?', words: ['어디', '역', '버스'] },
] as const;
export type TopicId = typeof topics[number]['id'];
export const stages = ['First steps', 'Everyday use', 'A little further'] as const;
const titles: Record<Skill, string[]> = {
  vocabulary: ['Meet the words', 'A word in context', 'Make connections', 'Choose your words', 'A little more detail', 'Put it all together'],
  listening: ['Catch the sounds', 'Hear the key word', 'Follow a sentence', 'Listen for meaning', 'A short exchange', 'Hear the whole picture'],
  grammar: ['Build a little sentence', 'Find the right particle', 'Make it a question', 'Connect your ideas', 'Change the ending', 'Build it your way'],
  expressions: ['Your first expression', 'Say it naturally', 'Pick the right moment', 'Keep it polite', 'A little more feeling', 'Make it your own'],
};
export interface LessonSummary {
  id: string; area: Skill; topic: TopicId; title: string; stage: number;
  questions: number; minutes: number; status: 'complete' | 'started' | 'new';
}
export function getLessons(area: Skill, topic: TopicId): LessonSummary[] {
  return titles[area].map((title, i) => ({
    id: `${area}-${topic}-${i}`, area, topic, title, stage: Math.floor(i / 2),
    questions: 5, minutes: 3, status: i === 0 ? 'complete' : i === 1 ? 'started' : 'new',
  }));
}
