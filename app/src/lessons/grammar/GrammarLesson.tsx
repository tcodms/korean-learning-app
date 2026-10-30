import VocabularyLesson, { type VocabularyLessonProps } from '../vocabulary/VocabularyLesson';
import './GrammarLesson.css';
/** Particle fill-in-the-blank. Reuses the vocabulary layout with grammar.mock questions until a grammar UI is designed. */
export default function GrammarLesson(props:VocabularyLessonProps){return <VocabularyLesson {...props}/>;}
