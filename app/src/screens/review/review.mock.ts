export type ReviewCategory = 'vocabulary' | 'grammar' | 'expressions';
export type ReviewTab = 'due' | 'saved';
export interface StudyItem {
  id: string;
  category: ReviewCategory;
  korean: string;
  meaning: string;
  tag: string;
  explanation: string;
  pattern?: string;
  note: string;
  examples: { korean: string; translation: string }[];
}

// Original sample notes for UI exploration, not a live review schedule.
export const studyItems: StudyItem[] = [
  { id: 'water', category: 'vocabulary', korean: '물', meaning: 'water', tag: 'Food & ordering', explanation: 'A noun for water. Use it with 주세요 to ask for water politely.', note: '좀 can soften a request. 물 좀 주세요 is a useful everyday phrase.', examples: [{ korean: '물 좀 주세요.', translation: 'Please give me some water.' }, { korean: '물을 마셔요.', translation: 'I drink water.' }] },
  { id: 'school', category: 'vocabulary', korean: '학교', meaning: 'school', tag: 'Everyday life', explanation: 'A place where people study. Add 에 when talking about going to school.', note: '학교에 가요 describes going to school. 학교에서 공부해요 describes studying at school.', examples: [{ korean: '학교에 가요.', translation: 'I go to school.' }, { korean: '학교에서 공부해요.', translation: 'I study at school.' }] },
  { id: 'topic', category: 'grammar', korean: '은 / 는', meaning: 'Introducing a topic', tag: 'Sentence building', pattern: 'Noun + 은 / 는', explanation: 'Marks what you are talking about. Use 은 after a consonant and 는 after a vowel. It can also highlight a contrast.', note: '은/는 and 이/가 have different roles. Do not treat them as interchangeable in every sentence.', examples: [{ korean: '저는 학생이에요.', translation: 'I am a student.' }, { korean: '오늘은 날씨가 좋아요.', translation: 'As for today, the weather is nice.' }] },
  { id: 'want', category: 'grammar', korean: '-고 싶어요', meaning: 'Saying what you want to do', tag: 'Wishes & plans', pattern: 'Verb stem + 고 싶어요', explanation: 'Expresses a wish to do something. Remove 다 from the dictionary form of the verb, then add 고 싶어요.', note: 'This pattern expresses wanting to do an action. For example, 가다 becomes 가고 싶어요.', examples: [{ korean: '한국에 가고 싶어요.', translation: 'I want to go to Korea.' }, { korean: '커피를 마시고 싶어요.', translation: 'I want to drink coffee.' }] },
  { id: 'okay', category: 'expressions', korean: '괜찮아요', meaning: 'It’s okay / I’m okay', tag: 'Everyday responses', explanation: 'A polite everyday response when something is okay or when you are feeling fine. Depending on the situation, it can also politely decline an offer.', note: 'Context and tone matter: 괜찮아요 can mean “I’m fine” or “No, thank you.”', examples: [{ korean: '저는 괜찮아요.', translation: 'I’m okay.' }, { korean: '아니요, 괜찮아요.', translation: 'No, thank you.' }] },
  { id: 'thanks', category: 'expressions', korean: '감사합니다', meaning: 'Thank you', tag: 'Polite expressions', explanation: 'A respectful way to express thanks, useful with staff, strangers, or people you are meeting for the first time.', note: '고마워요 is another polite way to say thank you. 감사합니다 is more formal.', examples: [{ korean: '도와주셔서 감사합니다.', translation: 'Thank you for helping me.' }, { korean: '정말 감사합니다.', translation: 'Thank you very much.' }] },
];
export const initialSavedIds = ['water', 'want', 'thanks'];
