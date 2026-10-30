import { BookOpen, Headphones, TextAlignLeft, ChatCircleDots } from '@phosphor-icons/react';
import type { Skill } from '../types/learning';
// Sample progress values for the UI preview, not persisted learning records.
export const skills = [
  { id:'vocabulary' as Skill, name:'Vocabulary', icon:BookOpen, description:'Words you’ll use every day.', progress:'2 of 5' },
  { id:'listening' as Skill, name:'Listening', icon:Headphones, description:'Hear it. Understand it.', progress:'0 of 5' },
  { id:'grammar' as Skill, name:'Grammar', icon:TextAlignLeft, description:'Build your next sentence.', progress:'1 of 5' },
  { id:'expressions' as Skill, name:'Expressions', icon:ChatCircleDots, description:'The right words for the moment.', progress:'0 of 5' },
];
