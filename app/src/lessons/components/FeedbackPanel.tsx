import { Check, X } from '@phosphor-icons/react';
import Mascot from '../../shared/components/Mascot';
interface Props {shownCorrect:boolean;answer:string;explanation:string;yourAnswer?:string;}
export default function FeedbackPanel({shownCorrect,answer,explanation,yourAnswer}:Props){return (<section className={`mal-feedback ${shownCorrect?'correct':'try-again'}`} aria-live="polite"><div className="mal-feedback-head"><span className="mal-feedback-symbol">{shownCorrect?<Check size={20} weight="bold"/>:<X size={18} weight="bold"/>}</span><h2>{shownCorrect?'Nice work. 잘했어요!':'Not quite. 다시 해 봐요!'}</h2></div>
{!shownCorrect&&yourAnswer&&<div className="mal-your-answer"><span>Your answer</span><del>{yourAnswer}</del></div>}
{!shownCorrect&&<span className="mal-answer-label">Correct answer</span>}<p className="mal-correct-answer" lang="ko">{answer}</p><p>{explanation}</p><div className="mal-feedback-bottom"><span>{shownCorrect?'One little step forward.':'Mistakes help you remember.'}</span><span className="mal-feedback-buddy"><Mascot active={shownCorrect}/></span></div></section>);}
