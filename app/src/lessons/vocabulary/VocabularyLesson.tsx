import ChoiceAnswers from '../components/ChoiceAnswers';
import { vocabularyOptions } from './vocabulary.mock';
import './VocabularyLesson.css';
export interface VocabularyLessonProps { feedback:boolean; inputMode:boolean; choice:string|null; onChoose:(word:string)=>void; }
export default function VocabularyLesson({feedback,inputMode,choice,onChoose}:VocabularyLessonProps){return <>
<div className="mal-question-card"><span>I go to school.</span><p lang="ko">저는 <span className={feedback?'filled':''}>{feedback?'학교':'　　'}</span>에 가요.</p></div>
 {!feedback&&!inputMode&&<ChoiceAnswers options={vocabularyOptions} choice={choice} onChoose={onChoose}/>}
 </>;}
