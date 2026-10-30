export const vocabularyOptions = ['학교','가방','우산'] as const;
/** English prompt; keyword is the meaning of the answer word and is highlighted. */
export const vocabularyPrompt = { text: 'I go to school.', keyword: 'school' } as const;
export const vocabularySentence = '저는 학교에 가요.';
export const vocabularyExplanation = '학교 means school. 에 marks where you’re going. One little word, a whole new sentence.';
