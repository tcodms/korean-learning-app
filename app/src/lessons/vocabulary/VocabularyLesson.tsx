import ChoiceAnswers from '../components/ChoiceAnswers';
import { vocabularyOptions, vocabularyPrompt } from './vocabulary.mock';
import './VocabularyLesson.css';
const keywordAt=vocabularyPrompt.text.indexOf(vocabularyPrompt.keyword);
const promptBefore=vocabularyPrompt.text.slice(0,keywordAt),promptAfter=vocabularyPrompt.text.slice(keywordAt+vocabularyPrompt.keyword.length);
export interface VocabularyLessonProps { feedback:boolean; inputMode:boolean; choice:string|null; onChoose:(word:string)=>void; }
export default function VocabularyLesson({feedback,inputMode,choice,onChoose}:VocabularyLessonProps){return <>
<div className="mal-question-card"><span>{promptBefore}<strong className="mal-keyword">{vocabularyPrompt.keyword}</strong>{promptAfter}</span><p lang="ko">저는 <span className={feedback?'filled':''}>{feedback?'학교':'　　'}</span>에 가요.</p></div>
 {!feedback&&!inputMode&&<ChoiceAnswers options={vocabularyOptions} choice={choice} onChoose={onChoose}/>}
 </>;}
