import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, isCorrect } from '../src/content.ts';

test('every sample has a unique ID, teaching explanation, and usable answer', () => {
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const q of questions) {
    assert.ok(q.explanation && q.hint && q.translation, q.id);
    assert.ok(q.answers.length > 0, q.id);
    for (const answer of q.answers) {
      assert.equal(isCorrect(q, answer), true, q.id);
      if (q.type === 'choice') assert.ok(q.options.includes(answer), q.id);
      if (q.type === 'arrange') {
        const available = [...q.options];
        for (const word of answer.split(' ')) {
          const i = available.indexOf(word);
          assert.ok(i >= 0, `${q.id}: unreachable word ${word}`);
          available.splice(i, 1);
        }
      }
    }
    if (q.mode === 'listening') assert.ok(q.audio, q.id);
  }
  for (const mode of ['vocabulary', 'listening', 'grammar', 'expressions']) {
    assert.equal(questions.filter(q => q.mode === mode).length, 5);
  }
});

test('grading accepts Korean composition and harmless punctuation, but rejects wrong particles', () => {
  const school = questions.find(q => q.id === 'v1');
  assert.equal(isCorrect(school, '  학교.  '), true);
  assert.equal(isCorrect(school, '학교'.normalize('NFD')), true);
  assert.equal(isCorrect(school, '가방'), false);
  const sentence = questions.find(q => q.id === 'g1');
  assert.equal(isCorrect(sentence, '저는   사과를 좋아해요!'), true);
  assert.equal(isCorrect(sentence, '저는 사과가 좋아해요'), false);
  assert.equal(isCorrect(sentence, '저는사과를좋아해요'), false);
  assert.equal(isCorrect(sentence, ''), false);
});
